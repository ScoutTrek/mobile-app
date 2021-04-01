import React, {useEffect, useState} from 'react';
import {View, Alert, ScrollView} from 'react-native';
import EventHeader from '../components/EventHeader';
import Colors from '../../../../constants/Colors';
import Fonts from '../../../../constants/Fonts';
import InlineButton from '../../../components/buttons/InlineButton';

import {GOOGLE_MAPS_API_KEY} from '../../../../env';

import {gql, useMutation, useQuery} from '@apollo/client';
import NoShadowPurpleBtn from '../../../components/buttons/NoShadowPurpleBtn';
import {cloneDeep} from 'lodash';
import {eventData} from '../../../../App';
import Constants from 'expo-constants';
import Location from '../../../components/EventInfoComponents/Location';
import Time from '../../../components/EventInfoComponents/Time';
import Description from '../../../components/EventInfoComponents/Description';
import FormHeading from '../../../components/Headings/FormHeading';
import {DELETE_EVENT} from '../EventView';
import {deleteEventConfig} from '../EventView';

export const GET_SUMMER_CAMP = gql`
  query GetSummerCamp($id: ID!) {
    event(id: $id) {
      id
      title
      description
      datetime
      meetTime
      leaveTime
      endDatetime
      pickupTime
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

const SummerCampView = ({route, navigation}) => {
  const {currItem} = route.params;
  const {loading, error, data} = useQuery(GET_SUMMER_CAMP, {
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
            const campoutData = cloneDeep(data.event);
            delete campoutData.id;
            delete campoutData.creator;
            eventData(campoutData);
            navigation.navigate('EditCampout', {
              screen: 'EditEvent',
              params: {
                id: currItem,
                type: 'Campout',
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

export default SummerCampView;
