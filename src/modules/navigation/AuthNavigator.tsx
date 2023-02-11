import { createStackNavigator } from '@react-navigation/stack';
import SignIn from '../auth/SignIn';
import SignUp from '../auth/SignUp';
import ForgotPassword from '../auth/ForgotPassword';
import CreateNewPassword from '../auth/CreateNewPassword';
import { AuthStackRoutes } from './types/authStacks';

export type AuthStackParamList = {
  SignUp: undefined;
  SignIn: undefined;
  ForgotPassword: undefined;
  ResetPassword: undefined;
};

const AuthStack = createStackNavigator<AuthStackParamList>();

const AuthNavigator = () => {
  return (
    <AuthStack.Navigator
      screenOptions={() => ({
        headerShown: false,
      })}
    >
      <AuthStack.Screen name={AuthStackRoutes.signUp} component={SignUp} />
      <AuthStack.Screen name={AuthStackRoutes.signIn} component={SignIn} />
      <AuthStack.Screen
        name={AuthStackRoutes.forgotPassword}
        component={ForgotPassword}
      />
      <AuthStack.Screen
        name={AuthStackRoutes.resetPassword}
        component={CreateNewPassword}
      />
    </AuthStack.Navigator>
  );
};

export default AuthNavigator;
