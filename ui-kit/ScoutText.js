import React from 'react';
import {Text} from 'react-native';
import Colors from '../constants/Colors';
import Fonts from '../constants/Fonts';

const presets = {
  micro: {fontSize: 10, fontFamily: Fonts.primaryText},
  base: {fontSize: 16, fontFamily: Fonts.primaryText},
  alt: {fontSize: 16, fontFamily: Fonts.headingBold},
  lg: {fontSize: 16, fontFamily: Fonts.primaryTextBold},
  heading: {fontSize: 20, fontFamily: Fonts.primaryTextBold},
  title: {fontSize: 26, fontFamily: Fonts.primaryText},
  'heading-alt': {fontSize: 20, fontFamily: Fonts.headingBlack},
  'title-alt': {fontSize: 26, fontFamily: Fonts.headingBold},
};

const colors = {
  brand: {color: Colors.green},
  base: {color: Colors.darkBrown},
  gray: {color: Colors.darkGray},
  white: {color: '#fff'},
};

const ScoutText = ({preset = 'base', color = 'base', children}) => {
  return <Text style={[presets[preset], colors[color]]}>{children}</Text>;
};

export default ScoutText;
