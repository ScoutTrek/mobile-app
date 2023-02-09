import {useQuery} from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {GET_INITIAL_USER_FIELDS} from 'data';
import {useFonts} from 'expo-font';
import {useState} from 'react';
import {View, ActivityIndicator} from 'react-native';
import {AuthContext} from 'src/modules/auth/SignUp';
import AuthNavigator from 'src/modules/navigation/AuthNavigator';
import MainStackNavigator from 'src/modules/navigation/MainStackNavigator';
import {AppStackParamList} from 'src/modules/navigation/types/appStack';
import useStore from 'src/stores/useStore';

const Stack = createStackNavigator<AppStackParamList>();

const AppLoadingContainer = () => {
  const isLoading = useStore((s) => s.isLoading);
  const token = useStore((s) => s.token);

  const [newUser, setNewUser] = useState<boolean>(false);

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
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <AuthContext.Provider value={{token, setToken, newUser, setNewUser}}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={() => ({
            headerShown: false,
          })}>
          {!token ? (
            <Stack.Screen
              name="AuthNav"
              component={AuthNavigator}
              options={{
                animationTypeForReplace: 'push',
              }}
            />
          ) : (
            <Stack.Screen
              name="Home"
              component={MainStackNavigator}
              initialParams={{
                newUser,
              }}
            />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default AppLoadingContainer;
