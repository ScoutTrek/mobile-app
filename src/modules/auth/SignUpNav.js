import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import SignUp from './SignUp';
import JoinTroop from './JoinTroop';
import CreateTroop from './components/CreateTroop.js';
import ChooseRole from './ChooseRole';
import JoinPatrol from './JoinPatrol';

const SignUpStack = createStackNavigator();

const SignUpNavigator = () => {
  return (
    <SignUpStack.Navigator
      screenOptions={() => ({
        headerShown: false,
      })}>
      <SignUpStack.Screen
        name="SignUp"
        component={SignUp}
        initialParams={{
          nextView: 'ChooseRole',
        }}
      />
      <SignUpStack.Screen
        name="ChooseRole"
        component={ChooseRole}
        initialParams={{
          nextView: 'JoinTroop',
        }}
      />
      <SignUpStack.Screen
        name="JoinTroop"
        component={JoinTroop}
        initialParams={{
          nextView: 'JoinPatrol',
        }}
      />
      <SignUpStack.Screen
        name="CreateTroop"
        component={CreateTroop}
        initialParams={{
          nextView: 'JoinPatrol',
        }}
      />
      <SignUpStack.Screen name="JoinPatrol" component={JoinPatrol} />
    </SignUpStack.Navigator>
  );
};

export default SignUpNavigator;
