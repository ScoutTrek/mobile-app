import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import ChooseLocationView from '../event_components/ChooseLocation';
import SummerCampDetails from './SummerCampDetails';
import ChooseName from '../event_components/ChooseName';
import ChooseDateTime from '../event_components/ChooseDateTime';
import ChooseTwoTimes from '../event_components/ChooseTwoTimes';
import ChooseOneTime from '../event_components/ChooseOneTime';
import ConfirmSummerCampDetails from './ConfirmSummerCampDetails';
import UpdateEventDetails from '../event_components/UpdateEventDetails';

const SummerCampStack = createStackNavigator();

const SummerCampStackNavigator = () => {
  return (
    <SummerCampStack.Navigator
      screenOptions={() => ({
        headerShown: false,
      })}>
      <SummerCampStack.Screen
        name="ChooseTime"
        component={ChooseName}
        initialParams={{
          placeholder: 'What is your summer camp called?',
          nextView: 'ChooseLocation',
        }}
      />
      <SummerCampStack.Screen
        name="ChooseLocation"
        component={ChooseLocationView}
        initialParams={{
          placeholder: 'Where are you camping?',
          nextView: 'ChooseDateTime',
          valName: 'location',
        }}
      />
      <SummerCampStack.Screen
        name="ChooseDateTime"
        component={ChooseDateTime}
        options={{
          animationEnabled: false,
        }}
        initialParams={{
          chooseDateMsg: 'What day does your summer camp start?',
          chooseTimeMsg: 'What time will Scouts be arriving at camp?',
          nextView: 'ChooseMeetPoint',
          valName: 'datetime',
        }}
      />
      <SummerCampStack.Screen
        name="ChooseMeetPoint"
        component={ChooseLocationView}
        initialParams={{
          placeholder: 'Where should everyone meet?',
          nextView: 'ChooseMeetTime',
          valName: 'meetLocation',
        }}
      />
      <SummerCampStack.Screen
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
      <SummerCampStack.Screen
        name="EventDetails"
        component={SummerCampDetails}
        initialParams={{nextView: 'ChooseEndDatetime'}}
      />
      <SummerCampStack.Screen
        name="ChooseEndDatetime"
        component={ChooseDateTime}
        options={{
          animationEnabled: false,
        }}
        initialParams={{
          chooseDateMsg: 'What day will Scouts check out of camp?',
          chooseTimeMsg: 'Around what time will activities be finished?',
          nextView: 'ReturnTime',
          valName: 'endDatetime',
          dateName: 'endDate',
          timeName: 'endTime',
        }}
      />
      <SummerCampStack.Screen
        name="ReturnTime"
        component={ChooseOneTime}
        initialParams={{
          chooseTimeMsg: 'Around what time will you return from camp?',
          nextView: 'ConfirmEventDetails',
          valName: 'pickupTime',
        }}
      />
      <SummerCampStack.Screen
        name="ConfirmEventDetails"
        component={ConfirmSummerCampDetails}
      />
      <SummerCampStack.Screen name="EditEvent" component={UpdateEventDetails} />
    </SummerCampStack.Navigator>
  );
};

export default SummerCampStackNavigator;
