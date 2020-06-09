import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import ChooseLocationView from '../event_components/ChooseLocation';
import CampoutDetails from './CampoutDetails';
import ChooseName from '../event_components/ChooseName';

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
          nextView: 'ChooseMeetPoint',
          chooseDate: 'What day does your campout start?',
          chooseTime: 'What time do you need to be at the campground?',
          initialModal: 'date',
        }}
      />
      <CampoutStack.Screen
        name="ChooseMeetPoint"
        component={ChooseLocationView}
        initialParams={{
          placeholder: 'Where should everyone meet?',
          nextView: 'EventDetails',
          chooseMeetTime: 'What time should everybody meet?',
          chooseLeaveTime: 'What time do you plan to leave your meet place?',
          initialModal: 'time',
        }}
      />
      <CampoutStack.Screen name="EventDetails" component={CampoutDetails} />
    </CampoutStack.Navigator>
  );
};

export default CampoutStackNavigator;
