import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import ChooseLocationView from '../eventComponents/ChooseLocation';
import HikeDetails from './HikeDetails';
import ChooseName from '../eventComponents/ChooseName';

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
          chooseDate: 'What day is your hike?',
          chooseTime: 'What time do you want to be at the trailhead?',
          initialModal: 'date',
          nextView: 'ChooseMeetPoint',
        }}
      />
      <HikeStack.Screen
        name="ChooseMeetPoint"
        component={ChooseLocationView}
        initialParams={{
          placeholder: 'Where should everyone meet?',
          chooseMeetTime: 'What time should everybody meet?',
          chooseLeaveTime: 'What time do you plan to leave your meet place?',
          initialModal: 'time',
          nextView: 'HikeDetails',
        }}
      />
      <HikeStack.Screen name="HikeDetails" component={HikeDetails} />
    </HikeStack.Navigator>
  );
};

export default HikeStackNavigator;
