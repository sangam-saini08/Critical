import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import useFetch from '../hooks/useFetch';
import CircularProgress from 'react-native-circular-progress-indicator';

const Details = ({route, navigation}) => {
  const [poster, setPoster] = useState('');
  const [year, setYear] = useState('');
  const {id, category} = route.params;
  const {data, loading} = useFetch(`/${category}/${id}`);
  // console.log(JSON.stringify(data));
  React.useEffect(() => {
    setPoster(`https://image.tmdb.org/t/p/original${data?.poster_path}`);
    setYear(data?.release_date?.split('-')[0]);
  }, [data]);

  return (
    <View style={styles.mainview}>
      <ScrollView contentContainerStyle={styles.ScrollView}>
        <View style={styles.headerView}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={require('../images/back.png')}
              style={styles.backIcon}
            />
          </TouchableOpacity>
          <View style={styles.logoView}>
            <Image
              source={require('../images/movix-logo.png')}
              style={{width: 20, height: 20}}
            />
            <Text style={styles.logotxt}>{id}</Text>
          </View>
          <TouchableOpacity>
            <Image
              source={require('../images/search.png')}
              style={styles.searchIcon}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.posterImageView}>
          <Image
            source={{
              uri:
                poster ||
                'https://m.media-amazon.com/images/I/51vj5okrsyL._AC_UF1000,1000_QL80_.jpg',
            }}
            style={styles.posterImg}
          />
        </View>
        <Text style={styles.title}>{data?.title + ' (' + year + ')'}</Text>
        <Text style={styles.tagLine}>{data?.tagline}</Text>
        <View style={styles.ratingView}>
          <CircularProgress
            value={data?.vote_average || 0}
            radius={30}
            textColor="#000"
            maxValue={10}
            progressValueColor="white"
            activeStrokeWidth={6}
            inActiveStrokeWidth={2}
            inActiveStrokeColor="black"
            inActiveStrokeOpacity={1}
            progressValueFontSize={20}
            // circleBackgroundColor="white"
            strokeColorConfig={[
              {color: 'red', value: 0},
              {color: 'yellow', value: 5},
              {color: 'green', value: 10},
            ]}
          />
          <TouchableOpacity style={styles.playBtn}>
            <Image
              source={require('../images/playIcon.png')}
              style={styles.PlayIcon}
            />
            <Text style={{color: 'white', fontSize: 18, fontWeight: 'bold'}}>
              Watch Trailer
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.ScrollViewin}></View>
        <View style={styles.ScrollViewin}></View>
        <View style={styles.ScrollViewin}></View>
        <View style={styles.ScrollViewin}></View>
        <View style={styles.ScrollViewin}></View>
        <View style={styles.ScrollViewin}></View>
        <View style={styles.ScrollViewin}></View>
        <View style={styles.ScrollViewin}></View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainview: {
    flex: 1,
    backgroundColor: 'gray',
  },
  ScrollView: {},
  ScrollViewin: {
    backgroundColor: 'blue',
    height: 100,
    marginBottom: 10,
  },
  headerView: {
    width: '100%',
    height: '5%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 40,
    alignItems: 'center',
  },
  backIcon: {
    width: 30,
    height: 30,
    tintColor: 'white',
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
    flexDirection: 'row',
    gap: 5,
  },
  logotxt: {
    color: 'black',
    letterSpacing: 2,
    fontSize: 18,
    fontWeight: 'bold',
  },
  posterImageView: {
    width: '90%',
    height: 500,
    alignSelf: 'center',
    borderRadius: 20,
  },
  posterImg: {
    width: '100%',
    height: '100%',
    alignSelf: 'center',
    marginTop: 30,
    borderRadius: 20,
    resizeMode: 'contain',
  },
  title: {
    color: 'white',
    paddingHorizontal: 20,
    marginTop: 40,
    fontSize: 26,
    fontWeight: 'bold',
  },
  tagLine: {
    color: '#bababa',
    paddingHorizontal: 20,
    fontSize: 14,
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  ratingView: {
    height: '10%',
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginTop: 20,
    alignItems: 'center',
  },
  playBtn: {
    marginLeft: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },
  PlayIcon: {
    marginRight: 10,
    tintColor: 'white',
    width: 60,
    height: 60,
  },
});

export default Details;
