import React, {useState} from 'react';

import {setCustomText} from 'react-native-global-props';
import {ActivityIndicator, View, AsyncStorage} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {AppLoading} from 'expo';
import * as Font from 'expo-font';
import {Ionicons} from '@expo/vector-icons';
import {persistCache} from 'apollo-cache-persist';

import {ApolloClient, HttpLink, InMemoryCache, gql} from '@apollo/client';
import {ApolloProvider, useQuery} from '@apollo/react-hooks';

import {typeDefs, resolvers} from './src/localState/User';

import {onError} from 'apollo-link-error';
import {ApolloLink, Observable} from 'apollo-link';
import {createUploadLink} from 'apollo-upload-client';

import AuthNavigator from './src/modules/auth/AuthNavigator';
import MainTabNavigator from './src/modules/navigation/MainTabNavigator';
import ViewEventStackNavigator from './src/modules/navigation/ViewEventStack';
import {GET_TOKEN} from './src/modules/auth/JoinPatrol';

import * as Sentry from 'sentry-expo';

Sentry.init({
  dsn:
    'https://02780727dd3a4192a8b5014eee036ca1@o412271.ingest.sentry.io/5288757',
  enableInExpoDevelopment: true,
  debug: true,
});

const cache = new InMemoryCache();

const request = async (operation) => {
  const token = await AsyncStorage.getItem('userToken');
  operation.setContext({
    headers: {
      authorization: token,
    },
  });
};

const requestLink = new ApolloLink(
  (operation, forward) =>
    new Observable((observer) => {
      let handle;
      Promise.resolve(operation)
        .then((oper) => request(oper))
        .then(() => {
          handle = forward(operation).subscribe({
            next: observer.next.bind(observer),
            error: observer.error.bind(observer),
            complete: observer.complete.bind(observer),
          });
        })
        .catch(observer.error.bind(observer));

      return () => {
        if (handle) handle.unsubscribe();
      };
    })
);

cache.writeQuery({
  query: GET_TOKEN,
  data: {
    userToken: '',
  },
});

const AppLoadingContainer = () => {
  const {data, client} = useQuery(GET_TOKEN);

  const customTextProps = {
    style: {
      fontFamily: 'montserrat-med',
    },
  };

  const [loading, setLoading] = useState(true);
  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const checkForToken = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        if (token) {
          client.writeQuery({
            query: GET_TOKEN,
            data: {userToken: token},
          });
        }
      } catch (e) {
        console.log(e);
      }
      // After restoring token, we may need to validate it in production app
      setLoading(false);
    };
    if (data) {
      checkForToken();
    }
  }, [data]);

  if (loading)
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator />
      </View>
    );

  setCustomText(customTextProps);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={() => ({
          headerShown: false,
        })}>
        {!data.userToken ? (
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
}

function handleLoadingError(error) {
  // In this case, you might want to report the error to your error reporting
  // service, for example Sentry
  console.warn(error);
}

const Stack = createStackNavigator();

export default function App() {
  const [client, setApolloClient] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  React.useEffect(() => {
    const linkApollo = async () => {
      await persistCache({
        cache,
        storage: AsyncStorage,
      });
      const client = new ApolloClient({
        link: ApolloLink.from([
          onError(({graphQLErrors, networkError}) => {
            if (graphQLErrors)
              graphQLErrors.map(({message, locations, path}) =>
                console.log(
                  `[GraphQL error]: Message: ${message}, Location: ${JSON.stringify(
                    locations,
                    null,
                    2
                  )}, Path: ${path}`
                )
              );

            if (networkError) console.log(`[Network error]: ${networkError}`);
          }),
          requestLink,
          createUploadLink({
            uri: 'https://scouttrek-node-api.appspot.com/:4000',
            // uri: 'http://localhost:4000/',
          }),
        ]),
        cache,
        typeDefs,
        resolvers,
      });

      setApolloClient(client);
    };
    linkApollo();
  }, []);

  if (isLoading) {
    return (
      <AppLoading
        startAsync={loadResourcesAsync}
        onError={handleLoadingError}
        onFinish={() => setIsLoading(false)}
      />
    );
  }
  if (!client) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator />
      </View>
    );
  }
  return (
    <ApolloProvider client={client}>
      <AppLoadingContainer />
    </ApolloProvider>
  );
}
