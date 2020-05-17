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
} from 'react-native';

import {GET_EVENTS} from '../../calendar/CalendarView';

import RTE from '../../../components/RichTextEditor';
import {Calendar} from 'react-native-calendars';
import CalModal from '../../../components/CalModal';

import DateTimePicker from '@react-native-community/datetimepicker';

import Colors from '../../../../constants/Colors';
import Constants from 'expo-constants';
import {gql} from '@apollo/client';
import {useMutation, useQuery} from '@apollo/react-hooks';

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

const GET_EXPO_TOKEN = gql`
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
        console.log(addHike);
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

  const sendPushNotification = async (body) => {
    const message = {
      to: data.currUser.expoNotificationToken,
      sound: 'default',
      title: 'ScoutTrek Reminder',
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
    })
      .then((res) => {})
      .catch((err) => console.log(err));
    sendPushNotification(route.params.name);
    navigation.popToTop();
    navigation.pop();
    navigation.navigate('Calendar');
  };

  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={0}
      style={{flex: 1}}
      enabled>
      <ScrollView contentContainerStyles={{flexGrow: 1}}>
        <View style={styles.endTimeContainer}>
          <Text style={styles.formHeading}>
            Roughly what time will the event end?
          </Text>
          <View style={styles.dateTime}>
            <View style={styles.btns}>
              <Button
                title="Choose Time"
                onPress={() => setShowTimeModal(true)}
              />
            </View>
            <View style={styles.btns}>
              <Text>{time && time.toTimeString().substr(0, 5)}</Text>
            </View>
          </View>
        </View>
        <CalModal show={showDateModal} setShow={setShowDateModal}>
          <Calendar
            current={date}
            markedDates={{
              [date]: {
                selected: true,
                disableTouchEvent: true,
                selectedDotColor: 'orange',
              },
            }}
            onDayPress={(day) => {
              setDate(day.dateString);
            }}
          />
          <TouchableOpacity
            onPress={() => {
              setShowDateModal(false);
            }}
            style={{
              padding: 12,
              alignItems: 'center',
              backgroundColor: Colors.lightGray,
              borderRadius: 4,
            }}>
            <Text style={{fontSize: 18, fontFamily: 'oxygen-bold'}}>
              Choose Date
            </Text>
          </TouchableOpacity>
        </CalModal>
        <CalModal show={showTimeModal} setShow={setShowTimeModal}>
          <DateTimePicker
            value={time}
            minuteInterval={5}
            mode="time"
            is24Hour={false}
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
              backgroundColor: Colors.lightGray,
              borderRadius: 4,
            }}>
            <Text style={{fontSize: 18, fontFamily: 'oxygen-bold'}}>
              Choose Time
            </Text>
          </TouchableOpacity>
        </CalModal>

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

        <Text style={styles.formHeading}>
          What do you want people to know about the event?
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
  endTimeContainer: {
    marginTop: 10 + Constants.statusBarHeight,
    paddingHorizontal: 20,
  },
  input: {
    padding: 12,
    marginHorizontal: 15,
    borderRadius: 7,
    borderWidth: 1,
    flexDirection: 'row',
    flex: 1,
    fontSize: 15,
    fontFamily: 'oxygen',
    backgroundColor: '#fff',
    textAlignVertical: 'top',
    borderColor: Colors.primary,
  },
  dateTime: {
    flexDirection: 'row',
  },
  btns: {
    width: Dimensions.get('window').width / 2 - 30,
    margin: 15,
    justifyContent: 'space-evenly',
  },
  textEditor: {
    height: 80,
    backgroundColor: Colors.green,
  },
  textBar: {
    flex: 1,
    backgroundColor: Colors.offWhite,
  },
  formHeading: {
    borderColor: Colors.secondary,
    fontSize: 15,
    fontFamily: 'oxygen-bold',
    margin: 18,
  },
  distanceContainer: {
    width: '100%',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
  },
  displayContact: {
    marginHorizontal: 18,
  },
  sliderContainer: {
    flexDirection: 'row',
    flex: 1,
  },
  slider: {
    flex: 7,
    justifyContent: 'flex-start',
  },
  sliderText: {
    flex: 1,
    textAlignVertical: 'center',
    textAlign: 'center',
    fontSize: 18,
    fontFamily: 'oxygen-bold',
    paddingTop: 4,
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
});

export default HikeDetails;
