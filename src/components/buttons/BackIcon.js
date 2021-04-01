import {Ionicons} from '@expo/vector-icons';
import Colors from '../../../constants/Colors';
import React from 'react';
import {StyleSheet} from 'react-native';

export default function BackIcon({back, white}) {
  return (
    <Ionicons
      name="ios-chevron-back"
      color={white ? '#fff' : Colors.darkBrown}
      style={styles.backIcon}
      size={28}
      onPress={back}
    />
  );
}

const styles = StyleSheet.create({
  backIcon: {
    position: 'absolute',
    paddingHorizontal: 10,
    top: 5,
    left: '2%',
    zIndex: 1,
  },
});
