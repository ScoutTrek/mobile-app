import React, {useState, useEffect} from 'react';
import {ActivityIndicator, View, AsyncStorage} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {AppLoading} from 'expo';
import * as Font from 'expo-font';
import {Ionicons} from '@expo/vector-icons';
import {persistCache} from 'apollo-cache-persist';

import {setContext} from 'apollo-link-context';
import {ApolloClient, HttpLink, InMemoryCache, gql} from '@apollo/client';
import {ApolloProvider, useQuery} from '@apollo/react-hooks';

import {typeDefs, resolvers} from './src/localState/User';

const authLink = setContext(async (_, {headers}) => {
  // get the authentication token from local storage if it exists
  // const token = await AsyncStorage.getItem('userToken')
  const token = await AsyncStorage.getItem('userToken');
  console.log(token);
  return {
    headers: {
      ...headers,
      authorization: `Bearer ${token}`,
    },
  };
});

import {onError} from 'apollo-link-error';

import AuthNavigator from './src/modules/auth/AuthNavigator';
import MainTabNavigator from './src/modules/navigation/MainTabNavigator';
import {GET_TOKEN} from './src/modules/auth/JoinPatrol';

const cache = new InMemoryCache();

cache.writeQuery({
  query: gql`
    query {
      userToken
    }
  `,
  data: {
    userToken: '',
  },
});

const AppLoadingContainer = () => {
  const {data, client} = useQuery(GET_TOKEN);

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
  const [client, setApolloClient] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  React.useEffect(() => {
    const linkApollo = async () => {
      const errorLink = onError(({graphQLErrors, networkError}) => {
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
      });

      const link = authLink.concat(errorLink).concat(
        new HttpLink({
          uri: 'http://localhost:4000',
        })
      );

      await persistCache({
        cache,
        storage: AsyncStorage,
      });

      const client = new ApolloClient({
        cache,
        link,
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
