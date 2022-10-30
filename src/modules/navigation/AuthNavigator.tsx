import {createStackNavigator} from '@react-navigation/stack';
import SignIn from '../auth/SignIn';
import SignUp from '../auth/SignUp';
import ForgotPassword from '../auth/ForgotPassword';
import CreateNewPassword from '../auth/CreateNewPassword';

const AuthStack = createStackNavigator();

const AuthNavigator = () => {
  return (
    <AuthStack.Navigator
      screenOptions={() => ({
        headerShown: false,
      })}>
      <AuthStack.Screen name="SignUp" component={SignUp} />
      <AuthStack.Screen name="SignIn" component={SignIn} />
      <AuthStack.Screen name="ForgotPassword" component={ForgotPassword} />
      <AuthStack.Screen name="ResetPassword" component={CreateNewPassword} />
    </AuthStack.Navigator>
  );
};

export default AuthNavigator;
