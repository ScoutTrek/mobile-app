import {createStackNavigator} from '@react-navigation/stack';
import AdventuresNav from '../home/UpcomingEvents';
import HikeView from '../calendar/hikeViews/HikeView';
import ScoutMeetingView from '../calendar/scoutMeetingViews/ScoutMeetingView';
import CampoutView from '../calendar/campoutViews/CampoutView';
import SummerCampView from '../calendar/summerCampViews/SummerCampView';
import {ChatStack} from '../calendar/CalendarNav';
import * as React from 'react';
import SummerCampStackNavigator from '../events/summer_camp/SummerCampNavigator';
import CampoutStackNavigator from '../events/campout/CampoutNavigator';
import HikeStackNavigator from '../events/hike/HikeNavigator';

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

      {/*<ViewEventStack.Screen name="ScoutMeeting" component={ScoutMeetingView} />*/}
      {/*<ViewEventStack.Screen*/}
      {/*  name="EditScoutMeeting"*/}
      {/*  component={EditScoutMeeting}*/}
      {/*/>*/}

      <ViewEventStack.Screen name="Campout" component={CampoutView} />
      <ViewEventStack.Screen
        name="EditCampout"
        component={CampoutStackNavigator}
      />

      <ViewEventStack.Screen name="SummerCamp" component={SummerCampView} />
      <ViewEventStack.Screen
        name="EditSummerCamp"
        component={SummerCampStackNavigator}
      />

      <ViewEventStack.Screen name="EventThread" component={ChatStack} />
    </ViewEventStack.Navigator>
  );
};

export default ViewEventStackNavigator;
