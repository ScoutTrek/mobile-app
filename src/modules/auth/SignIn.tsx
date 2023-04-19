import {
  KeyboardAvoidingView,
  Dimensions,
  Platform,
  ScrollView,
} from 'react-native';
import { Text, Form, Image } from 'ScoutDesign/library';

import Footer from './components/Footer';
import { useNavigation } from '@react-navigation/native';
import { SignInNavigationProps } from '../navigation/navigation_props/auth';
import useStore from '../../store';
import RouteNames from '../navigation/route_names/auth';

const SignInFormFields = [
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
      required: 'Please enter your password for this account',
      minLength: {
        value: 8,
        message: 'Your password is not long enough yet',
      },
    },
    fieldAttributes: {
      placeholder: 'Password',
      autoCapitalize: 'none',
      secureTextEntry: true,
    },
  },
];

const SignIn = () => {
  const login = useStore((s) => s.login);

  const navigation = useNavigation<SignInNavigationProps>();

  const handleSignIn = async (data: any) => {
    await login({
      userInfo: {
        email: data.email,
        password: data.password,
        expoNotificationToken: '',
      },
    });
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
          height: Dimensions.get('window').height * 0.8,
        }}
        source={{
          uri: 'https://res.cloudinary.com/wow-your-client/image/upload/v1581455286/ScoutTrek/adventure-alps-backpack_2x.png',
        }}
      />
      <KeyboardAvoidingView
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          paddingHorizontal: 12,
          marginBottom: 12,
        }}
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
        <Text marginBottom="m" textAlign="center" preset="h2">
          Welcome back!
        </Text>
        <Form
          formFields={SignInFormFields}
          accessibilityLabel="signup-form"
          radius="l"
          borderColor="mediumGrey"
          backgroundColor="white"
          onSubmit={handleSignIn}
          submitBtnText="Sign In"
        />
        <Text
          color="darkGrey"
          size="s"
          style={{
            width: '100%',
            paddingHorizontal: 12,
            paddingTop: 6,
            textAlign: 'right',
          }}
          onPress={() =>
            navigation.navigate(RouteNames.forgotPassword.toString())
          }>
          Forgot Password?
        </Text>
        <Footer
          footerText="Don&rsquo;t have an account?"
          btnType="Sign Up Now"
          onPress={() => navigation.navigate(RouteNames.signUp.toString())}
        />
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default SignIn;
