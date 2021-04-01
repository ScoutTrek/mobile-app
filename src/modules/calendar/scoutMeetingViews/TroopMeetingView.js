import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ScrollView, Alert} from 'react-native';
import EventHeader from '../components/EventHeader';
import Colors from '../../../../constants/Colors';
import Fonts from '../../../../constants/Fonts';
import InlineButton from '../../../components/buttons/InlineButton';

import {GOOGLE_MAPS_API_KEY} from '../../../../env';

import {gql, useMutation, useQuery} from '@apollo/client';
import NoShadowPurpleBtn from '../../../components/buttons/NoShadowPurpleBtn';
import Location from '../../../components/EventInfoComponents/Location';
import Time from '../../../components/EventInfoComponents/Time';
import {DELETE_EVENT} from '../EventView';
import Description from '../../../components/EventInfoComponents/Description';
import {cloneDeep} from 'lodash';
import {eventData} from '../../../../App';
import Constants from 'expo-constants';

export const GET_SCOUT_MEETING = gql`
  query GetScoutMeeting($id: ID!) {
    event(id: $id) {
      id
      type
      title
      description
      datetime
      day
      location {
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

const TroopMeetingView = ({route, navigation}) => {
  const {currItem} = route.params;
  const {loading, error, data} = useQuery(GET_SCOUT_MEETING, {
    variables: {id: currItem},
  });

  const [deleteEvent] = useMutation(DELETE_EVENT);

  if (loading) return null;
  if (error) return `Error! ${error}`;

  const mapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${data.event.location.lat},${data.event.location.lng}&zoom=13&size=325x375&maptype=roadmap&markers=color:blue%7C${data.event.location.lat},${data.event.location.lng}&key=${GOOGLE_MAPS_API_KEY}`;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyles={{
        flexGrow: 1,
      }}>
      <EventHeader
        navigation={navigation}
        image_path={data.event.location ? mapUrl : null}
        title={data.event.title}
        name={data.event.creator.name}
        date={+data.event.datetime}
      />
      <Location
        heading="Meeting location"
        address={data.event.location.address}
      />

      <Time time={+data.event.datetime} text="event start time" />
      {data.event.description && (
        <Description description={data.event.description} />
      )}

      <View
        style={{
          marginHorizontal: 15,
          paddingBottom: 8,
          marginBottom: 8,
        }}>
        <Text style={styles.small}>Have questions?</Text>
        <NoShadowPurpleBtn
          onPress={() =>
            navigation.navigate('EventThread', {
              id: data.event.id,
              name: data.event.title,
              messages: data.event.messages,
            })
          }
        />
      </View>
      <View style={{marginHorizontal: 15, marginBottom: 12}}>
        <InlineButton
          title="Add Meeting Details"
          color={Colors.green}
          onPress={() =>
            navigation.navigate('AddTroopMeetingDescription', {currItem})
          }
        />
        <InlineButton
          title="Edit Meeting Logistics"
          onPress={() => {
            const troopMeetingData = cloneDeep(data.event);
            delete troopMeetingData.id;
            delete troopMeetingData.creator;
            eventData(troopMeetingData);
            navigation.navigate('EditTroopMeeting', {
              screen: 'EditEvent',
              params: {
                id: currItem,
                type: 'TroopMeeting',
              },
            });
          }}
        />
        <InlineButton
          title="Cancel"
          color={Colors.red}
          onPress={() =>
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
            )
          }
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    backgroundColor: '#fff',
  },
  small: {
    padding: 4,
    fontSize: 13,
  },
});

export default TroopMeetingView;
