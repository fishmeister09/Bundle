import React, {useContext, useEffect, useState} from 'react';
import {View, Text, Image, TouchableOpacity, FlatList} from 'react-native';
import Followers from './Components/Followers';
import firestore, {firebase} from '@react-native-firebase/firestore';
import LottieView from 'lottie-react-native';
import ProfileFlatListRender from './Components/ProfileFlatListRender';
import {LoginContext} from './Context/Context';

const Profile = ({navigation, route}) => {
  const {author} = route.params;
  const {user} = useContext(LoginContext);
  const amIafollower = user.following.includes(author);
  const [datas, setData] = useState([]);
  const [votes, setVotes] = useState(0);
  const [sureUnfollowVissible, setSureUnfollowVissble] = useState(false);
  const [following, setFollowing] = useState(amIafollower);
  const [userData, setUserData] = useState({
    name: 'loading',
    username: `loading`,
    followers: [],
    following: [],
    articles: [],
    about: '',
  });

  const [loader, setLoader] = useState(true);

  const readFunction = () => {
    let feed = [];
    let vote = 0;

    firestore()
      .collection('users')
      .doc(author)
      .onSnapshot(documentSnapshot => {
        if (documentSnapshot.exists) {
          let snapshot = {...documentSnapshot.data()};
          setUserData({...documentSnapshot.data()});

          if (snapshot.articles.length > 0) {
            snapshot.articles.forEach(document => {
              firestore()
                .collection('feeds')
                .doc(document)
                .onSnapshot(documentSnapshot => {
                  if (documentSnapshot.exists) {
                    if (!feed.some(e => e.key === documentSnapshot.id)) {
                      feed.push({
                        ...documentSnapshot.data(),
                        key: documentSnapshot.id,
                      });
                    }
                    vote = vote + documentSnapshot.data().votes;
                    setData(feed);
                    setVotes(vote);
                  }
                });
            });
          } else {
            setData([]);
          }
        }
      });
  };

  useEffect(() => {
    readFunction();
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
            style={{alignSelf: 'flex-start'}}
            activeOpacity={1}
            onPress={() => navigation.goBack()}>
            <Image
              tintColor="#2B2B2E"
              source={require('./assets/back.png')}
              style={{height: 32, width: 32}}
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
              source={{uri: userData.profilePhoto}}
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
              {userData.name}
            </Text>
            <Text
              style={{
                fontFamily: 'SF-Pro-Display-Regular',
                fontSize: 15,
                marginTop: '1%',

                color: 'rgba(0,0,0,0.7)',
              }}>
              {userData.username}
            </Text>
            {!(user.email == author) ? (
              <TouchableOpacity
                activeOpacity={1}
                style={{
                  borderColor: '#58adec',
                  marginTop: '5%',
                  borderWidth: 1,
                  alignItems: 'center',
                  borderRadius: 10,
                  width: '30%',
                  backgroundColor: following ? '#fafafc' : '#58adec',
                }}
                onPress={() => {
                  if (following) {
                    setSureUnfollowVissble(true);
                  } else {
                    setFollowing(true);

                    firestore()
                      .collection('users')
                      .doc(user.email)
                      .update({
                        following:
                          firebase.firestore.FieldValue.arrayUnion(author),
                      });
                    firestore()
                      .collection('users')
                      .doc(author)
                      .update({
                        following: firebase.firestore.FieldValue.arrayUnion(
                          user.email,
                        ),
                      });
                  }
                }}>
                <Text
                  style={{
                    color: following ? '#58adec' : '#fafafc',
                    fontFamily: 'SF-Pro-Display-Regular',
                    fontSize: 15,
                  }}>
                  {following ? 'Unfollow' : 'Follow'}
                </Text>
              </TouchableOpacity>
            ) : null}
            <Followers
              articles={userData.articles.length}
              followers={userData.followers}
              following={userData.following}
              votes={votes}
            />
          </View>
          <View style={{flexDirection: 'column'}}>
            {userData.about.length > 0 ? (
              <View>
                <Text
                  style={{
                    color: '#C7C7C9',
                    fontFamily: 'SF-Pro-Display-Semibold',
                    fontSize: 17,
                    marginTop: '3%',
                  }}>
                  about
                </Text>
                <Text
                  style={{
                    color: 'rgba(0,0,0,0.7)',
                    fontFamily: 'SF-Pro-Display-Regular',
                    fontSize: 17,
                    marginTop: '3%',
                    width: '95%',
                  }}>
                  {userData.about}
                </Text>
              </View>
            ) : null}
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
      {sureUnfollowVissible ? (
        <View
          style={{
            position: 'absolute',
            zIndex: 10,
            top: '40%',
            left: '10%',
            right: '10%',
            bottom: '40%',
            paddingTop: '15%',
            borderRadius: 15,
            backgroundColor: '#fafafc',
            borderColor: '#58adec',
            borderWidth: 1,
          }}>
          <View style={{alignItems: 'center', alignSelf: 'center'}}>
            <Text style={{fontFamily: 'SF-Pro-Display-Regular', fontSize: 15}}>
              Are you sure you want to unfollow
            </Text>
            <Text style={{fontFamily: 'SF-Pro-Display-Medium', fontSize: 15}}>
              {userData.name}?
            </Text>
          </View>
          <View
            style={{
              width: '80%',
              alignSelf: 'center',
              alignItems: 'center',
              flexDirection: 'row',
              marginTop: '10%',
            }}>
            <TouchableOpacity
              onPress={() => setSureUnfollowVissble(false)}
              activeOpacity={1}
              style={{marginLeft: 'auto'}}>
              <Text
                style={{fontFamily: 'SF-Pro-Display-Regular', fontSize: 16}}>
                Cancel
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setSureUnfollowVissble(false);
                setFollowing(false);
                firestore()
                  .collection('users')
                  .doc(user.email)
                  .update({
                    following:
                      firebase.firestore.FieldValue.arrayRemove(author),
                  });
                firestore()
                  .collection('users')
                  .doc(author)
                  .update({
                    following: firebase.firestore.FieldValue.arrayRemove(
                      user.email,
                    ),
                  });
              }}
              activeOpacity={1}
              style={{
                borderRadius: 15,
                backgroundColor: '#58adec',
                paddingHorizontal: '5%',
                paddingVertical: '2%',
                marginLeft: '5%',
              }}>
              <Text
                style={{
                  fontFamily: 'SF-Pro-Display-Regular',
                  color: '#fafafc',
                  fontSize: 16,
                }}>
                Unfollow
              </Text>
            </TouchableOpacity>
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
                  This user hasn't posted any
                </Text>
                <Text
                  style={{
                    fontFamily: 'SF-Pro-Display-Bold',
                    fontSize: 17,
                  }}>
                  {' '}
                  article{' '}
                </Text>
                <Text
                  style={{fontFamily: 'SF-Pro-Display-Medium', fontSize: 16}}>
                  yet
                </Text>
              </View>
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
        renderItem={({item}) => <ProfileFlatListRender item={item} />}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.key}
      />
    </View>
  );
};

export default Profile;
