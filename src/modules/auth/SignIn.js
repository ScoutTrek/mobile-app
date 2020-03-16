import React, {useReducer, useState} from 'react';
import {
  Button,
  Image,
  Keyboard,
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Dimensions,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import Constants from 'expo-constants';
import {FontAwesome} from '@expo/vector-icons';
import {LinearGradient} from 'expo-linear-gradient';
import GradientButton from '../../components/buttons/GradientButton';
import InlineButton from '../../components/buttons/InlineButton';
import AuthInput from './components/Input';

import {useDispatch} from 'react-redux';
import * as AuthActions from '../../redux/auth/auth.actions';

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

const SignIn = ({navigation}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [secure, setSecure] = useState(false);
  const dispatch = useDispatch();

  const [formState, dispatchFormChange] = useReducer(formReducer, {
    inputValues: {
      email: '',
      password: '',
    },
  });

  const handleSignIn = async () => {
    setIsLoading(true);
    try {
      await dispatch(
        AuthActions.signIn(
          formState.inputValues.email,
          formState.inputValues.password
        )
      );
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
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
      <Image
        style={styles.jumboImage}
        source={{
          uri:
            'https://res.cloudinary.com/wow-your-client/image/upload/v1581455286/ScoutTrek/adventure-alps-backpack_2x.png',
        }}
      />

      <View style={styles.main}>
        <KeyboardAvoidingView
          style={styles.content}
          behavior="padding"
          keyboardVerticalOffset={15}>
          <View>
            <Text style={styles.heading}>Welcome back to Scout Trek</Text>
            <Text style={styles.text}>
              Your personal assistant for all the scouting activities you
              already do.
            </Text>
            <AuthInput
              autoCapitalize="none"
              onInputChange={value => handleInputChange('email', value)}
              placeholder="email"
              autoCompleteType="email"
            />
            <AuthInput
              autoCapitalize="none"
              onFocus={() => setSecure(true)}
              onInputChange={value => handleInputChange('password', value)}
              placeholder="password"
              textContentType="none"
              autoCompleteType="off"
              secureTextEntry={secure}
              blurOnSubmit={false}
              autoComplete={false}
            />

            <GradientButton
              title={isLoading ? `Loading...` : `Log In`}
              onPress={handleSignIn}
            />
          </View>
        </KeyboardAvoidingView>
      </View>
      <View style={styles.footer}>
        <Text style={styles.footerText}>Don&rsquo;t have an account?</Text>
        <InlineButton
          title="Sign Up Now"
          onPress={() => navigation.navigate('SignUp')}
        />
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
    fontSize: 25,
    fontFamily: 'oxygen-bold',
    textAlign: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
    zIndex: 1,
    color: '#382B14',
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    fontFamily: 'oxygen',
    padding: 22,
    color: '#382B14',
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
    paddingVertical: 10,
    marginBottom: 10,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    fontSize: 10,
    marginTop: 22,
    marginBottom: 28,
  },
  footerText: {
    fontFamily: 'oxygen',
    color: '#241C0D',
    fontSize: 14,
  },
});

export default SignIn;
