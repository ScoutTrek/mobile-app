import React, {useState, useEffect} from 'react';
import {ActivityIndicator, View, AsyncStorage} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {AppLoading} from 'expo';
import {Asset} from 'expo-asset';
import * as Font from 'expo-font';
import {Provider, useDispatch, useSelector} from 'react-redux';
import {Ionicons} from '@expo/vector-icons';
import {store} from './src/redux/store';

import {setContext} from 'apollo-link-context';
import {ApolloClient, HttpLink, InMemoryCache, gql} from '@apollo/client';

const authLink = setContext((_, {headers}) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('userToken');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlOThjZTc5NTQ0OWM0MTkwYWY2YTUwNiIsInJvbGUiOiJTQ09VVF9NQVNURVIiLCJpYXQiOjE1ODcwNzI2MzQsImV4cCI6MTU5MTgyNDYzNH0.xaEvK-7I168-6Opu9avjNdUqANgS2PbIv30kyC5tG30`,
    },
  };
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(
    new HttpLink({
      uri: 'http://localhost:4000',
    })
  ),
});

import AuthNavigator from './src/modules/auth/AuthNavigator';
import MainTabNavigator from './src/modules/navigation/MainTabNavigator';

import * as AuthActions from './src/redux/auth/auth.actions';

const AppLoadingContainer = () => {
  const dispatch = useDispatch();
  const isSignOut = useSelector(state => state.auth.isSignOut);
  const userToken = useSelector(state => state.auth.userToken);

  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const checkForToken = async () => {
      let userToken;
      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch (e) {
        console.log(e);
      }
      // After restoring token, we may need to validate it in production apps
      dispatch(AuthActions.getTokenFromMemory(userToken));
      setLoading(false);
    };

    checkForToken();
  }, []);

  useEffect(() => {}, []);

  if (loading)
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator />
      </View>
    );

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={() => ({
          headerShown: false,
        })}>
        {/*{userToken !== null ? (*/}
        {/*  <Stack.Screen*/}
        {/*    name="SignIn"*/}
        {/*    component={AuthNavigator}*/}
        {/*    options={{*/}
        {/*      // When logging out, a pop animation feels intuitive*/}
        {/*      // You can remove this if you want the default 'push' animation*/}
        {/*      animationTypeForReplace: isSignOut ? 'pop' : 'push',*/}
        {/*    }}*/}
        {/*  />*/}
        {/*) : (*/}
        <Stack.Screen name="Home" component={MainTabNavigator} />
        {/*)}*/}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

async function loadResourcesAsync() {
  await Promise.all([
    Font.loadAsync({
      ...Ionicons.font,

      oxygen: require('./assets/fonts/Oxygen-Regular.ttf'),
      'oxygen-light': require('./assets/fonts/Oxygen-Light.ttf'),
      'oxygen-bold': require('./assets/fonts/Oxygen-Bold.ttf'),
      'raleway-bold': require('./assets/fonts/Raleway/Raleway-Bold.ttf'),
      'raleway-black': require('./assets/fonts/Raleway/Raleway-Black.ttf'),
    }),
  ]);
}

function handleLoadingError(error) {
  // In this case, you might want to report the error to your error reporting
  // service, for example Sentry
  console.warn(error);
}

const Stack = createStackNavigator();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  if (isLoading) {
    return (
      <AppLoading
        startAsync={loadResourcesAsync}
        onError={handleLoadingError}
        onFinish={setIsLoading}
      />
    );
  } else {
    return (
      <Provider store={store}>
        <AppLoadingContainer />
      </Provider>
    );
  }
}
