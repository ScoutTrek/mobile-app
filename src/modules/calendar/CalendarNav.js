import React from 'react';
import {Button, View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

import CalendarView from './CalendarView';

import HikeView from './hikeViews/HikeView';
import EditHikeDetails from './hikeViews/EditHikeDetails';

import ScoutMeetingView from './scoutMeetingViews/ScoutMeetingView';
import EditScoutMeeting from './scoutMeetingViews/EditScoutMeetingDetails';

import CampoutView from './campoutViews/CampoutView';
import EditCampoutDetails from './campoutViews/EditCampoutDetails';

const CalendarStack = createStackNavigator();

function CalendarStackNavigator() {
  return (
    <CalendarStack.Navigator
      screenOptions={() => ({
        headerShown: false,
      })}>
      <CalendarStack.Screen name="Calendar" component={CalendarView} />

      <CalendarStack.Screen name="Hike" component={HikeView} />
      <CalendarStack.Screen name="EditHike" component={EditHikeDetails} />

      <CalendarStack.Screen name="ScoutMeeting" component={ScoutMeetingView} />
      <CalendarStack.Screen
        name="EditScoutMeeting"
        component={EditScoutMeeting}
      />

      <CalendarStack.Screen name="Campout" component={CampoutView} />
      <CalendarStack.Screen name="EditCampout" component={EditCampoutDetails} />
    </CalendarStack.Navigator>
  );
}

export default CalendarStackNavigator;
