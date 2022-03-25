import React, {useContext} from 'react';
import {LoginContext} from './Context/Context';
import {View, Image} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Profile from './Profile';
import Home from './Home';
import BookmarkScreen from './BookmarkScreen';
import SearchScreen from './SearchScreen';

const Tab = createBottomTabNavigator();

export default function TabsScreen() {
  const {user} = useContext(LoginContext);

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#2A292E',
        tabBarInactiveTintColor: '#C7C7C9',
        tabBarStyle: {
          backgroundColor: '#fafafc',
          paddingTop: '1%',
          height: 55,
          alignItems: 'center',
        },
        tabBarShowLabel: true,
        tabBarLabelStyle: {
          fontSize: 12,
          fontFamily: 'SF-Pro-Display-Regular',
        },
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => {
            const iconimg = focused
              ? require('./assets/home-7-fill.png')
              : require('./assets/home-7-fill.png');
            return (
              <View
                style={
                  focused
                    ? {
                        paddingVertical: '2%',
                        borderRadius: 15,
                        backgroundColor: '#e7e8e0',
                        paddingHorizontal: '24%',
                      }
                    : null
                }>
                <Image
                  tintColor={focused ? '#2A292E' : '#C7C7C9'}
                  source={iconimg}
                  style={{
                    height: 30,
                    width: 30,
                  }}
                />
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => {
            return (
              <View
                style={
                  focused
                    ? {
                        paddingVertical: '2%',
                        borderRadius: 15,
                        backgroundColor: '#e7e8e0',
                        paddingHorizontal: '24%',
                      }
                    : null
                }>
                <Image
                  tintColor={focused ? '#2A292E' : '#C7C7C9'}
                  source={require('./assets/search.png')}
                  style={{
                    height: 30,
                    width: 30,
                  }}
                />
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Bookmarks"
        component={BookmarkScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => {
            return (
              <View
                style={
                  focused
                    ? {
                        paddingVertical: '2%',
                        borderRadius: 15,
                        backgroundColor: '#e7e8e0',
                        paddingHorizontal: '24%',
                      }
                    : null
                }>
                <Image
                  tintColor={focused ? '#2A292E' : '#C7C7C9'}
                  source={require('./assets/Bookmark_fill.png')}
                  style={{
                    height: 30,
                    width: 30,
                  }}
                />
              </View>
            );
          },
        }}
      />

      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <View
              style={{
                borderRadius: 50,
                borderWidth: focused ? 1.9 : 0,
                borderColor: '#2A292E',
                padding: 2,
              }}>
              <Image
                source={{
                  uri: user.profilePhoto,
                }}
                style={{
                  height: 28,
                  width: 28,
                  borderRadius: 50,
                  backgroundColor: '#C7C7C9',
                }}
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}
