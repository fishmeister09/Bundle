import React from 'react';
import {Text, View, Image, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
export const HEIGHT = 86;

const ProfileFlatListRender = ({item}) => {
  const navigation = useNavigation();

  return (
    <View
      key={item.key}
      style={{
        backgroundColor: '#f2f3f0',
        marginLeft: '6.5%',
        marginRight: '6.5%',
        padding: '3%',
        borderRadius: 15,
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View style={{width: 60, height: 60}}>
          <Image
            source={{uri: item.photo}}
            style={{
              height: '100%',
              width: '100%',
              borderRadius: 10,
            }}
          />
        </View>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() =>
            navigation.navigate('Blog', {
              item: item,
            })
          }
          style={{
            width: '80%',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              color: '#2A292E',
              fontSize: 14,
              fontFamily: 'SF-Pro-Display-Bold',
            }}>
            {item.title}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProfileFlatListRender;
