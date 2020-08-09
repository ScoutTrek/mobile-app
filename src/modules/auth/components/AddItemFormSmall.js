import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {AntDesign} from '@expo/vector-icons';
import Colors from '../../../../constants/Colors';
import Fonts from '../../../../constants/Fonts';

const AddItemForm = ({
  value,
  setValue,
  isValid,
  setIsValid,
  onPress,
  heading,
  placeholder,
}) => {
  return (
    <View style={styles.createPatrolWidget}>
      <Text style={styles.patrolHeading}>{heading}</Text>
      <View style={{flexDirection: 'row'}}>
        <TextInput
          placeholder={placeholder}
          style={styles.patrolName}
          onChangeText={(value) => {
            setValue(value);
            if (value.length > 2) {
              setIsValid(true);
            } else {
              setIsValid(false);
            }
          }}
          value={value}
        />
        {isValid && (
          <TouchableOpacity onPress={onPress} style={styles.btnAddPatrol}>
            <Text style={styles.addPatrol}>
              Add <AntDesign name="plus" size={18} />
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  btnAddPatrol: {
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 6,
    marginRight: 7,
    borderRadius: 7,
    padding: 10,
    backgroundColor: Colors.lightGreen,
  },
  patrolName: {
    flex: 1,
    height: 48,
    backgroundColor: Colors.offWhite,
    fontSize: 16,
    padding: 12,
    margin: 6,
    marginLeft: 7,
    borderRadius: 5,
    borderColor: Colors.tabIconDefault,
    borderWidth: 1,
  },
  addPatrol: {
    fontSize: 18,
    fontFamily: Fonts.primaryTextBold,
  },
  patrolHeading: {
    padding: 10,
    fontSize: 18,
    fontFamily: Fonts.primaryTextBold,
  },
  createPatrolWidget: {
    width: '100%',
    borderColor: Colors.orange,
    borderWidth: 1,
    borderRadius: 7,
    marginTop: 30,
    marginBottom: 10,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AddItemForm;
