import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, Image, StatusBar} from 'react-native';
import HomeStack from './src/HomeStack';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import {LoginContext} from './src/Context/Context';
import firestore from '@react-native-firebase/firestore';
import LinearGradient from 'react-native-linear-gradient';

export default ({}) => {
  const [loggedIn, setloggedIn] = useState(false);
  const [user, setUser] = useState([]);
  const [progress, inProgress] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [HomeState, SetHomeState] = useState(false);

  _signIn = async () => {
    try {
      setClicked(true);
      await GoogleSignin.hasPlayServices();
      const {accessToken, idToken} = await GoogleSignin.signIn();
      inProgress(true);
      setloggedIn(true);

      const credential = auth.GoogleAuthProvider.credential(
        idToken,
        accessToken,
      );
      await auth().signInWithCredential(credential);
      setClicked(false);
      inProgress(false);
    } catch (error) {
      setClicked(false);
      inProgress(false);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log(error.code);
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log(error.code);
        // operation (f.e. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log(error.code);
        // play services not available or outdated
      } else {
        console.log('error: ' + error);
        // some other error happened
      }
    }
  };
  const addUser = user => {
    data = {
      name: user.displayName,
      username: `@${user.email.substring(0, user.email.lastIndexOf('@'))}`,
      email: user.email,
      profilePhoto: user.photoURL,
      followers: 0,
      votes: 0,
      about: '',
      articles: [],
      bookmarks: [],
      dob: new Date(),
      about: '',
      gender: 'male',
    };
    firestore()
      .collection('users')
      .doc(user.email)
      .onSnapshot(docSnapshot => {
        setUser(docSnapshot._data);

        if (!docSnapshot.exists) {
          firestore().collection('users').doc(user.email).set(data);
        }
      });
  };

  function onAuthStateChanged(user) {
    if (user) {
      setloggedIn(true);
      addUser(user);
    }
  }
  useEffect(() => {
    GoogleSignin.configure({
      scopes: ['email'], // what API you want to access on behalf of the user, default is email and profile
      webClientId:
        '381359598703-i1mt26akh8v03ofh6e24a5kalkg7mjkm.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
      // forceCodeForRefreshToken: true,
    });
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  return (
    <View style={{width: '100%', height: '100%'}}>
      <LoginContext.Provider
        value={{
          loggedIn,
          setloggedIn,
          user,
          HomeState,
          SetHomeState,
        }}>
        {!loggedIn && (
          <View
            style={{
              flex: 1,
              backgroundColor: '#fafafc',
              padding: '5%',
              paddingTop: '10%',
            }}>
            <StatusBar barStyle="dark-content" backgroundColor={'#fafafc'} />
            <View
              style={{
                height: 50,
                width: '100%',
                alignItems: 'center',
                flexDirection: 'row',
              }}>
              <Image
                resizeMode="contain"
                style={{height: '100%', width: 50}}
                source={require('./src/assets/logo_out.png')}
              />
              <Text
                style={{
                  fontFamily: 'Comfortaa-Bold',
                  fontSize: 20,
                  marginLeft: '1.2%',
                  color: '#1c1c1c',
                }}>
                bundle
              </Text>
            </View>
            <View
              style={{
                height: 500,
                width: 500,
                alignItems: 'center',
                alignSelf: 'center',
                marginTop: '3%',
              }}>
              <Image
                resizeMode="contain"
                style={{height: '100%', width: '100%'}}
                source={require('./src/assets/background3.png')}
              />
            </View>
            <Text
              style={{
                textAlign: 'center',
                alignSelf: 'center',
                fontFamily: 'SF-Pro-Display-Regular',
                fontSize: 17,
              }}>
              A place to share and explore ideas
            </Text>
            <Text
              style={{
                textAlign: 'center',
                alignSelf: 'center',
                fontFamily: 'SF-Pro-Display-Regular',
                fontSize: 17,
              }}>
              around the world
            </Text>

            <TouchableOpacity
              activeOpacity={1}
              onPress={() => _signIn()}
              style={{
                backgroundColor: '#1c1c1c',
                alignSelf: 'center',
                width: '80%',
                borderRadius: 10,
                justifyContent: 'center',
                alignItems: 'center',
                paddingHorizontal: '5%',
                paddingVertical: '3%',
                marginTop: 'auto',
                marginBottom: '5%',
              }}>
              <Text
                style={{
                  fontFamily: 'SF-Pro-Display-Semibold',
                  fontSize: 23,
                  color: '#fafafc',
                }}>
                Get Started
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {/* {!user && progress === true && <Text>Please wait...</Text>}
            {!user && progress === false && (
              <Text>You are currently logged out</Text>
            )} */}

        {loggedIn && user && <HomeStack />}
      </LoginContext.Provider>
    </View>
  );
};
