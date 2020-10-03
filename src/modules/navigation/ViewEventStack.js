import {createStackNavigator} from '@react-navigation/stack';
import {ChatStack} from '../calendar/CalendarNav';
import * as React from 'react';

import AdventuresNav from '../home/UpcomingEvents';

import HikeView from '../calendar/hikeViews/HikeView';
import HikeStackNavigator from '../events/hike/HikeNavigator';

import BikeRideView from '../calendar/bikeRideViews/BikeRideView';
import BikeRideStackNavigator from '../events/bikeRide/BikeRideNavigator';

import CampoutView from '../calendar/campoutViews/CampoutView';
import CampoutStackNavigator from '../events/campout/CampoutNavigator';

import CanoeingView from '../calendar/canoeingViews/CanoeingView';
import CanoeingStackNavigator from '../events/canoeing/CanoeingNavigator';

import SummerCampView from '../calendar/summerCampViews/SummerCampView';
import SummerCampStackNavigator from '../events/summerCamp/SummerCampNavigator';

import AddTroopMeetingDetails from '../calendar/scoutMeetingViews/AddTroopMeetingDetails';
import TroopMeetingView from '../calendar/scoutMeetingViews/TroopMeetingView';
import TroopMeetingStackNavigator from '../events/meeting/TroopMeetingNavigator';

import SpecialEventView from '../calendar/specialEventViews/SpecialEventView';
import SpecialEventStackNavigator from '../events/specialEvent/SpecialEventNavigator';

const ViewEventStack = createStackNavigator();

const ViewEventStackNavigator = ({navigation}) => {
  return (
    <ViewEventStack.Navigator
      screenOptions={() => ({
        headerShown: false,
      })}>
      <ViewEventStack.Screen name="Home" component={AdventuresNav} />

      <ViewEventStack.Screen name="Hike" component={HikeView} />
      <ViewEventStack.Screen name="EditHike" component={HikeStackNavigator} />

      <ViewEventStack.Screen name="TroopMeeting" component={TroopMeetingView} />
      <ViewEventStack.Screen
        name="EditTroopMeeting"
        component={TroopMeetingStackNavigator}
      />
      <ViewEventStack.Screen
        name="AddTroopMeetingDescription"
        component={AddTroopMeetingDetails}
      />

      <ViewEventStack.Screen name="Campout" component={CampoutView} />
      <ViewEventStack.Screen
        name="EditCampout"
        component={CampoutStackNavigator}
      />

      <ViewEventStack.Screen name="BikeRide" component={BikeRideView} />
      <ViewEventStack.Screen
        name="EditBikeRide"
        component={BikeRideStackNavigator}
      />

      <ViewEventStack.Screen name="Canoeing" component={CanoeingView} />
      <ViewEventStack.Screen
        name="EditCanoeing"
        component={CanoeingStackNavigator}
      />

      <ViewEventStack.Screen name="SummerCamp" component={SummerCampView} />
      <ViewEventStack.Screen
        name="EditSummerCamp"
        component={SummerCampStackNavigator}
      />

      <ViewEventStack.Screen name="SpecialEvent" component={SpecialEventView} />
      <ViewEventStack.Screen
        name="EditSpecialEvent"
        component={SpecialEventStackNavigator}
      />

      <ViewEventStack.Screen name="EventThread" component={ChatStack} />
    </ViewEventStack.Navigator>
  );
};

export default ViewEventStackNavigator;
