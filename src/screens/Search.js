import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React, {useState} from 'react';
import {TextInput} from 'react-native-gesture-handler';

const Search = ({navigation}) => {
  const [query, setQuery] = useState('mission');

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
          placeholder="Search.."
          value={query}
          onChangeText={txt => setQuery(txt)}
        />
        <TouchableOpacity style={styles.inputSearchbtn}>
          <Text style={styles.inputSearchbtnTxt}>Search</Text>
        </TouchableOpacity>
      </View>

      <Text style={{marginHorizontal: 20, marginTop: 20}}>Result</Text>
      <View style={styles.border} />
      <View style={styles.resultView}></View>
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
});
