import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import ChooseLocationView from '../event_components/ChooseLocation';
import CampoutDetails from './CampoutDetails';
import ChooseName from '../event_components/ChooseName';
import ChooseDateTime from '../event_components/ChooseDateTime';
import ChooseTwoTimes from '../event_components/ChooseTwoTimes';
import ConfirmHikeDetails from '../hike/ConfirmHikeDetails';

const CampoutStack = createStackNavigator();

const CampoutStackNavigator = () => {
  return (
    <CampoutStack.Navigator
      screenOptions={() => ({
        headerShown: false,
        cardStyle: {backgroundColor: 'transparent'},
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
          chooseDate: 'What day does your campout start?',
          chooseTime: 'What time do you need to be at the campground?',
          initialModal: 'date',
        }}
      />
      <CampoutStack.Screen
        name="ChooseDateTime"
        component={ChooseDateTime}
        options={{
          animationEnabled: false,
        }}
        initialParams={{
          chooseDateMsg: 'What day is your hike?',
          chooseTimeMsg: 'What time do you want to be at the trailhead?',
          nextView: 'ChooseMeetPoint',
          valName: 'datetime',
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
        }}
      />
      <CampoutStack.Screen
        name="EventDetails"
        component={CampoutDetails}
        initialParams={{nextView: 'ChooseEndTime'}}
      />
      <CampoutStack.Screen
        name="ChooseEndTime"
        component={ChooseTwoTimes}
        options={{
          animationEnabled: false,
        }}
        initialParams={{
          chooseTime1Msg: 'Around what time will you return from the campout?',
          chooseTime2Msg: 'When will you arrive back at the meet place?',
          nextView: 'ConfirmHikeDetails',
          time1Name: 'endTime',
          time2Name: 'pickupTime',
        }}
      />
      <CampoutStack.Screen
        name="ConfirmEventDetails"
        component={ConfirmHikeDetails}
      />
    </CampoutStack.Navigator>
  );
};

export default CampoutStackNavigator;
