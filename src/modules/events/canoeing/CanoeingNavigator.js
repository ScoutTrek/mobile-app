import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import ChooseName from '../event_components/ChooseName';
import ChooseLocationView from '../event_components/ChooseLocation';
import ChooseDateTime from '../event_components/ChooseDateTime';
import CanoeingDetails from './CanoeingDetails';
import ChooseTwoTimes from '../event_components/ChooseTwoTimes';
import ConfirmCanoeingDetails from './ConfirmCanoeingDetails';
import ChooseOneTime from '../event_components/ChooseOneTime';
import UpdateEventDetails from '../event_components/UpdateEventDetails';

const Stack = createStackNavigator();

const CanoeingStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={() => ({
        headerShown: false,
      })}>
      <Stack.Screen
        name="ChooseName"
        component={ChooseName}
        initialParams={{
          placeholder: 'What do you want to call your canoeing trip?',
          nextView: 'ChooseLocation',
        }}
      />
      <Stack.Screen
        name="ChooseLocation"
        component={ChooseLocationView}
        initialParams={{
          placeholder: 'Where do you want to start?',
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
          chooseDateMsg: 'When is your canoeing trip?',
          chooseTimeMsg: 'What time do you want to get out on the water?',
          valName: 'datetime',
          nextView: 'ChooseMeetPoint',
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
        component={CanoeingDetails}
        initialParams={{nextView: 'ChooseEndTime'}}
      />
      <Stack.Screen
        name="ChooseEndTime"
        component={ChooseOneTime}
        options={{
          animationEnabled: false,
        }}
        initialParams={{
          chooseTimeMsg:
            'Around what time will you return from the canoeing trip?',
          nextView: 'ConfirmEventDetails',
          valName: 'endDatetime',
          btn: 'Choose End Time',
        }}
      />
      <Stack.Screen
        name="ConfirmEventDetails"
        component={ConfirmCanoeingDetails}
      />
      <Stack.Screen name="EditEvent" component={UpdateEventDetails} />
    </Stack.Navigator>
  );
};

export default CanoeingStackNavigator;
