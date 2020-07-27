import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import Colors from '../../../constants/Colors';
import Fonts from '../../../constants/Fonts';

const Input = (props) => {
  const {value, disabled, heading} = props;

  return (
    <View style={styles.formControl}>
      <Text style={styles.label}>{heading}</Text>
      <TextInput
        {...props}
        editable={!disabled}
        style={!disabled ? styles.input : styles.disabledInput}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  formControl: {
    width: '100%',
    marginBottom: 15,
  },
  label: {
    fontFamily: Fonts.primaryTextBold,
    textAlign: 'center',
    fontSize: 20,
    marginBottom: 28,
  },
  input: {
    padding: 18,
    fontSize: 18,
    borderTopRightRadius: 4,
    borderTopLeftRadius: 4,
    backgroundColor: '#fff',
    borderBottomWidth: 1.5,
    borderBottomColor: Colors.tabIconDefault,
  },
  disabledInput: {
    padding: 8,
    fontSize: 18,
    borderRadius: 4,
    backgroundColor: Colors.tabIconDefault,
    borderBottomWidth: 1.5,
    borderBottomColor: Colors.tabIconDefault,
  },
});

export default Input;
