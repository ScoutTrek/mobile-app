import 'react-native-reanimated';
import 'react-native-gesture-handler';
import { useEffect } from 'react';

import { ActivityIndicator, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import AuthNavigator from './src/modules/navigation/AuthNavigator';
import MainStackNavigator from './src/modules/navigation/MainStackNavigator';
import RouteNames from './src/modules/navigation/route_names/app';
import ParamList from './src/modules/navigation/param_list/app';
import { useFonts } from './src/hooks/useFonts';
import useStore from './src/store';

const Stack = createStackNavigator<ParamList>();

const AppLoadingContainer = () => {
  const token = useStore((s) => s.token);
  const initUser = useStore((s) => s.initUser);
  const isLoading = useStore((s) => s.isLoading);
  const [fontsLoaded] = useFonts();

  useEffect(() => {
    const init = async () => {
      await initUser();
    };
    init();
  }, []);

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
          <Stack.Screen name={RouteNames.home} component={MainStackNavigator} />
        ) : (
          <Stack.Screen
            name={RouteNames.authNav}
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
