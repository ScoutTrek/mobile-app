import React from 'react';
import {View, Text, Switch, StyleSheet} from 'react-native';
import Colors from '../../../constants/Colors';

const Toggle = ({heading, active, onChange}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{heading}</Text>
      <Switch onValueChange={onChange} value={active} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  title: {
    borderColor: Colors.secondary,
    fontSize: 15,
    fontFamily: 'oxygen-bold',
    marginHorizontal: 10,
    marginVertical: 18,
  },
});

export default Toggle;
