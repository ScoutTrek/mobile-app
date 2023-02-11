import { ApolloProvider } from '@apollo/client';
import { ThemeProvider } from '@shopify/restyle';
import { ScoutTrekApolloClient } from 'data';
import 'react-native-gesture-handler';
import 'react-native-reanimated';
import AppLoadingContainer from 'src/views/App/AppLoadingContainer';

import theme from './ScoutDesign/library/theme';

export default function App() {
  return (
    <ApolloProvider client={ScoutTrekApolloClient}>
      <ThemeProvider theme={theme}>
        <AppLoadingContainer />
      </ThemeProvider>
    </ApolloProvider>
  );
}
