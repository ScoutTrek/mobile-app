import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import ChooseLocationView from '../eventComponents/ChooseLocation';
import SelectScoutMeetingInfo from './SelectScoutMeetingInfo';

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
        }}
      />
      <ScoutMeeting.Screen
        name="ScoutMeetingInfo"
        component={SelectScoutMeetingInfo}
      />
    </ScoutMeeting.Navigator>
  );
};

export default ScoutMeetingStackNavigator;
