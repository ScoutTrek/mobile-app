import React from 'react';
import {View, StyleSheet} from 'react-native';

import {WebView} from 'react-native-webview';
import Colors from '../../../../constants/Colors';
import {Container, Text} from 'ScoutDesign/library';

type Props = {
  description: string;
};

const Description = ({description}: Props) => {
  return (
    <Container radius="m" backgroundColor="mintGrey" margin="m" padding="s">
      <Text preset="h2" paddingHorizontal="m" paddingTop="s">
        Additional event info
      </Text>
      <WebView
        originWhitelist={['*']}
        style={styles.webview}
        source={{
          html: `<!DOCTYPE html>
                    <html lang="en">
                        <head>
                            <meta charset="UTF-8">
                            <meta name="viewport" content="width=device-width, initial-scale=0.99">
                        </head>
                        <body style="background-color: ${'#DBE6E1'}; padding: 8px; font-size: 15px; font-family: Montserrat, Raleway, serif">
                            ${description}
                        </body>
                    </html>`,
        }}
      />
    </Container>
  );
};

const styles = StyleSheet.create({
  webview: {
    flex: 0,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    minHeight: 180,
  },
});

export default Description;
