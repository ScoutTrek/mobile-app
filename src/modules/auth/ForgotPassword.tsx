import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Dimensions,
  Platform,
  ScrollView,
} from 'react-native';
import {Text, Form, Image, Container} from 'ScoutDesign/library';

import Footer from './components/Footer';

const ForgotPasswordFormFields = [
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
  ];

const ForgotPassword = ({navigation}) => { // TODO: figure out typing
  
    const [emailSent, setEmailSent] = useState(false);
  
    const onSubmitEmail = (data: {email: String}) => {
        console.log("submitted email", data.email)
        setEmailSent(true);
    }

    return (
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          backgroundColor: '#fff',
          justifyContent: 'center',
        }}
        keyboardShouldPersistTaps="handled">
        {emailSent ? (
          <>
          <Container>
            <Text marginBottom="m" textAlign="center" preset="h2">
              Email Sent!
            </Text>
            <Text
              color="darkGrey"
              size="s"
              textAlign="center"
              style={{marginBottom: 60, fontSize: 16}}>
              Follow the instructions in the email to reset your password.
            </Text>
          </Container>
            
          </>
        ) : (
          <KeyboardAvoidingView
            style={{
              flex: 1,
              justifyContent: 'center',
              paddingHorizontal: 20,
            }}
            behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
            <Text marginBottom="m" textAlign="center" preset="h2">
              Reset Password
            </Text>
            <Text
              color="darkGrey"
              size="s"
              textAlign="center"
              style={{marginBottom: 60, fontSize: 16}}>
              Enter the email associated with your account. We’ll send an email
              with instructions to reset your password.
            </Text>
            <Form
              formFields={ForgotPasswordFormFields}
              accessibilityLabel="forgot-password-form"
              radius="l"
              borderColor="mediumGrey"
              backgroundColor="white"
              onSubmit={onSubmitEmail}
              submitBtnText="Reset Password"
            />
          </KeyboardAvoidingView>
        )}
      </ScrollView>
    );
  };
  
  export default ForgotPassword;