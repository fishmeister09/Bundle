import React, {useRef, useState, useContext, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import {LoginContext} from './Context/Context';
import {LogBox} from 'react-native';

import {actions, RichEditor, RichToolbar} from 'react-native-pell-rich-editor';
import storage from '@react-native-firebase/storage';
import firestore, {firebase} from '@react-native-firebase/firestore';
import LottieView from 'lottie-react-native';

const PostScreen = ({route, navigation}) => {
  const {user} = useContext(LoginContext);
  const [loader, setLoader] = useState(false);
  const RichText = useRef();
  const [article, setArticle] = useState('');
  const {
    imageName,
    imagePath,
    title,
    category,
    clearStateTitle,
    clearStatePath,
  } = route.params;

  useEffect(() => {
    LogBox.ignoreAllLogs();
  }, []);

  const postFunction = async (imageName, imagePath, title, category) => {
    setLoader(true);
    let url = '';
    await storage()
      .ref(imageName)
      .putFile(imagePath)
      .then(snapshot => {
        console.log(snapshot);
      })
      .catch(e => console.log('uploading image error => ', e));
    url = await storage().ref(imageName).getDownloadURL();

    console.log(url);

    const monthNames = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];

    const d = new Date();
    const data = {
      date: `${d.getDate()} ${monthNames[d.getMonth()]}`,
      category: category,
      content: article,
      bookmarked: [],
      downvotes: [],
      upvotes: [],
      views: 0,
      votes: 0,
      title: title,
      titleUpper: title.toUpperCase().split(' '),
      photo: url,
      profilePhoto: user.profilePhoto,
      name: user.name,
      username: user.username,
      email: user.email,
    };

    await firestore()
      .collection('feeds')
      .add(data)
      .then(documentRef => {
        firestore()
          .collection('users')
          .doc(user.email)
          .update({
            articles: firebase.firestore.FieldValue.arrayUnion(documentRef.id),
          })
          .then(() => {
            clearStateTitle('');
            clearStatePath({});
            setLoader(false);
            navigation.pop(2);
          });
      });
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          backgroundColor: '#FAFAFC',
          padding: '3%',
          paddingBottom: '0%',
          alignItems: 'center',
        }}>
        <TouchableOpacity activeOpacity={1} onPress={() => navigation.goBack()}>
          <Image
            tintColor="#2B2B2E"
            source={require('./assets/close.png')}
            style={{height: 36, width: 36}}
          />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => postFunction(imageName, imagePath, title, category)}>
          <Text
            style={{
              color: '#2B2B2E',
              fontFamily: 'SF-Pro-Display-Semibold',
              fontSize: 25,
            }}>
            Post
          </Text>
        </TouchableOpacity>
      </View>

      <View
        style={{
          backgroundColor: 'rgba(0,0,0,0.2)',
          width: '100%',
          alignSelf: 'center',
          marginTop: '3%',
          height: 1,
        }}
      />
      {loader ? (
        <View
          style={{
            position: 'absolute',
            zIndex: 10,
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              height: 140,
              width: 140,
              backgroundColor: '#f2f3f0',
              alignItems: 'center',
              justifyContent: 'center',

              borderRadius: 15,
            }}>
            <LottieView
              source={require('./assets/loader.json')}
              autoPlay
              loop
              style={{height: 150, width: 150}}
            />
          </View>
        </View>
      ) : null}

      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <RichEditor
          disabled={false}
          ref={RichText}
          style={styles.rich}
          useContainer={true}
          placeholder={'Start Writing Here!'}
          editorStyle={{
            backgroundColor: '#FAFAFC',
            color: '#2B2B2E',
            placeholderColor: '#696969',
            contentCSSText: 'font-size: 24px; font-family: serif;margin:2%;',
          }}
          onChange={text => setArticle(text)}
          // editorInitializedCallback={editorInitializedCallback}
        />
      </ScrollView>

      <RichToolbar
        style={[styles.richBar]}
        editor={RichText}
        disabled={false}
        iconTint={'#696969'}
        selectedIconTint={'#1C1C1C'}
        // onPressAddImage={onPressAddImage}
        iconSize={22}
        actions={[
          actions.heading1,
          actions.setBold,
          actions.setItalic,
          actions.setUnderline,
          actions.blockquote,
          actions.insertBulletsList,
          actions.insertOrderedList,
          // actions.insertImage,
        ]}
        iconMap={{
          [actions.heading1]: ({tintColor}) => (
            <Text style={[styles.tib, {color: tintColor}]}>H1</Text>
          ),
        }}
      />
    </View>
  );
};

export default PostScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFC',
  },

  rich: {
    minHeight: '100%',
    flex: 1,
    alignSelf: 'center',
    width: '100%',

    marginBottom: '65%',
  },
  richBar: {
    height: 50,
    backgroundColor: '#FAFAFC',
    borderTopColor: 'gray',
    borderTopWidth: 0.4,
    borderRadius: 10,
    position: 'absolute',
    alignSelf: 'center',
    bottom: 0,
    width: '100%',
  },

  tib: {
    textAlign: 'center',
    color: '#515156',
  },
});
