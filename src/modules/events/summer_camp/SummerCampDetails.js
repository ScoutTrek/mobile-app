import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';

import {GET_EVENTS} from '../../calendar/CalendarView';

import RTE from '../../../components/RichTextEditor';

import Colors from '../../../../constants/Colors';
import Constants from 'expo-constants';
import {gql} from '@apollo/client';
import {useMutation, useQuery} from '@apollo/react-hooks';
import {Ionicons} from '@expo/vector-icons';
import RichInputContainer from '../../../components/containers/RichInputContainer';
import SubmitBtn from '../../../components/buttons/SubmitButton';

const ADD_SUMMER_CAMP = gql`
  mutation AddSummerCamp($summer_camp: AddSummerCampInput!) {
    event: addSummerCamp(input: $summer_camp) {
      id
      type
      title
      description
      datetime
      location {
        lat
        lng
      }
      creator {
        id
        name
      }
    }
  }
`;

const GET_EXPO_TOKEN = gql`
  query GetToken {
    currUser {
      id
      expoNotificationToken @client
    }
  }
`;

const SummerCampDetails = ({navigation, route}) => {
  const {data} = useQuery(GET_EXPO_TOKEN);
  const [addSummerCamp] = useMutation(ADD_SUMMER_CAMP, {
    update(cache, {data: {event}}) {
      try {
        const {events} = cache.readQuery({query: GET_EVENTS});
        cache.writeQuery({
          query: GET_EVENTS,
          data: {events: events.concat([event])},
        });
      } catch {
        cache.writeQuery({
          query: GET_EVENTS,
          data: {events: [event]},
        });
      }
    },
  });

  const [description, setDescription] = useState('');

  const back = () => navigation.pop();

  const submit = () => {
    if (!description) {
      Alert.alert(
        'Looks like you forgot something.',
        "Are you sure you don't want to tell anything about the event."
      );
    }

    addSummerCamp({
      variables: {
        summer_camp: {
          title: route.params.name,
          description,
          startDatetime: route.params.datetime,
          endDatetime: route.params.endDatetime,
          datetime: route.params.datetime,
          meetTime: route.params.meetTime,
          leaveTime: route.params.leaveTime,
          checkoutTime: route.params.checkoutTime,
          location: {
            lng: route.params.location.longitude,
            lat: route.params.location.latitude,
          },
          meetLocation: {
            lng: route.params.meetLocation.longitude,
            lat: route.params.meetLocation.latitude,
          },
        },
      },
    })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    navigation.popToTop();
    navigation.pop();
    navigation.navigate('Calendar');
  };

  return (
    <RichInputContainer icon="back" back={back}>
      <RTE
        heading="What additional information do you want people to know about this summer camp?"
        description={description}
        setDescription={setDescription}
      />
      <SubmitBtn submit={submit} title="Complete" />
    </RichInputContainer>
  );
};

export default SummerCampDetails;
