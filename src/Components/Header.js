import React, {useState, useRef} from 'react';
import {
  StyleSheet,
  Animated,
  TouchableOpacity,
  Text,
  View,
  Image,
  TextInput,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import LottieView from 'lottie-react-native';

const Header = props => {
  const {dataSetter, dataSetter2, stateChanger, headerHeight} = props;
  const [Input, setInput] = useState('');

  const [iconWidth1, setIconWidth1] = useState({
    iconWidth: '20%',
    imageWidth: 26,
  });
  const [iconWidth2, setIconWidth2] = useState({
    iconWidth: '0%',
    imageWidth: 0,
  });
  const [loader, setLoader] = useState(false);

  const animatedButtonScale = new Animated.Value(1);
  const onPressIn = () => {
    Animated.spring(animatedButtonScale, {
      toValue: 0.9,
      useNativeDriver: true,
    }).start();
  };
  const onPressOut = () => {
    Animated.spring(animatedButtonScale, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };
  function sleep() {
    return new Promise(resolve => setTimeout(resolve, 2000));
  }

  const queryFetcher = async userInput => {
    setLoader(true);
    const snapshot = await firestore()
      .collection('users')
      .where('username', '>=', `@${userInput.toLowerCase()}`)
      .where('username', '<=', `@${userInput.toLowerCase()}` + '~')
      .get();

    let arrayFetch = userInput.toUpperCase().split(' ');

    const snapshot2 = await firestore()
      .collection('feeds')
      .where('titleUpper', 'array-contains-any', arrayFetch)
      .get();

    let users = [];
    snapshot.forEach(documentSnapshot => {
      users.push({
        ...documentSnapshot.data(),
        key: documentSnapshot.id,
      });
      if (users.length != 0) {
        dataSetter(users);
      }
    });

    let feeds = [];
    snapshot2.forEach(documentSnapshot => {
      feeds.push({
        ...documentSnapshot.data(),
        key: documentSnapshot.id,
      });
    });
    if (feeds.length != 0) {
      dataSetter2(feeds);
    }

    await sleep();
    setLoader(false);
  };

  const SearchBarActive = () => {
    setIconWidth1({iconWidth: '0%', imageWidth: 0});
    setIconWidth2({iconWidth: '20%', imageWidth: 32});
  };
  const SearchBarInActive = () => {
    setIconWidth2({iconWidth: '0%', imageWidth: 0});
    setIconWidth1({iconWidth: '20%', imageWidth: 26});
  };

  return (
    <>
      <View
        style={[
          styles.subHeader,
          {
            height: headerHeight / 1.8,
          },
        ]}>
        <Text style={styles.conversation}>Search</Text>
      </View>
      <View
        style={[
          styles.subHeader,
          {
            height: headerHeight / 1.8,
          },
        ]}>
        <View style={styles.searchBox}>
          <Animated.View
            style={{
              width: iconWidth1.iconWidth,
              alignItems: 'center',
            }}>
            <Image
              tintColor="#2B2B2E"
              source={require('../assets/search.png')}
              style={{height: 26, width: iconWidth1.imageWidth}}
            />
          </Animated.View>

          <TextInput
            style={styles.searchText}
            placeholder="Search for articles or users"
            placeholderTextColor="black"
            defaultValue={Input}
            onChangeText={userInput => {
              if (userInput.length > 0) {
                setInput(userInput);
                SearchBarActive();
                stateChanger({hideCatog: true, loader: true});
                queryFetcher(userInput);
              } else if (userInput.length == 0) {
                setInput(userInput);
                dataSetter([]);
                dataSetter2([]);
                SearchBarInActive();
                stateChanger({hideCatog: false, loader: false});
              }
            }}
          />
          <Animated.View
            style={{
              width: iconWidth2.iconWidth,
              alignItems: 'center',
              transform: [
                // {translateX: translation},
                {scale: animatedButtonScale},
              ],
            }}>
            <View>
              {loader ? (
                <View
                  style={{
                    height: 50,
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                  }}>
                  <LottieView
                    source={require('../assets/loader.json')}
                    autoPlay
                    loop
                    style={{height: 70, width: 70}}
                  />
                </View>
              ) : (
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => {
                    setInput('');
                    dataSetter([]);
                    dataSetter2([]);
                    SearchBarInActive();
                    stateChanger({hideCatog: false, loader: false});
                  }}
                  onPressIn={onPressIn}
                  onPressOut={onPressOut}>
                  <Image
                    tintColor="#2b2b2e"
                    source={require('../assets/close.png')}
                    style={{height: 32, width: iconWidth2.imageWidth}}
                  />
                </TouchableOpacity>
              )}
            </View>
          </Animated.View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  subHeader: {
    width: '100%',
    paddingHorizontal: 10,
    backgroundColor: '#f2f3f0',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  conversation: {
    padding: '2%',
    color: '#1C1C1C',
    fontFamily: 'SF-Pro-Display-Semibold',
    fontSize: 35,
  },
  searchText: {
    color: '#2B2B2E',
    fontSize: 19,
    marginLeft: '3%',
    width: '80%',
    height: 50,
    fontFamily: 'SF-Pro-Display-Regular',
  },
  searchBox: {
    paddingHorizontal: 10,
    marginTop: '1.5%',
    marginBottom: '1.5%',
    backgroundColor: '#fafafc',
    borderRadius: 10,
    width: '100%',
    height: 50,
    alignItems: 'center',
    flexDirection: 'row',
    flexShrink: 1,
  },
});
export default Header;
