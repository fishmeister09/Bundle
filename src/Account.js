import React, {useContext, useState, useEffect} from 'react';
import {launchImageLibrary} from 'react-native-image-picker';
import {LoginContext} from './Context/Context';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  Dimensions,
  Platform,
  PermissionsAndroid,
  StyleSheet,
} from 'react-native';
// import DatePicker from 'react-native-neat-date-picker';
import LottieView from 'lottie-react-native';
import storage from '@react-native-firebase/storage';
import firestore, {firebase} from '@react-native-firebase/firestore';
import DatePicker from 'react-native-date-picker';

const Account = ({navigation}) => {
  const windowWidth = Dimensions.get('window').width;
  const {user} = useContext(LoginContext);
  const [loader, setLoader] = useState(false);
  const [aboutState, setAboutState] = useState(user.about);
  const [filePath, setFilePath] = useState({fileName: '', uri: ''});
  const d = user.dob.toDate();
  const [dob, setDate] = useState(d);
  const [name, setName] = useState(user.name);

  useEffect(() => {
    user.gender == 'male' ? male() : female();
  }, []);

  const [maleState, setmaleState] = useState({
    backColor: 'rgba(0,0,0,0.1)',
    iconColor: 'rgba(0,0,0,0.5)',
    pressed: false,
  });
  const [femaleState, setfemaleState] = useState({
    backColor: 'rgba(0,0,0,0.1)',
    iconColor: 'rgba(0,0,0,0.5)',
    pressed: false,
  });
  const male = () => {
    let backcolor = maleState.pressed ? 'rgba(0,0,0,0.1)' : '#5732FB';
    let iconColor = maleState.pressed ? 'rgba(0,0,0,0.5)' : '#FAFAFC';
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
    let backcolor = femaleState.pressed ? 'rgba(0,0,0,0.1)' : '#5732FB';
    let iconColor = femaleState.pressed ? 'rgba(0,0,0,0.5)' : '#FAFAFC';
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
  const requestExternalWritePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'External Storage Write Permission',
            message: 'App needs write permission',
          },
        );

        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        alert('Write permission error', err);
      }
      return false;
    } else return true;
  };

  const chooseFile = async () => {
    let options = {
      mediaType: 'photo',
      maxWidth: 512,
      maxHeight: 512,
      quality: 1,
    };
    let isStoragePermitted = await requestExternalWritePermission();

    if (isStoragePermitted) {
      launchImageLibrary(options, response => {
        if (response.didCancel) {
          return;
        } else if (response.errorCode == 'camera_unavailable') {
          return;
        } else if (response.errorCode == 'permission') {
          return;
        } else if (response.errorCode == 'others') {
          return;
        }
        setFilePath({
          fileName: response.assets[0].fileName,
          uri: response.assets[0].uri,
        });
      });
    }
    return true;
  };

  const postFunction = async (imageName, imagePath, name, date, aboutState) => {
    setLoader(true);
    const gender = maleState.pressed ? 'male' : 'female';
    let url = '';
    if (imageName.length > 0) {
      await storage()
        .ref(imageName)
        .putFile(imagePath)
        .then(snapshot => {
          console.log(snapshot);
        })
        .catch(e => console.log('uploading image error => ', e));
      url = await storage().ref(imageName).getDownloadURL();
    }

    await firestore()
      .collection('users')
      .doc(user.email)
      .update({
        profilePhoto: url.length > 0 ? url : user.profilePhoto,
        name: name.length > 3 ? name : user.name,
        dob: date,
        about: aboutState,
        gender: gender,
      });

    setLoader(false);
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
        <TouchableOpacity activeOpacity={1} onPress={() => navigation.goBack()}>
          <Image
            tintColor="#2B2B2E"
            source={require('./assets/back.png')}
            style={{height: 32, width: 32}}
          />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() =>
            postFunction(filePath.fileName, filePath.uri, name, dob, aboutState)
          }>
          <View
            style={{
              padding: 6,
              backgroundColor: '#1FB7FC',
              borderRadius: 15,
            }}>
            <Image
              tintColor="#FAFAFC"
              source={require('./assets/done.png')}
              style={{height: 36, width: 36}}
            />
          </View>
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
            fontSize: 23,
          }}>
          Edit profile
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
            flexDirection: 'row',
          }}>
          <Text style={styles.fieldName}>Photo</Text>
          <View
            style={{
              flexDirection: 'column',
              alignItems: 'center',
              marginLeft: '19%',
            }}>
            <Image
              resizeMode="cover"
              source={{
                uri:
                  filePath.fileName.length > 0
                    ? filePath.uri
                    : user.profilePhoto,
              }}
              style={{
                height: 85,
                width: 85,
                borderRadius: 50,
              }}
            />
            <TouchableOpacity activeOpacity={1} onPress={() => chooseFile()}>
              <Text
                style={{
                  fontSize: 17,
                  fontFamily: 'SF-Pro-Display-Regular',
                  color: '#1CB8FE',
                  marginTop: '15%',
                }}>
                Upload Image
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{marginTop: '8%', flexDirection: 'row', alignItems: 'center'}}>
          <Text style={[styles.fieldName, {width: '30%'}]}>Name</Text>
          <TextInput
            style={[styles.input, {width: '67%'}]}
            value={name}
            onChangeText={userInput => setName(userInput)}
            placeholderTextColor="#2B2B2E"
          />
        </View>
        <View
          style={{marginTop: '8%', flexDirection: 'row', alignItems: 'center'}}>
          <Text style={styles.fieldName}>Gender</Text>
          <View
            style={{
              flexDirection: 'row',
              marginLeft: '18%',
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity activeOpacity={1} onPress={() => male()}>
              <View
                style={{
                  backgroundColor: maleState.backColor,
                  borderRadius: 50,
                  padding: 16,
                }}>
                <Image
                  tintColor={maleState.iconColor}
                  source={require('./assets/male.png')}
                  style={{height: 18, width: 18}}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{marginLeft: '5%'}}
              activeOpacity={1}
              onPress={() => female()}>
              <View
                style={{
                  backgroundColor: femaleState.backColor,
                  borderRadius: 50,
                  padding: 16,
                }}>
                <Image
                  tintColor={femaleState.iconColor}
                  source={require('./assets/female.png')}
                  style={{height: 18, width: 18}}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            marginTop: '8%',

            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Text style={[styles.fieldName, {width: '30%'}]}>Date of birth</Text>

          <DatePicker
            style={{
              height: 150,
              width: windowWidth / 1.8,
            }}
            androidVariant="iosClone"
            maximumDate={new Date()}
            date={dob}
            fadeToColor="#fafafc"
            mode="date"
            textColor="#2B2B2E"
            onDateChange={setDate}
          />
        </View>

        <View
          style={{
            marginTop: '8%',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Text style={[styles.fieldName, {width: '30%'}]}>Email</Text>
          <TextInput
            editable={false}
            style={[styles.input, {width: '67%'}]}
            placeholder={user.email}
            placeholderTextColor="#2B2B2E"
          />
        </View>
        <View
          style={{
            marginTop: '8%',
            flexDirection: 'row',
            alignItems: 'flex-start',
          }}>
          <Text style={[styles.fieldName, {width: '30%'}]}>About</Text>
          <TextInput
            style={[
              styles.input,
              {
                width: '67%',
                textAlignVertical: 'top',
                borderWidth: 1,
                borderRadius: 10,
              },
            ]}
            value={aboutState}
            placeholder={''}
            placeholderTextColor="#2B2B2E"
            multiline={true}
            numberOfLines={8}
            maxLength={200}
            onChangeText={userInput => setAboutState(userInput)}
          />
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
    borderColor: 'rgba(0,0,0,0.1)',
    borderWidth: 0,
    borderBottomWidth: 1,
  },

  fieldName: {
    fontSize: 15,
    fontFamily: 'SF-Pro-Display-Semibold',
    color: '#B8B9C8',
  },
});

export default Account;
