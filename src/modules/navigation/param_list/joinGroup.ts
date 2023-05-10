import { ParamListBase } from '@react-navigation/native';
import RouteNames from '../route_names/joinGroup';

export default interface ParamList extends ParamListBase {
  [RouteNames.addChildren]: {};
  [RouteNames.chooseRole]: {};
  [RouteNames.createTroop]: {};
  [RouteNames.joinPatrol]: {};
  [RouteNames.joinTroop]: {};
}
