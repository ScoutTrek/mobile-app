import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import ChooseLocationView from '../eventComponents/ChooseLocation';
import CampoutDetails from './CampoutDetails';

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
          placeholder: 'Where is your camp site?',
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
      <CampoutStack.Screen name="EventDetails" component={CampoutDetails} />
    </CampoutStack.Navigator>
  );
};

export default CampoutStackNavigator;
