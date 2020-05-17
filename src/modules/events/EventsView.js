import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Platform,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  ImageBackground,
  Dimensions,
} from 'react-native';

import Constants from 'expo-constants';

import colors from '../../styles/colors';
import fonts from '../../styles/fonts';

import {LinearGradient} from 'expo-linear-gradient';
import Heading from '../../components/Heading';
import NextButton from '../../components/buttons/NextButton';
import Colors from '../../../constants/Colors';

const listData = [
  {
    id: 0,
    eventType: 'Hiking',
    title: 'CITIZEN ECO-DRIVE',
    subtitle:
      'Plan a visit to the trail for the day, let ScoutTrek take care of everything else.',
    badge: 'NEW',
    badgeColor: '#3cd39f',
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
    priceFrom: true,
    image: {
      uri:
        'https://res.cloudinary.com/wow-your-client/image/upload/c_scale,w_600/v1582557266/ScoutTrek/ScoutBadgesImage.jpg',
    },
  },
  {
    id: 2,
    eventType: 'Camping',
    title: 'CITIZEN ECO-DRIVE',
    subtitle: 'Spend a few days in the wild outdoors.',
    priceFrom: true,
    badge: 'SALE',
    badgeColor: '#ee1f78',
    image: {
      uri:
        'https://res.cloudinary.com/wow-your-client/image/upload/c_scale,w_600/v1582556922/ScoutTrek/campfire.png',
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

  const _getRenderItemFunction = (index, item) =>
    [
      hikingBtn(item),
      troopMeetingBtn(item),
      campingBtn(item),
      backpackingBtn(item),
    ][index];

  const _openEventCreator = (route, data) => {
    navigation.navigate(route, {...data});
  };

  const hikingBtn = (item) => (
    <TouchableOpacity
      key={item.id}
      style={styles.eventContainer}
      onPress={() => _openEventCreator('Hike', item)}>
      <View style={styles.eventContent}>
        <LinearGradient
          colors={['rgba(32,32,32,.35)', 'rgba(32,32,32,.75)']}
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

  const troopMeetingBtn = (item) => (
    <TouchableOpacity
      key={item.id}
      style={styles.eventContainer}
      onPress={() => _openEventCreator('ScoutMeeting', item)}>
      <View style={styles.eventContent}>
        <LinearGradient
          colors={['rgba(32,32,32,.65)', 'rgba(32,32,32,.75)']}
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

  const campingBtn = (item) => (
    <TouchableOpacity
      key={item.id}
      style={styles.eventContainer}
      onPress={() => _openEventCreator('Campout', item)}>
      <View style={styles.eventContent}>
        <LinearGradient
          colors={['rgba(32,32,32,0)', 'rgba(32,32,32,.75)']}
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

  const backpackingBtn = (item) => (
    <TouchableOpacity
      key={item.id}
      style={styles.eventContainer}
      onPress={() => _openArticle(item)}>
      <View style={styles.eventContent}>
        <LinearGradient
          colors={['rgba(32,32,32,.45)', 'rgba(32,32,32,.75)']}
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

  return (
    <View style={styles.container}>
      <Heading title="New Event" />
      <FlatList
        contentContainerStyle={{flexGrow: 1, paddingBottom: 15}}
        keyExtractor={(item) => item.id.toString()}
        style={{
          backgroundColor: colors.white,
          width: '100%',
        }}
        data={data}
        renderItem={({index, item}) => {
          return _getRenderItemFunction(index, item);
        }}
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
    fontFamily: fonts.primaryBold,
    fontSize: 24,
    textShadowOffset: {width: 0, height: 0},
    textShadowRadius: 5,
    textShadowColor: '#000',
    paddingHorizontal: 20,
    paddingTop: 32,
  },
  eventSubTitle: {
    color: 'white',
    fontFamily: fonts.primaryRegular,
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

export default EventTypesScreen;
