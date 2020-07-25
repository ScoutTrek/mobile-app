import React from 'react';
import {View} from 'react-native';
import Colors from '../../../constants/Colors';

const InfoRowSmall = ({children, heading}) => (
  <View
    style={{
      flexDirection: 'row',
      alignItems: 'center',
      paddingTop: 8,
      paddingBottom: heading ? 0 : 9,
      marginHorizontal: 15,
    }}>
    {children}
  </View>
);

export default InfoRowSmall;
