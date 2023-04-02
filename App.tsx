import 'react-native-reanimated';
import 'react-native-gesture-handler';

import React from 'react';

import { ThemeProvider } from '@shopify/restyle';
import theme from './ScoutDesign/library/theme';

import { ApolloProvider } from '@apollo/client';

import ScoutTrekApolloClient from './src/gqlClient/ScoutTrekClient';

import AppLoadingContainer from './AppLoadingContainer';
import Toast from 'react-native-root-toast';
import { RootSiblingParent } from 'react-native-root-siblings';

export default function App() {
  return (
    <RootSiblingParent>
      <ApolloProvider client={ScoutTrekApolloClient}>
        <ThemeProvider theme={theme}>
          <Toast />
          <AppLoadingContainer />
        </ThemeProvider>
      </ApolloProvider>
    </RootSiblingParent>
  );
}
