import React from 'react';
import {TouchableOpacity, View, Text, StyleSheet} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import Colors from '../../../constants/Colors';
import Fonts from '../../../constants/Fonts';

const InlineButton = ({title, color, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
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
    marginVertical: 4.5,
  },
  inner: {
    paddingVertical: 3,
    paddingHorizontal: 9,
    borderRadius: 4,
  },
  text: {
    textAlign: 'center',
    color: '#fff',
    fontFamily: Fonts.primaryText,
    fontSize: 13,
  },
});

export default InlineButton;
