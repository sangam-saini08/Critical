import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {format} from 'date-fns';
import CircularProgress from 'react-native-circular-progress-indicator';

const Similar = ({data, loading, id, midPoint}) => {
  const navigation = useNavigation();

  //   console.log(JSON.stringify(data));
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{`Similar ${midPoint}`}</Text>
      <ScrollView showsHorizontalScrollIndicator={false} horizontal>
        {data?.results.map((item, index) => {
          const inputDate =
            item?.first_air_date || item?.release_date || '1999 - 09 - 09';
          const formattedDate = format(new Date(inputDate), 'MMMM dd, yyyy');
          return (
            <TouchableOpacity
              key={index}
              style={styles.card}
              onPress={() =>
                navigation.navigate('Details', {
                  id: item?.id,
                  category: midPoint,
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
                  progressFormatter={v => {
                    'worklet';
                    return `${v.toFixed(1)}%`; // show percentage with 2 decimal places
                  }}
                  strokeColorConfig={[
                    {color: 'red', value: 0},
                    {color: 'yellow', value: 3},
                    {color: 'green', value: 8.5},
                  ]}
                />
              </View>
              <View style={styles.CardTitleView}>
                <Text
                  style={styles.cardText}
                  numberOfLines={1}
                  ellipsizeMode="tail">
                  {midPoint === 'tv' ? item?.name : item?.title}
                </Text>
                <Text style={styles.cardDate}>{formattedDate}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default Similar;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    // backgroundColor: 'pink',
    flexDirection: 'column',
    gap: 30,
  },
  heading: {
    color: 'white',
    fontSize: 26,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  card: {
    width: 150,
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
