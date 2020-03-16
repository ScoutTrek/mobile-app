import React from 'react';
import {View, StyleSheet, TextInput} from 'react-native';
import {Ionicons} from '@expo/vector-icons';

import Colors from '../../constants/Colors';

const SearchBar = ({navigation}) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        onFocus={() => navigation.navigate('Search')}
      />
      <Ionicons
        name="ios-search"
        color={Colors.primary}
        style={styles.searchIcon}
        size={23}
      />
      <Ionicons
        name="ios-mic"
        color={Colors.primary}
        style={styles.micIcon}
        size={23}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  searchBar: {
    width: '82%',
    paddingHorizontal: '12%',
    height: 44,
    padding: 5,
    borderColor: Colors.primary,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#ffffff',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 5,
  },
  searchIcon: {
    position: 'absolute',
    left: '14%',
    top: 10,
  },
  micIcon: {
    position: 'absolute',
    right: '14%',
    top: 10,
  },
});

export default SearchBar;
