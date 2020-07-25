import React from 'react';
import {TouchableOpacity, Text, View, StyleSheet} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import Colors from '../../../constants/Colors';
import Fonts from '../../../constants/Fonts';

const NextButton = ({text, color, iconName, onClick}) => {
  return (
    <TouchableOpacity
      onPress={onClick}
      style={
        color ? {...styles.nextBtn, backgroundColor: color} : styles.nextBtn
      }>
      <Text style={styles.text}>{text}</Text>
      <Ionicons size={35} name={iconName} color="white" style={{height: 35}} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  nextBtn: {
    backgroundColor: Colors.purple,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 42,
    borderRadius: 21,
    paddingHorizontal: 25,
    position: 'absolute',
    bottom: 24,
    right: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
  text: {
    color: '#ffffff',
    fontSize: 16,
    fontFamily: Fonts.primaryText,
    paddingRight: 15,
  },
});

export default NextButton;
