import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {View, Text, Button} from 'react-native';

import ChooseName from '../event_components/ChooseName';
import ChooseLocationView from '../event_components/ChooseLocation';
import ChooseDateTime from '../event_components/ChooseDateTime';
import HikeDetails from './HikeDetails';
import ChooseTwoTimes from '../event_components/ChooseTwoTimes';
import ConfirmHikeDetails from './ConfirmHikeDetails';
import ChooseOneTime from '../event_components/ChooseOneTime';

const HikeStack = createStackNavigator();

const HikeStackNavigator = () => {
  return (
    <HikeStack.Navigator
      screenOptions={() => ({
        headerShown: false,
      })}>
      <HikeStack.Screen
        name="ChooseName"
        component={ChooseName}
        initialParams={{
          placeholder: 'What do you want to call your hike?',
          nextView: 'ChooseLocation',
        }}
      />
      <HikeStack.Screen
        name="ChooseLocation"
        component={ChooseLocationView}
        initialParams={{
          placeholder: 'Where do you want to hike?',
          nextView: 'ChooseDateTime',
          valName: 'location',
        }}
      />
      <HikeStack.Screen
        name="ChooseDateTime"
        component={ChooseDateTime}
        options={{
          animationEnabled: false,
        }}
        initialParams={{
          chooseDateMsg: 'What day is your hike?',
          chooseTimeMsg: 'What time do you want to be at the trailhead?',
          valName: 'datetime',
          nextView: 'ChooseMeetPoint',
        }}
      />
      <HikeStack.Screen
        name="ChooseMeetPoint"
        component={ChooseLocationView}
        initialParams={{
          placeholder: 'Where should everyone meet?',
          nextView: 'ChooseMeetTime',
          valName: 'meetLocation',
        }}
      />
      <HikeStack.Screen
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
      <HikeStack.Screen
        name="EventDetails"
        component={HikeDetails}
        initialParams={{nextView: 'ChooseEndTime'}}
      />
      <HikeStack.Screen
        name="ChooseEndTime"
        component={ChooseOneTime}
        options={{
          animationEnabled: false,
        }}
        initialParams={{
          chooseTimeMsg: 'Around what time will you return from the hike?',
          nextView: 'ConfirmEventDetails',
          valName: 'endDatetime',
        }}
      />
      <HikeStack.Screen
        name="ConfirmEventDetails"
        component={ConfirmHikeDetails}
      />
    </HikeStack.Navigator>
  );
};

export default HikeStackNavigator;
