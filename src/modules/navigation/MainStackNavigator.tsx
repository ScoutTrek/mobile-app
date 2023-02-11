import { useApolloClient } from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  StackNavigationProp,
  StackScreenProps,
  createStackNavigator,
} from '@react-navigation/stack';
import useStore from 'src/stores/useStore';

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
import { AppStackParamList } from './types/appStack';
import { MainStackRoutes } from './types/mainStack';

export type MainStackParamList = {
  JoinGroup: undefined;
  Notifications: undefined;
  Main: undefined;
  CreateEvent: undefined;
  ViewEvent: undefined;
};

const MainStack = createStackNavigator<MainStackParamList>();

const MainStackNavigator = ({
  route,
}: StackScreenProps<AppStackParamList, 'Home'>) => {
  const isNewUser = useStore((s) => s.isNewUser);

  // const client = useApolloClient();
  // const {setToken} = useContext(AuthContext);
  // useEffect(() => {
  //   AsyncStorage.removeItem('userToken');
  //   AsyncStorage.removeItem('currMembershipID');
  //   setToken('');
  //   client.stop();
  //   client.clearStore();
  // }, []);

  return (
    <CreateEventFormProvider
      initialState={initialState}
      reducer={createEventFormReducer}
    >
      <MainStack.Navigator
        initialRouteName={
          isNewUser ? MainStackRoutes.joinGroup : MainStackRoutes.main
        }
        screenOptions={() => ({
          headerShown: false,
        })}
      >
        <MainStack.Screen
          name={MainStackRoutes.joinGroup}
          component={JoinGroupNavigator}
        />
        <MainStack.Screen
          name={MainStackRoutes.notifications}
          component={Notifications}
        />
        <MainStack.Screen
          name={MainStackRoutes.main}
          component={MainTabNavigator}
        />
        <MainStack.Screen
          name={MainStackRoutes.createEvent}
          component={CreateEvent}
        />
        <MainStack.Screen
          name={MainStackRoutes.viewEvent}
          component={ViewEvent}
        />
      </MainStack.Navigator>
    </CreateEventFormProvider>
  );
};

export default MainStackNavigator;
