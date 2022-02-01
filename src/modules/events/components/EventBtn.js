import React from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import Fonts from '../../../../constants/Fonts';
import Colors from '../../../../constants/Colors';

const EventBtn = ({item, onPress}) => {
  return (
    <TouchableOpacity
      key={item.id}
      style={styles.eventContainer}
      onPress={onPress}>
      <View style={styles.eventContent}>
        <View style={styles.textContainer}>
          <Text style={styles.eventTitle}>
            {item.eventID
              .replace('_', ' ')
              .toLowerCase()
              .replace(/\b[a-z](?=[a-z]{2})/g, (letter) =>
                letter.toUpperCase()
              )}
          </Text>
          <Text style={styles.eventSubTitle}>{item.subtitle}</Text>
        </View>
        <LinearGradient
          colors={['rgba(32, 32, 32, 0.1)', 'rgba(32, 32, 32, 0.9)']}
          style={styles.gradient}
        />
        <ImageBackground
          style={styles.eventImage}
          source={item.image}
          resizeMode="cover"
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  eventContainer: {
    margin: 2,
    marginBottom: 0,
    backgroundColor: 'white',
  },
  eventContent: {
    position: 'relative',
    height: 155,
    overflow: 'hidden',
  },
  textContainer: {
    flex: 1,
    zIndex: 1000,
    padding: 18,
    justifyContent: 'flex-end',
  },
  eventTitle: {
    color: 'white',
    fontSize: 32,
    textShadowColor: '#000',
    textShadowOffset: {width: 0, height: 0},
    textShadowRadius: 6,
    fontFamily: Fonts.headingBlack,
    zIndex: 1000,
  },
  eventSubTitle: {
    height: '50%',
    color: 'white',
    paddingTop: 6,
    fontSize: 18,
    textShadowColor: '#000',
    textShadowOffset: {width: 0, height: 0},
    textShadowRadius: 6,
    zIndex: 1000,
  },
  eventImage: {
    position: 'absolute',
    width: '100%',
    height: 155,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  gradient: {
    position: 'absolute',
    width: '100%',
    height: 155,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: 5,
  },
});

export default EventBtn;
