import React from 'react';
import {View, Image} from 'react-native';

const StarterComponent = () => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        alignSelf: 'center',
        transform: [{rotateX: '40deg'}, {rotateZ: '45deg'}],
      }}>
      <View style={{flexDirection: 'column', margin: '1%'}}>
        <View
          style={{
            height: 200,
            width: 80,
            backgroundColor: '#151515',
            borderRadius: 50,
            marginBottom: '5%',
            overflow: 'hidden',
          }}>
          <Image
            resizeMode="cover"
            style={{height: 200, width: 80}}
            source={require('../assets/starterImages/travel.jpg')}
          />
        </View>
        <View
          style={{
            backgroundColor: 'red',
            height: 200,
            width: 80,
            borderRadius: 50,
            marginBottom: '5%',
            overflow: 'hidden',
          }}>
          <Image
            resizeMode="cover"
            style={{height: 200, width: 80}}
            source={require('../assets/starterImages/health.jpg')}
          />
        </View>
      </View>
      <View style={{flexDirection: 'column', margin: '1%'}}>
        <View
          style={{
            backgroundColor: 'red',
            height: 250,
            width: 80,
            borderRadius: 50,
            marginBottom: '5%',
            overflow: 'hidden',
          }}>
          <Image
            resizeMode="cover"
            style={{height: 250, width: 90}}
            source={require('../assets/starterImages/books.jpg')}
          />
        </View>
        <View
          style={{
            backgroundColor: 'red',
            height: 200,
            width: 80,
            borderRadius: 50,
            marginBottom: '5%',
            overflow: 'hidden',
          }}>
          <Image
            resizeMode="cover"
            style={{height: 250, width: 80}}
            source={require('../assets/starterImages/music.jpg')}
          />
        </View>
        <View
          style={{
            backgroundColor: 'red',
            height: 200,
            width: 80,
            borderRadius: 50,
            marginBottom: '5%',
            overflow: 'hidden',
          }}>
          <Image
            resizeMode="cover"
            style={{height: 250, width: 80}}
            source={require('../assets/starterImages/sports.jpg')}
          />
        </View>
      </View>
      <View style={{flexDirection: 'column', margin: '1%'}}>
        <View
          style={{
            backgroundColor: 'red',
            height: 270,
            width: 80,
            borderRadius: 50,
            marginBottom: '5%',
            overflow: 'hidden',
          }}>
          <Image
            resizeMode="cover"
            style={{height: 270, width: 80}}
            source={require('../assets/starterImages/food.jpg')}
          />
        </View>
        <View
          style={{
            backgroundColor: 'red',
            height: 200,
            width: 80,
            borderRadius: 50,
            marginBottom: '5%',
            overflow: 'hidden',
          }}>
          <Image
            resizeMode="cover"
            style={{height: 250, width: 110}}
            source={require('../assets/starterImages/fashion.jpg')}
          />
        </View>
      </View>
    </View>
  );
};

export default StarterComponent;
