import React, {useState, useEffect} from 'react';

import 'react-native-gesture-handler';
import {ThemeProvider} from '@shopify/restyle';
import theme from './ScoutDesign/library/theme';
import {useFonts} from 'expo-font';

import {ActivityIndicator, View, Text, AsyncStorage} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Ionicons} from '@expo/vector-icons';

import {AuthContext} from './src/modules/auth/JoinPatrol';

import {
  ApolloProvider,
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  from,
  makeVar,
  gql,
} from '@apollo/client';

import {createUploadLink} from 'apollo-upload-client';

import {onError} from '@apollo/client/link/error';

import AuthNavigator from './src/modules/auth/AuthNavigator';
import MainTabNavigator from './src/modules/navigation/MainTabNavigator';
import ViewEventStackNavigator from './src/modules/navigation/ViewEventStack';

const httpLink = new createUploadLink({
  // uri: 'http://localhost:4000',
  uri: 'https://beta-dot-scouttrek-node-api.appspot.com/:4000',
});

const errorMiddleware = onError(
  ({graphQLErrors, networkError, operation, forward}) => {
    if (graphQLErrors) {
      graphQLErrors.map(({message, locations, path}) =>
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        )
      );
      return forward(operation);
    }

    if (networkError) console.log(`[Network error]: ${networkError}`);
  }
);

const authMiddleware = new ApolloLink(async (operation, forward) => {
  // add the authorization to the headers
  const membership = await AsyncStorage.getItem('currMembershipID');
  const token = await AsyncStorage.getItem('userToken');
  operation.setContext({
    headers: {
      membership: membership ? membership : undefined,
      authorization: token,
    },
  });
  return forward(operation);
});

const AppLoadingContainer = () => {
  const [authToken, setAuthToken] = useState<any>();

  const [loaded] = useFonts({
    ...Ionicons.font,
    montserrat: require('./assets/fonts/Montserrat/Montserrat-Regular.ttf'),
    'montserrat-med': require('./assets/fonts/Montserrat/Montserrat-Medium.ttf'),
    'montserrat-light': require('./assets/fonts/Montserrat/Montserrat-Light.ttf'),
    'montserrat-bold': require('./assets/fonts/Montserrat/Montserrat-Bold.ttf'),
    'raleway-bold': require('./assets/fonts/Raleway/Raleway-Bold.ttf'),
    'raleway-black': require('./assets/fonts/Raleway/Raleway-Black.ttf'),
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

  if (!loaded)
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator />
      </View>
    );

  return (
    <AuthContext.Provider value={{authToken, setAuthToken}}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={() => ({
            headerShown: false,
          })}>
          {!authToken ? (
            <Stack.Screen
              name="AuthNav"
              component={AuthNavigator}
              options={{
                animationTypeForReplace: 'push',
              }}
            />
          ) : (
            <Stack.Screen name="Home" component={MainTabNavigator} />
          )}
          {/*<Stack.Screen name="ViewEvents" component={ViewEventStackNavigator} />*/}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

const Stack = createStackNavigator();

export const eventData = makeVar({});

export const ScoutTrekApolloClient = new ApolloClient({
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          eventData: {
            read() {
              return eventData();
            },
          },
          upcomingEvents: {
            merge(_ignored, incoming) {
              return incoming;
            },
          },
        },
      },
    },
  }),
  link: from([authMiddleware, errorMiddleware, httpLink]),
});

export default function App() {
  return (
    <ApolloProvider client={ScoutTrekApolloClient}>
      <ThemeProvider theme={theme}>
        <AppLoadingContainer />
      </ThemeProvider>
    </ApolloProvider>
  );
}
