import {createStackNavigator} from '@react-navigation/stack';
import {JoinGroupFormProvider} from '../joinGroup/JoinGroupForm/JoinGroupFormStore';
import {
  initialState,
  joinGroupFormReducer,
} from '../joinGroup/JoinGroupForm/joinGroupFormReducer';

import JoinTroop from '../joinGroup/JoinTroop';
import CreateTroop from '../joinGroup/components/CreateTroop';
import AddChildren from '../joinGroup/AddChildren';
import ChooseRole from '../joinGroup/ChooseRole';
import JoinPatrol from '../joinGroup/JoinPatrol';
import { JoinGroupStackRoutes } from './types/joinGroupStack';

const JoinGroupStack = createStackNavigator();

const JoinGroupNavigator = () => {
  return (
    <JoinGroupFormProvider
      initialState={initialState}
      reducer={joinGroupFormReducer}>
      <JoinGroupStack.Navigator
        screenOptions={() => ({
          headerShown: false,
        })}>
        <JoinGroupStack.Screen name={JoinGroupStackRoutes.joinTroop} component={JoinTroop} />
        <JoinGroupStack.Screen name={JoinGroupStackRoutes.createTroop} component={CreateTroop} />
        <JoinGroupStack.Screen name={JoinGroupStackRoutes.chooseRole} component={ChooseRole} />
        <JoinGroupStack.Screen name={JoinGroupStackRoutes.addChildren} component={AddChildren} />
        <JoinGroupStack.Screen name={JoinGroupStackRoutes.joinPatrol} component={JoinPatrol} />
      </JoinGroupStack.Navigator>
    </JoinGroupFormProvider>
  );
};

export default JoinGroupNavigator;
