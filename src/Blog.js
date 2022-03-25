import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  ScrollView,
  useWindowDimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import RenderHtml from 'react-native-render-html';
import {LoginContext} from './Context/Context';
// import firestore, {firebase} from '@react-native-firebase/firestore';

const Blog = ({route, navigation}) => {
  const {height, width} = useWindowDimensions();
  // const {user} = useContext(LoginContext);
  const {item} = route.params;

  // const hasUpvoted = item.upvotes.indexOf(user.email) >= 0;
  // const hasDownvoted = item.downvotes.indexOf(user.email) >= 0;
  // const hasBookmarked = item.bookmarked.indexOf(user.email) >= 0;

  // const [votes, setvotes] = useState(item.votes);
  // const [upvoteState, setupvoteState] = useState({
  //   color: hasUpvoted ? '#73bda8' : '#5E5D5E',
  //   pressed: hasUpvoted,
  // });
  // const [downvoteState, setdownvoteState] = useState({
  //   color: hasDownvoted ? '#cc6b49' : '#5E5D5E',
  //   pressed: hasDownvoted,
  // });

  // const [bookmark, setBookmark] = useState(hasBookmarked);

  // const bookmarkAdd = () => {
  //   firestore()
  //     .collection('feeds')
  //     .doc(item.key)
  //     .update({
  //       bookmarked: firebase.firestore.FieldValue.arrayUnion(user.email),
  //     });
  //   firestore()
  //     .collection('users')
  //     .doc(user.email)
  //     .update({
  //       bookmarks: firebase.firestore.FieldValue.arrayUnion(item.key),
  //     });
  // };
  // const bookmarkRemove = () => {
  //   firestore()
  //     .collection('feeds')
  //     .doc(item.key)
  //     .update({
  //       bookmarked: firebase.firestore.FieldValue.arrayRemove(user.email),
  //     });
  //   firestore()
  //     .collection('users')
  //     .doc(user.email)
  //     .update({
  //       bookmarks: firebase.firestore.FieldValue.arrayRemove(item.key),
  //     });
  // };

  // const upvote = () => {
  //   if (upvoteState.pressed) {
  //     firestore()
  //       .collection('feeds')
  //       .doc(item.key)
  //       .update({
  //         upvotes: firebase.firestore.FieldValue.arrayRemove(user.email),
  //       });
  //   } else {
  //     firestore()
  //       .collection('feeds')
  //       .doc(item.key)
  //       .update({
  //         upvotes: firebase.firestore.FieldValue.arrayUnion(user.email),
  //       });
  //     firestore()
  //       .collection('feeds')
  //       .doc(item.key)
  //       .update({
  //         downvotes: firebase.firestore.FieldValue.arrayRemove(user.email),
  //       });
  //   }
  //   const voteValue = upvoteState.pressed ? -1 : 1;
  //   const color = upvoteState.pressed ? '#5E5D5E' : '#73bda8';
  //   setupvoteState({color: color, pressed: !upvoteState.pressed});
  //   setdownvoteState({color: '#5E5D5E', pressed: false});

  //   if (downvoteState.pressed) {
  //     setvotes(votes + 2);

  //     firestore()
  //       .collection('feeds')
  //       .doc(item.key)
  //       .update({
  //         votes: votes + 2,
  //       });
  //   } else {
  //     setvotes(votes + voteValue);
  //     firestore()
  //       .collection('feeds')
  //       .doc(item.key)
  //       .update({
  //         votes: votes + voteValue,
  //       });
  //   }
  // };

  // const downvote = () => {
  //   if (downvoteState.pressed) {
  //     firestore()
  //       .collection('feeds')
  //       .doc(item.key)
  //       .update({
  //         downvotes: firebase.firestore.FieldValue.arrayRemove(user.email),
  //       });
  //   } else {
  //     firestore()
  //       .collection('feeds')
  //       .doc(item.key)
  //       .update({
  //         downvotes: firebase.firestore.FieldValue.arrayUnion(user.email),
  //       });
  //     firestore()
  //       .collection('feeds')
  //       .doc(item.key)
  //       .update({
  //         upvotes: firebase.firestore.FieldValue.arrayRemove(user.email),
  //       });
  //   }
  //   const voteValue = downvoteState.pressed ? -1 : 1;
  //   const color = downvoteState.pressed ? '#5E5D5E' : '#cc6b49';
  //   setdownvoteState({color: color, pressed: !downvoteState.pressed});
  //   setupvoteState({color: '#5E5D5E', pressed: false});

  //   if (upvoteState.pressed) {
  //     setvotes(votes - 2);
  //     firestore()
  //       .collection('feeds')
  //       .doc(`${item.key}`)
  //       .update({
  //         votes: votes - 2,
  //       });
  //   } else {
  //     setvotes(votes - voteValue);
  //     firestore()
  //       .collection('feeds')
  //       .doc(`${item.key}`)
  //       .update({
  //         votes: votes - voteValue,
  //       });
  //   }
  // };

  const tagsStyles = {
    body: {
      color: '#1c1c1c',
      backgroundColor: '#FAFAFC',
      height: '100%',
      fontFamily: 'serif',
      fontSize: 19,
    },

    a: {
      color: 'green',
    },
    blockquote: {
      backgroundColor: '#e7e8e0',
      borderRadius: 10,
      color: '#1C1C27',
      padding: '1.7%',
    },
  };

  return (
    <View style={{height: '100%'}}>
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        style={{flex: 1, backgroundColor: '#FAFAFC'}}>
        <View style={{backgroundColor: 'gray', height: 260, width: '100%'}}>
          <Image
            style={{height: 260, width: '100%'}}
            source={{uri: item.photo}}
          />
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => navigation.goBack()}
            style={{
              backgroundColor: '#FAFAFC',
              position: 'absolute',

              top: '4%',
              right: '3%',
              borderRadius: 50,
            }}>
            <Image
              tintColor="black"
              source={require('./assets/close.png')}
              style={{height: 32, width: 32}}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            padding: '4%',
            flexDirection: 'column',
            backgroundColor: '#F2F4F5',
          }}>
          <Text
            style={{
              fontFamily: 'Nasir Udin - Restora',
              fontSize: 39,
              color: '#323438',
            }}>
            {item.title}
          </Text>
          <View
            style={{
              backgroundColor: '#FAFAFC',
              borderRadius: 15,
              padding: '2%',
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: '3%',
            }}>
            <Image
              resizeMode="cover"
              source={{
                uri: item.profilePhoto,
              }}
              style={{width: 50, height: 50, borderRadius: 10}}
            />
            <View style={{flexDirection: 'column', marginLeft: '3%'}}>
              <Text
                style={{
                  color: '#323438',
                  fontFamily: 'SF-Pro-Display-Semibold',
                  marginBottom: '3%',
                }}>
                {item.date}
              </Text>
              <View style={{flexDirection: 'row'}}>
                <Text
                  style={{
                    color: '#717175',
                    fontFamily: 'SF-Pro-Display-Regular',
                  }}>
                  author:
                </Text>
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() =>
                    navigation.navigate('Profile2', {
                      author: item.email,
                    })
                  }>
                  <Text
                    style={{
                      color: '#323538',
                      fontFamily: 'SF-Pro-Display-Regular',
                    }}>
                    {' '}
                    {item.username}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <Text
              style={{
                color: '#5c6892',
                fontFamily: 'SF-Pro-Display-Medium',
                fontSize: 14,
                backgroundColor: '#e6ecff',
                padding: '1%',
                paddingHorizontal: '3%',
                borderRadius: 15,
                marginLeft: 'auto',
              }}>
              {item.category}
            </Text>
          </View>
        </View>
        <View
          style={{
            flex: 1,
            padding: '4%',
            backgroundColor: '#FAFAFC',
            height: '100%',
            marginBottom: '50%',
          }}>
          <RenderHtml
            baseFontStyle={{fontFamily: 'serif'}}
            contentWidth={width}
            source={{
              html: `${item.content}`,
            }}
            tagsStyles={tagsStyles}
          />
        </View>
      </ScrollView>
      {/* <View
        style={{
          position: 'absolute',
          bottom: 0,
          height: 50,
          backgroundColor: '#FAFAFC',
          width: '100%',
          borderTopColor: 'rgba(0,0,0,0.1)',
          borderTopWidth: 1,
          alignItems: 'center',
          flexDirection: 'row',
          paddingLeft: '5%',
          paddingRight: '5%',
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            tintColor="#5E5D5E"
            source={require('./assets/views.png')}
            style={{height: 24, width: 24}}
          />
          <Text
            style={{
              color: '#5E5D5E',
              fontFamily: 'SF-Pro-Display-Regular',
              fontSize: 14,
              marginLeft: 3,
            }}>
            {item.views}
          </Text>
        </View>

        <TouchableOpacity
          activeOpacity={1}
          onPress={() => setBookmark(!bookmark)}
          style={{
            marginLeft: '3%',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Image
            tintColor={bookmark ? '#e5a632' : '#5E5D5E'}
            source={
              bookmark
                ? require('./assets/Bookmark_fill.png')
                : require('./assets/Bookmark.png')
            }
            style={{height: 24, width: 24}}
          />
          <Text
            style={{
              color: bookmark ? '#e5a632' : '#5E5D5E',
              fontFamily: 'SF-Pro-Display-Regular',
              fontSize: 14,
              marginLeft: 1,
            }}>
            Save{bookmark ? 'd!' : null}
          </Text>
        </TouchableOpacity>

        <View
          style={{
            marginLeft: 'auto',
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              upvote();
            }}>
            <Image
              tintColor={upvoteState.color}
              source={
                upvoteState.pressed
                  ? require('./assets/upvote.png')
                  : require('./assets/upvote_lined.png')
              }
              style={[
                {
                  height: 25,
                  width: 25,
                },
              ]}
            />
          </TouchableOpacity>

          <Text
            style={{
              color: '#5E5D5E',
              fontFamily: 'SF-Pro-Display-Semibold',
              fontSize: 14,
              padding: 4,
              marginLeft: 2,
              marginRight: 2,
            }}>
            {votes}
          </Text>

          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              downvote();
            }}>
            <Image
              tintColor={downvoteState.color}
              source={
                downvoteState.pressed
                  ? require('./assets/downvote.png')
                  : require('./assets/downvote_lined.png')
              }
              style={[
                {
                  height: 25,
                  width: 25,
                  alignSelf: 'center',
                },
              ]}
            />
          </TouchableOpacity> */}
      {/* </View> */}
      {/* </View> */}
    </View>
  );
};

export default Blog;
