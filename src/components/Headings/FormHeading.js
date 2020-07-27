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
    fontSize: 17,
    fontFamily: Fonts.primaryTextBold,
    marginHorizontal: 20,
    marginBottom: 6,
    marginTop: 3,
  },
});

export default FormHeading;
