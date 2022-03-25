import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const FollowersList = ({item}) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      key={item.key}
      activeOpacity={1}
      onPress={() =>
        navigation.navigate('Profile2', {
          author: item.email,
        })
      }
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f2f3f0',
        borderRadius: 15,
        padding: '1%',
        width: '100%',
        marginBottom: '2%',
      }}>
      <Image
        source={{uri: item.profilePhoto}}
        style={{
          height: 50,
          width: 50,
          borderRadius: 50,
        }}
      />
      <View style={{flexDirection: 'column', marginLeft: '3%'}}>
        <Text
          style={{
            fontFamily: 'SF-Pro-Display-Medium',
            fontSize: 16,
            color: '#2b2b2e',
          }}>
          {item.name}
        </Text>
        <Text
          style={{
            color: '#3e3f3f',
            fontFamily: 'SF-Pro-Display-Regular',
            fontSize: 15,
          }}>
          {item.username}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default FollowersList;
