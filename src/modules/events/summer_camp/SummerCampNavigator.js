import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import ChooseLocationView from '../event_components/ChooseLocation';
import SummerCampDetails from './SummerCampDetails';
import ChooseName from '../event_components/ChooseName';
import ChooseEndDateTime from '../event_components/ChooseEndDateTime';

const SummerCampStack = createStackNavigator();

const SummerCampStackNavigator = () => {
  return (
    <SummerCampStack.Navigator
      screenOptions={() => ({
        headerShown: false,
      })}>
      <SummerCampStack.Screen
        name="ChooseName"
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
          nextView: 'ChooseMeetPoint',
          chooseDate: 'What day does your summer camp start?',
          chooseTime: 'What time do Scouts need to arrive at camp?',
          initialModal: 'date',
        }}
      />
      <SummerCampStack.Screen
        name="ChooseMeetPoint"
        component={ChooseLocationView}
        initialParams={{
          placeholder: 'Where should everyone meet?',
          nextView: 'ChooseCheckoutTime',
          chooseMeetTime: 'What time should everybody meet?',
          chooseLeaveTime: 'What time do you plan to leave your meet place?',
          initialModal: 'time',
        }}
      />
      <SummerCampStack.Screen
        name="ChooseCheckoutTime"
        component={ChooseEndDateTime}
        initialParams={{
          placeholder: 'What day will camp end?',
          nextView: 'EventDetails',
          chooseCheckoutTime: 'What day will you check out of camp?',
          chooseReturnTime: 'Roughly what time will you return?',
          initialModal: 'date',
        }}
      />
      <SummerCampStack.Screen
        name="EventDetails"
        component={SummerCampDetails}
      />
    </SummerCampStack.Navigator>
  );
};

export default SummerCampStackNavigator;
