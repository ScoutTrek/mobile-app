import React from 'react';
import {
  KeyboardAvoidingView,
  Dimensions,
  Alert,
  Platform,
  ScrollView,
} from 'react-native';

import { Text, Form, Image } from 'ScoutDesign/library';
import { Ionicons } from '@expo/vector-icons';
import Footer from './components/Footer';

import useStore from '../../store';
import { useNavigation } from '@react-navigation/native';
import { SignUpNavigationProps } from '../navigation/navigation_props/auth';
import RouteNames from '../navigation/route_names/auth';

const SignUpFormFields = [
  {
    name: 'name',
    rules: {
      required: 'Please enter your first and last name',
    },
    fieldAttributes: {
      placeholder: 'First name & Last name',
      autoCapitalize: 'words',
    },
  },
  {
    name: 'email',
    rules: {
      required: 'Please enter an email',
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: "Looks like you didn't enter a valid email.",
      },
    },
    fieldAttributes: {
      placeholder: 'Email',
      autoCapitalize: 'none',
    },
  },
  {
    name: 'password',
    rules: {
      required: 'Please choose the password you would like to use',
      minLength: {
        value: 8,
        message: 'Your password should be at least 8 characters',
      },
    },
    fieldAttributes: {
      placeholder: 'Password',
      autoCapitalize: 'none',
      textContentType: 'newPassword',
      secureTextEntry: true,
    },
  },
  {
    name: 'passwordConfirm',
    rules: {
      required: 'Please confirm the password you typed above',
      minLength: {
        value: 8,
        message: 'Your password should be at least 8 characters',
      },
    },
    fieldAttributes: {
      placeholder: 'Confirm Password',
      autoCapitalize: 'none',
      textContentType: 'newPassword',
      secureTextEntry: true,
    },
  },
];

const SignUp = () => {
  const signUp = useStore((s) => s.signUp);

  const navigation = useNavigation<SignUpNavigationProps>();

  const onSubmit = async (data: any) => {
    const { name, email, password, passwordConfirm } = data;
    if (password !== passwordConfirm) {
      Alert.alert(
        'Whoops, the passwords you entered do not match.',
        'Please re-enter passwords to confirm they match.'
      );
    } else {
      await signUp({
        name,
        email,
        password,
        passwordConfirm,
      });
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        backgroundColor: '#fff',
        justifyContent: 'flex-end',
      }}
      keyboardShouldPersistTaps="handled">
      <Image
        accessibilityLabel="sign-up-background"
        placement="background"
        overlay="light"
        size={{
          height: Dimensions.get('window').height * 0.6,
        }}
        source={{
          uri: 'https://res.cloudinary.com/wow-your-client/image/upload/c_scale,w_1000/v1581475803/ScoutTrek/nurhadi-cahyono-3-gjm36-dYg-unsplash.jpg',
        }}
      />

      <KeyboardAvoidingView
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          paddingHorizontal: 12,
          marginBottom: 12,
        }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <Ionicons
          name="ios-compass"
          size={45}
          style={{ color: '#382B14', marginBottom: 12, textAlign: 'center' }}
        />
        <Text textAlign="center" preset="h2">
          Welcome to ScoutTrek!
        </Text>
        <Text
          textAlign="center"
          marginHorizontal="m"
          marginTop="xs"
          marginBottom="m">
          Spend less time planning and more time exploring.
        </Text>

        <Form
          formFields={SignUpFormFields}
          accessibilityLabel="signup-form"
          radius="l"
          borderColor="mediumGrey"
          backgroundColor="white"
          onSubmit={onSubmit}
          submitBtnText="Sign Up"
        />
        <Footer
          footerText="Already have an account?"
          btnType="Sign In"
          onPress={() => navigation.navigate(RouteNames.signIn.toString())}
        />
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default SignUp;
