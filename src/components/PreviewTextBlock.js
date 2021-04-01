import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Colors from '../../constants/Colors';
import {WebView} from 'react-native-webview';
import FormHeading from './Headings/FormHeading';

export default ({data}) => {
  return (
    <View style={styles.container}>
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
                        <body style="background-color: ${Colors.offWhite}; font-size: 16px; font-family: Montserrat, Raleway, serif">
                            ${data}
                        </body>
                    </html>`,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 8,
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderRadius: 12,
    backgroundColor: Colors.offWhite,
    flexDirection: 'row',
    flex: 1,
  },
  webview: {
    flex: 0,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 120,
  },
});
