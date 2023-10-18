import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import useFetch from '../hooks/useFetch';
import {format} from 'date-fns';
import CircularProgress from 'react-native-circular-progress-indicator';

const Home = ({navigation}) => {
  const [midPoint, setMidPoint] = useState('movie');
  const [activeButon, setActiveButon] = useState('all');
  const {data, loading} = useFetch(`/${midPoint}/popular`);
  // console.log(JSON.stringify(data?.results));

  const renderItem = ({item, index}) => {
    const inputDate = item?.first_air_date || item?.release_date;
    const formattedDate = format(new Date(inputDate), 'MMMM dd, yyyy');

    return (
      <TouchableOpacity
        key={index}
        style={styles.card}
        onPress={() =>
          navigation.navigate('Details', {id: item?.id, category: midPoint})
        }>
        <Image
          style={styles.cardImage}
          source={{
            uri: `https://image.tmdb.org/t/p/original${item?.poster_path}`,
          }}
        />
        <View style={styles.rating}>
          <CircularProgress
            value={item?.vote_average}
            initialValue={item?.vote_average}
            radius={20}
            textColor="#000"
            maxValue={10}
            progressValueColor="black"
            activeStrokeWidth={5}
            activeStrokeColor="green"
            inActiveStrokeWidth={10}
            inActiveStrokeColor="white"
            inActiveStrokeOpacity={1}
            progressValueFontSize={14}
            circleBackgroundColor="white"
            // progressFormatter={v => {
            //   'worklet';
            //   return `${v.toFixed(1)}%`; // show percentage with 2 decimal places
            // }}
            strokeColorConfig={[
              {color: 'red', value: 0},
              {color: 'yellow', value: 3},
              {color: 'green', value: 8.5},
            ]}
          />
        </View>
        <View style={styles.CardTitleView}>
          <Text style={styles.cardText} numberOfLines={1} ellipsizeMode="tail">
            {midPoint === 'tv' ? item?.name : item?.title}
          </Text>
          <Text style={styles.cardDate}>{formattedDate}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView style={styles.contianer}>
      <StatusBar translucent backgroundColor={'rgba(0,0,0,0)'} />
      <ImageBackground
        source={{
          uri: 'https://m.media-amazon.com/images/I/51vj5okrsyL._AC_UF1000,1000_QL80_.jpg',
        }}
        style={styles.backgroundImg}>
        <LinearGradient
          colors={['rgba(0,0,0,0)', 'rgb(0,0,0)', 'rgba(0,0,0,1)']}
          style={styles.gradient}>
          <View style={styles.headerView}>
            <TouchableOpacity>
              <Image
                source={require('../images/movix-logo.png')}
                style={styles.menuIcons}
              />
            </TouchableOpacity>
            <View style={styles.logoView}>
              <Text style={styles.logotxt}>Criticall</Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Search');
              }}>
              <Image
                source={require('../images/search.png')}
                style={styles.searchIcon}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.mainView}>
            <View style={styles.categoryView}>
              <TouchableOpacity onPress={() => setMidPoint('movie')}>
                <Text
                  style={{color: 'white', fontSize: 16, fontWeight: 'bold'}}>
                  All
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setMidPoint('movie')}>
                <Text
                  style={{color: 'white', fontSize: 18, fontWeight: 'bold'}}>
                  Movies
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setMidPoint('tv')}>
                <Text
                  style={{color: 'white', fontSize: 16, fontWeight: 'bold'}}>
                  Tv Shows
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                borderBottomWidth: 1,
                borderColor: '#bababa',
                opacity: 0.5,
                marginHorizontal: 20,
              }}
            />
            <View style={styles.cardView}>
              <FlatList
                data={data?.results}
                keyExtractor={item => item.id}
                renderItem={renderItem}
                numColumns={2}
                showsVerticalScrollIndicator={false}
              />
            </View>
          </View>
        </LinearGradient>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  contianer: {
    flex: 1,
    backgroundColor: 'black',
  },
  backgroundImg: {
    flex: 1,
    color: 'transparent',
  },
  gradient: {
    flex: 1,
  },
  headerView: {
    width: '100%',
    height: '5%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 40,
    alignItems: 'center',
    // elevation: 10,
    // backgroundColor: 'green',
  },
  menuIcons: {
    width: 30,
    height: 30,
    // tintColor: 'white',
  },
  searchIcon: {
    width: 20,
    height: 20,
    tintColor: 'white',
  },
  logoView: {
    width: '40%',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 20,
  },
  logotxt: {
    color: 'white',
    letterSpacing: 2,
    fontSize: 18,
    fontWeight: 'bold',
  },
  mainView: {
    height: '90%',
    // backgroundColor: 'red',
  },
  categoryView: {
    height: '5%',
    paddingHorizontal: 20,
    flexDirection: 'row',
    gap: 20,
    alignItems: 'center',
  },
  buttonFocused: {
    fontSize: 18,
  },
  cardView: {
    // backgroundColor: 'red',
    height: '95%',
    paddingHorizontal: 10,
    marginTop: 10,
  },
  card: {
    width: '46%',
    marginLeft: 10,
    height: 300,
    marginBottom: 10,
    justifyContent: 'space-between',
  },
  cardImage: {
    width: '100%',
    height: '73%',
    objectFit: 'contain',
    borderRadius: 10,
  },
  CardTitleView: {
    // borderWidth: 1,
    // borderColor: 'white',
    height: '20%',
    // justifyContent: 'center',
    flexDirection: 'column',
  },
  cardText: {
    color: 'white',
    fontWeight: '400',
    fontSize: 16,
    textAlign: 'left',
  },
  cardDate: {
    color: '#bababa',
  },
  rating: {
    width: 40,
    height: 40,
    // backgroundColor: 'white',
    borderRadius: 100,
    position: 'absolute',
    bottom: 60,
    left: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
