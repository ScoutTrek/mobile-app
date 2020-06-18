import {Ionicons} from '@expo/vector-icons';
import Colors from '../../../constants/Colors';
import React from 'react';
import {StyleSheet} from 'react-native';

export default function CancelIcon({back}) {
  return (
    <Ionicons
      name="ios-close"
      color={Colors.darkBrown}
      style={styles.cancelIcon}
      size={40}
      onPress={back}
    />
  );
}

const styles = StyleSheet.create({
  cancelIcon: {
    position: 'absolute',
    paddingHorizontal: 10,
    left: '2.5%',
    zIndex: 1,
  },
});
