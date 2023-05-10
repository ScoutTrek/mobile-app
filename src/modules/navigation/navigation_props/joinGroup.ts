import ParamList from '../param_list/joinGroup';
import RouteNames from '../route_names/joinGroup';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type AddChildrenNavigationProps = NativeStackNavigationProp<
  ParamList,
  RouteNames.addChildren
>;
export type ChooseRoleNavigationProps = NativeStackNavigationProp<
  ParamList,
  RouteNames.chooseRole
>;
export type CreateTroopNavigationProps = NativeStackNavigationProp<
  ParamList,
  RouteNames.createTroop
>;
export type JoinPatrolNavigationProps = NativeStackNavigationProp<
  ParamList,
  RouteNames.joinPatrol
>;
export type JoinTroopNavigationProps = NativeStackNavigationProp<
  ParamList,
  RouteNames.joinTroop
>;
