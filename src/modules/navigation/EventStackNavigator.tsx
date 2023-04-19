import { createStackNavigator } from '@react-navigation/stack';

import CreateEvent from '../createEvent/CreateEvent';
import ViewEvents from '../createEvent/eventList/ViewEventsList';
import RouteNames from './route_names/event';
import ParamList from './param_list/event';

const EventStack = createStackNavigator<ParamList>();

const EventStackNavigator = () => {
  return (
    <EventStack.Navigator
      screenOptions={() => ({
        headerShown: false,
      })}>
      <EventStack.Screen
        name={RouteNames.viewEventsList}
        component={ViewEvents}
      />
      <EventStack.Screen name={RouteNames.eventForm} component={CreateEvent} />
    </EventStack.Navigator>
  );
};

export default EventStackNavigator;
