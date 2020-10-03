import React, {useState} from 'react';
import {StyleSheet, View, FlatList} from 'react-native';

import Constants from 'expo-constants';

import ViewHeading from '../../components/Headings/ViewHeading';
import NextButton from '../../components/buttons/NextButton';

import EventBtn from './components/EventBtn';
import Colors from '../../../constants/Colors';

const listData = [
  {
    id: 0,
    eventType: 'Hike',
    subtitle: 'Plan a visit to the trail, let ScoutTrek take care of the rest.',
    image: {
      uri:
        'https://res.cloudinary.com/wow-your-client/image/upload/c_scale,w_600/v1582556921/ScoutTrek/hiking_trip.png',
    },
  },
  {
    id: 1,
    eventType: 'Troop Meeting',
    subtitle: 'Plan your weekly meeting logistics in minutes.',
    image: {
      uri:
        'https://res.cloudinary.com/wow-your-client/image/upload/c_scale,w_600/v1582557266/ScoutTrek/ScoutBadgesImage.jpg',
    },
  },
  {
    id: 2,
    eventType: 'Campout',
    subtitle: 'Spend a few days in the wild outdoors.',
    image: {
      uri:
        'https://res.cloudinary.com/wow-your-client/image/upload/c_scale,e_contrast:-25,w_600/v1595086345/ScoutTrek/campfire.png',
    },
  },
  {
    id: 3,
    eventType: 'Summer Camp',
    subtitle: 'A week of non-stop fun away from home.',
    image: {
      uri:
        'https://res.cloudinary.com/wow-your-client/image/upload/c_scale,w_600/v1590852981/ScoutTrek/ben-white-pV5ckb2HEVk-unsplash.jpg',
    },
  },
  {
    id: 4,
    eventType: 'Bike Ride',
    subtitle: 'Feel the wind in your face.',
    image: {
      uri:
        'https://res.cloudinary.com/wow-your-client/image/upload/c_scale,w_600/v1599596052/ScoutTrek/bikeride.jpg',
    },
  },
  {
    id: 5,
    eventType: 'Canoeing',
    subtitle: 'Spend some time at on the water, in style.',
    image: {
      uri:
        'https://res.cloudinary.com/wow-your-client/image/upload/c_scale,w_600/v1599596674/ScoutTrek/canoeing.jpg',
    },
  },
  {
    id: 6,
    eventType: 'Special Event',
    subtitle: "Plan an event that doesn't fit our templates above.",
    image: {
      uri:
        'https://res.cloudinary.com/wow-your-client/image/upload/c_scale,w_600/v1599241295/ScoutTrek/luke-porter-mGFJIUD9yiM-unsplash.jpg',
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
      <ViewHeading title="New Event" />
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
        onClick={() => navigation.navigate('UpcomingEvents')}
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
