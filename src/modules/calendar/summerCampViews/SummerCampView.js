import React, {useEffect, useState} from 'react';
import {View, Alert, ScrollView} from 'react-native';
import {WebView} from 'react-native-webview';
import EventHeader from '../components/EventHeader';
import Colors from '../../../../constants/Colors';
import Fonts from '../../../../constants/Fonts';
import InlineButton from '../../../components/buttons/InlineButton';

import {GOOGLE_MAPS_API_KEY} from '../../../../env';

import {gql, useMutation, useQuery} from '@apollo/client';
import NoShadowPurpleBtn from '../../../components/buttons/NoShadowPurpleBtn';
import RichInputContainer from '../../../components/containers/RichInputContainer';
import {cloneDeep} from 'lodash';
import {eventData} from '../../events/event_components/ChooseName';
import Constants from 'expo-constants';
import Location from '../../../components/EventInfoComponents/Location';
import Time from '../../../components/EventInfoComponents/Time';
import Description from '../../../components/EventInfoComponents/Description';
import FormHeading from '../../../components/Headings/FormHeading';
import {DELETE_EVENT, getAddress} from '../campoutViews/CampoutView';
import {deleteEventConfig} from '../hikeViews/HikeView';

export const GET_SUMMER_CAMP = gql`
  query GetSummerCamp($id: ID!) {
    event: summerCamp(id: $id) {
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

const SummerCampDetailsScreen = ({route, navigation}) => {
  const {currItem} = route.params;
  const {loading, error, data} = useQuery(GET_SUMMER_CAMP, {
    fetchPolicy: 'network-only',
    variables: {id: currItem},
  });

  const [deleteEvent] = useMutation(DELETE_EVENT, deleteEventConfig);

  const [address, setAddress] = useState('');
  const [meetAddress, setMeetAddress] = useState('');

  useEffect(() => {
    const getAddresses = async () => {
      const address = await getAddress(
        +data.event.location.lat,
        +data.event.location.lng
      );
      const meetAddress = await getAddress(
        +data.event.meetLocation.lat,
        +data.event.meetLocation.lng
      );
      Promise.all([address, meetAddress]).then((values) => {
        setAddress(address);
        setMeetAddress(meetAddress);
      });
    };
    if (data && !address) {
      getAddresses();
    }
  }, [data]);

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
      <Location heading="Event location" address={address} />
      <Location heading="Meet Place" address={meetAddress} />
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

export default SummerCampDetailsScreen;
