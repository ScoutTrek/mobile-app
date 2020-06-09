import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {Ionicons} from '@expo/vector-icons';

import Colors from '../../constants/Colors';

const ShowChosenTimeRow = ({description, value, color, icon}) => {
  return (
    <View
      style={[
        styles.container,
        {backgroundColor: color ? color : Colors.lightGreen},
      ]}>
      <View style={{flex: 1}}>
        <Text style={styles.description}>{description}</Text>
        <View style={styles.middleContainer}>
          <Ionicons
            name={icon ? icon : 'md-watch'}
            color={Colors.brown}
            style={{paddingTop: 3}}
            size={25}
          />
          <Text
            numberOfLines={1}
            adjustsFontSizeToFit={true}
            ellipsizeMode="tail"
            style={styles.value}>
            {value}
          </Text>
        </View>
      </View>
      <TouchableOpacity style={styles.btnContainer}>
        <View style={styles.editBtn}>
          <Text style={styles.editBtnTxt}>Edit</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginTop: 10,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 4,
  },
  description: {
    fontFamily: 'oxygen-bold',
    fontSize: 12,
    paddingLeft: 3,
    color: Colors.darkBrown,
  },
  middleContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  value: {
    flex: 1,
    fontFamily: 'oxygen-bold',
    fontSize: 21,
    paddingHorizontal: 10,
  },
  editBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.brown,
    borderRadius: 4,
    padding: 6,
  },
  editBtnTxt: {
    color: '#fff',
    fontSize: 16,
    paddingTop: 2,
    paddingRight: 3,
    paddingBottom: 2,
    paddingLeft: 1,
  },
});

export default ShowChosenTimeRow;
