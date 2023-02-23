import { ParamListBase } from '@react-navigation/native';
import RouteNames from '../route_names/event';

export default interface ParamList extends ParamListBase {
  [RouteNames.eventForm]: {};
  [RouteNames.viewEventsList]: {};
}
