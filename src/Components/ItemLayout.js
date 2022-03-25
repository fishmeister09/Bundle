import React from 'react';
import {Text, View, Image, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

export const HEIGHT = 110;

function ItemLayout({item}) {
  const navigation = useNavigation();

  return (
    <View
      key={item.key}
      style={{
        backgroundColor: '#FAFAFC',
        marginLeft: '6.5%',
        marginRight: '3.5%',
        paddingTop: '3%',
        paddingBottom: '1%',
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() =>
            navigation.navigate('Blog', {
              item: item,
            })
          }
          style={{
            width: '70%',
            flexDirection: 'column',
            height: 110,
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
          <View
            style={{
              alignItems: 'center',
              flexDirection: 'row',
              marginBottom: '8%',
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                color: '#5c6892',
                fontFamily: 'SF-Pro-Display-Medium',
                fontSize: 14,
                backgroundColor: '#e6ecff',
                padding: '0.5%',
                paddingHorizontal: '2%',
                borderRadius: 15,
              }}>
              {item.category}
            </Text>
            <Text
              style={{
                color: '#5E5D5E',
                fontFamily: 'SF-Pro-Display-Regular',
                fontSize: 14,
              }}>
              {item.date}
            </Text>
          </View>
        </TouchableOpacity>
        <View style={{width: 70, height: 70, marginRight: '3%'}}>
          <Image
            source={{uri: item.photo}}
            style={{
              height: '100%',
              width: '100%',
              borderRadius: 10,
            }}
          />
        </View>
      </View>
    </View>
  );
}

export default ItemLayout;
