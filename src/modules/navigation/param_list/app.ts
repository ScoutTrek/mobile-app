import { ParamListBase } from '@react-navigation/native';
import RouteNames from '../route_names/app';

export default interface ParamList extends ParamListBase {
  [RouteNames.authNav]: {};
  [RouteNames.home]: {};
}
