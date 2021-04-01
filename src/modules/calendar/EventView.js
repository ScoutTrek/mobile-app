import React, {useEffect, useState} from 'react';
import {View, Text, Alert, ScrollView, Dimensions} from 'react-native';
import EventHeader from './components/EventHeader';
import Colors from '../../../constants/Colors';
import Fonts from '../../../constants/Fonts';
import InlineButton from '../../components/buttons/InlineButton';

import {GOOGLE_MAPS_API_KEY} from '../../../env';

import {gql, useMutation, useQuery} from '@apollo/client';
import NoShadowPurpleBtn from '../../components/buttons/NoShadowPurpleBtn';
import Location from '../../components/EventInfoComponents/Location';
import Time from '../../components/EventInfoComponents/Time';
import Constants from 'expo-constants';
import Description from '../../components/EventInfoComponents/Description';
import {eventData} from '../../../App';
import {cloneDeep} from 'lodash';
import {GET_UPCOMING_EVENTS} from '../home/UpcomingEvents';
import {GET_EVENTS} from './CalendarView';
import ConfirmCircle from '../../components/buttons/ConfirmCircle';
import {Octicons} from '@expo/vector-icons';

export const DELETE_EVENT = gql`
  mutation DeleteEvent($id: ID!) {
    deleteEvent(id: $id) {
      id
    }
  }
`;

export const GET_EVENT = gql`
  query GetEvent($id: ID!) {
    event(id: $id) {
      id
      type
      title
      description
      date
      startTime
      distance
      uniqueMeetLocation
      meetTime
      leaveTime
      endTime
      endDate
      location {
        lat
        lng
        address
      }
      meetLocation {
        lat
        lng
        address
      }
      creator {
        id
        name
      }
    }
  }
`;

export const deleteEventConfig = {
  update(cache, {data: {deleteEvent}}) {
    try {
      const {events} = cache.readQuery({query: GET_EVENTS});
      const updatedEvents = events.filter((t) => t.id !== deleteEvent.id);
      cache.writeQuery({
        query: GET_EVENTS,
        data: {events: updatedEvents},
      });
    } catch (err) {}
    const {upcomingEvents} = cache.readQuery({query: GET_UPCOMING_EVENTS});
    const updatedUpcomingEvents = upcomingEvents.filter(
      (t) => t.id !== deleteEvent.id
    );

    cache.writeQuery({
      query: GET_UPCOMING_EVENTS,
      data: {upcomingEvents: updatedUpcomingEvents},
    });
  },
};

const EventDetailsScreen = ({route, navigation}) => {
  const {currItem} = route.params;
  const {loading, error, data} = useQuery(GET_EVENT, {
    variables: {id: currItem},
  });
  const [deleteEvent] = useMutation(DELETE_EVENT, deleteEventConfig);

  const addEventToCache = () => {
    const localEventData = cloneDeep(data.event);
    delete localEventData.id;
    delete localEventData.creator;
    eventData(localEventData);
  };

  if (loading) return null;
  if (error)
    return <Text style={{paddingTop: 50}}>`Error! ${error.toString()}`</Text>;

  // Clear database and
  let mapUrl;
  if (data.event.location) {
    mapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${data.event.location.lat},${data.event.location.lng}&zoom=13&size=325x375&maptype=roadmap&markers=color:blue%7C${data.event.location.lat},${data.event.location.lng}&key=${GOOGLE_MAPS_API_KEY}`;
  }
  return (
    <ScrollView
      style={{
        marginTop: Constants.statusBarHeight,
        backgroundColor: '#fff',
      }}
      contentContainerStyles={{
        flexGrow: 1,
      }}>
      <EventHeader
        navigation={navigation}
        image_path={data.event.location ? mapUrl : null}
        title={data.event.title}
        name={data.event.creator.name}
        date={+data.event.date}
        onPress={() => {
          navigation.navigate('Threads', {
            id: data.event.id,
            name: data.event.title,
            messages: data.event.messages,
          });
        }}
      />
      {data.event.meetLocation ? (
        <>
          <Location
            heading="Meet Place"
            address={data.event.meetLocation.address}
          />
          <Time time={+data.event.meetTime} text="arrive at meet place" />
          <Time time={+data.event.leaveTime} text="leave meet place" />
        </>
      ) : null}

      <Location
        heading="Event location"
        address={data.event.location.address}
      />
      <Time time={+data.event.startTime} text="event start time" />
      <Description description={data.event.description} />

      <ConfirmCircle
        icon={<Octicons name="pencil" size={24} color="#fff" />}
        onClick={() => {
          addEventToCache();
          navigation.navigate('CreateEvent', {
            type: data.event.type,
            id: data.event.id,
            update: true,
          });
        }}
      />
    </ScrollView>
  );
};

export default EventDetailsScreen;
