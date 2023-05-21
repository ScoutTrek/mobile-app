import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import ParamList from '../param_list/main';
import RouteNames from '../route_names/main';

export type CreateEventNavigationProps = NativeStackNavigationProp<
  ParamList,
  RouteNames.createEvent
>;
export type MainNavigationProps = NativeStackNavigationProp<
  ParamList,
  RouteNames.main
>;
export type ViewEventNavigationProps = NativeStackNavigationProp<
  ParamList,
  RouteNames.viewEvent
>;
export type NotificationsNavigationProps = NativeStackNavigationProp<
  ParamList,
  RouteNames.notifications
>;
export type JoinGroupNavigationProps = NativeStackNavigationProp<
  ParamList,
  RouteNames.joinGroup
>;
