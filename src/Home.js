import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  Animated,
  FlatList,
  Image,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import SkeletonLoading from './Components/SkeletonLoading';
import firestore, {firebase} from '@react-native-firebase/firestore';
import {FlatListrender} from './Components/FlatListRender';
import {LoginContext} from './Context/Context';

const Home = ({navigation}) => {
  const {HomeState, SetHomeState} = useContext(LoginContext);
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(true);

  const readFunction = () => {
    const unsubscribe = firestore()
      .collection('feeds')
      .get()
      .then(querySnapshot => {
        let feed = [];
        querySnapshot.docs.forEach(documentSnapshot => {
          feed.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
          setData(feed);
          setLoader(false);
        });
      });

    return () => unsubscribe();
  };

  useEffect(() => {
    readFunction();
  }, [HomeState]);

  const header = () => {
    return (
      <View>
        <View
          style={{
            margin: '2%',
          }}>
          <Text
            style={{
              padding: '2%',
              paddingLeft: '4%',
              color: '#1C1C1C',
              fontFamily: 'SF-Pro-Display-Semibold',
              fontSize: 23,
            }}>
            Home
          </Text>
        </View>
        {loader ? (
          <View>
            <SkeletonLoading />
            <SkeletonLoading />
          </View>
        ) : null}
      </View>
    );
  };

  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: '#FAFAFC',
      }}>
      <StatusBar barStyle={'dark-content'} backgroundColor="#fafafc" />

      <Animated.FlatList
        contentContainerStyle={{
          paddingBottom: '25%',
        }}
        data={data}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        renderItem={object => <FlatListrender item={object.item} />}
        ItemSeparatorComponent={() => (
          <View
            style={{
              backgroundColor: 'rgba(0,0,0,0.2)',
              width: '100%',
              alignSelf: 'center',
              marginBottom: '4%',
              marginTop: '4%',
              height: 1,
            }}
          />
        )}
        keyExtractor={item => item.key}
        ListHeaderComponent={header}
        onRefresh={() => readFunction()}
        refreshing={loader}
      />

      <TouchableOpacity
        activeOpacity={1}
        onPress={() => navigation.navigate('TitleScreen')}
        style={{
          backgroundColor: '#e7e8e0',
          borderRadius: 15,
          right: '5%',
          position: 'absolute',
          padding: '2.4%',
          alignItems: 'center',
          bottom: '3%',
          justifyContent: 'center',
        }}>
        <Image
          source={require('./assets/newPost.png')}
          style={{
            height: 30,
            width: 30,
          }}
          tintColor="#1C1C1C"
        />
      </TouchableOpacity>
    </View>
  );
};

export default Home;
