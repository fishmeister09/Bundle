import React from 'react';
import {TouchableOpacity, Text, Image, Animated} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const TopUsers = ({item}) => {
  const animatedButtonScale = new Animated.Value(1);
  const navigation = useNavigation();

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

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      onPress={() =>
        navigation.navigate('Profile2', {
          author: item.email,
        })
      }
      style={{
        alignItems: 'center',

        margin: '2%',
        transform: [{scale: animatedButtonScale}],
      }}>
      <Image
        source={{uri: item.profilePhoto}}
        style={{height: 65, width: 65, borderRadius: 50}}
      />
      <Text style={{fontFamily: 'SF-Pro-Display-Regular', fontSize: 15}}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );
};

export default TopUsers;
