import React, {useContext, useState, useEffect, useRef} from 'react';
import {Text, View, Image, Animated, TouchableOpacity} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import firestore, {firebase} from '@react-native-firebase/firestore';
import Item from './Components/Item';
import {LoginContext} from './Context/Context';
import SkeletonLoadingBookmarks from './Components/SkeletonLoadingBookmarks';
import {set} from 'react-native-reanimated';

import {useIsFocused} from '@react-navigation/native';

const BookmarkScreen = ({navigation}) => {
  const {user, HomeState, SetHomeState} = useContext(LoginContext);
  const isFocused = useIsFocused();
  const [data, setData] = useState([]);
  const [reload, setReload] = useState(0);
  const [loader, setLoader] = useState(false);

  const [DialogVisible, setDialogVisible] = useState(false);
  const translation = useRef(new Animated.Value(-100)).current;
  let bookmark = user.bookmarks;

  const readFunction = () => {
    setLoader(true);
    setData([]);

    let feed = [];
    user.bookmarks.forEach(document => {
      const subscriber = firestore()
        .collection('feeds')
        .doc(document)
        .get()
        .then(documentSnapshot => {
          if (documentSnapshot.exists) {
            if (!feed.some(e => e.key === documentSnapshot.id)) {
              feed.push({
                ...documentSnapshot.data(),
                key: documentSnapshot.id,
              });
            }

            setData(feed);
          }
        });
      return () => subscriber();
    });
  };

  // console.log(data);

  useEffect(() => {
    // if (user.bookmarks.length > 0) {
    readFunction();

    setTimeout(function () {
      setLoader(false);
    }, 1500);
    // }
  }, [isFocused]);

  const onCloseDialog = () => {
    Animated.timing(translation, {
      toValue: -100,
      useNativeDriver: true,
    }).start();
    setTimeout(function () {
      setDialogVisible(false);
    }, 200);
  };

  const header = () => {
    return (
      <View>
        <View
          style={{
            margin: '2%',
          }}>
          <Text
            style={{
              padding: '2%',
              paddingLeft: '4%',
              color: '#1C1C1C',
              fontFamily: 'SF-Pro-Display-Semibold',
              fontSize: 23,
            }}>
            Bookmarks
          </Text>
        </View>
        {loader ? (
          <View>
            <SkeletonLoadingBookmarks />
            <SkeletonLoadingBookmarks />
          </View>
        ) : null}
        {user.bookmarks.length == 0 && !loader ? (
          <View
            style={{
              alignSelf: 'center',
              alignItems: 'center',
              marginTop: '50%',
              marginBottom: '30%',
              marginLeft: '6.5%',
              marginRight: '6.5%',
            }}>
            <Text
              style={{
                fontFamily: 'SF-Pro-Display-Bold',
                color: '#434343',
                fontSize: 26,
                textAlign: 'center',
              }}>
              Add Bookmarks
            </Text>
            <Text
              style={{
                fontFamily: 'SF-Pro-Display-Bold',
                color: '#666666',
                fontSize: 16,
                textAlign: 'center',
                marginTop: '5%',
              }}>
              Don't forget to bookmark the posts you like the most so that you
              can find those easily over here.
            </Text>
          </View>
        ) : null}
      </View>
    );
  };

  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: '#FAFAFC',
      }}>
      {DialogVisible ? (
        <Animated.View
          style={{
            padding: '0.5%',
            position: 'absolute',
            width: '100%',
            top: 0,
            zIndex: 3,
            flexDirection: 'row',
            backgroundColor: '#E65538',
            alignItems: 'center',
            transform: [{translateY: translation}],
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity
            style={{padding: '0.7%'}}
            activeOpacity={1}
            onPress={() => onCloseDialog()}>
            <Image
              tintColor="#FAFAFC"
              style={{width: 30, height: 30}}
              source={require('./assets/close.png')}
            />
          </TouchableOpacity>

          <Text
            style={{
              fontFamily: 'SF-Pro-Display-Semibold',
              color: '#FAFAFC',
              fontSize: 17,
            }}>
            Swipe left to delete items
          </Text>

          <View />
        </Animated.View>
      ) : null}
      <FlatList
        data={loader ? null : data}
        keyExtractor={item => item.key}
        contentContainerStyle={{paddingBottom: '20%'}}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={header}
        ItemSeparatorComponent={() => (
          <View
            style={{
              backgroundColor: 'rgba(0,0,0,0.2)',
              width: '100%',
              height: 1,
            }}
          />
        )}
        renderItem={({item}) => (
          <Item
            item={item}
            onSwipe={() => {
              SetHomeState(isFocused);
              const newItems = [...data];
              let index = user.bookmarks.indexOf(item.key);
              if (index > -1) {
                bookmark.splice(index, 1);
              }
              firestore().collection('users').doc(`${user.email}`).update({
                bookmarks: bookmark,
              });
              firestore()
                .collection('feeds')
                .doc(item.key)
                .update({
                  bookmarked: firebase.firestore.FieldValue.arrayRemove(
                    user.email,
                  ),
                });
              newItems.splice(newItems.indexOf(item), 1);

              setData(newItems);
            }}
          />
        )}
      />
    </View>
  );
};

export default BookmarkScreen;
