import React, {useState, useEffect, useContext} from 'react';
import {View, Text, FlatList, Image, TouchableOpacity} from 'react-native';
import SkeletonLoading from './Components/SkeletonLoading';
import firestore, {firebase} from '@react-native-firebase/firestore';
import {FlatListrender} from './Components/FlatListRender';

const CategoryBlog = ({route, navigation}) => {
  const {catog} = route.params;
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const readFunction = async () => {
    let subscriber = firestore()
      .collection('feeds')
      .where('category', '==', catog);

    subscriber.get().then(querySnapshot => {
      if (!querySnapshot.empty) {
        querySnapshot.forEach(documentSnapshot => {
          let feed = [];
          feed.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
          setData(feed);
          setLoader(false);
        });
      } else {
        setNotFound(true);
        setLoader(false);
      }
    });

    return () => subscriber();
  };

  useEffect(() => {
    readFunction();
  }, []);

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
              fontSize: 25,
            }}>
            {catog}
          </Text>
        </View>
        {loader ? (
          <View>
            <SkeletonLoading />
            <SkeletonLoading />
          </View>
        ) : null}
        {notFound ? (
          <View
            style={{
              alignSelf: 'center',
              alignItems: 'center',
              marginTop: '50%',
              marginBottom: '30%',
            }}>
            <Text
              style={{
                fontFamily: 'SF-Pro-Display-Bold',
                color: '#434343',
                fontSize: 20,
              }}>
              404
            </Text>
            <Text
              style={{
                fontFamily: 'SF-Pro-Display-Bold',
                color: '#666666',
                fontSize: 18,
              }}>
              Nothing Found!
            </Text>
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
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          backgroundColor: '#FAFAFC',
          padding: '5%',
          alignItems: 'center',
        }}>
        <TouchableOpacity activeOpacity={1} onPress={() => navigation.goBack()}>
          <Image
            tintColor="#2B2B2E"
            source={require('./assets/back.png')}
            style={{height: 32, width: 32}}
          />
        </TouchableOpacity>
      </View>
      <FlatList
        contentContainerStyle={{paddingBottom: '20%'}}
        data={data}
        showsVerticalScrollIndicator={false}
        renderItem={object => <FlatListrender item={object.item} />}
        ItemSeparatorComponent={() => (
          <View
            style={{
              backgroundColor: 'rgba(0,0,0,0.2)',
              width: '100%',
              alignSelf: 'center',
              marginBottom: '6%',
              marginTop: '6%',
              height: 1,
            }}
          />
        )}
        keyExtractor={item => item.key}
        ListHeaderComponent={header}
      />
    </View>
  );
};

export default CategoryBlog;
