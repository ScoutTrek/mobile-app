import React from 'react';
import {TouchableOpacity, View, Text, StyleSheet} from 'react-native';
import Colors from '../../../constants/Colors';
import Fonts from '../../../constants/Fonts';

const InlineButton = ({title, color, onPress, icon}) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.container]}>
      <View
        style={[
          styles.inner,
          !color
            ? {backgroundColor: Colors.darkBrown}
            : {backgroundColor: color},
        ]}>
        <Text style={styles.text}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    marginVertical: 4.5,
  },
  inner: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'baseline',
    borderRadius: 4,
    flexDirection: 'row',
  },
  text: {
    textAlign: 'center',
    color: '#fff',
    fontFamily: Fonts.primaryText,
    fontSize: 13,
  },
});

export default InlineButton;
