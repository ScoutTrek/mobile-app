import {Ionicons} from '@expo/vector-icons';
import Colors from '../../../constants/Colors';
import React from 'react';
import {StyleSheet} from 'react-native';

export default function CancelIcon({back, white}) {
  return (
    <Ionicons
      name="ios-close"
      color={white ? '#fff' : Colors.darkBrown}
      style={styles.cancelIcon}
      size={48}
      onPress={back}
    />
  );
}

const styles = StyleSheet.create({
  cancelIcon: {
    position: 'absolute',
    paddingHorizontal: 10,
    top: '1%',
    left: '2.5%',
    zIndex: 1,
  },
});
