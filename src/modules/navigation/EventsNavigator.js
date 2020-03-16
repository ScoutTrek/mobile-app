import React from 'react'
import {createStackNavigator} from '@react-navigation/stack';

import EventsView from '../events/EventsView';
import HikeNavigator from '../events/hike/HikeNavigator';
// import ScoutMeetingNavigator from '../events/meeting/ScoutMeetingNavigator';

const EventStack = createStackNavigator();

const EventStackNavigator = () => {
  return (
    <EventStack.Navigator
      screenOptions={() => ({
        headerShown: false,
      })}>
      <EventStack.Screen name="EventTypeList" component={EventsView} />
      <EventStack.Screen name="Hike" component={HikeNavigator} />
{/*       <EventStack.Screen */}
{/*         name="Scout Meeting" */}
{/*         component={ScoutMeetingNavigator} */}
{/*       /> */}
    </EventStack.Navigator>
  );
};

export default EventStackNavigator;
