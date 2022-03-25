import React, {useRef, useState, useEffect} from 'react';
import {
  Animated,
  SafeAreaView,
  View,
  StatusBar,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import Header from './Components/Header';
import ListItem from './Components/ListItem';
import SearchingItem from './Components/SearchingItem';
import SearchingItem2 from './Components/SearchingItem2';

import TopUsers from './Components/TopUsers';
import generateData from './data';
import {getCloser} from './utils';
import firestore from '@react-native-firebase/firestore';
import TopUsersSkeleton from './Components/TopUsersSkeleton';

const {diffClamp} = Animated;
const headerHeight = 58 * 2;

const SearchScreen = ({navigation}) => {
  const [searching, setSearching] = useState({hideCatog: false, loader: false});
  const [SearchedData, setSearchedData] = useState([]);
  const [SearchedData2, setSearchedData2] = useState([]);
  const [Topusers, setTopusers] = useState([]);
  const [loader, setLoader] = useState(true);
  const ref = useRef(null);

  const readFunction = async () => {
    let feed = [];
    let subscriber = firestore()
      .collection('users')
      .orderBy('followers', 'desc');

    subscriber.get().then(querySnapshot => {
      querySnapshot.forEach(documentSnapshot => {
        feed.push({
          ...documentSnapshot.data(),
          key: documentSnapshot.id,
        });
        setTopusers(feed);
        setLoader(false);
      });
    });

    return () => subscriber();
  };

  useEffect(() => {
    readFunction();
  }, []);

  const scrollY = useRef(new Animated.Value(0));
  const scrollYClamped = diffClamp(scrollY.current, 0, headerHeight);

  const translateY = scrollYClamped.interpolate({
    inputRange: [0, headerHeight],
    outputRange: [0, -(headerHeight / 2)],
  });

  const translateYNumber = useRef();

  translateY.addListener(({value}) => {
    translateYNumber.current = value;
  });

  const handleScroll = Animated.event(
    [
      {
        nativeEvent: {
          contentOffset: {y: scrollY.current},
        },
      },
    ],
    {
      useNativeDriver: true,
    },
  );

  const handleSnap = ({nativeEvent}) => {
    const offsetY = nativeEvent.contentOffset.y;
    if (
      !(
        translateYNumber.current === 0 ||
        translateYNumber.current === -headerHeight / 2
      )
    ) {
      if (ref.current) {
        ref.current.scrollToOffset({
          offset:
            getCloser(translateYNumber.current, -headerHeight / 2, 0) ===
            -headerHeight / 2
              ? offsetY + headerHeight / 2
              : offsetY - headerHeight / 2,
        });
      }
    }
  };

  const header = () => {
    return (
      <View>
        <Text
          style={{
            padding: '2%',
            paddingLeft: '4%',
            color: '#1C1C1C',
            fontFamily: 'SF-Pro-Display-Semibold',
            fontSize: 16,
            backgroundColor: '#e7e8e0',
            borderRadius: 15,
            marginLeft: '2%',
            marginRight: '2%',
            marginBottom: '3%',
          }}>
          Top users
        </Text>
        <View
          style={{
            margin: '3%',
          }}>
          {loader ? (
            <View style={{flexDirection: 'row', width: '100%'}}>
              <TopUsersSkeleton />
            </View>
          ) : (
            <Animated.FlatList
              scrollEventThrottle={16}
              contentContainerStyle={{
                // paddingTop: headerHeight + headerHeight * 0.15,
                paddingBottom: '1%',
                // backgroundColor: 'red',
                width: '100%',
              }}
              // onScroll={handleScroll}
              // ref={ref}
              key={'-'}
              horizontal
              // onMomentumScrollEnd={handleSnap}
              data={Topusers}
              renderItem={object => <TopUsers item={object.item} />}
              keyExtractor={item => '-' + item.key}
            />
          )}

          {/* </TouchableOpacity> */}
        </View>

        <Text
          style={{
            padding: '2%',
            paddingLeft: '4%',
            color: '#1C1C1C',
            fontFamily: 'SF-Pro-Display-Semibold',
            fontSize: 16,
            backgroundColor: '#e7e8e0',
            borderRadius: 15,
            marginLeft: '2%',
            marginRight: '2%',
            marginBottom: '3%',
          }}>
          Browse by category
        </Text>
      </View>
    );
  };
  console.log(SearchedData2);

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View style={[styles.header, {transform: [{translateY}]}]}>
        <Header
          dataSetter={setSearchedData}
          dataSetter2={setSearchedData2}
          stateChanger={setSearching}
          {...{headerHeight}}
        />
      </Animated.View>

      {searching.hideCatog ? (
        <View>
          <Animated.FlatList
            scrollEventThrottle={16}
            contentContainerStyle={{
              paddingTop: headerHeight + headerHeight * 0.15,
              paddingBottom: '1%',
            }}
            onScroll={handleScroll}
            ref={ref}
            showsVerticalScrollIndicator={true}
            onMomentumScrollEnd={handleSnap}
            data={SearchedData}
            numColumns={1}
            key={'_'}
            ListHeaderComponent={
              SearchedData.length > 0 ? (
                <Text
                  style={{
                    paddingLeft: '3.5%',
                    fontFamily: 'SF-Pro-Display-Bold',
                    color: '#1c1c1c',
                    fontSize: 15,
                  }}>
                  Users
                </Text>
              ) : null
            }
            renderItem={object => <SearchingItem item={object.item} />}
            keyExtractor={item => '_' + item.username}
          />
          <Animated.FlatList
            scrollEventThrottle={16}
            contentContainerStyle={{
              paddingBottom: '1%',
            }}
            onScroll={handleScroll}
            ref={ref}
            showsVerticalScrollIndicator={true}
            onMomentumScrollEnd={handleSnap}
            data={SearchedData2}
            numColumns={1}
            key={'_@'}
            ListHeaderComponent={
              SearchedData2.length > 0 ? (
                <Text
                  style={{
                    paddingLeft: '3.5%',
                    fontFamily: 'SF-Pro-Display-Bold',
                    color: '#1c1c1c',
                    fontSize: 15,
                  }}>
                  Articles
                </Text>
              ) : null
            }
            renderItem={object => <SearchingItem2 item={object.item} />}
            keyExtractor={item => '#' + item.photo}
          />
        </View>
      ) : (
        <Animated.FlatList
          scrollEventThrottle={16}
          contentContainerStyle={{
            paddingTop: headerHeight + headerHeight * 0.15,
            paddingBottom: '1%',
            justifyContent: 'space-between',
          }}
          onScroll={handleScroll}
          ref={ref}
          key={'#'}
          numColumns={3}
          showsVerticalScrollIndicator={false}
          onMomentumScrollEnd={handleSnap}
          data={generateData}
          renderItem={object => <ListItem item={object.item} />}
          keyExtractor={item => '#' + item.imgPath}
          ListHeaderComponent={header}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    backgroundColor: '#f2f3f0',
    left: 0,
    right: 0,
    width: '100%',
    zIndex: 1,
  },
  subHeader: {
    height: headerHeight / 2,
    width: '100%',
    paddingHorizontal: 10,
  },
  container: {
    flex: 1,
    backgroundColor: '#f2f3f0',
  },
});

export default SearchScreen;
