import {createStackNavigator} from '@react-navigation/stack';
import {ChatStack} from '../calendar/CalendarNav';
import * as React from 'react';

import AdventuresNav from '../home/UpcomingEvents';

import EventView from '../calendar/EventView';
import CreateEvent from '../events/createEvent/CreateEvent';

const ViewEventStack = createStackNavigator();

const ViewEventStackNavigator = () => {
  return (
    <ViewEventStack.Navigator
      screenOptions={() => ({
        headerShown: false,
      })}>
      <ViewEventStack.Screen name="Home" component={AdventuresNav} />
      <ViewEventStack.Screen name="CreateEvent" component={CreateEvent} />

      <ViewEventStack.Screen name="Event" component={EventView} />

      <ViewEventStack.Screen name="Threads" component={ChatStack} />
    </ViewEventStack.Navigator>
  );
};

export default ViewEventStackNavigator;
