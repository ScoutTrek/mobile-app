import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import EventHeader from './EventHeader';
import Fonts from '../../constants/Fonts';

const EventDetailsScreen = ({navigation}) => {
  const [EventInfo, setEventInfo] = useState(undefined);

  if (!EventInfo) {
    return <View />;
  }

  return (
    <View style={styles.container}>
      <EventHeader
        navigation={navigation}
        image_path={image_path}
        title={title}
      />
      <View style={styles.info}>
        <Text>{year}</Text>
        <Text>{runtime}</Text>
        <Text style={styles.rating}>{rating}</Text>
      </View>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  info: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    fontFamily: Fonts.primaryTextBold,
    marginBottom: 10,
  },
  description: {
    fontFamily: Fonts.primaryText,
    fontSize: 16,
    padding: 30,
  },
  rating: {
    fontFamily: Fonts.primaryTextBold,
  },
});

export default EventDetailsScreen;
