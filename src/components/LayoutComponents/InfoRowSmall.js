import React from 'react';
import {View} from 'react-native';

const InfoRowSmall = ({children, heading}) => (
  <View
    style={{
      flexDirection: 'row',
      alignItems: 'center',
      paddingTop: 8,
      paddingBottom: heading ? 0 : 15,
      marginHorizontal: 15,
    }}>
    {children}
  </View>
);

export default InfoRowSmall;
