import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import LottieView from 'lottie-react-native';

const BugsScreen = ({navigation}) => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [loader, setLoader] = useState(false);

  const [maleState, setmaleState] = useState({
    backColor: '#E1E1E3',
    iconColor: 'rgba(0,0,0,0.5)',
    pressed: false,
  });
  const [femaleState, setfemaleState] = useState({
    backColor: '#E1E1E3',
    iconColor: 'rgba(0,0,0,0.5)',
    pressed: false,
  });
  const male = () => {
    let backcolor = maleState.pressed ? 'rgba(0,0,0,0.1)' : '#FFEFEA';
    let iconColor = maleState.pressed ? 'rgba(0,0,0,0.5)' : '#F78944';
    setmaleState({
      backColor: backcolor,
      iconColor: iconColor,
      pressed: !maleState.pressed,
    });
    setfemaleState({
      backColor: 'rgba(0,0,0,0.1)',
      iconColor: 'rgba(0,0,0,0.5)',
      pressed: false,
    });
  };
  const female = () => {
    let backcolor = femaleState.pressed ? 'rgba(0,0,0,0.1)' : '#EEEAFF';
    let iconColor = femaleState.pressed ? 'rgba(0,0,0,0.5)' : '#5330FD';
    setfemaleState({
      backColor: backcolor,
      iconColor: iconColor,
      pressed: !femaleState.pressed,
    });
    setmaleState({
      backColor: 'rgba(0,0,0,0.1)',
      iconColor: 'rgba(0,0,0,0.5)',
      pressed: false,
    });
  };

  const handleSubmit = () => {
    setLoader(true);
    const bugOrfeature = maleState.pressed ? 'bug' : 'feature';

    const data = {
      bugOrfeature: bugOrfeature,
      title: title,
      description: desc,
    };

    firestore()
      .collection('requests')
      .add(data)
      .then(() => {
        setTitle('');
        setDesc('');
        setLoader(false);
      });
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{
        height: '100%',
        backgroundColor: '#FAFAFC',
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
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          backgroundColor: '#FAFAFC',
          padding: '5%',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => navigation.navigate('Settings')}>
          <Image
            tintColor="#2B2B2E"
            source={require('./assets/back.png')}
            style={{height: 32, width: 32}}
          />
        </TouchableOpacity>
      </View>
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
            fontSize: 26.5,
          }}>
          Report bug or request a feature
        </Text>
      </View>
      <View
        style={{
          margin: '2%',
          padding: '2%',
          paddingLeft: '4%',
          flexDirection: 'column',
          paddingBottom: '30%',
        }}>
        <View
          style={{
            flexDirection: 'column',
          }}>
          <Text style={styles.fieldName}>I would like to</Text>
          <View
            style={{
              flexDirection: 'row',
              alignSelf: 'center',
              marginTop: '5%',
            }}>
            <TouchableOpacity activeOpacity={1} onPress={() => male()}>
              <View
                style={{
                  backgroundColor: maleState.backColor,
                  borderBottomLeftRadius: 15,
                  borderTopLeftRadius: 15,
                  padding: 14,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Image
                  tintColor={maleState.iconColor}
                  source={require('./assets/bug.png')}
                  style={{height: 22, width: 22}}
                />
                <Text
                  style={{
                    marginLeft: '4%',
                    color: maleState.iconColor,
                    fontFamily: 'SF-Pro-Display-Bold',
                  }}>
                  Report a bug
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={1} onPress={() => female()}>
              <View
                style={{
                  backgroundColor: femaleState.backColor,
                  borderBottomRightRadius: 15,
                  borderTopRightRadius: 15,
                  padding: 14,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Image
                  tintColor={femaleState.iconColor}
                  source={require('./assets/feature.png')}
                  style={{height: 22, width: 22}}
                />
                <Text
                  style={{
                    marginLeft: '4%',
                    color: femaleState.iconColor,
                    fontFamily: 'SF-Pro-Display-Bold',
                  }}>
                  Request a feature
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'column',
            marginTop: '5%',
          }}>
          <Text style={styles.fieldName}>Title</Text>
          <TextInput
            style={styles.input}
            value={title}
            maxLength={55}
            onChangeText={userInput => setTitle(userInput)}
            placeholder="Enter a title"
          />
        </View>
        <View
          style={{
            flexDirection: 'column',
            marginTop: '5%',
          }}>
          <Text style={styles.fieldName}>Description</Text>
          <TextInput
            multiline={true}
            numberOfLines={6}
            style={styles.inputArea}
            placeholder="Enter a description"
            value={desc}
            maxLength={250}
            onChangeText={userInput => setDesc(userInput)}
          />
        </View>
        <View style={{marginTop: '5%'}}>
          <TouchableOpacity
            onPress={() => handleSubmit()}
            activeOpacity={1}
            style={{
              backgroundColor: '#E1E1E2',
              alignSelf: 'flex-start',
              padding: 10,
              borderRadius: 15,
            }}>
            <Text
              style={{
                fontFamily: 'SF-Pro-Display-Bold',
                fontSize: 19,
                color: '#1C1C1C',
              }}>
              Submit
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    color: '#2B2B2E',
    fontFamily: 'SF-Pro-Display-Medium',
    fontSize: 17.5,
    borderBottomColor: 'rgba(0,0,0,0.1)',
    borderWidth: 0,
    borderBottomWidth: 1,
    width: '100%',
  },
  inputArea: {
    borderWidth: 1,
    color: '#2B2B2E',
    fontFamily: 'SF-Pro-Display-Medium',
    fontSize: 17.5,
    borderBottomColor: 'rgba(0,0,0,0.1)',
    borderWidth: 0,
    borderBottomWidth: 1,
    width: '100%',
    textAlignVertical: 'top',
  },

  fieldName: {
    fontSize: 15,
    fontFamily: 'SF-Pro-Display-Semibold',
    color: '#B8B9C8',
  },
});

export default BugsScreen;
