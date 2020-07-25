import React from 'react';
import {Text, StyleSheet, View} from 'react-native';

import {Fontisto, MaterialCommunityIcons} from '@expo/vector-icons';
import Colors from '../../../constants/Colors';
import Fonts from '../../../constants/Fonts';
import InfoRowSmall from '../LayoutComponents/InfoRowSmall';
import moment from 'moment';

const Time = ({time, text}) => {
  return (
    <View>
      <InfoRowSmall>
        <MaterialCommunityIcons
          style={styles.icon}
          name="clock"
          size={20}
          color={Colors.darkOrange}
        />

        <Text style={styles.time}>{moment(time).format('hh:mm A')}</Text>
        <Text style={styles.text}>{text}</Text>
      </InfoRowSmall>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    fontFamily: Fonts.primaryTextLight,
    marginLeft: 10,
  },
  time: {
    fontSize: 18,
    fontFamily: Fonts.headingBold,
    color: Colors.darkOrange,
  },
  icon: {
    paddingTop: 3,
    paddingRight: 12,
  },
});

export default Time;
