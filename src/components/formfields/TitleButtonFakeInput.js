import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  TextInput,
  StyleSheet,
} from 'react-native';
import Colors from '../../../constants/Colors';
import Fonts from '../../../constants/Fonts';
import {MaterialIcons} from '@expo/vector-icons';

const Input = ({value, heading, onPress, path}) => {
  return (
    <View style={styles.formControl}>
      <Text style={styles.label}>{heading}</Text>
      <TouchableOpacity onPress={onPress} style={styles.input}>
        <MaterialIcons
          name="title"
          size={22}
          style={{backgroundColor: Colors.darkGreen, padding: 7}}
          color="#fff"
        />
        <Text
          style={{
            fontFamily: Fonts.primaryText,
            fontSize: 15,
            marginHorizontal: 12,
            color: Colors.darkGreen,
          }}>
          What do you want to call your hike?
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  formControl: {
    flex: 1,
    marginHorizontal: 16,
  },
  label: {
    fontFamily: Fonts.primaryTextBold,
    color: Colors.darkGreen,
    fontSize: 18,
    marginVertical: 10,
  },
  input: {
    flexDirection: 'row',
    alignItems: 'center',
    fontSize: 16,
    borderRadius: 5.5,
    borderWidth: 2,
    borderColor: Colors.darkGreen,
    marginBottom: 10,
    overflow: 'hidden',
  },
});

export default Input;
