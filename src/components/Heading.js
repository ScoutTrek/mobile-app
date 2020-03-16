import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const Heading = ({title}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 20,
    paddingTop: 9,
    paddingBottom: 8,
  },
  title: {
    fontFamily: 'raleway-bold',
    fontSize: 26,
  },
});

export default Heading;
