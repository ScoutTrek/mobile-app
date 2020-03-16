import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import EventHeader from './components/EventHeader';
import Colors from '../../../constants/Colors';
import InlineButton from '../../components/buttons/InlineButton';

import ENV from '../../../helpers/env';
import {useSelector} from 'react-redux';

const EventDetailsScreen = ({route, navigation}) => {
  let dates = useSelector(state => state.events.events);
  const {currItem} = route.params;
  const event = dates.find(event => event.id === currItem);

  const {name, type, creator, date, description, distance, location} = event;

  const mapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${location.latitude},${location.longitude}&zoom=13&size=325x375&maptype=roadmap
&markers=color:blue%7C${location.latitude},${location.longitude}&key=${ENV.googleApiKey}`;

  const displayDate = new Date(date.seconds * 1000);

  return (
    <View style={styles.container}>
      <View>
        <EventHeader navigation={navigation} image_path={mapUrl} title={name} />
        <View style={styles.info}>
          <View style={styles.leftInfoContainer}>
            <Text style={styles.date}>
              {displayDate.toLocaleDateString(undefined, {dateStyle: 'medium'})}
            </Text>
          </View>
          <View style={styles.centerInfoContainer}>
            <Text style={[styles.text, styles.eventType]}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </Text>
          </View>

          <View style={styles.rightInfoContainer}>
            <Text style={styles.creator}>{creator}</Text>
          </View>
        </View>
        <Text style={styles.description}>{description}</Text>
        <Text style={styles.distance}>
          distance: <Text style={styles.bold}>{distance}</Text> mi.
        </Text>
      </View>
      <View style={{margin: 15}}>
        <InlineButton
          title="Edit"
          onPress={() => navigation.navigate('EditEvent', {currItem})}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.offWhite,
    color: Colors.purple,
    justifyContent: 'space-between',
  },
  text: {
    paddingVertical: 3,
    fontSize: 15,
  },
  info: {
    flexDirection: 'row',
    fontFamily: 'oxygen-bold',
    margin: 5,
    height: 50,
  },
  leftInfoContainer: {
    flex: 1,
    alignItems: 'flex-end',
    height: '100%',
    justifyContent: 'center',
  },
  date: {
    overflow: 'hidden',
    color: Colors.offWhite,
    backgroundColor: Colors.brown,
    padding: 7,
    paddingHorizontal: 10,
    borderRadius: 5,
    textAlign: 'center',
  },
  centerInfoContainer: {
    flex: 1,
    alignItems: 'center',
    height: '100%',
    justifyContent: 'center',
  },
  eventType: {
    textAlign: 'center',
    fontSize: 18,
    fontFamily: 'oxygen-bold',
  },
  rightInfoContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: '100%',
  },
  creator: {
    fontFamily: 'oxygen-bold',
    overflow: 'hidden',
    color: Colors.darkBrown,
    backgroundColor: Colors.orange,
    fontSize: 16,
    paddingVertical: 7,
    paddingHorizontal: 12,
    marginLeft: 2,
    borderRadius: 5,
    textAlign: 'center',
  },
  description: {
    fontFamily: 'oxygen',
    fontSize: 16,
    padding: 30,
  },
  distance: {
    fontFamily: 'oxygen',
    fontSize: 16,
    paddingHorizontal: 30,
  },
  bold: {
    fontFamily: 'oxygen-bold',
    fontSize: 18,
  },
});

export default EventDetailsScreen;
