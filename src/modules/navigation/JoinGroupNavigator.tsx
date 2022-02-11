import {createStackNavigator} from '@react-navigation/stack';

import JoinTroop from '../joinGroup/JoinTroop';
import CreateTroop from '../joinGroup/components/CreateTroop.js';
import ChooseRole from '../joinGroup/ChooseRole';
import JoinPatrol from '../joinGroup/JoinPatrol';

const JoinGroupStack = createStackNavigator();

const JoinGroupNavigator = () => {
  return (
    <JoinGroupStack.Navigator
      screenOptions={() => ({
        headerShown: false,
      })}>
      <JoinGroupStack.Screen
        name="ChooseRole"
        component={ChooseRole}
        initialParams={{
          nextView: 'JoinTroop',
        }}
      />
      <JoinGroupStack.Screen
        name="JoinTroop"
        component={JoinTroop}
        initialParams={{
          nextView: 'JoinPatrol',
        }}
      />
      <JoinGroupStack.Screen
        name="CreateTroop"
        component={CreateTroop}
        initialParams={{
          nextView: 'JoinPatrol',
        }}
      />
      <JoinGroupStack.Screen name="JoinPatrol" component={JoinPatrol} />
    </JoinGroupStack.Navigator>
  );
};

export default JoinGroupNavigator;
