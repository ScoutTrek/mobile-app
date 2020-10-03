import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import ChooseLocationView from '../event_components/ChooseLocation';
import SpecialEventDetails from './SpecialEventDetails';
import ChooseName from '../event_components/ChooseName';
import ChooseDateTime from '../event_components/ChooseDateTime';
import ChooseTwoTimes from '../event_components/ChooseTwoTimes';
import ChooseOneTime from '../event_components/ChooseOneTime';
import ConfirmSpecialEventDetails from './ConfirmSpecialEventDetails';
import UpdateEventDetails from '../event_components/UpdateEventDetails';

const Stack = createStackNavigator();

const SpecialEventStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={() => ({
        headerShown: false,
      })}>
      <Stack.Screen
        name="ChooseTime"
        component={ChooseName}
        initialParams={{
          placeholder: 'What do you want to call this special event?',
          nextView: 'ChooseLocation',
        }}
      />
      <Stack.Screen
        name="ChooseLocation"
        component={ChooseLocationView}
        initialParams={{
          placeholder: 'Where will this event be?',
          nextView: 'ChooseDateTime',
          valName: 'location',
        }}
      />
      <Stack.Screen
        name="ChooseDateTime"
        component={ChooseDateTime}
        options={{
          animationEnabled: false,
        }}
        initialParams={{
          chooseDateMsg: 'When is this event?',
          chooseTimeMsg: 'What time will Scouts be arriving at the event?',
          nextView: 'ChooseMeetPoint',
          valName: 'datetime',
        }}
      />
      <Stack.Screen
        name="ChooseMeetPoint"
        component={ChooseLocationView}
        initialParams={{
          placeholder: 'Where should everyone meet?',
          nextView: 'ChooseMeetTime',
          valName: 'meetLocation',
        }}
      />
      <Stack.Screen
        name="ChooseMeetTime"
        component={ChooseTwoTimes}
        options={{
          animationEnabled: false,
        }}
        initialParams={{
          chooseTime1Msg: 'What time should everybody meet?',
          chooseTime2Msg: 'What time do you plan to leave your meet place?',
          nextView: 'EventDetails',
          time1Name: 'meetTime',
          time2Name: 'leaveTime',
          btn1: 'Confirm Meet Time',
          btn2: 'Confirm Leave Time',
        }}
      />
      <Stack.Screen
        name="EventDetails"
        component={SpecialEventDetails}
        initialParams={{nextView: 'ChooseEndDatetime'}}
      />
      <Stack.Screen
        name="ChooseEndDatetime"
        component={ChooseOneTime}
        options={{
          animationEnabled: false,
        }}
        initialParams={{
          chooseTimeMsg: 'Around when will the event be finished?',
          nextView: 'ConfirmEventDetails',
          valName: 'endDatetime',
          btn: 'Choose End Time',
        }}
      />
      <Stack.Screen
        name="ConfirmEventDetails"
        component={ConfirmSpecialEventDetails}
      />
      <Stack.Screen name="EditEvent" component={UpdateEventDetails} />
    </Stack.Navigator>
  );
};

export default SpecialEventStackNavigator;
