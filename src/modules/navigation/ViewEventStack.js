import {createStackNavigator} from '@react-navigation/stack';
import {AntDesign} from '@expo/vector-icons';
import AdventuresNav from '../home/UpcomingEvents';
import HikeView from '../calendar/hikeViews/HikeView';
import EditHikeDetails from '../calendar/hikeViews/EditHikeDetails';
import ScoutMeetingView from '../calendar/scoutMeetingViews/ScoutMeetingView';
import EditScoutMeeting from '../calendar/scoutMeetingViews/EditScoutMeetingDetails';
import CampoutView from '../calendar/campoutViews/CampoutView';
import EditCampoutDetails from '../calendar/campoutViews/EditCampoutDetails';
import SummerCampView from '../calendar/summerCampViews/SummerCampView';
import EditSummerCampView from '../calendar/summerCampViews/EditSummerCampView';
import {ChatStack} from '../calendar/CalendarNav';
import * as React from 'react';

const ViewEventStack = createStackNavigator();

const ViewEventStackNavigator = ({navigation}) => {
  return (
    <ViewEventStack.Navigator
      screenOptions={() => ({
        headerShown: false,
      })}>
      <ViewEventStack.Screen name="Home" component={AdventuresNav} />

      <ViewEventStack.Screen name="Hike" component={HikeView} />
      <ViewEventStack.Screen name="EditHike" component={EditHikeDetails} />

      <ViewEventStack.Screen name="ScoutMeeting" component={ScoutMeetingView} />
      <ViewEventStack.Screen
        name="EditScoutMeeting"
        component={EditScoutMeeting}
      />

      <ViewEventStack.Screen name="Campout" component={CampoutView} />
      <ViewEventStack.Screen
        name="EditCampout"
        component={EditCampoutDetails}
      />

      <ViewEventStack.Screen name="SummerCamp" component={SummerCampView} />
      <ViewEventStack.Screen
        name="EditSummerCamp"
        component={EditSummerCampView}
      />

      <ViewEventStack.Screen name="EventThread" component={ChatStack} />
    </ViewEventStack.Navigator>
  );
};

export default ViewEventStackNavigator;
