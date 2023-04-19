import { RouteProp } from '@react-navigation/native';
import ParamList from '../param_list/app';
import RouteNames from '../route_names/app';

export type AuthNavRouteProp = RouteProp<ParamList, RouteNames.authNav>;
export type HomeRouteProp = RouteProp<ParamList, RouteNames.home>;
