import {createStackNavigator} from '@react-navigation/stack';

import {
  initialState,
  createEventFormReducer,
} from '../createEvent/createEventForm/createEventFormReducer';
import {CreateEventFormProvider} from '../createEvent/createEventForm/CreateEventFormStore';

import JoinGroupNavigator from './JoinGroupNavigator';
import ViewEvent from '../viewEvent/ViewEvent';
import CreateEvent from './CreateEventNavigator';
import MainTabNavigator from './MainTabNavigator';
import Notifications from '../notifications/Notifications';

const MainStack = createStackNavigator();

const MainStackNavigator = ({route}) => {
  return (
    <CreateEventFormProvider
      initialState={initialState}
      reducer={createEventFormReducer}>
      <MainStack.Navigator
        initialRouteName={route?.params?.newUser ? 'JoinGroup' : 'Main'}
        screenOptions={() => ({
          headerShown: false,
        })}>
        <MainStack.Screen name="JoinGroup" component={JoinGroupNavigator} />
        <MainStack.Screen name="Notifications" component={Notifications} />
        <MainStack.Screen name="Main" component={MainTabNavigator} />
        <MainStack.Screen name="CreateEvent" component={CreateEvent} />
        <MainStack.Screen name="ViewEvent" component={ViewEvent} />
      </MainStack.Navigator>
    </CreateEventFormProvider>
  );
};

export default MainStackNavigator;
