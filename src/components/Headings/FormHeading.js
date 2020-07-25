import React from 'react';
import {Text, StyleSheet} from 'react-native';
import Colors from '../../../constants/Colors';
import Fonts from '../../../constants/Fonts';

const FormHeading = ({title, indented}) => {
  return (
    <Text style={[styles.formHeading, indented && {marginHorizontal: 0}]}>
      {title}
    </Text>
  );
};

const styles = StyleSheet.create({
  formHeading: {
    fontSize: 18,
    fontFamily: Fonts.headingBold,
    marginHorizontal: 22,
    marginTop: 3,
    marginBottom: 7,
  },
});

export default FormHeading;
