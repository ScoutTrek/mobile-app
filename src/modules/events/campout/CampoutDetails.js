import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  Button,
  TextInput,
  Switch,
  Slider,
  Platform,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
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

  const [showStartDatetime, setShowStartDatetime] = useState(false);
  const [showEndDatetime, setShowEndDatetime] = useState(false);

  const [startDate, setStartDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endDate, setEndDate] = useState('');
  const [endTime, setEndTime] = useState('');

  const [description, setDescription] = useState('');
  const [title, setTitle] = useState('');

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
    const startDatetime = `${startDate}T${
      startTime.toISOString().split('T')[1]
    }`;
    const endDatetime = `${endDate}T${endTime.toISOString().split('T')[1]}`;

    addCampout({
      variables: {
        campout: {
          title,
          description,
          startDatetime,
          // create multi-day events
          datetime: startDatetime,
          endDatetime,
          location: {
            lng: route.params['ChooseLocation'].longitude,
            lat: route.params['ChooseLocation'].latitude,
          },
          meetLocation: {
            lng: route.params['ChooseMeetPoint'].longitude,
            lat: route.params['ChooseMeetPoint'].latitude,
          },
        },
      },
    })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    sendPushNotification(title);
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
        <View style={styles.inputContainer}>
          <Text style={styles.formHeading}>What will the event be called?</Text>
          <TextInput
            style={styles.input}
            onChangeText={setTitle}
            value={title}
            placeholder="Event Name"
            placeholderTextColor={Colors.placeholderTextColor}
          />
        </View>
        <View style={styles.dateTime}>
          <TouchableOpacity
            onPress={() => {
              setShowStartDatetime(true);
            }}
            style={{
              padding: 12,
              margin: 5,
              alignItems: 'center',
              backgroundColor: Colors.lightGreen,
              borderRadius: 4,
            }}>
            <Text style={{fontSize: 18, fontFamily: 'oxygen-bold'}}>
              {!startTime
                ? `When you will depart...`
                : `Change when you will leave...`}
            </Text>
          </TouchableOpacity>
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
              {!endTime
                ? `When will you return...`
                : `Change when you will return...`}
            </Text>
          </TouchableOpacity>
        </View>

        <CalModal show={showStartDatetime} setShow={setShowStartDatetime}>
          {!startDate ? (
            <View>
              <Calendar
                current={startDate}
                markedDates={{
                  [startDate]: {
                    selected: true,
                    disableTouchEvent: true,
                  },
                }}
                onDayPress={(day) => {
                  setStartDate(day.dateString);
                }}
              />
              <TouchableOpacity
                onPress={() => {
                  setShowStartDatetime(false);
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
            </View>
          ) : (
            <View>
              <DateTimePicker
                value={startTime || new Date()}
                minuteInterval={5}
                mode="time"
                is24Hour={false}
                display="default"
                onChange={(event, date) => {
                  setStartTime(new Date(date));
                }}
              />
              <TouchableOpacity
                onPress={() => {
                  setShowStartDatetime(false);
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
            </View>
          )}
        </CalModal>

        <CalModal show={showEndDatetime} setShow={setShowEndDatetime}>
          {!endDate ? (
            <View>
              <Calendar
                current={endDate}
                markedDates={{
                  [endDate]: {
                    selected: true,
                    disableTouchEvent: true,
                  },
                }}
                onDayPress={(day) => {
                  setEndDate(day.dateString);
                }}
              />
              <TouchableOpacity
                onPress={() => {
                  setShowEndDatetime(false);
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
            </View>
          ) : (
            <View>
              <DateTimePicker
                value={endTime || new Date()}
                minuteInterval={5}
                mode="time"
                is24Hour={false}
                display="default"
                onChange={(event, date) => {
                  setEndTime(new Date(date));
                }}
              />
              <TouchableOpacity
                onPress={() => {
                  setShowEndDatetime(false);
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
            </View>
          )}
        </CalModal>
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
  inputContainer: {
    width: '100%',
    marginTop: 10 + Constants.statusBarHeight,
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
    marginTop: 15,
    padding: 10,
  },
  btns: {
    width: Dimensions.get('window').width / 2 - 30,
    height: Dimensions.get('window').height / 5,
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
    marginTop: 15,
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

export default CampoutDetails;
