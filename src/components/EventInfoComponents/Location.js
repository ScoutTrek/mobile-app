import React from 'react';
import {Text, StyleSheet, View} from 'react-native';

import {Fontisto} from '@expo/vector-icons';
import Colors from '../../../constants/Colors';
import Fonts from '../../../constants/Fonts';
import InfoRowSmall from '../LayoutComponents/InfoRowSmall';

const Location = ({heading, address}) => {
  return (
    <View>
      <InfoRowSmall heading>
        <Text style={styles.titleSmall}>{heading}</Text>
      </InfoRowSmall>
      <InfoRowSmall>
        <Fontisto
          style={styles.icon}
          name="map-marker-alt"
          size={21}
          color={Colors.blue}
        />
        <Text style={styles.addressText}>{address}</Text>
      </InfoRowSmall>
    </View>
  );
};

const styles = StyleSheet.create({
  titleSmall: {
    fontFamily: Fonts.headingBold,
  },
  addressText: {
    fontSize: 18,
    fontFamily: Fonts.headingBold,
    color: Colors.blue,
  },
  icon: {
    paddingTop: 3,
    paddingRight: 15,
  },
});

export default Location;
