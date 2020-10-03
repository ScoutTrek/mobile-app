import React, {useState, useEffect} from 'react';
import {View, ScrollView, Platform, Alert} from 'react-native';
import * as ExpoLocation from 'expo-location';
import EventHeader from '../components/EventHeader';
import Location from '../../../components/EventInfoComponents/Location';
import Colors from '../../../../constants/Colors';
import Fonts from '../../../../constants/Fonts';
import InlineButton from '../../../components/buttons/InlineButton';
import Constants from 'expo-constants';

import {gql, useMutation, useQuery} from '@apollo/client';
import {deleteEventConfig, DELETE_EVENT} from '../hikeViews/HikeView';
import NoShadowPurpleBtn from '../../../components/buttons/NoShadowPurpleBtn';
import FormHeading from '../../../components/Headings/FormHeading';

import {GOOGLE_MAPS_API_KEY} from '../../../../env';

import Time from '../../../components/EventInfoComponents/Time';
import Description from '../../../components/EventInfoComponents/Description';
import {cloneDeep} from 'lodash';
import {eventData} from '../../events/event_components/ChooseName';

export const GET_SPECIAL_EVENT = gql`
  query GetSpecialEvent($id: ID!) {
    event(id: $id) {
      id
      title
      description
      datetime
      meetTime
      leaveTime
      endDatetime
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

const SpecialEventView = ({route, navigation}) => {
  const {currItem} = route.params;
  const {loading, error, data} = useQuery(GET_SPECIAL_EVENT, {
    fetchPolicy: 'network-only',
    variables: {id: currItem},
  });

  const [deleteEvent] = useMutation(DELETE_EVENT, deleteEventConfig);

  if (loading) return null;
  if (error) return `Error! ${error}`;

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
        date={+data.event.datetime}
        name={data.event.creator.name}
      />
      <Location
        heading="Event location"
        address={data.event.location.address}
      />
      <Location
        heading="Meet Place"
        address={data.event.meetLocation.address}
      />
      <Time time={+data.event.meetTime} text="arrive at meet place" />
      <Time time={+data.event.leaveTime} text="leave meet place" />

      <Description description={data.event.description} />

      <FormHeading title="Message Board" />
      <View
        style={{
          marginHorizontal: 15,
          paddingBottom: 8,
          marginBottom: 8,
        }}>
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
          title="Edit"
          onPress={() => {
            const specialEventData = cloneDeep(data.event);
            delete specialEventData.id;
            delete specialEventData.creator;
            eventData(specialEventData);
            navigation.navigate('EditCampout', {
              screen: 'EditEvent',
              params: {
                id: currItem,
                type: 'SpecialEvent',
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

export default SpecialEventView;
