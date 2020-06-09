import React from 'react';
import {TouchableOpacity, View, Text, StyleSheet} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import Colors from '../../../constants/Colors';

const InlineButton = ({title, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={styles.inner}>
        <Text style={styles.text}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 21,
    marginBottom: 11,
  },
  inner: {
    paddingVertical: 4,
    paddingHorizontal: 9,
    backgroundColor: Colors.darkBrown,
    borderRadius: 4,
  },
  text: {
    textAlign: 'center',
    color: '#fff',
    fontFamily: 'oxygen',
    fontSize: 13,
  },
});

export default InlineButton;
