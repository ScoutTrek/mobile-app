import 'react-native-reanimated';
import 'react-native-gesture-handler';
import AppLoadingContainer from 'src/views/App/AppLoadingContainer';
import {useState} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

import {ThemeProvider} from '@shopify/restyle';
import theme from './ScoutDesign/library/theme';
import {useFonts} from 'expo-font';

import {ActivityIndicator, View} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {AuthContext} from './src/modules/auth/SignUp';

import {ApolloProvider, useQuery} from '@apollo/client';

import {ScoutTrekApolloClient} from 'data';

export default function App() {
  return (
    <ApolloProvider client={ScoutTrekApolloClient}>
      <ThemeProvider theme={theme}>
        <AppLoadingContainer />
      </ThemeProvider>
    </ApolloProvider>
  );
}
