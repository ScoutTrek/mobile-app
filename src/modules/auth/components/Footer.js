import React from 'react';
import {StyleSheet, TouchableWithoutFeedback, View, Text} from 'react-native';
import InlineButton from '../../../components/buttons/InlineButton';

const Footer = ({footerText, btnType, onPress}) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.footer}>
        <Text style={styles.footerText}>{footerText}</Text>
        <InlineButton title={btnType} onPress={onPress} />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    fontSize: 10,
    marginTop: 3,
    marginBottom: 12,
  },
  footerText: {
    fontFamily: 'oxygen',
    color: '#241C0D',
    fontSize: 14,
  },
});

export default Footer;
