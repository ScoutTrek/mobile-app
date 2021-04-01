import React from 'react';
import moment from 'moment';
import {Text} from 'react-native';
import Fonts from '../../constants/Fonts';
import Colors from '../../constants/Colors';

export default ({data, format}) => (
  <Text
    style={{
      marginLeft: 14,
      fontFamily: Fonts.primaryTextBold,
      color: Colors.darkGreen,
      fontSize: 16,
      marginVertical: 10,
    }}>
    {moment(data).format(format === 'time' ? 'h:mm a' : 'dddd, MMMM Do')}
  </Text>
);
