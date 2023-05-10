import { ParamListBase } from '@react-navigation/native';
import RouteNames from '../route_names/main';

export default interface ParamList extends ParamListBase {
  [RouteNames.createEvent]: {
    screen: string;
    params: {
      type: string;
      id: number;
      update: boolean;
    };
  };
  [RouteNames.joinGroup]: {};
  [RouteNames.main]: {};
  [RouteNames.notifications]: {};
  [RouteNames.viewEvent]: {
    currItem: any;
  };
}
