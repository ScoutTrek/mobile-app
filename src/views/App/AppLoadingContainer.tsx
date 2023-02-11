import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useFonts } from 'expo-font';
import { View, ActivityIndicator } from 'react-native';
import AuthNavigator from 'src/modules/navigation/AuthNavigator';
import MainStackNavigator from 'src/modules/navigation/MainStackNavigator';
import {
  AppRoutes,
  AppStackParamList,
} from 'src/modules/navigation/types/appStack';
import useStore from 'src/stores/useStore';

const Stack = createStackNavigator<AppStackParamList>();

const AppLoadingContainer = () => {
  const isLoading = useStore((s) => s.isLoading);
  const token = useStore((s) => s.token);

  const [fontsLoaded] = useFonts({
    'open-sans-bold': require('./assets/fonts/OpenSans/OpenSans-Bold.ttf'),
    'open-sans-semibold': require('./assets/fonts/OpenSans/OpenSans-SemiBold.ttf'),
    'open-sans-regular': require('./assets/fonts/OpenSans/OpenSans-Regular.ttf'),
    'open-sans-light': require('./assets/fonts/OpenSans/OpenSans-Light.ttf'),
    'metropolis-black': require('./assets/fonts/metropolis/Metropolis-Black.otf'),
    'metropolis-bold': require('./assets/fonts/metropolis/Metropolis-Bold.otf'),
    'metropolis-medium': require('./assets/fonts/metropolis/Metropolis-Medium.otf'),
    'metropolis-regular': require('./assets/fonts/metropolis/Metropolis-Regular.otf'),
    'metropolis-light': require('./assets/fonts/metropolis/Metropolis-Light.otf'),
  });

  if (!fontsLoaded || isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={() => ({
          headerShown: false,
        })}>
        {token ? (
          <Stack.Screen name={AppRoutes.home} component={MainStackNavigator} />
        ) : (
          <Stack.Screen
            name={AppRoutes.authNav}
            component={AuthNavigator}
            options={{
              animationTypeForReplace: 'push',
            }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppLoadingContainer;
