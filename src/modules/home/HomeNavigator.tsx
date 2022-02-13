import {createStackNavigator} from '@react-navigation/stack';
import AdventuresNav from './UpcomingEvents';

import JoinPatrol from '../joinGroup/JoinPatrol';

import ChooseRole from '../joinGroup/ChooseRole';
import JoinTroop from '../joinGroup/JoinTroop';
import CreateTroop from '../joinGroup/components/CreateTroop';

const JoinAdditionalTroopStack = createStackNavigator();

const JoinAdditionalTroopStackNavigator = () => {
  return (
    <JoinAdditionalTroopStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <JoinAdditionalTroopStack.Screen
        name="ChooseRole"
        component={ChooseRole}
        initialParams={{
          nextView: 'JoinTroop',
        }}
      />
      <JoinAdditionalTroopStack.Screen
        name="JoinTroop"
        component={JoinTroop}
        initialParams={{
          nextView: 'JoinPatrol',
        }}
      />
      <JoinAdditionalTroopStack.Screen
        name="CreateTroop"
        component={CreateTroop}
        initialParams={{
          nextView: 'JoinPatrol',
        }}
      />
      <JoinAdditionalTroopStack.Screen
        name="JoinPatrol"
        component={JoinPatrol}
        initialParams={{
          shouldAddGroup: true,
        }}
      />
    </JoinAdditionalTroopStack.Navigator>
  );
};

const HomeStack = createStackNavigator();

export default function UpcomingEvents() {
  return (
    <HomeStack.Navigator
      screenOptions={() => ({
        title: 'ScoutTrek',
      })}
      initialRouteName="UpcomingEvents">
      <HomeStack.Screen name="Home" component={AdventuresNav} />
      <HomeStack.Screen
        name="Add Another Troop"
        component={JoinAdditionalTroopStackNavigator}
      />
    </HomeStack.Navigator>
  );
}
