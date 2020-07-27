import React, {useState} from 'react';

import {setCustomText} from 'react-native-global-props';
import {ActivityIndicator, View, AsyncStorage} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import * as Font from 'expo-font';
import {Ionicons} from '@expo/vector-icons';

import {typeDefs, resolvers} from './src/localState/User';

import {
  ApolloProvider,
  ApolloClient,
  HttpLink,
  ApolloLink,
  InMemoryCache,
  concat,
  makeVar,
} from '@apollo/client';

import AuthNavigator from './src/modules/auth/AuthNavigator';
import MainTabNavigator from './src/modules/navigation/MainTabNavigator';
import ViewEventStackNavigator from './src/modules/navigation/ViewEventStack';

import * as Sentry from 'sentry-expo';

Sentry.init({
  dsn:
    'https://02780727dd3a4192a8b5014eee036ca1@o412271.ingest.sentry.io/5288757',
  enableInExpoDevelopment: true,
  debug: true,
});

const httpLink = new HttpLink({
  uri: 'https://scouttrek-node-api.appspot.com/:4000',
});

const authMiddleware = new ApolloLink(async (operation, forward) => {
  // add the authorization to the headers
  const token = await AsyncStorage.getItem('userToken');
  operation.setContext({
    headers: {
      authorization: token,
    },
  });
  return forward(operation);
});

// Global Apollo Variable that determines if the user is signed in or not.
export const userToken = makeVar('');

const AppLoadingContainer = () => {
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    const checkForToken = async () => {
      try {
        userToken(await AsyncStorage.getItem('userToken'));
      } catch (e) {
        console.log(e);
      }
      // After restoring token, I also need to add JWT validation
      setLoading(false);
    };
    loadResourcesAsync().then(async () => {
      await checkForToken();
    });
  }, []);

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
        {!userToken() ? (
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
        <Stack.Screen name="ViewEvents" component={ViewEventStackNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

async function loadResourcesAsync() {
  await Promise.all([
    Font.loadAsync({
      ...Ionicons.font,
      montserrat: require('./assets/fonts/Montserrat/Montserrat-Regular.ttf'),
      'montserrat-med': require('./assets/fonts/Montserrat/Montserrat-Medium.ttf'),
      'montserrat-light': require('./assets/fonts/Montserrat/Montserrat-Light.ttf'),
      'montserrat-bold': require('./assets/fonts/Montserrat/Montserrat-Bold.ttf'),
      'raleway-bold': require('./assets/fonts/Raleway/Raleway-Bold.ttf'),
      'raleway-black': require('./assets/fonts/Raleway/Raleway-Black.ttf'),
    }),
  ]);

  const customTextProps = {
    style: {
      fontFamily: 'montserrat-med',
    },
  };
  setCustomText(customTextProps);
}

const Stack = createStackNavigator();

export default function App() {
  const client = new ApolloClient({
    cache: new InMemoryCache({
      typePolicies: {
        User: {
          fields: {
            userToken: {
              // Field policy for the isInCart field
              read: async (_, {variables}) => {
                // The read function for the isInCart field
                return userToken();
              },
            },
          },
        },
      },
    }),
    link: concat(authMiddleware, httpLink),
    typeDefs,
    resolvers,
  });

  return (
    <ApolloProvider client={client}>
      <AppLoadingContainer />
    </ApolloProvider>
  );
}
