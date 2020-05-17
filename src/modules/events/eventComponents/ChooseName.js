import React, {useState, useEffect} from 'react';
import {View, StyleSheet, KeyboardAvoidingView} from 'react-native';

import Constants from 'expo-constants';
import NextButton from '../../../components/buttons/NextButton';
import Input from '../../../components/formfields/Input';

const ChooseName = ({navigation, route}) => {
  const {nextView, placeholder} = route.params;
  const [name, setName] = useState('');
  const [nameIsValid, setNameIsValid] = useState(false);

  const back = () => navigation.popToTop();
  const nextForm = () => {
    const navData = {
      name,
    };
    navigation.navigate(nextView, navData);
  };

  return (
    <KeyboardAvoidingView style={{flex: 1}} behavior="height">
      <View style={styles.container}>
        <Input
          value={name}
          onChangeText={(value) => {
            setName(value);
            if (name.length > 2) {
              setNameIsValid(true);
            } else {
              setNameIsValid(false);
            }
          }}
          heading={route.params.placeholder}
        />
      </View>
      {nameIsValid && (
        <NextButton
          text="Choose Location"
          iconName="ios-arrow-round-forward"
          onClick={nextForm}
        />
      )}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ChooseName;
