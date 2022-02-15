import {createStackNavigator} from '@react-navigation/stack';

import JoinGroupNavigator from './JoinGroupNavigator';
import ViewEvent from '../viewEvent/ViewEvent';
import CreateEvent from './CreateEventNavigator';
import MainTabNavigator from './MainTabNavigator';

const MainStack = createStackNavigator();

const MainStackNavigator = ({route}) => {
  return (
    <MainStack.Navigator
      initialRouteName={route?.params?.newUser ? 'JoinGroup' : 'Main'}
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
