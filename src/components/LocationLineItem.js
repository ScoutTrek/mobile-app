import React from 'react';
import {View, Text} from 'react-native';
import Fonts from '../../constants/Fonts';
import Colors from '../../constants/Colors';

const LocationLineItem = ({data}) => {
  return (
    <Text
      style={{
        paddingHorizontal: 14,
        fontFamily: Fonts.primaryTextBold,
        color: Colors.green,
        fontSize: 16,
        marginVertical: 10,
      }}>
      {data.address}
    </Text>
  );
};

export default LocationLineItem;
