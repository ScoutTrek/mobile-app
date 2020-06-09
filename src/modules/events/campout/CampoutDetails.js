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
import DateAndTimePicker from '../../../components/DateAndTimePicker';

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

  const sendPushNotification = async (body) => {
    const message = {
      to: data.currUser.expoNotificationToken,
      sound: 'default',
      title: 'ScoutTrek Alert',
      body: `${body} event has been created!`,
      icon: '../../assets/images/Icon.png',
    };
    const response = await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });
  };

  const back = () => navigation.goBack();

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
    Constants.isDevice && sendPushNotification(route.params.name);
    navigation.popToTop();
    navigation.pop();
    navigation.navigate('Calendar');
  };

  return (
    <KeyboardAvoidingView
      behavior="position"
      keyboardVerticalOffset={20}
      enabled>
      <ScrollView contentContainerStyles={{flexGrow: 1}}>
        <Ionicons
          name="ios-arrow-round-back"
          color={Colors.darkBrown}
          style={styles.backIcon}
          size={38}
          onPress={back}
        />
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
            <Text style={{fontSize: 18, fontFamily: 'oxygen-bold'}}>
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
        <Text style={styles.formHeading}>
          What do you want people to know about the camping trip?
        </Text>

        <RTE description={description} setDescription={setDescription} />

        <TouchableOpacity onPress={submit} style={styles.submitBtn}>
          <Text style={styles.text}>Complete</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  dateTime: {
    marginTop: 32 + Constants.statusBarHeight,
    padding: 10,
  },
  textEditor: {
    height: 80,
    backgroundColor: Colors.green,
  },
  formHeading: {
    borderColor: Colors.secondary,
    fontSize: 15,
    fontFamily: 'oxygen-bold',
    margin: 18,
  },
  endDateTime: {
    textAlign: 'center',
    fontSize: 20,
    fontFamily: 'oxygen',
    padding: 10,
  },
  submitBtn: {
    backgroundColor: Colors.green,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    height: 52,
  },
  text: {
    color: '#ffffff',
    fontSize: 18,
    fontFamily: 'oxygen-bold',
  },
  toolbarButton: {
    fontSize: 20,
    width: 28,
    height: 28,
    textAlign: 'center',
  },
  backIcon: {
    paddingVertical: Constants.statusBarHeight / 3 + 5,
    paddingHorizontal: 16,
    position: 'absolute',
    left: '1.5%',
    top: Constants.statusBarHeight / 2,
    zIndex: 1,
  },
});

export default CampoutDetails;
