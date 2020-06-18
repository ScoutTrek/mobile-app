import React from 'react';
import {TouchableOpacity, View, Text, StyleSheet} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';

const GradientButton = ({title, onPress}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={onPress}
      style={styles.container}>
      <View style={styles.inner}>
        <LinearGradient
          style={styles.background}
          colors={['#3E2F5B', '#F29959', '#FFE62E']}
          locations={[0.0, 0.9, 1.0]}
          start={[0.0, 0.0]}
          end={[1.0, 1.0]}
        />
        <Text style={styles.text}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    borderRadius: 50,
    overflow: 'hidden',
  },
  inner: {
    paddingVertical: 10,
    paddingHorizontal: 18,
    overflow: 'hidden',
  },
  background: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'row',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  text: {
    textAlign: 'center',
    color: '#fff',
    fontFamily: 'oxygen-bold',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default GradientButton;
