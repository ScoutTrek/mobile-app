import 'react-native-reanimated';
import 'react-native-gesture-handler';

import { ThemeProvider } from '@shopify/restyle';
import theme from './ScoutDesign/library/theme';

import { ApolloProvider } from '@apollo/client';

import { ScoutTrekApolloClient } from 'data';

import AppLoadingContainer from './AppLoadingContainer';

export default function App() {
  return (
    <ApolloProvider client={ScoutTrekApolloClient}>
      <ThemeProvider theme={theme}>
        <AppLoadingContainer />
      </ThemeProvider>
    </ApolloProvider>
  );
}
