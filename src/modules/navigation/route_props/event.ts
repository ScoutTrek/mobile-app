import { RouteProp } from '@react-navigation/native';
import ParamList from '../param_list/event';
import RouteNames from '../route_names/event';

export type EventFormRouteProp = RouteProp<ParamList, RouteNames.eventForm>;
export type ViewEventsListRouteProp = RouteProp<
  ParamList,
  RouteNames.viewEventsList
>;
