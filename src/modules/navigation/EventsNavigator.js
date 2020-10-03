import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import EventsView from '../events/EventsView';
import HikeNavigator from '../events/hike/HikeNavigator';
import BikeRideNavigator from '../events/bikeRide/BikeRideNavigator'
import CanoeingNavigator from '../events/canoeing/CanoeingNavigator'
import TroopMeetingNavigator from '../events/meeting/TroopMeetingNavigator';
import CampoutNavigator from '../events/campout/CampoutNavigator';
import SummerCampNavigator from '../events/summerCamp/SummerCampNavigator'
import SpecialEventNavigator from '../events/specialEvent/SpecialEventNavigator'

const EventStack = createStackNavigator();

const EventStackNavigator = () => {
  return (
    <EventStack.Navigator
      screenOptions={() => ({
        headerShown: false,
      })}>
      <EventStack.Screen name="EventTypeList" component={EventsView} />
      <EventStack.Screen name="Hike" component={HikeNavigator} />
      <EventStack.Screen name="BikeRide" component={BikeRideNavigator} />
      <EventStack.Screen name="Canoeing" component={CanoeingNavigator} />
      <EventStack.Screen name="TroopMeeting" component={TroopMeetingNavigator} />
      <EventStack.Screen name="Campout" component={CampoutNavigator} />
      <EventStack.Screen name="SummerCamp" component={SummerCampNavigator} />
      <EventStack.Screen name="SpecialEvent" component={SpecialEventNavigator} />
    </EventStack.Navigator>
  );
};

export default EventStackNavigator;
