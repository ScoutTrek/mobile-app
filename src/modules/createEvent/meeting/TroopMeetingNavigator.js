import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import TroopMeetingDetails from './TroopMeetingDetails';
import ChooseOneTime from '../components/ChooseOneTime';
import ConfirmTroopMeetingDetails from './ConfirmTroopMeetingDetails';

const ScoutMeeting = createStackNavigator();

const ScoutMeetingStackNavigator = () => {
  return (
    <ScoutMeeting.Navigator
      screenOptions={() => ({
        headerShown: false,
      })}>
      <ScoutMeeting.Screen
        name="EventDetails"
        component={TroopMeetingDetails}
        initialParams={{
          nextView: 'ChooseMeetingTime',
        }}
      />
      <ScoutMeeting.Screen
        name="ChooseMeetingTime"
        component={ChooseOneTime}
        options={{
          animationEnabled: false,
        }}
        initialParams={{
          chooseTimeMsg: 'What time will the Troop meeting begin?',
          nextView: 'ChooseLocation',
          valName: 'datetime',
          btn: 'Choose Meeting Time',
        }}
      />
      <ScoutMeeting.Screen
        name="ChooseLocation"
        component={ChooseLocationView}
        initialParams={{
          placeholder: 'Where will this meeting take place?',
          nextView: 'ConfirmEventDetails',
          valName: 'location',
        }}
      />
      <ScoutMeeting.Screen
        name="ConfirmEventDetails"
        component={ConfirmTroopMeetingDetails}
      />
    </ScoutMeeting.Navigator>
  );
};

export default ScoutMeetingStackNavigator;
