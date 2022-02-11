import {createStackNavigator} from '@react-navigation/stack';

const AuthStack = createStackNavigator();

import SignIn from '../auth/SignIn';
import SignUp from '../auth/SignUp';
import JoinGroupNavigator from './JoinGroupNavigator';

const AuthNavigator = () => {
  return (
    <AuthStack.Navigator
      screenOptions={() => ({
        headerShown: false,
      })}>
      <AuthStack.Screen name="SignUp" component={SignUp} />
      <AuthStack.Screen name="SignIn" component={SignIn} />
      <AuthStack.Screen name="JoinGroup" component={JoinGroupNavigator} />
    </AuthStack.Navigator>
  );
};

export default AuthNavigator;
