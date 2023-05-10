import ParamList from '../param_list/event';
import RouteNames from '../route_names/event';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type EventFormNavigationProps = NativeStackNavigationProp<
  ParamList,
  RouteNames.eventForm
>;
export type ViewEventsListNavigationProps = NativeStackNavigationProp<
  ParamList,
  RouteNames.viewEventsList
>;
