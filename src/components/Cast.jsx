import {StyleSheet, Text, View, Image, ScrollView} from 'react-native';
import React, {useState, useEffect} from 'react';
import Avatar from '../images/avatar.png';

const Cast = ({data, loading}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}> Top Cast</Text>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        horizontal
        contentContainerStyle={styles.Scroll}>
        {data?.map((item, index) => {
          return (
            !loading && (
              <View style={styles.cardView} key={index}>
                <View style={styles.cardImageView}>
                  <Image
                    style={styles.cardImage}
                    source={
                      item?.profile_path
                        ? {
                            uri: `https://image.tmdb.org/t/p/original${item?.profile_path}`,
                          }
                        : Avatar
                    }
                  />
                </View>
                <Text style={styles.name}>{item?.name}</Text>
                <Text style={styles.character}>{item?.character}</Text>
              </View>
            )
          );
        })}
      </ScrollView>
    </View>
  );
};

export default Cast;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    gap: 10,
  },
  heading: {
    color: 'white',
    fontSize: 26,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  FlatListView: {
    height: '80%',
    width: '100%',
    // backgroundColor: 'yellow',
  },
  cardView: {
    height: '100%',
    // backgroundColor: 'pink',
    width: 150,
    flexDirection: 'column',
    paddingTop: 10,
  },
  Scroll: {
    gap: 10,
  },
  cardImageView: {
    height: 130,
    width: 130,
    alignSelf: 'center',
    // borderRadius: 200,
    // backgroundColor: 'blue',
  },
  cardImage: {
    width: '100%',
    height: '100%',
    borderRadius: 200,
    resizeMode: 'contain',
  },
  name: {
    color: 'white',
    alignSelf: 'center',
    marginTop: 10,
    fontSize: 18,
  },
  character: {
    color: 'gray',
    alignSelf: 'center',
    fontSize: 16,
  },
});
