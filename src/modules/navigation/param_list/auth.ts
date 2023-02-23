import { ParamListBase } from '@react-navigation/native';
import RouteNames from '../route_names/auth';

export default interface ParamList extends ParamListBase {
  [RouteNames.signUp]: {};
  [RouteNames.signIn]: {};
  [RouteNames.forgotPassword]: {};
  [RouteNames.resetPassword]: {};
}
