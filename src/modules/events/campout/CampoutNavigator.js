import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import ChooseLocationView from '../eventComponents/ChooseLocation';
import ChooseMeetPoint from '../eventComponents/ChooseMeetPoint';
import HikeDetails from '../eventComponents/HikeDetails';

const CampoutStack = createStackNavigator();

const CampoutStackNavigator = () => {
  return (
    <CampoutStack.Navigator
      screenOptions={() => ({
        headerShown: false,
      })}>
      <CampoutStack.Screen
        name="ChooseLocation"
        component={ChooseLocationView}
        initialParams={{
          placeholder: 'Where will your campout begin?',
          nextView: 'ChooseMeetPoint',
        }}
      />
      <CampoutStack.Screen
        name="ChooseMeetPoint"
        component={ChooseLocationView}
        initialParams={{
          placeholder: 'Where should everyone meet?',
          nextView: 'EventDetails',
        }}
      />
      <CampoutStack.Screen name="EventDetails" component={HikeDetails} />
    </CampoutStack.Navigator>
  );
};

export default CampoutStackNavigator;
