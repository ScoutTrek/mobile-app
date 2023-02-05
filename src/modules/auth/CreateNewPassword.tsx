import { StackScreenProps } from '@react-navigation/stack';
import {Alert} from 'react-native';
import { AuthStackParamList } from '../navigation/AuthNavigator';
import PasswordConfig from './components/PasswordConfig';
import { gql, useMutation } from '@apollo/client';

const RESET_PASSWORD = gql`
  mutation ResetPassword($input: ResetPasswordInput!) {
    resetPassword(input: $input) {
      id
    }
  }
`;

const CreateNewPasswordFormFields = [
  {
    name: 'token',
    rules: {
      required: 'Enter the token found in your email',
    },
    fieldAttributes: {
      placeholder: 'Token',
      autoCapitalize: 'none',
    },
  },{
    name: 'password',
    rules: {
      required: 'Enter a new password',
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
      required: 'Confirm password',
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

const CreateNewPassword = ({route, navigation}: StackScreenProps<AuthStackParamList, 'ResetPassword'>) => {
  const [reset_password] = useMutation(RESET_PASSWORD);

  const {email} = route.params;
  const onChangePassword = async (
    setSuccess: (success: boolean) => void,
    data: {token: string; password: string; passwordConfirm: string}
  ) => {
    if (data.password !== data.passwordConfirm) {
      Alert.alert(
        'Whoops, the passwords you entered do not match. Please re-enter passwords to confirm they match.'
      );
    } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(data.password)) {
      // regex pattern from https://stackoverflow.com/a/21456918
      Alert.alert(
        'Your password must contain at least one uppercase letter, one lowercase letter, one number and one special character.'
      );
    } else {
      const result = await reset_password({
        variables: {
          input: {
            email,
            token: data.token,
            password: data.password
          }
        },
      });

      if (result.data?.resetPassword) {
        setSuccess(true);
      } else {
        Alert.alert('Password could not be reset. Try again');
      }
    }
  };

  return (
    <PasswordConfig
      navigation={navigation}
      formTitle="Create New Password"
      formDescription="Your new password must be different from previous passwords. It must contain at least one uppercase letter, one lowercase letter, one number and one special character."
      formFields={CreateNewPasswordFormFields}
      handleSubmit={onChangePassword}
      successTitle="Success!"
      successDescription="Your password has been changed."
    />
  );
};

export default CreateNewPassword;
