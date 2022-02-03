import React from 'react';
import {Text, Alert, ScrollView} from 'react-native';
import EventHeader from './components/EventHeader';

import {GOOGLE_MAPS_API_KEY} from '../../../env';
import Constants from 'expo-constants';

import {gql, useMutation, useQuery} from '@apollo/client';
import Location from '../../components/EventInfoComponents/Location';
import Time from '../../components/EventInfoComponents/Time';

import Description from '../../components/EventInfoComponents/Description';
import {eventData} from '../../../App';
import {cloneDeep} from 'lodash';
import {GET_UPCOMING_EVENTS} from '../home/UpcomingEvents';
import {GET_EVENTS} from './CalendarView';
import {EVENT_FIELDS} from '../home/UpcomingEvents';
// import {ConfirmButton} from '@ScoutDesign';
import {Octicons, Ionicons} from '@expo/vector-icons';
import Colors from '../../../constants/Colors';
import InlineButton from '../../components/buttons/InlineButton';
import InfoRowSmall from '../../components/LayoutComponents/InfoRowSmall';

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
      ...EventFragment
    }
  }
  ${EVENT_FIELDS}
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

  const handleDeleteEvent = () => {
    Alert.alert(
      'Are you sure you want to cancel this event?',
      'This action cannot be undone.',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Confirm',
          onPress: async () => {
            await deleteEvent({
              variables: {
                id: data.event.id,
              },
            });
            navigation.goBack();
          },
        },
      ],
      {cancelable: true}
    );
  };

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
        backgroundColor: 'green',
      }}>
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
      {!data.event.endTime ? null : (
        <Time time={+data.event.endTime} text="estimated return" />
      )}

      <Description description={data.event.description} />

      <ConfirmButton
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
      <InfoRowSmall>
        <InlineButton
          title="Cancel event"
          color={Colors.red}
          onPress={handleDeleteEvent}
        />
      </InfoRowSmall>
    </ScrollView>
  );
};

export default EventDetailsScreen;
