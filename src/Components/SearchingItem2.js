import React from 'react';
import {View, Text, Image, TouchableOpacity, Dimensions} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const SearchingItem2 = ({item}) => {
  const navigation = useNavigation();

  return (
    <View
      style={{
        flexDirection: 'row',
        marginLeft: '5%',
        marginRight: '5%',
        margin: '1%',
        alignItems: 'center',
        backgroundColor: '#e7e8e0',
        borderRadius: 15,
        padding: '1.5%',

        // width: windowWidth / 1.1,
      }}>
      <View style={{width: '20%'}}>
        <Image
          source={{uri: item.photo}}
          style={{
            height: 70,
            width: 70,
            borderRadius: 15,
          }}
        />
      </View>
      <View
        style={{
          flexDirection: 'column',
          marginLeft: '3%',
          width: '80%',
        }}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() =>
            navigation.navigate('Blog', {
              item: item,
            })
          }>
          <Text
            style={{
              fontFamily: 'SF-Pro-Display-Medium',
              fontSize: 16,
              color: '#2b2b2e',
            }}>
            {item.title}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() =>
            navigation.navigate('Profile2', {
              author: item.email,
            })
          }>
          <Text
            style={{
              color: '#3e3f3f',
              fontFamily: 'SF-Pro-Display-Regular',
              fontSize: 15,
            }}>
            {item.username}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SearchingItem2;
