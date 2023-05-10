import { createStackNavigator } from '@react-navigation/stack';
import { JoinGroupFormProvider } from '../joinGroup/JoinGroupForm/JoinGroupFormStore';
import {
  initialState,
  joinGroupFormReducer,
} from '../joinGroup/JoinGroupForm/joinGroupFormReducer';

import JoinTroop from '../joinGroup/JoinTroop';
import CreateTroop from '../joinGroup/components/CreateTroop';
import AddChildren from '../joinGroup/AddChildren';
import ChooseRole from '../joinGroup/ChooseRole';
import JoinPatrol from '../joinGroup/JoinPatrol';
import RouteNames from './route_names/joinGroup';
import ParamList from './param_list/joinGroup';

const JoinGroupStack = createStackNavigator<ParamList>();

const JoinGroupNavigator = () => {
  return (
    <JoinGroupFormProvider
      initialState={initialState}
      reducer={joinGroupFormReducer}>
      <JoinGroupStack.Navigator
        screenOptions={() => ({
          headerShown: false,
        })}>
        <JoinGroupStack.Screen
          name={RouteNames.joinTroop}
          component={JoinTroop}
        />
        <JoinGroupStack.Screen
          name={RouteNames.createTroop}
          component={CreateTroop}
        />
        <JoinGroupStack.Screen
          name={RouteNames.chooseRole}
          component={ChooseRole}
        />
        <JoinGroupStack.Screen
          name={RouteNames.addChildren}
          component={AddChildren}
        />
        <JoinGroupStack.Screen
          name={RouteNames.joinPatrol}
          component={JoinPatrol}
        />
      </JoinGroupStack.Navigator>
    </JoinGroupFormProvider>
  );
};

export default JoinGroupNavigator;
