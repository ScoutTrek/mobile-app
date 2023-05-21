import { RouteProp } from '@react-navigation/native';
import ParamList from '../param_list/auth';
import RouteNames from '../route_names/auth';

export type SignUpRouteProp = RouteProp<ParamList, RouteNames.signUp>;
export type SignInRouteProp = RouteProp<ParamList, RouteNames.signIn>;
export type ForgotPasswordRouteProp = RouteProp<
  ParamList,
  RouteNames.forgotPassword
>;
export type ResetPasswordRouteProp = RouteProp<
  ParamList,
  RouteNames.resetPassword
>;
