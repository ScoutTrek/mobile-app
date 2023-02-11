import {
  ParamListBase,
  RouteProp,
  NavigationProp,
} from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export enum JoinGroupStackRoutes {
  joinTroop = 'JoinTroop',
  createTroop = 'CreateTroop',
  chooseRole = 'AddChildren',
  addChildren = 'ChooseRole',
  joinPatrol = 'JoinPatrol',
}

interface JoinGroupNavigationParamsList extends ParamListBase {
  [JoinGroupStackRoutes.joinTroop]: {};
  [JoinGroupStackRoutes.createTroop]: {};
  [JoinGroupStackRoutes.addChildren]: {};
  [JoinGroupStackRoutes.chooseRole]: {};
  [JoinGroupStackRoutes.joinPatrol]: {};
}

// Navigation Props
export type JoinTroopNavigationProp = NativeStackNavigationProp<
  JoinGroupNavigationParamsList,
  JoinGroupStackRoutes.joinTroop
>;

export type CreateTroopNavigationProp = NativeStackNavigationProp<
  JoinGroupNavigationParamsList,
  JoinGroupStackRoutes.createTroop
>;

export type AddChildrenNavigationProp = NativeStackNavigationProp<
  JoinGroupNavigationParamsList,
  JoinGroupStackRoutes.addChildren
>;

export type ChooseRoleNavigationProp = NativeStackNavigationProp<
  JoinGroupNavigationParamsList,
  JoinGroupStackRoutes.chooseRole
>;

export type JoinPatrolNavigationProp = NativeStackNavigationProp<
  JoinGroupNavigationParamsList,
  JoinGroupStackRoutes.joinPatrol
>;

// Route Props
export type JoinTroopRouteProp = RouteProp<
  JoinGroupNavigationParamsList,
  JoinGroupStackRoutes.joinTroop
>;

export type CreateTroopRouteProp = RouteProp<
  JoinGroupNavigationParamsList,
  JoinGroupStackRoutes.createTroop
>;

export type AddChildrenRouteProp = RouteProp<
  JoinGroupNavigationParamsList,
  JoinGroupStackRoutes.addChildren
>;

export type ChooseRoleRouteProp = RouteProp<
  JoinGroupNavigationParamsList,
  JoinGroupStackRoutes.chooseRole
>;

export type JoinPatrolRouteProp = RouteProp<
  JoinGroupNavigationParamsList,
  JoinGroupStackRoutes.joinPatrol
>;
