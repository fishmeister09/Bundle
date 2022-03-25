import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import RadioButton from './Components/RadioButton';
import {launchImageLibrary} from 'react-native-image-picker';

const TitleScreen = ({navigation}) => {
  const [selectedRadio, setSelectedRadio] = useState();
  const [title, setTitle] = useState('');
  const [fieldLength, setFieldLength] = useState(0);
  const [filePath, setFilePath] = useState({});

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

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{
        height: '100%',
        backgroundColor: '#FAFAFC',
        flex: 1,
      }}>
      <View
        style={{
          backgroundColor: '#FAFAFC',
          padding: '5%',
          justifyContent: 'space-between',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => navigation.navigate('TabsScreen')}>
          <Image
            tintColor="#2B2B2E"
            source={require('./assets/close.png')}
            style={{height: 32, width: 32}}
          />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() =>
            navigation.navigate('PostScreen', {
              imageName: filePath.fileName,
              imagePath: filePath.uri,
              title: title,
              category: selectedRadio,
              clearStateTitle: setTitle,
              clearStatePath: setFilePath,
            })
          }>
          <View
            style={{
              padding: 6,
              backgroundColor: '#1CB7FC',
              borderRadius: 15,
            }}>
            <Image
              tintColor="#FAFAFC"
              source={require('./assets/forward.png')}
              style={{height: 36, width: 36}}
            />
          </View>
        </TouchableOpacity>
      </View>

      <View
        style={{
          margin: '2%',
        }}>
        <Text style={styles.header}>Title</Text>
      </View>
      <View style={{margin: '6%', marginTop: '2%'}}>
        <Text
          style={{alignSelf: 'flex-end', fontFamily: 'SF-Pro-Display-Medium'}}>
          {fieldLength}/55
        </Text>
        <TextInput
          style={styles.textInput}
          placeholder="Enter title"
          placeholderTextColor="#2B2B2E"
          multiline={true}
          numberOfLines={2}
          maxLength={55}
          autoCapitalize="words"
          onChangeText={userInput => {
            setTitle(userInput);
            setFieldLength(userInput.length);
          }}
          value={title}
        />
      </View>
      <View
        style={{
          margin: '2%',
        }}>
        <Text style={styles.header}>Select banner</Text>
      </View>

      <View
        style={{
          height: 220,
          width: '100%',
          backgroundColor: '#F2F4F5',
        }}>
        <Image
          style={{height: '100%', width: '100%'}}
          source={{uri: filePath.uri != {} ? filePath.uri : null}}
        />
        <TouchableOpacity
          onPress={() => chooseFile()}
          activeOpacity={0.9}
          style={{
            borderRadius: 20,
            alignSelf: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            paddingLeft: '2%',
            paddingRight: '2%',
            padding: '1%',
            top: '45%',
            backgroundColor: '#FAFAFC',
          }}>
          <Text
            style={{
              fontSize: 17,
              fontFamily: 'SF-Pro-Display-Regular',
              color: '#1CB8FE',
            }}>
            Choose Image
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          marginTop: '8%',
          margin: '2%',
        }}>
        <Text style={styles.header}>Specify category</Text>
        <View style={{margin: '4%'}}>
          <RadioButton setSelectedRadio={setSelectedRadio} />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: '2%',
    paddingLeft: '4%',
    color: '#98999B',
    fontFamily: 'SF-Pro-Display-Semibold',
    fontSize: 24,
  },
  textInput: {
    borderWidth: 1,
    color: '#2B2B2E',
    fontFamily: 'SF-Pro-Display-Medium',
    fontSize: 17.5,
    borderColor: 'rgba(0,0,0,0.1)',
    width: '100%',
    borderRadius: 10,
    paddingLeft: '3%',
    paddingRight: '3%',
    textAlignVertical: 'top',
  },
});
export default TitleScreen;
