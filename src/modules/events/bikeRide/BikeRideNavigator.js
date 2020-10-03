import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import ChooseName from '../event_components/ChooseName';
import ChooseLocationView from '../event_components/ChooseLocation';
import ChooseDateTime from '../event_components/ChooseDateTime';
import BikeRideDetails from './BikeRideDetails';
import ChooseTwoTimes from '../event_components/ChooseTwoTimes';
import ConfirmBikeRideDetails from './ConfirmBikeRideDetails';
import ChooseOneTime from '../event_components/ChooseOneTime';
import UpdateEventDetails from '../event_components/UpdateEventDetails';

const Stack = createStackNavigator();

const BikeRideStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={() => ({
        headerShown: false,
      })}>
      <Stack.Screen
        name="ChooseName"
        component={ChooseName}
        initialParams={{
          placeholder: 'What do you want to call your bike ride?',
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
          chooseDateMsg: 'What day is your bike ride?',
          chooseTimeMsg: 'What time do you want to start riding?',
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
        component={BikeRideDetails}
        initialParams={{nextView: 'ChooseEndTime'}}
      />
      <Stack.Screen
        name="ChooseEndTime"
        component={ChooseOneTime}
        options={{
          animationEnabled: false,
        }}
        initialParams={{
          chooseTimeMsg: 'Around what time will you return from the bike ride?',
          nextView: 'ConfirmEventDetails',
          valName: 'endDatetime',
          btn: 'Choose End Time',
        }}
      />
      <Stack.Screen
        name="ConfirmEventDetails"
        component={ConfirmBikeRideDetails}
      />
      <Stack.Screen name="EditEvent" component={UpdateEventDetails} />
    </Stack.Navigator>
  );
};

export default BikeRideStackNavigator;
