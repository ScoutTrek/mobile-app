import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import ChooseLocationView from '../event_components/ChooseLocation';
import ScoutMeetingDetails from './ScoutMeetingDetails';

const ScoutMeeting = createStackNavigator();

const ScoutMeetingStackNavigator = () => {
  return (
    <ScoutMeeting.Navigator
      screenOptions={() => ({
        headerShown: false,
      })}>
      <ScoutMeeting.Screen
        name="ChooseLocation"
        component={ChooseLocationView}
        initialParams={{
          placeholder: 'Where will this meeting take place?',
          nextView: 'ScoutMeetingInfo',
          chooseDate: 'What day will this recurring scout meeting begin on?',
          chooseTime: 'What time will the meeting start?',
          initialModal: 'date',
        }}
      />
      <ScoutMeeting.Screen
        name="ScoutMeetingInfo"
        component={ScoutMeetingDetails}
      />
    </ScoutMeeting.Navigator>
  );
};

export default ScoutMeetingStackNavigator;
