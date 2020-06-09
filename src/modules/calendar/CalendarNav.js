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

import SummerCampView from './summerCampViews/SummerCampView';
import EditSummerCampView from './summerCampViews/EditSummerCampView';
import ChatModule from './EventThreads/ChatModule';

import {enableScreens} from 'react-native-screens';
import {createNativeStackNavigator} from 'react-native-screens/native-stack';

enableScreens();
const Stack = createNativeStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Notifications" component={Notifications} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Settings" component={Settings} />
    </Stack.Navigator>
  );
}

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

      <CalendarStack.Screen name="SummerCamp" component={SummerCampView} />
      <CalendarStack.Screen
        name="EditSummerCamp"
        component={EditSummerCampView}
      />

      <CalendarStack.Screen
        options={{
          tabBarVisible: false,
        }}
        name="EventThread"
        component={ChatModule}
      />
    </CalendarStack.Navigator>
  );
}

export default CalendarStackNavigator;
