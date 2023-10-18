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
import Cast from '../components/Cast';
import Similar from '../components/Similar';

const Details = ({route, navigation}) => {
  const [poster, setPoster] = useState('');
  const [year, setYear] = useState('');
  const {id, category} = route.params;
  const {data, loading} = useFetch(`/${category}/${id}`);
  const {data: credits, loading: creditsLoading} = useFetch(
    `/${category}/${id}/credits`,
  );
  const {data: similar, loading: similarLoading} = useFetch(
    `/${category}/${id}/similar`,
  );
  const directors = credits?.crew?.filter(f => f.job === 'Director');
  const writers = credits?.crew?.filter(
    f => f.job === 'Screenplay' || f.job === 'Story' || f.job === 'Writer',
  );

  React.useEffect(() => {
    setPoster(`https://image.tmdb.org/t/p/original${data?.poster_path}`);
    setYear(data?.release_date?.split('-')[0]);
  }, [data]);

  return (
    <View style={styles.mainview}>
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
          <Text style={styles.logotxt}>{'Critical'}</Text>
        </View>
        <TouchableOpacity>
          <Image
            source={require('../images/search.png')}
            style={styles.searchIcon}
          />
        </TouchableOpacity>
      </View>
      <ScrollView
        contentContainerStyle={styles.ScrollView}
        showsVerticalScrollIndicator={false}>
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
        <View style={styles.overview}>
          <Text style={styles.overviewHeading}>Overview:</Text>
          <Text style={styles.overviewTxt}>{data?.overview}</Text>
        </View>
        <View style={styles.extraDeatilsView}>
          {/* left view */}
          <View>
            <Text style={{color: 'white', fontSize: 18}}>Status:</Text>
            <Text style={{color: 'gray'}}>{data?.status}</Text>
          </View>
          {/* Midlleview  */}
          <View>
            <Text style={{color: 'white', fontSize: 18}}>Release Date:</Text>
            <Text style={{color: 'gray'}}>{data?.release_date}</Text>
          </View>

          {/* RIghtviw  */}
          <View>
            <Text style={{color: 'white', fontSize: 18}}>Rntime:</Text>
            <Text style={{color: 'gray'}}>{`${data?.runtime} m`}</Text>
          </View>
        </View>
        {directors?.length > 0 && <View style={styles.border} />}
        <View style={styles.directorView}>
          {directors?.length > 0 && (
            <View style={styles.directorsMidView}>
              <Text style={{color: 'white', fontSize: 20, marginRight: 10}}>
                Directors:
              </Text>
              <Text
                style={{
                  color: 'gray',
                  fontSize: 18,
                }}>
                {directors.map(
                  (d, i) =>
                    `${d?.name} ${directors?.length - 1 !== i ? ', ' : ' '}`,
                )}
              </Text>
            </View>
          )}
        </View>
        <View style={styles.border} />
        <View style={styles.wirtterView}>
          {writers?.length > 0 && (
            <View style={styles.writterMidView}>
              <Text style={{color: 'white', fontSize: 20, marginRight: 10}}>
                Writers:
              </Text>
              <Text
                style={{
                  color: 'gray',
                  fontSize: 18,
                }}>
                {writers.map(
                  (w, i) =>
                    `${w?.name} ${writers?.length - 1 !== i ? ', ' : ' '}`,
                )}
              </Text>
            </View>
          )}
        </View>
        <View style={styles.castView}>
          <Cast data={credits?.cast} loading={creditsLoading} />
        </View>
        <View style={styles.smilarMovieView}>
          <Similar
            data={similar}
            loading={similarLoading}
            id={id}
            midPoint={category}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainview: {
    flex: 1,
    backgroundColor: '#101035',
  },
  ScrollView: {},
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
    color: 'white',
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
  overview: {
    backgroundColor: '#101035',
    // height: 200,
    marginBottom: 50,
    paddingHorizontal: 20,
  },
  overviewHeading: {
    color: 'white',
    fontSize: 26,
  },
  overviewTxt: {
    color: 'white',
    fontSize: 14,
    lineHeight: 20,
  },
  extraDeatilsView: {
    height: 50,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  border: {
    marginHorizontal: 10,
    backgroundColor: 'gray',
    marginVertical: 10,
    height: 1,
    opacity: 0.5,
  },
  directorView: {
    // height: 100,
    paddingHorizontal: 20,
    overflow: 'visible',
  },
  directorsMidView: {
    flexDirection: 'row',
    alignItems: 'center',
    // gap: 10,
    flexWrap: 'wrap',
    width: '100%',
  },
  wirtterView: {
    // height: 100,
    paddingHorizontal: 20,
    overflow: 'visible',
    marginBottom: 20,
  },
  writterMidView: {
    flexDirection: 'row',
    alignItems: 'center',
    // gap: 10,
    flexWrap: 'wrap',
    width: '100%',
  },
  castView: {
    height: 260,
    // backgroundColor: 'blue',
    paddingHorizontal: 20,
    marginTop: 10,
    marginBottom: 50,
  },
  smilarMovieView: {
    height: 400,
    // backgroundColor: 'blue',
    paddingHorizontal: 20,
    marginTop: 10,
    marginBottom: 100,
  },
});

export default Details;
