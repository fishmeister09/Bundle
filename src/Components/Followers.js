import React from 'react';
import {View, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';

const Followers = ({articles, followers, following, votes}) => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        justifyContent: 'space-between',
        flexDirection: 'row',
        width: '100%',
        marginTop: '4%',
      }}>
      <View style={{alignItems: 'center', flexDirection: 'row'}}>
        <Text
          style={{
            color: '#2A292E',
            fontFamily: 'SF-Pro-Display-Bold',
            fontSize: 20,
          }}>
          {articles}
        </Text>
        <Text
          style={{
            color: 'rgba(0,0,0,0.7)',
            fontFamily: 'SF-Pro-Display-Regular',
            fontSize: 15,
            marginLeft: '4%',
          }}>
          articles
        </Text>
      </View>
      <TouchableOpacity
        onPress={() =>
          navigation.push('List', {
            header: 'followers',
            list: followers,
          })
        }
        style={{alignItems: 'center', flexDirection: 'row'}}>
        <Text
          style={{
            color: '#2A292E',
            fontFamily: 'SF-Pro-Display-Bold',
            fontSize: 20,
          }}>
          {followers.length}
        </Text>
        <Text
          style={{
            color: 'rgba(0,0,0,0.7)',
            fontFamily: 'SF-Pro-Display-Regular',
            fontSize: 15,
            marginLeft: '4%',
          }}>
          followers
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() =>
          navigation.push('List', {
            header: 'following',
            list: following,
          })
        }
        style={{alignItems: 'center', flexDirection: 'row'}}>
        <Text
          style={{
            color: '#2A292E',
            fontFamily: 'SF-Pro-Display-Bold',
            fontSize: 20,
          }}>
          {following.length}
        </Text>
        <Text
          style={{
            color: 'rgba(0,0,0,0.7)',
            fontFamily: 'SF-Pro-Display-Regular',
            fontSize: 15,
            marginLeft: '4%',
          }}>
          following
        </Text>
      </TouchableOpacity>
      <View style={{alignItems: 'center', flexDirection: 'row'}}>
        <Text
          style={{
            color: '#2A292E',
            fontFamily: 'SF-Pro-Display-Bold',
            fontSize: 20,
          }}>
          {votes}
        </Text>
        <Text
          style={{
            color: 'rgba(0,0,0,0.7)',
            fontFamily: 'SF-Pro-Display-Regular',
            fontSize: 15,
            marginLeft: '4%',
          }}>
          votes
        </Text>
      </View>
    </View>
  );
};

export default Followers;
