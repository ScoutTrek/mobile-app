import {Text, View, StyleSheet} from 'react-native';
import React from 'react';
import Fonts from '../../../constants/Fonts';
import Colors from '../../../constants/Colors';

const Row = ({children, valid, fieldName}) => {
  return (
    <View
      style={[
        styles.container,
        {
          borderColor: valid ? Colors.green : '#FFCC00',
          borderLeftWidth: 12,
        },
      ]}>
      {valid && (
        <View
          style={[
            styles.content,
            {
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              marginHorizontal: 28,
            },
          ]}>
          {fieldName ? (
            <Text style={styles.heading}>{fieldName.toUpperCase()}</Text>
          ) : null}
        </View>
      )}

      <View style={[styles.content]}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 7,
  },
  content: {
    padding: 2,
    marginHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  heading: {
    fontFamily: Fonts.headingBold,
    fontSize: 14,
    padding: 3,
    paddingTop: 7,
    color: Colors.darkGreen,
  },
  label: {
    marginLeft: 15,
    fontFamily: Fonts.primaryTextBold,
    color: Colors.darkGreen,
    fontSize: 18,
    marginVertical: 10,
  },
});

export default Row;
