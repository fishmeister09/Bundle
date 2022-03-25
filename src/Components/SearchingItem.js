import React from 'react';
import {View, Text, Image, TouchableOpacity, Animated} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const SearchingItem = ({item}) => {
  const navigation = useNavigation();
  const animatedButtonScale = new Animated.Value(1);

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() =>
        navigation.navigate('Profile2', {
          author: item.email,
        })
      }
      style={{
        flexDirection: 'row',
        marginLeft: '5%',
        marginRight: '5%',
        margin: '1%',
        alignItems: 'center',
        backgroundColor: '#e7e8e0',
        borderRadius: 15,
        padding: '1%',
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

export default SearchingItem;
