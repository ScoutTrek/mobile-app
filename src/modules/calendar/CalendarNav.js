import React from 'react';
import {Button, View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

import CalendarView from './CalendarView';
import EventView from './ViewEvent';
import EditHikeDetails from './EditHikeDetails';

const CalendarStack = createStackNavigator();

function CalendarStackNavigator() {
  return (
    <CalendarStack.Navigator
      screenOptions={() => ({
        headerShown: false,
      })}>
      <CalendarStack.Screen name="Calendar" component={CalendarView} />
      <CalendarStack.Screen name="Event" component={EventView} />
      <CalendarStack.Screen name="EditEvent" component={EditHikeDetails} />
    </CalendarStack.Navigator>
  );
}

export default CalendarStackNavigator;
