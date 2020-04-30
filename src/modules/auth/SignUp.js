import React, {useEffect, useReducer, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Image,
  Dimensions,
  AsyncStorage,
} from 'react-native';
import Constants from 'expo-constants';
import {Ionicons} from '@expo/vector-icons';
import AuthInput from './components/Input';
import GradientButton from '../../components/buttons/GradientButton';
import {LinearGradient} from 'expo-linear-gradient';
import InlineButton from '../../components/buttons/InlineButton';

const formReducer = (state, action) => {
  if (action.type === 'UPDATE_INPUT_FIELD') {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value,
    };
    return {
      inputValues: updatedValues,
    };
  }
};

const SignUp = ({navigation, route}) => {
  const [formState, dispatchFormChange] = useReducer(formReducer, {
    inputValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const handleNext = () => {
    const signUpData = {
      name: formState.inputValues.name,
      email: formState.inputValues.email,
      password: formState.inputValues.password,
      passwordConfirm: formState.inputValues.confirmPassword,
    };
    navigation.navigate(route.params.nextView, signUpData);
  };

  const handleInputChange = (inputIdentifier, value) =>
    dispatchFormChange({
      type: 'UPDATE_INPUT_FIELD',
      value: value,
      input: inputIdentifier,
    });

  return (
    <View style={styles.screen}>
      <LinearGradient
        colors={['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 1)']}
        style={styles.gradientOverlay}
      />
      <View style={styles.jumboImage}>
        <Image
          style={{height: '100%'}}
          source={{
            uri:
              'https://res.cloudinary.com/wow-your-client/image/upload/c_scale,w_1000/v1581475803/ScoutTrek/nurhadi-cahyono-3-gjm36-dYg-unsplash.jpg',
          }}
        />
      </View>

      <View style={styles.main}>
        <View style={styles.content}>
          <Ionicons
            name="ios-compass"
            size={45}
            style={{color: '#382B14', marginBottom: 18, textAlign: 'center'}}
          />
          <Text style={styles.heading}>Welcome to ScoutTrek.</Text>
          <Text style={styles.text}>
            Less time planning. More time exploring.
          </Text>
        </View>

        <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={5}>
          <View style={styles.content}>
            <AuthInput
              autoCapitalize="none"
              onInputChange={value => handleInputChange('name', value)}
              placeholder="Name"
            />
            <AuthInput
              autoCapitalize="none"
              onInputChange={value => handleInputChange('email', value)}
              placeholder="Email"
            />
            <AuthInput
              autoCapitalize="none"
              onInputChange={value => handleInputChange('password', value)}
              placeholder="Password"
              textContentType="newPassword"
              secureTextEntry={true}
            />
            <AuthInput
              autoCapitalize="none"
              onInputChange={value =>
                handleInputChange('confirmPassword', value)
              }
              placeholder="Confirm Password"
              textContentType="newPassword"
              secureTextEntry={true}
            />
            <GradientButton title="Sign Up" onPress={handleNext} />
          </View>
        </KeyboardAvoidingView>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Already have an account?</Text>
        <InlineButton title="Sign In" onPress={() => navigation.pop()} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'flex-end',
  },
  heading: {
    fontSize: 22,
    fontFamily: 'oxygen-bold',
    textAlign: 'center',
    alignItems: 'center',
    fontWeight: '800',
    zIndex: 1,
    color: '#382B14',
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    fontFamily: 'oxygen',
    padding: 22,
    color: '#241C0D',
  },
  gradientOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: Dimensions.get('window').height * 0.62,
  },
  jumboImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: Dimensions.get('window').height * 0.62,
    zIndex: -1,
  },
  main: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  content: {
    justifyContent: 'flex-end',
    paddingHorizontal: 12,
    paddingVertical: 7,
    marginBottom: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    fontSize: 10,
    marginTop: 8,
    marginBottom: 28,
  },
  footerText: {
    fontFamily: 'oxygen',
    color: '#241C0D',
    fontSize: 14,
  },
});

export default SignUp;
