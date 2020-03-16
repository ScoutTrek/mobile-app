import React, {Fragment} from 'react';
import {Text, ImageBackground, StyleSheet, Dimensions} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import Constants from 'expo-constants';

import {Ionicons} from '@expo/vector-icons';
import Colors from '../../../../constants/Colors';

const EventHeader = ({navigation, image_path, title}) => {
  return (
    <ImageBackground style={styles.container} source={{uri: image_path}}>
      <LinearGradient
        style={styles.overlay}
        colors={['transparent', 'rgba(229, 252, 255, 0.2)', Colors.offWhite]}
        start={[0.5, 0]}
        end={[0.5, 1]}
        locations={[0, 0.7, 1]}>
        <Ionicons
          name="ios-arrow-round-back"
          color="#ffffff"
          style={styles.backIcon}
          size={38}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.title}>{title}</Text>
      </LinearGradient>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    resizeMode: 'cover',
    marginTop: Constants.statusBarHeight,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height / 3,
  },
  overlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: Dimensions.get('window').height / 3,
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  backIcon: {
    color: Colors.darkBrown,
    padding: 15,
  },
  title: {
    padding: 20,
    fontFamily: 'oxygen-bold',
    fontSize: 30,
  },
});

export default EventHeader;
