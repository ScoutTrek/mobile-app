import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import ChooseLocationView from '../event_components/ChooseLocation';
import CampoutDetails from './CampoutDetails';
import ChooseName from '../event_components/ChooseName';
import ChooseDateTime from '../event_components/ChooseDateTime';
import ChooseTwoTimes from '../event_components/ChooseTwoTimes';
import ConfirmCampoutDetails from './ConfirmCampoutDetails';

const CampoutStack = createStackNavigator();

const CampoutStackNavigator = () => {
  return (
    <CampoutStack.Navigator
      screenOptions={() => ({
        headerShown: false,
      })}>
      <CampoutStack.Screen
        name="ChooseName"
        component={ChooseName}
        initialParams={{
          placeholder: 'What do you want to call your campout?',
          nextView: 'ChooseLocation',
        }}
      />
      <CampoutStack.Screen
        name="ChooseLocation"
        component={ChooseLocationView}
        initialParams={{
          placeholder: 'Where are you camping?',
          nextView: 'ChooseDateTime',
          valName: 'location',
        }}
      />
      <CampoutStack.Screen
        name="ChooseDateTime"
        component={ChooseDateTime}
        options={{
          animationEnabled: false,
        }}
        initialParams={{
          chooseDateMsg: 'What day is your campout?',
          chooseTimeMsg: 'What time do you want to be at the campground?',
          nextView: 'ChooseMeetPoint',
          valName: 'datetime',
        }}
      />
      <CampoutStack.Screen
        name="ChooseMeetPoint"
        component={ChooseLocationView}
        initialParams={{
          placeholder: 'Where should everyone meet?',
          nextView: 'ChooseMeetTime',
          valName: 'meetLocation',
        }}
      />
      <CampoutStack.Screen
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

      <CampoutStack.Screen
        name="EventDetails"
        component={CampoutDetails}
        initialParams={{nextView: 'ChooseEndDatetime'}}
      />
      <CampoutStack.Screen
        name="ChooseEndDatetime"
        component={ChooseDateTime}
        options={{
          animationEnabled: false,
        }}
        initialParams={{
          chooseDateMsg: 'What day will you return from your campout?',
          chooseTimeMsg: 'Around what time will you return from the campout?',
          nextView: 'ConfirmEventDetails',
          valName: 'endDatetime',
          dateName: 'endDate',
          timeName: 'endTime',
        }}
      />
      <CampoutStack.Screen
        name="ConfirmEventDetails"
        component={ConfirmCampoutDetails}
      />
    </CampoutStack.Navigator>
  );
};

export default CampoutStackNavigator;
