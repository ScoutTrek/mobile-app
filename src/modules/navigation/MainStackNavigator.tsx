import {createStackNavigator} from '@react-navigation/stack';

import UpcomingEvents from '../home/UpcomingEvents';
import ViewEvent from '../calendar/EventView';
import CreateEvent from './CreateEventNavigator';
import MainTabNavigator from './MainTabNavigator';

const MainStack = createStackNavigator();

const MainStackNavigator = () => {
  return (
    <MainStack.Navigator
      screenOptions={() => ({
        headerShown: false,
      })}>
      <MainStack.Screen name="Main" component={MainTabNavigator} />
      <MainStack.Screen name="CreateEvent" component={CreateEvent} />

      <MainStack.Screen name="ViewEvent" component={ViewEvent} />
    </MainStack.Navigator>
  );
};

export default MainStackNavigator;
