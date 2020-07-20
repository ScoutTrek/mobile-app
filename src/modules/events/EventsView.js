import React, {useState} from 'react';
import {StyleSheet, View, FlatList} from 'react-native';

import Constants from 'expo-constants';

import Heading from '../../components/Heading';
import NextButton from '../../components/buttons/NextButton';

import EventBtn from './components/EventBtn';
import Colors from '../../../constants/Colors';

const listData = [
  {
    id: 0,
    eventType: 'Hike',
    title: 'CITIZEN ECO-DRIVE',
    subtitle:
      'Plan a visit to the trail for the day, let ScoutTrek take care of everything else.',
    image: {
      uri:
        'https://res.cloudinary.com/wow-your-client/image/upload/c_scale,w_600/v1582556921/ScoutTrek/hiking_trip.png',
    },
  },
  {
    id: 1,
    eventType: 'Troop Meeting',
    title: 'NEXT-LEVEL WEAR',
    subtitle:
      'Plan all the logistics for your weekly meetings in a fraction of the time.',
    image: {
      uri:
        'https://res.cloudinary.com/wow-your-client/image/upload/c_scale,w_600/v1582557266/ScoutTrek/ScoutBadgesImage.jpg',
    },
  },
  {
    id: 2,
    eventType: 'Campout',
    title: 'CITIZEN ECO-DRIVE',
    subtitle: 'Spend a few days in the wild outdoors.',
    image: {
      uri:
        'https://res.cloudinary.com/wow-your-client/image/upload/c_scale,e_contrast:-25,w_600/v1595086345/ScoutTrek/campfire.png',
    },
  },
  {
    id: 3,
    eventType: 'Summer Camp',
    subtitle: 'A week of non-stop fun in the wild.',
    image: {
      uri:
        'https://res.cloudinary.com/wow-your-client/image/upload/c_scale,w_600/v1590852981/ScoutTrek/ben-white-pV5ckb2HEVk-unsplash.jpg',
    },
  },
  // {
  //   id: 3,
  //   eventType: 'Backpacking',
  //   title: 'CITIZEN ECO-DRIVE',
  //   subtitle: "It's like hiking, but more Pro.",
  //   badge: 'NEW',
  //   badgeColor: 'green',
  //   image: {
  //     uri:
  //       'https://res.cloudinary.com/wow-your-client/image/upload/c_scale,w_600/v1582556924/ScoutTrek/backpacking_trip.png',
  //   },
  // },
];

const EventTypesScreen = ({navigation}) => {
  const [data, setData] = useState(listData);

  const _openEventCreator = (route, data) => {
    navigation.navigate(route, {...data});
  };

  return (
    <View style={styles.container}>
      <Heading title="New Event" />
      <FlatList
        contentContainerStyle={{flexGrow: 1, paddingBottom: 15}}
        keyExtractor={(item) => item.id.toString()}
        data={data}
        renderItem={({item}) => (
          <EventBtn
            item={item}
            onPress={() =>
              _openEventCreator(item.eventType.replace(/\s/g, ''), item)
            }
          />
        )}
      />
      <NextButton
        text="Cancel"
        iconName="ios-close"
        color={Colors.darkOrange}
        onClick={() => navigation.goBack()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    flex: 1,
    backgroundColor: 'white',
  },
});

export default EventTypesScreen;
