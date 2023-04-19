import {
  StackScreenProps,
  createStackNavigator,
} from '@react-navigation/stack';

import useStore from '../../../src/store';
import { CreateEventFormProvider } from '../createEvent/createEventForm/CreateEventFormStore';
import {
  createEventFormReducer,
  initialState,
} from '../createEvent/createEventForm/createEventFormReducer';
import Notifications from '../notifications/Notifications';
import ViewEvent from '../viewEvent/ViewEvent';
import CreateEvent from './EventStackNavigator';
import JoinGroupNavigator from './JoinGroupNavigator';
import MainTabNavigator from './MainTabNavigator';
import ParamList from './param_list/main';
import RouteNames from './route_names/main';

const MainStack = createStackNavigator<ParamList>();

const MainStackNavigator = () => {
  const isNewUser = useStore((s) => s.isNewUser);

  return (
    <CreateEventFormProvider
      initialState={initialState}
      reducer={createEventFormReducer}>
      <MainStack.Navigator
        initialRouteName={isNewUser ? RouteNames.joinGroup : RouteNames.main}
        screenOptions={() => ({
          headerShown: false,
        })}>
        <MainStack.Screen
          name={RouteNames.joinGroup}
          component={JoinGroupNavigator}
        />
        <MainStack.Screen
          name={RouteNames.notifications}
          component={Notifications}
        />
        <MainStack.Screen name={RouteNames.main} component={MainTabNavigator} />
        <MainStack.Screen
          name={RouteNames.createEvent}
          component={CreateEvent}
        />
        <MainStack.Screen name={RouteNames.viewEvent} component={ViewEvent} />
      </MainStack.Navigator>
    </CreateEventFormProvider>
  );
};

export default MainStackNavigator;
