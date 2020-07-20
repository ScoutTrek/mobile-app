import React from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';

const EventBtn = ({item, onPress}) => {
  return (
    <TouchableOpacity
      key={item.id}
      style={styles.eventContainer}
      onPress={onPress}>
      <View style={styles.eventContent}>
        <LinearGradient
          colors={['rgba(32,32,32,.25)', 'rgba(32,32,32,.6)']}
          style={styles.gradient}>
          <Text style={styles.eventTitle}>{item.eventType}</Text>
          <Text style={styles.eventSubTitle}>{item.subtitle}</Text>
        </LinearGradient>
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
    marginTop: 5,
    marginBottom: 15,
    backgroundColor: 'white',
  },
  eventContent: {
    flex: 1,
    position: 'relative',
    marginHorizontal: 12,
    height: 180,
    borderRadius: 20,
    overflow: 'hidden',
    alignItems: 'flex-start',
  },
  eventTitle: {
    color: 'white',
    fontSize: 24,
    textShadowOffset: {width: 0, height: 0},
    textShadowRadius: 7,
    textShadowColor: '#000',
    paddingHorizontal: 20,
    paddingTop: 32,
  },
  eventSubTitle: {
    color: 'white',
    fontSize: 18,
    marginVertical: 5,
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 3,
    textShadowColor: '#000',
    paddingHorizontal: 20,
  },
  eventImage: {
    position: 'absolute',
    width: '100%',
    height: 180,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  gradient: {
    position: 'absolute',
    width: '100%',
    height: 180,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: 5,
  },
});

export default EventBtn;
