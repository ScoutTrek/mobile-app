import {useState} from 'react';

import 'react-native-gesture-handler';
import {ThemeProvider} from '@shopify/restyle';
import theme from './ScoutDesign/library/theme';
import {useFonts} from 'expo-font';

import {ActivityIndicator, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Ionicons} from '@expo/vector-icons';

import {AuthContext, AuthDataType} from './src/modules/auth/SignUp';

import {
  ApolloProvider,
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
  from,
  gql,
  useQuery,
} from '@apollo/client';

import {onError} from '@apollo/client/link/error';

import AuthNavigator from './src/modules/navigation/AuthNavigator';
import MainStackNavigator from './src/modules/navigation/MainStackNavigator';

const errorMiddleware = onError(
  ({graphQLErrors, networkError, operation, forward}) => {
    if (graphQLErrors) {
      graphQLErrors.map(({message, locations, path}) =>
        console.error(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        )
      );
      return forward(operation);
    }

    if (networkError) console.error(`[Network error]: ${networkError}`);
  }
);

export const GET_CURR_USER_GROUPS = gql`
  query GetCurrUser {
    currUser {
      noGroups
    }
  }
`;

type AsyncStorageData = {[key: string]: string | null};

const loadKeysFromAsyncStorage = async (
  asyncDataKeys: string[]
): Promise<AsyncStorageData> => {
  let asyncData: AsyncStorageData = {};
  for (const key of asyncDataKeys) {
    const value = await AsyncStorage.getItem(key);
    asyncData[key] = value;
  }
  return asyncData;
};

const authMiddleware = new ApolloLink((operation, forward) => {
  return loadKeysFromAsyncStorage(['userToken', 'currMembershipID']).then(
    ({userToken, currMembershipID}) => {
      operation.setContext({
        headers: {
          membership: currMembershipID ? currMembershipID : undefined,
          authorization: userToken,
        },
      });
      return forward(operation);
    }
  );
});

const AppLoadingContainer = () => {
  useQuery(GET_CURR_USER_GROUPS, {
    fetchPolicy: 'network-only',
    onCompleted: (data) => {
      if (data) {
        try {
          AsyncStorage.getItem('userToken').then((token) => {
            if (token) {
              setAuthData({token, noGroups: data.currUser.noGroups});
            }
            setAppLoading(false);
          });
        } catch (e) {
          console.log(e);
        }
      }
    },
  });
  const [appLoading, setAppLoading] = useState<boolean>(true);
  const [token, setToken] = useState<string>('');
  const [noGroups, setNoGroups] = useState<boolean>(true);
  const authData: AuthDataType = {
    token,
    noGroups,
  };

  const setAuthData = (newAuthData: AuthDataType) => {
    setToken(newAuthData.token);
    setNoGroups(newAuthData.noGroups);
  };

  const [fontsLoaded] = useFonts({
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

  if (!fontsLoaded || appLoading)
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator />
      </View>
    );

  return (
    <AuthContext.Provider value={{authData, setAuthData}}>
      {console.log('Auth data ', authData)}

      <NavigationContainer>
        <Stack.Navigator
          screenOptions={() => ({
            headerShown: false,
          })}>
          {!authData.token ? (
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
                newUser: authData?.noGroups,
              }}
            />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

const Stack = createStackNavigator();

export const ScoutTrekApolloClient = new ApolloClient({
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          upcomingEvents: {
            merge(_ignored, incoming) {
              return incoming;
            },
          },
        },
      },
    },
  }),
  link: from([
    authMiddleware,
    errorMiddleware,
    new HttpLink({
      uri: 'http://localhost:4000/graphql',
      // uri: 'https://beta-dot-scouttrek-node-api.appspot.com/:4000',
    }),
  ]),
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
