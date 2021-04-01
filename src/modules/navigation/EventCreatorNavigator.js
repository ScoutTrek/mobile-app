import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import EventsView from '../events/EventsView';
import CreateEvent from '../events/createEvent/CreateEvent';

const EventStack = createStackNavigator();

const EventStackNavigator = () => {
  return (
    <EventStack.Navigator
      screenOptions={() => ({
        headerShown: false,
      })}>
      <EventStack.Screen name="EventTypeList" component={EventsView} />
      <EventStack.Screen name="CreateEvent" component={CreateEvent} />
    </EventStack.Navigator>
  );
};

export default EventStackNavigator;
