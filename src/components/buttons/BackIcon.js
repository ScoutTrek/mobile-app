import {Ionicons} from '@expo/vector-icons';
import Colors from '../../../constants/Colors';
import React from 'react';
import {StyleSheet} from 'react-native';

export default function BackIcon({back}) {
  return (
    <Ionicons
      name="ios-arrow-round-back"
      color={Colors.darkBrown}
      style={styles.backIcon}
      size={40}
      onPress={back}
    />
  );
}

const styles = StyleSheet.create({
  backIcon: {
    position: 'absolute',
    paddingHorizontal: 10,
    left: '2.5%',
    zIndex: 1,
  },
});
