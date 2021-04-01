import React from 'react';
import {Text} from 'react-native';
import Fonts from '../../constants/Fonts';
import Colors from '../../constants/Colors';

export default ({data}) => (
  <Text
    style={{
      paddingHorizontal: 14,
      fontFamily: Fonts.primaryTextBold,
      color: Colors.darkGreen,
      fontSize: 16,
      marginVertical: 10,
    }}>
    {data}
  </Text>
);
