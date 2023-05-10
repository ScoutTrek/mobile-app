import { RouteProp } from '@react-navigation/native';
import ParamList from '../param_list/main';
import RouteNames from '../route_names/main';

export type CreateEventNavigationProps = RouteProp<
  ParamList,
  RouteNames.createEvent
>;
export type MainNavigationProps = RouteProp<ParamList, RouteNames.main>;
export type ViewEventNavigationProps = RouteProp<
  ParamList,
  RouteNames.viewEvent
>;
export type NotificationsNavigationProps = RouteProp<
  ParamList,
  RouteNames.notifications
>;
export type JoinGroupNavigationProps = RouteProp<
  ParamList,
  RouteNames.joinGroup
>;
