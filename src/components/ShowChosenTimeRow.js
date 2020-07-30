import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {Ionicons, MaterialIcons} from '@expo/vector-icons';

import Colors from '../../constants/Colors';
import Fonts from '../../constants/Fonts';

const ShowChosenTimeRow = ({
  small,
  location,
  description,
  value,
  color,
  icon,
  onPress,
}) => {
  return (
    <View
      style={[
        styles.container,
        {backgroundColor: color ? color : Colors.lightGreen},
      ]}>
      <View style={{flex: 1}}>
        <Text style={styles.description}>{description}</Text>
        <View style={styles.middleContainer}>
          {location ? (
            <MaterialIcons
              name="location-on"
              style={{paddingTop: 1}}
              size={23}
              color={Colors.brown}
            />
          ) : (
            <Ionicons
              name={icon ? icon : 'md-watch'}
              color={Colors.brown}
              style={{paddingTop: 1}}
              size={23}
            />
          )}

          <Text style={[styles.value, small && {fontSize: 16}]}>{value}</Text>
        </View>
      </View>
      <TouchableOpacity onPress={onPress} style={styles.btnContainer}>
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
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 4,
  },
  description: {
    fontFamily: Fonts.primaryTextBold,
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
    fontFamily: Fonts.headingBold,
    fontSize: 20,
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
