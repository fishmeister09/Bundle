import React, {useContext, useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  Animated,
} from 'react-native';
import {LoginContext} from './Context/Context';
import Followers from './Components/Followers';
import firestore, {firebase} from '@react-native-firebase/firestore';
import LottieView from 'lottie-react-native';
import Item2 from './Components/Item2';

const Profile = ({navigation}) => {
  const {user} = useContext(LoginContext);
  const [datas, setData] = useState([]);
  const [loader, setLoader] = useState(true);
  const [votes, setVotes] = useState(0);

  const readFunction = () => {};

  useEffect(() => {
    let feed = [];
    let vote = 0;
    user.articles.forEach(document => {
      firestore()
        .collection('feeds')
        .doc(document)
        .onSnapshot(documentSnapshot => {
          if (documentSnapshot.exists) {
            vote = vote + documentSnapshot.data().votes;
            if (!feed.some(e => e.key === documentSnapshot.id)) {
              feed.push({
                ...documentSnapshot.data(),
                key: documentSnapshot.id,
              });
            }

            setData(feed);
            setVotes(vote);
          }
        });
    });
    setTimeout(function () {
      setLoader(false);
    }, 2000);
  }, []);

  const header = () => {
    return (
      <View style={{backgroundColor: '#fafafc'}}>
        <View
          style={{
            padding: '4%',
            paddingBottom: '2%',
          }}>
          <TouchableOpacity
            style={{alignSelf: 'flex-end'}}
            activeOpacity={1}
            onPress={() => navigation.navigate('Settings')}>
            <Image
              tintColor="#2B2B2E"
              source={require('./assets/Setting_alt_fill.png')}
              style={{width: 36, height: 36}}
            />
          </TouchableOpacity>
        </View>

        <View
          style={{
            padding: '4%',
            width: '100%',
          }}>
          <View
            style={{
              width: 100,
              height: 100,
              backgroundColor: 'gray',
              borderRadius: 50,
              overflow: 'hidden',
            }}>
            <Image
              resizeMode="cover"
              source={{uri: user.profilePhoto}}
              style={{height: '100%', width: '100%'}}
            />
          </View>
          <View style={{flexDirection: 'column'}}>
            <Text
              style={{
                fontFamily: 'SF-Pro-Display-Bold',
                fontSize: 20,
                color: '#2B2B2E',
                marginTop: '3%',
              }}>
              {user.name}
            </Text>
            <Text
              style={{
                fontFamily: 'SF-Pro-Display-Regular',
                fontSize: 15,
                marginTop: '1%',

                color: 'rgba(0,0,0,0.7)',
              }}>
              {user.username}
            </Text>
            <Followers
              articles={user.articles.length}
              followers={user.followers}
              following={user.following}
              votes={votes}
            />
          </View>
          <View style={{flexDirection: 'column'}}>
            <Text
              style={{
                color: '#C7C7C9',
                fontFamily: 'SF-Pro-Display-Semibold',
                fontSize: 17,
                marginTop: '3%',
              }}>
              about
            </Text>
            {user.about.length > 0 ? (
              <Text
                style={{
                  color: 'rgba(0,0,0,0.7)',
                  fontFamily: 'SF-Pro-Display-Regular',
                  fontSize: 17,
                  marginTop: '3%',
                  width: '95%',
                }}>
                {user.about}
              </Text>
            ) : (
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => navigation.navigate('Account')}>
                <Text
                  style={{
                    color: 'rgba(0,0,0,0.7)',
                    fontFamily: 'SF-Pro-Display-Regular',
                    fontSize: 17,
                    marginTop: '3%',
                    width: '95%',
                  }}>
                  Write something about yourself to let people know what you're
                  into.
                </Text>
              </TouchableOpacity>
            )}
            <Text
              style={{
                color: '#C7C7C9',
                fontFamily: 'SF-Pro-Display-Semibold',
                fontSize: 17,
                marginTop: '3%',
                paddingBottom: 0,
              }}>
              articles
            </Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View
      style={{
        backgroundColor: '#fafafc',
        height: '100%',
      }}>
      {/* {DialogVisible ? (
        <Animated.View
          style={{
            padding: '0.5%',
            width: '100%',
            top: 0,
            left: 0,
            right: 0,
            flexDirection: 'row',
            position: 'absolute',
            backgroundColor: '#F6C800',
            alignItems: 'center',
            transform: [{translateY: translation}],
            justifyContent: 'space-between',
            zIndex: 3,
          }}>
          <TouchableOpacity
            style={{padding: '0.3%'}}
            activeOpacity={1}
            onPress={() => onCloseDialog()}>
            <Image
              tintColor="#2B2B2E"
              style={{width: 25, height: 25}}
              source={require('./assets/close.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => navigation.navigate('Account')}>
            <Text
              style={{
                fontFamily: 'SF-Pro-Display-Semibold',
                color: '#2B2B2E',
                fontSize: 16,
              }}>
              Complete your profile
            </Text>
          </TouchableOpacity>
          <View />
        </Animated.View>
      ) : null} */}

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

      <FlatList
        data={loader ? null : datas}
        ListHeaderComponent={header}
        contentContainerStyle={{paddingBottom: '25%'}}
        ListEmptyComponent={() =>
          loader ? null : (
            <View
              style={{
                alignItems: 'center',
                backgroundColor: '#f2f3f0',
                alignSelf: 'center',
                paddingHorizontal: '5%',
                paddingVertical: '3%',
                borderRadius: 15,
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text
                  style={{fontFamily: 'SF-Pro-Display-Medium', fontSize: 16}}>
                  Write your first
                </Text>
                <Text
                  style={{
                    fontFamily: 'SF-Pro-Display-Bold',
                    fontSize: 17,
                  }}>
                  {' '}
                  article
                </Text>
              </View>
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => navigation.navigate('TitleScreen')}>
                <Image
                  source={require('./assets/write.png')}
                  style={{height: 50, width: 50, marginTop: '3%'}}
                />
              </TouchableOpacity>
            </View>
          )
        }
        ItemSeparatorComponent={() => (
          <View
            style={{
              width: '100%',
              alignSelf: 'center',
              height: '2%',
            }}
          />
        )}
        renderItem={({item}) => (
          <Item2
            item={item}
            onSwipe={() => {
              const newItems = [...datas];

              firestore().collection('feeds').doc(item.key).delete();
              firestore()
                .collection('users')
                .doc(user.email)
                .update({
                  articles: firebase.firestore.FieldValue.arrayRemove(item.key),
                });
              newItems.splice(newItems.indexOf(item), 1);
              setData(newItems);
            }}
          />
        )}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.key}
      />
    </View>
  );
};

export default Profile;
