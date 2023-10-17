import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import React, {useState} from 'react';
import {TextInput} from 'react-native-gesture-handler';
import useFetch from '../hooks/useFetch';
import {format} from 'date-fns';
import CircularProgress from 'react-native-circular-progress-indicator';

const Search = ({navigation}) => {
  const [mediaName, setMediaName] = useState('');
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);

  const {data, loading} = useFetch(`/search/multi?query=${query}&page=${page}`);
  //   console.log(JSON.stringify(data));
  const handleSearch = () => {
    setQuery(mediaName);
  };

  const renderItem = ({item, index}) => {
    const inputDate =
      item?.first_air_date || item?.release_date || '1969-05-20';
    const formattedDate = format(new Date(inputDate), 'MMMM dd, yyyy');

    return (
      <TouchableOpacity
        key={index}
        style={styles.card}
        onPress={() =>
          navigation.navigate('Details', {
            id: item?.id,
            category: item?.media_type,
          })
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
            {item?.media_type === 'tv' ? item?.name : item?.title}
          </Text>
          <Text style={styles.cardDate}>{formattedDate}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
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
          <Text style={styles.logotxt}>Critical</Text>
        </View>
        <TouchableOpacity>
          <Image
            source={require('../images/search.png')}
            style={styles.searchIcon}
          />
        </TouchableOpacity>
      </View>

      {/* input viwe */}

      <View style={styles.inputView}>
        <TextInput
          style={styles.input}
          placeholder="Search here..."
          value={mediaName}
          onChangeText={txt => setMediaName(txt)}
        />
        <TouchableOpacity style={styles.inputSearchbtn} onPress={handleSearch}>
          <Text style={styles.inputSearchbtnTxt}>Search</Text>
        </TouchableOpacity>
      </View>

      <Text style={{marginHorizontal: 20, marginTop: 20}}>Result</Text>
      <View style={styles.border} />
      <View style={styles.cardView}>
        <FlatList
          data={data?.results}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          // onEndReached={() => setPage(page + 1)}
        />
      </View>
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#101035',
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
    color: 'white',
    letterSpacing: 2,
    fontSize: 18,
    fontWeight: 'bold',
  },
  inputView: {
    height: 50,
    width: '100%',
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    // backgroundColor: 'black',
    flexDirection: 'row',
  },
  input: {
    backgroundColor: '#087a7A',
    width: '70%',
    height: '100%',
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25,
    paddingHorizontal: 20,
  },
  inputSearchbtn: {
    width: '20%',
    backgroundColor: '#7393B3',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomRightRadius: 25,
    borderTopRightRadius: 25,
  },
  inputSearchbtnTxt: {
    color: 'white',
    fontWeight: 'bold',
    // fontSize: 16,
  },
  border: {
    marginHorizontal: 10,
    backgroundColor: 'gray',
    marginVertical: 10,
    height: 1,
    opacity: 0.5,
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
