import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import ParamList from '../param_list/auth';
import RouteNames from '../route_names/auth';

export type SignUpNavigationProps = NativeStackNavigationProp<
  ParamList,
  RouteNames.signUp
>;

export type SignInNavigationProps = NativeStackNavigationProp<
  ParamList,
  RouteNames.signIn
>;

export type ForgotPasswordNavigationProps = NativeStackNavigationProp<
  ParamList,
  RouteNames.forgotPassword
>;

export type ResetPasswordNavigationProps = NativeStackNavigationProp<
  ParamList,
  RouteNames.resetPassword
>;
