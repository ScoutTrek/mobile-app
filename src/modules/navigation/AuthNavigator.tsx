import { createStackNavigator } from '@react-navigation/stack';

import CreateNewPassword from '../auth/CreateNewPassword';
import ForgotPassword from '../auth/ForgotPassword';
import SignIn from '../auth/SignIn';
import SignUp from '../auth/SignUp';
import ParamList from './param_list/auth';
import RouteNames from './route_names/auth';

const AuthStack = createStackNavigator<ParamList>();

const AuthNavigator = () => {
  return (
    <AuthStack.Navigator
      screenOptions={() => ({
        headerShown: false,
      })}>
      <AuthStack.Screen name={RouteNames.signUp} component={SignUp} />
      <AuthStack.Screen name={RouteNames.signIn} component={SignIn} />
      <AuthStack.Screen
        name={RouteNames.forgotPassword}
        component={ForgotPassword}
      />
      <AuthStack.Screen
        name={RouteNames.resetPassword}
        component={CreateNewPassword}
      />
    </AuthStack.Navigator>
  );
};

export default AuthNavigator;
