import React from 'react';
import {StyleSheet, View, ActivityIndicator, FlatList} from 'react-native';

import Constants from 'expo-constants';

import ViewHeading from '../../components/Headings/ViewHeading';
import NextButton from '../../components/buttons/NextButton';

import EventBtn from './components/EventBtn';
import Colors from '../../../constants/Colors';
import {gql, useQuery} from '@apollo/client';

export const GET_EVENT_SCHEMAS = gql`
  query EventSchemas {
    eventSchemas
  }
`;

const listData = [
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
    id: 5,
    eventType: 'Canoeing',
    subtitle: 'Spend some time at on the water, in style.',
    image: {
      uri:
        'https://res.cloudinary.com/wow-your-client/image/upload/c_scale,w_600/v1599596674/ScoutTrek/canoeing.jpg',
    },
  },
  {
    id: 3,
    eventType: 'Backpacking',
    title: 'CITIZEN ECO-DRIVE',
    subtitle: "It's like hiking, but more Pro.",
    badge: 'NEW',
    badgeColor: 'green',
    image: {
      uri:
        'https://res.cloudinary.com/wow-your-client/image/upload/c_scale,w_600/v1582556924/ScoutTrek/backpacking_trip.png',
    },
  },
];

const EventTypesScreen = ({navigation}) => {
  const {loading, error, data} = useQuery(GET_EVENT_SCHEMAS);

  if (loading) {
    return <ActivityIndicator />;
  }

  const eventSchemasArr = Object.values(data['eventSchemas']);

  return (
    <View style={styles.container}>
      <ViewHeading title="New Event" />
      <FlatList
        contentContainerStyle={{flexGrow: 1, paddingBottom: 15}}
        keyExtractor={(item) => item.metaData.eventID}
        data={eventSchemasArr}
        renderItem={({item}) => {
          return (
            <EventBtn
              item={item.metaData}
              onPress={() =>
                navigation.navigate('CreateEvent', {
                  type: item.metaData.eventID,
                })
              }
            />
          );
        }}
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
