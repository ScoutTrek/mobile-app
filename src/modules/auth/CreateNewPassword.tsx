import { StackNavigationProps } from '@react-navigation/stack';
import {Alert} from 'react-native';
import { AuthStackParamList } from '../navigation/AuthNavigator';
import PasswordConfig from './components/PasswordConfig';

const CreateNewPasswordFormFields = [
  {
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

const CreateNewPassword = ({navigation}) => {

  const onChangePassword = (
    setSuccess: (success: boolean) => void,
    data: {password: String; passwordConfirm: String}
  ) => {
    if (data.password !== data.passwordConfirm) {
      Alert.alert(
        'Whoops, the passwords you entered do not match. Please re-enter passwords to confirm they match.'
      );
    } else {
      console.log('new password: ', data.password);
      setSuccess(true);
    }
  };

  return (
    <PasswordConfig
      navigation={navigation}
      formTitle="Create New Password"
      formDescription="Your new password must be different from previous passwords."
      formFields={CreateNewPasswordFormFields}
      handleSubmit={onChangePassword}
      successTitle="Success!"
      successDescription="Your password has been changed."
    />
  );
};

export default CreateNewPassword;
