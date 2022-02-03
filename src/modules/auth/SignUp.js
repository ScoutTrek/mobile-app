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
  ScrollView,
} from 'react-native';
import Fonts from '../../../constants/Fonts';
import {Stack, TextInput} from 'ScoutDesign/library';
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
      passwordConfirm: '',
    },
    inputValidities: {
      name: false,
      email: false,
      password: false,
      passwordConfirm: false,
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
      formState.inputValues.password !== formState.inputValues.passwordConfirm
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
        passwordConfirm: formState.inputValues.passwordConfirm,
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
    if (inputIdentifier === 'passwordConfirm') {
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
    <ScrollView
      contentContainerStyle={{flex: 1, justifyContent: 'flex-end'}}
      style={{backgroundColor: '#fff'}}>
      <LinearGradient
        colors={['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 1)']}
        style={styles.gradientOverlay}
      />
      <View style={styles.jumboImage}>
        <Image
          style={{height: '100%'}}
          source={{
            uri: 'https://res.cloudinary.com/wow-your-client/image/upload/c_scale,w_1000/v1581475803/ScoutTrek/nurhadi-cahyono-3-gjm36-dYg-unsplash.jpg',
          }}
        />
      </View>

      <KeyboardAvoidingView
        style={styles.content}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <Ionicons
          name="ios-compass"
          size={45}
          style={{color: '#382B14', marginBottom: 18, textAlign: 'center'}}
        />
        <Text style={styles.heading}>Welcome to ScoutTrek!</Text>
        <Text style={styles.text}>
          Spend less time planning and more time exploring.
        </Text>
        {/* <AuthInput
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
                handleInputChange('passwordConfirm', value)
              }
              placeholder="Confirm Password"
              textContentType="newPassword"
              secureTextEntry={true}
            /> */}
        <Stack
          type="Pressable"
          accessibilityLabel="test-stack"
          radius="l"
          borderColor="mediumGrey"
          backgroundColor="white"
          everyItemProps={{
            backgroundColor: 'white',
            onValueChange: (value) => {},
          }}
          items={[
            {
              id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
              text: 'First and Last Name',
            },
            {
              id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
              text: 'Email Address',
            },
            {
              id: '58694a0f-3da1-471f-bd96-145571e29d72',
              text: 'Password',
            },
            {
              id: '58694a0f-3da1-471f-bd96-145571e29d73',
              text: 'Confirm Password',
            },
          ]}
          RenderItem={({item, onValueChange, ...rest}) => {
            return (
              <TextInput
                placeholder={item.text}
                valid={item?.valid}
                disabled={item?.disabled}
                error={item?.error}
                noStyles
                onValueChange={onValueChange}
                {...rest}
              />
            );
          }}
        />
        <GradientButton title="Sign Up" onPress={handleNext} />
      </KeyboardAvoidingView>
      <Footer
        footerText="Already have an account?"
        btnType="Sign In"
        onPress={() => navigation.navigate('SignIn')}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
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
  },
  content: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 12,
    paddingVertical: 7,
  },
});

export default SignUp;
