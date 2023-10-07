import {StyleSheet, Text, View, Image, ImageBackground} from 'react-native';
import React from 'react';

const SplashScreen = ({navigation}) => {
  React.useEffect(() => {
    setTimeout(() => {
      navigation.replace('Home');
    }, 1000);
  }, []);
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../images/background-Critcal.jpg')}
        resizeMode="cover"
        style={styles.imgback}>
        <Image
          source={require('../images/movix-logo.png')}
          style={styles.logoimg}
        />
        <Text style={styles.logotxt}>Critcall</Text>
        <Text style={styles.subtitle}>Millons of movie, TV Shows</Text>
      </ImageBackground>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  imgback: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.8,
  },
  logoimg: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  logotxt: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 30,
    letterSpacing: 3,
  },
  subtitle: {
    color: '#bababa',
  },
});
