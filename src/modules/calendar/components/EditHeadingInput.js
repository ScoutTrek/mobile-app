import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import Colors from '../../../../constants/Colors';
import Fonts from '../../../../constants/Fonts';

const EditHeadingInput = (props) => {
  const {disabled, heading} = props;

  return (
    <View>
      <Text style={styles.formHeading}>{heading}</Text>
      <TextInput
        {...props}
        editable={!disabled}
        style={!disabled ? styles.input : styles.disabledInput}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  formHeading: {
    borderColor: Colors.secondary,
    fontSize: 15,
    fontFamily: Fonts.primaryTextBold,
    marginHorizontal: 20,
    margin: 16,
  },
  input: {
    padding: 12,
    marginHorizontal: 15,
    borderRadius: 4,
    borderWidth: 1,
    flexDirection: 'row',
    flex: 1,
    fontSize: 15,
    fontFamily: Fonts.primaryText,
    backgroundColor: '#fff',
    textAlignVertical: 'center',
    borderColor: Colors.lightGray,
  },
  disabledInput: {
    padding: 12,
    marginHorizontal: 15,
    borderRadius: 7,
    borderWidth: 1,
    flexDirection: 'row',
    flex: 1,
    fontSize: 15,
    fontFamily: Fonts.primaryText,
    backgroundColor: Colors.tabIconDefault,
    borderBottomColor: Colors.tabIconDefault,
  },
});

export default EditHeadingInput;
