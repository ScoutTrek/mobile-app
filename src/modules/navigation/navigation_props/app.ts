import ParamList from '../param_list/app';
import RouteNames from '../route_names/app';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type AuthNavNavigationProps = NativeStackNavigationProp<
  ParamList,
  RouteNames.authNav
>;
export type HomeNavigationProps = NativeStackNavigationProp<
  ParamList,
  RouteNames.home
>;
