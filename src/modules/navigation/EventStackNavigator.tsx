import { createStackNavigator } from '@react-navigation/stack';

import ViewEvents from '../createEvent/eventList/ViewEventsList';
import CreateEvent from '../createEvent/CreateEvent';
import { EventStackRoutes } from './types/eventStacks';

const EventStack = createStackNavigator();

const EventStackNavigator = () => {
  return (
    <EventStack.Navigator
      screenOptions={() => ({
        headerShown: false,
      })}
    >
      <EventStack.Screen
        name={EventStackRoutes.viewEventsList}
        component={ViewEvents}
      />
      <EventStack.Screen
        name={EventStackRoutes.eventForm}
        component={CreateEvent}
      />
    </EventStack.Navigator>
  );
};

export default EventStackNavigator;
