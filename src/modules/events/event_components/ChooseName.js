import React, {useState, useEffect} from 'react';
import {View, StyleSheet, KeyboardAvoidingView, Dimensions} from 'react-native';

import Constants from 'expo-constants';
import NextButton from '../../../components/buttons/NextButton';
import Input from '../../../components/formfields/Input';
import RichInputContainer from '../../../components/containers/RichInputContainer';

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
    <RichInputContainer icon="back" back={back}>
      <KeyboardAvoidingView
        style={{
          padding: 15,
          height: Dimensions.get('window').height * 0.8,
        }}>
        <View style={styles.input}>
          <Input
            value={name}
            autoCompleteType="off"
            autoFocus={false}
            autoCorrect={false}
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
    </RichInputContainer>
  );
};

const styles = StyleSheet.create({
  input: {
    flex: 1,
    flexDirection: 'row',
    marginTop: Dimensions.get('window').height / 10,
  },
});

export default ChooseName;
