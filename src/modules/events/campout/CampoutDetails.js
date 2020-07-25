import React, {useState, useRef} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';

import {GET_EVENTS} from '../../calendar/CalendarView';

import RTE from '../../../components/RichTextEditor';

import Colors from '../../../../constants/Colors';
import Fonts from '../../../../constants/Fonts';
import Constants from 'expo-constants';
import {gql} from '@apollo/client';
import {useMutation, useQuery} from '@apollo/react-hooks';
import {Ionicons} from '@expo/vector-icons';
import DateAndTimePicker from '../../../components/formfields/DateAndTimePicker';
import RichInputContainer from '../../../components/containers/RichInputContainer';
import SubmitBtn from '../../../components/buttons/SubmitButton';

const ADD_CAMPOUT = gql`
  mutation AddCampout($campout: AddCampoutInput!) {
    event: addCampout(input: $campout) {
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

const CampoutDetails = ({navigation, route}) => {
  const {data} = useQuery(GET_EXPO_TOKEN);
  const [addCampout] = useMutation(ADD_CAMPOUT, {
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

  const [showEndDatetime, setShowEndDatetime] = useState(false);

  const [endDate, setEndDate] = useState('');
  const [endTime, setEndTime] = useState(new Date());

  const [description, setDescription] = useState('');

  const back = () => navigation.pop();

  const submit = () => {
    if (!endDate) {
      Alert.alert(
        'Looks like you forgot something.',
        'Please make sure to choose when your event will end.'
      );
      return;
    } else if (!description) {
      Alert.alert(
        'Looks like you forgot something.',
        "Are you sure you don't want to tell anything about the event."
      );
    }
    const endDatetime = `${endDate}T${endTime.toISOString().split('T')[1]}`;

    addCampout({
      variables: {
        campout: {
          title: route.params.name,
          description,
          startDatetime: route.params.datetime,
          datetime: route.params.datetime,
          endDatetime,
          meetTime: route.params.meetTime,
          leaveTime: route.params.leaveTime,
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
      <View style={styles.dateTime}>
        <TouchableOpacity
          onPress={() => {
            setShowEndDatetime(true);
          }}
          style={{
            padding: 12,
            margin: 5,
            alignItems: 'center',
            backgroundColor: Colors.lightGreen,
            borderRadius: 4,
          }}>
          <Text style={{fontSize: 18, fontFamily: Fonts.primaryTextBold}}>
            When will you return...
          </Text>
        </TouchableOpacity>
      </View>
      <DateAndTimePicker
        chooseDay={route.params.chooseDate}
        chooseTime={route.params.chooseTime}
        nextForm={() => setShowEndDatetime(false)}
        date={endDate}
        setDate={setEndDate}
        time={endTime}
        setTime={setEndTime}
        showModal={showEndDatetime}
        setShowModal={setShowEndDatetime}
      />
      {endDate !== '' && (
        <Text style={styles.endDateTime}>
          {new Date(endDate).toLocaleDateString()},{' '}
          {endTime.toLocaleTimeString([], {
            hour: 'numeric',
            minute: '2-digit',
          })}
        </Text>
      )}

      <RTE
        heading="What additional information do you want people to know about this campout?"
        description={description}
        setDescription={setDescription}
      />
      <SubmitBtn submit={submit} title="Complete" />
    </RichInputContainer>
  );
};

const styles = StyleSheet.create({
  dateTime: {
    paddingTop: 10,
    paddingHorizontal: 10,
  },
  endDateTime: {
    textAlign: 'center',
    fontSize: 20,
    fontFamily: Fonts.primaryText,
    padding: 10,
  },
});

export default CampoutDetails;
