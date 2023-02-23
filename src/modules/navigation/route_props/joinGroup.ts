import { RouteProp } from '@react-navigation/native';
import ParamList from '../param_list/joinGroup';
import RouteNames from '../route_names/joinGroup';

export type AddChildrenRouteProp = RouteProp<ParamList, RouteNames.addChildren>;
export type ChooseRoleRouteProp = RouteProp<ParamList, RouteNames.chooseRole>;
export type CreateTroopRouteProp = RouteProp<ParamList, RouteNames.createTroop>;
export type JoinPatrolRouteProp = RouteProp<ParamList, RouteNames.joinPatrol>;
export type JoinTroopRouteProp = RouteProp<ParamList, RouteNames.joinTroop>;
