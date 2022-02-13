import {createStackNavigator} from '@react-navigation/stack';

import JoinGroupNavigator from './JoinGroupNavigator';
import ViewEvent from '../calendar/EventView';
import CreateEvent from './CreateEventNavigator';
import MainTabNavigator from './MainTabNavigator';

const MainStack = createStackNavigator();

type Props = {
  newUser: boolean;
};

const MainStackNavigator = ({newUser}: Props) => {
  return (
    <MainStack.Navigator
      initialRouteName={newUser ? 'JoinGroup' : 'Main'}
      screenOptions={() => ({
        headerShown: false,
      })}>
      <MainStack.Screen name="JoinGroup" component={JoinGroupNavigator} />
      <MainStack.Screen name="Main" component={MainTabNavigator} />
      <MainStack.Screen name="CreateEvent" component={CreateEvent} />
      <MainStack.Screen name="ViewEvent" component={ViewEvent} />
    </MainStack.Navigator>
  );
};

export default MainStackNavigator;
