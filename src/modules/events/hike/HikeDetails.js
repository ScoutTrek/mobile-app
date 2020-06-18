import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  Button,
  TextInput,
  Modal,
  Slider,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import {Notifications} from 'expo';

import {GET_EVENTS} from '../../calendar/CalendarView';

import RTE from '../../../components/RichTextEditor';
import {Calendar} from 'react-native-calendars';
import CalModal from '../../../components/CalModal';

import DateTimePicker from '@react-native-community/datetimepicker';

import Colors from '../../../../constants/Colors';
import Constants from 'expo-constants';
import {gql} from '@apollo/client';
import {useMutation, useQuery} from '@apollo/react-hooks';
import {Ionicons} from '@expo/vector-icons';
import ShowChosenTimeRow from '../../../components/ShowChosenTimeRow';
import RichInputContainer from '../../../components/containers/RichInputContainer';
import SubmitBtn from '../../../components/buttons/SubmitButton';

const ADD_HIKE = gql`
  mutation AddHike($hike: AddHikeInput!) {
    addHike(input: $hike) {
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

export const GET_EXPO_TOKEN = gql`
  query GetToken {
    currUser {
      id
      expoNotificationToken @client
    }
  }
`;

const HikeDetails = ({navigation, route}) => {
  const {data} = useQuery(GET_EXPO_TOKEN);

  const [addHike] = useMutation(ADD_HIKE, {
    update(cache, {data: {addHike}}) {
      try {
        const {events} = cache.readQuery({query: GET_EVENTS});
        cache.writeQuery({
          query: GET_EVENTS,
          data: {events: events.concat([addHike])},
        });
      } catch {
        cache.writeQuery({
          query: GET_EVENTS,
          data: {events: [addHike]},
        });
      }
    },
  });

  const [date, setDate] = useState('');
  const [time, setTime] = useState(new Date());
  const [showDateModal, setShowDateModal] = useState(false);
  const [showTimeModal, setShowTimeModal] = useState(false);

  // description
  const [description, setDescription] = useState([]);

  // display contact
  const [distance, setDistance] = useState(1);

  // try {
  //   await Notifications.scheduleLocalNotificationAsync(reminder, {
  //     time: new Date(+date).getTime() + 86400000,
  //   });
  // } catch (err) {
  //   return console.log(err);
  // }

  const back = () => {
    navigation.pop();
  };

  const submit = () => {
    addHike({
      variables: {
        hike: {
          title: route.params.name,
          description,
          datetime: route.params.datetime,
          meetTime: route.params.meetTime,
          leaveTime: route.params.leaveTime,
          distance,
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
    }).catch((err) => console.log(err));
    console.log('success!');
    navigation.popToTop();
    navigation.pop();
    navigation.navigate('Calendar');
  };

  return (
    <RichInputContainer icon="back" back={back}>
      <View style={styles.distanceContainer}>
        <Text style={styles.formHeading}>Hike Distance (in miles)?</Text>
        <View style={styles.sliderContainer}>
          <Slider
            minimumValue={1}
            maximumValue={20}
            step={1}
            style={styles.slider}
            value={distance}
            onValueChange={setDistance}
          />
          <Text style={styles.sliderText}>{distance}</Text>
        </View>
      </View>
      <View style={styles.endTimeContainer}>
        {/*<ShowChosenTimeRow*/}
        {/*  description="Name"*/}
        {/*  value={route.params.name}*/}
        {/*  color={Colors.lightOrange}*/}
        {/*  icon="ios-information-circle"*/}
        {/*/>*/}
        {/*<ShowChosenTimeRow*/}
        {/*  description="Event Time"*/}
        {/*  value={new Date(route.params.datetime).toLocaleTimeString([], {*/}
        {/*    hour: 'numeric',*/}
        {/*    minute: '2-digit',*/}
        {/*  })}*/}
        {/*/>*/}
        {/*<ShowChosenTimeRow*/}
        {/*  description="Meet Time"*/}
        {/*  value={new Date(route.params.meetTime).toLocaleTimeString([], {*/}
        {/*    hour: 'numeric',*/}
        {/*    minute: '2-digit',*/}
        {/*  })}*/}
        {/*/>*/}

        <Text style={styles.formHeading}>
          Roughly what time will the event end?
        </Text>
        <View style={styles.dateTime}>
          <TouchableOpacity
            style={styles.chooseEndTimeBtn}
            onPress={() => setShowTimeModal(true)}>
            <Text
              style={{
                color: '#fff',
                fontFamily: 'oxygen-bold',
              }}>
              Choose Time
            </Text>
          </TouchableOpacity>
          <View>
            <Text
              style={{
                fontFamily: 'oxygen',
                fontSize: 18,
              }}>
              {time &&
                time.toLocaleTimeString([], {
                  hour: 'numeric',
                  minute: '2-digit',
                })}{' '}
              {time === new Date() && `(current time)`}
            </Text>
          </View>
        </View>
      </View>
      <CalModal show={showTimeModal} setShow={setShowTimeModal}>
        <DateTimePicker
          value={time}
          minuteInterval={5}
          mode="time"
          isa24Hour={false}
          display="default"
          onChange={(event, date) => {
            setTime(new Date(date));
          }}
        />
        <TouchableOpacity
          onPress={() => {
            setShowTimeModal(false);
          }}
          style={{
            padding: 12,
            alignItems: 'center',
            backgroundColor: Colors.lightGreen,
            borderRadius: 4,
          }}>
          <Text style={{fontSize: 18, fontFamily: 'oxygen-bold'}}>
            Choose Time
          </Text>
        </TouchableOpacity>
      </CalModal>

      <RTE
        heading="What additional information do you want people to know about this hike?"
        description={description}
        setDescription={setDescription}
      />
      <SubmitBtn submit={submit} title="Complete" />
    </RichInputContainer>
  );
};

const styles = StyleSheet.create({
  endTimeContainer: {
    marginTop: 10,
    marginBottom: 20,
  },
  dateTime: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginTop: 12,
  },
  chooseEndTimeBtn: {
    backgroundColor: Colors.purple,
    padding: 8,
    borderRadius: 8,
  },
  formHeading: {
    borderColor: Colors.secondary,
    fontSize: 15,
    fontFamily: 'oxygen-bold',
    marginHorizontal: 22,
    marginVertical: 18,
  },
  sliderContainer: {
    flexDirection: 'row',
    flex: 1,
    marginLeft: 28,
    marginRight: 8,
  },
  slider: {
    flex: 7,
    justifyContent: 'center',
  },
  sliderText: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    fontFamily: 'oxygen-bold',
    paddingTop: 5,
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
  backIcon: {
    paddingVertical: Constants.statusBarHeight / 3 + 5,
    paddingHorizontal: 16,
    position: 'absolute',
    left: '1.5%',
    top: Constants.statusBarHeight / 2,
    zIndex: 1,
  },
});

export default HikeDetails;
