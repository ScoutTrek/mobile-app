import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

const AuthStack = createStackNavigator();

import SignIn from './SignIn';
import SignUpNav from './SignUpNav';

const AuthNavigator = () => {
  return (
    <AuthStack.Navigator
      screenOptions={() => ({
        headerShown: false,
      })}>
      <AuthStack.Screen name="SignUp" component={SignUpNav} />
      <AuthStack.Screen name="SignIn" component={SignIn} />
    </AuthStack.Navigator>
  );
};

export default AuthNavigator;
