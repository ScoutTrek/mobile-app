import { StackScreenProps } from '@react-navigation/stack';
import { AuthStackParamList } from '../navigation/AuthNavigator';
import PasswordConfig from './components/PasswordConfig';
import { gql, useMutation } from '@apollo/client';

const REQUEST_RESET = gql`
  mutation RequestPasswordReset($email: String!) {
    requestPasswordReset(email: $email)
  }
`;

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

const ForgotPassword = ({
  navigation,
}: StackScreenProps<AuthStackParamList, 'ForgotPassword'>) => {
  const [request_reset] = useMutation(REQUEST_RESET);

  const onSubmitEmail = (
    setSuccess: (success: boolean) => void,
    data: { email: string }
  ) => {
    request_reset({
      variables: {
        email: data.email,
      },
    });
    navigation.navigate('ResetPassword', { email: data.email });
  };

  return (
    <PasswordConfig
      navigation={navigation}
      formTitle="Reset Password"
      formDescription="Enter the email associated with your account. We’ll send an email with a token to reset your password."
      formFields={ForgotPasswordFormFields}
      handleSubmit={onSubmitEmail}
      successTitle="Email Sent!"
      successDescription="Follow the instructions in the email to reset your password."
    />
  );
};

export default ForgotPassword;
