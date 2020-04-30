import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import EventsView from '../events/EventsView';
import HikeNavigator from '../events/hike/HikeNavigator';
import ScoutMeetingNavigator from '../events/meeting/ScoutMeetingNavigator';
import CampoutNavigator from '../events/campout/CampoutNavigator';

const EventStack = createStackNavigator();

const EventStackNavigator = () => {
  return (
    <EventStack.Navigator
      screenOptions={() => ({
        headerShown: false,
      })}>
      <EventStack.Screen name="EventTypeList" component={EventsView} />
      <EventStack.Screen name="Hike" component={HikeNavigator} />
      <EventStack.Screen name="ScoutMeeting" component={ScoutMeetingNavigator} />
      <EventStack.Screen name="Campout" component={CampoutNavigator} />

    </EventStack.Navigator>
  );
};

export default EventStackNavigator;
