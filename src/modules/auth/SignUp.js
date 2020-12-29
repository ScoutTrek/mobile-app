import React, {useReducer} from 'react';
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Image,
  Dimensions,
  Alert,
  Platform,
} from 'react-native';
import Fonts from '../../../constants/Fonts';
import {Ionicons} from '@expo/vector-icons';
import AuthInput from './components/Input';
import Footer from './components/Footer';
import GradientButton from '../../components/buttons/GradientButton';
import {LinearGradient} from 'expo-linear-gradient';
import Constants from 'expo-constants/src/Constants';

export const formReducer = (state, action) => {
  if (action.type === 'UPDATE_INPUT_FIELD') {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value,
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid,
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      inputValues: updatedValues,
      inputValidities: updatedValidities,
      formIsValid: updatedFormIsValid,
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
    inputValidities: {
      name: false,
      email: false,
      password: false,
      confirmPassword: false,
    },
    formIsValid: false,
  });

  const handleNext = () => {
    const matchEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (formState.inputValues.password.length < 8) {
      Alert.alert(
        'Please enter a password with at least 8 characters.',
        'It is helpful to use one capital letter and one symbol.'
      );
    } else if (
      formState.inputValues.password !== formState.inputValues.confirmPassword
    ) {
      Alert.alert(
        'Whoops, the passwords you entered do not match.',
        'Please re-enter passwords to confirm they match.'
      );
    } else if (!matchEmail.test(formState.inputValues.email)) {
      Alert.alert(
        "Looks like you didn't enter a valid email.",
        'please make sure you put your full email address.'
      );
    } else if (formState.formIsValid) {
      const signUpData = {
        name: formState.inputValues.name,
        email: formState.inputValues.email,
        password: formState.inputValues.password,
        passwordConfirm: formState.inputValues.confirmPassword,
      };
      navigation.navigate(route.params.nextView, signUpData);
    } else {
      Alert.alert(
        "Whoops, we couldn't understand the form.",
        'please make sure you entered valid information.'
      );
    }
  };

  const handleInputChange = (inputIdentifier, value) => {
    let isValid = false;
    if (value.trim().length > 0) {
      isValid = true;
    }
    if (inputIdentifier === 'confirmPassword') {
      if (formState.inputValues.password.length < 8) {
        isValid = false;
      }
      if (value !== formState.inputValues.password) {
        isValid = false;
      }
    }

    dispatchFormChange({
      type: 'UPDATE_INPUT_FIELD',
      value: value,
      input: inputIdentifier,
      isValid,
    });
  };

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

        <KeyboardAvoidingView
          style={styles.content}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <AuthInput
            autoCapitalize="words"
            onInputChange={(value) => handleInputChange('name', value)}
            placeholder="First name & Last name"
          />
          <AuthInput
            autoCapitalize="none"
            onInputChange={(value) => handleInputChange('email', value)}
            placeholder="Email"
          />
          <AuthInput
            autoCapitalize="none"
            onInputChange={(value) => handleInputChange('password', value)}
            placeholder="Password"
            textContentType="newPassword"
            secureTextEntry={true}
          />
          <AuthInput
            autoCapitalize="none"
            onInputChange={(value) =>
              handleInputChange('confirmPassword', value)
            }
            placeholder="Confirm Password"
            textContentType="newPassword"
            secureTextEntry={true}
          />
          <GradientButton title="Sign Up" onPress={handleNext} />
        </KeyboardAvoidingView>
      </View>
      <Footer
        footerText="Already have an account?"
        btnType="Sign In"
        onPress={() => navigation.navigate('SignIn')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'flex-end',
    marginTop: Constants.statusBarHeight,
  },
  heading: {
    fontSize: 22,
    fontFamily: Fonts.primaryTextBold,
    textAlign: 'center',
    alignItems: 'center',
    fontWeight: '800',
    zIndex: 1,
    color: '#382B14',
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    fontFamily: Fonts.primaryText,
    padding: 22,
    color: '#241C0D',
  },
  gradientOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: Dimensions.get('window').height * 0.5,
  },
  jumboImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: Dimensions.get('window').height * 0.5,
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
  },
});

export default SignUp;
