import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import TabsScreen from './TabsScreen';
import PostScreen from './PostScreen';
import Settings from './Settings';
import Account from './Account';
import BugsScreen from './BugsScreen';
import TitleScreen from './TitleScreen';
import CategoryBlog from './CategoryBlog';
import SearchScreen from './SearchScreen';
import ListItem from './Components/ListItem';
import Blog from './Blog';
import Profile2 from './Profile2';
import Profile from './Profile';
import TopUsers from './Components/TopUsers';
import BookmarkScreen from './BookmarkScreen';
import List from './List';
import Home from './Home';

const Stack = createStackNavigator();

function HomeStack({navigation, route}) {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}>
        <Stack.Screen
          name="TabsScreen"
          component={TabsScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="PostScreen"
          component={PostScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Settings"
          component={Settings}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Blog"
          component={Blog}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Account"
          component={Account}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="List"
          component={List}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="BugsScreen"
          component={BugsScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="TitleScreen"
          component={TitleScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="TopUsers"
          component={TopUsers}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Bookmarks"
          component={BookmarkScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="SearchScreen"
          component={SearchScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ListItem"
          component={ListItem}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="CategoryBlog"
          component={CategoryBlog}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Bug"
          component={Blog}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Profile2"
          component={Profile2}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default HomeStack;
