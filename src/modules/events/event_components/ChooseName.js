import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Dimensions, KeyboardAvoidingView} from 'react-native';

import Constants from 'expo-constants';
import NextButton from '../../../components/buttons/NextButton';
import Input from '../../../components/formfields/Input';
import Colors from '../../../../constants/Colors';
import {Ionicons} from '@expo/vector-icons';

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
        <Ionicons
          name="ios-arrow-back"
          color={Colors.darkBrown}
          style={styles.backIcon}
          size={25}
          onPress={back}
        />
        <View style={styles.input}>
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
    paddingHorizontal: 18,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    flexDirection: 'row',
    marginTop: Dimensions.get('window').height / 5,
  },
  backIcon: {
    paddingVertical: 10,
    paddingHorizontal: 13,
    position: 'absolute',
    left: '2%',
    top: 7.5,
  },
});

export default ChooseName;
