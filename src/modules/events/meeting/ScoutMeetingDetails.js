import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Button,
  TextInput,
  Platform,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
} from 'react-native';

import DateTimePicker from '@react-native-community/datetimepicker';

import Colors from '../../../../constants/Colors';
import Constants from 'expo-constants';
import {Ionicons} from '@expo/vector-icons';
import Toggle from '../../../components/formfields/Toggle';
import RTE from '../../../components/RichTextEditor';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';
import {gql} from '@apollo/client';
import {useMutation, useQuery} from '@apollo/react-hooks';
import {GET_EVENTS} from '../../calendar/CalendarView';

export const weekDays = {
  SUNDAY: 0,
  MONDAY: 1,
  TUESDAY: 2,
  WEDNESDAY: 3,
  THURSDAY: 4,
  FRIDAY: 5,
  SATURDAY: 6,
};

export const getInitialDate = (target, current) => {
  target = +target;
  current = +current;
  if (target === current) {
    return 7;
  }
  if (target > current) {
    return target - current;
  } else {
    console.log(current, ' current', target, ' target');
    return 7 + target - current;
  }
};

const ADD_SCOUT_MEETING = gql`
  mutation AddScoutMeeting($scoutMeeting: AddScoutMeetingInput!) {
    event: addScoutMeeting(input: $scoutMeeting) {
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

const ScoutMeetingDetails = ({navigation, route}) => {
  const {data} = useQuery(GET_EXPO_TOKEN);
  const [addScoutMeeting] = useMutation(ADD_SCOUT_MEETING, {
    update(cache, {data: {event}}) {
      try {
        const {events} = cache.readQuery({query: GET_EVENTS});
        console.log('Is the cache trying to save?', event);
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

  // ## Below will become a reducer

  const [time, setTime] = useState(new Date(Date.now()));
  const [showClock, setShowClock] = useState(false);
  const [weekday, setWeekday] = useState('MONDAY');

  // Add meeting day ranges in the future.

  const [description, setDescription] = useState('');
  const [shakedownWeek, setShakedownWeek] = useState(false);

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
    const d = new Date();
    d.setDate(d.getDate() + getInitialDate(weekDays[weekday], d.getDay()));
    const datetime = new Date(
      d.toISOString().split('T')[0] + 'T' + time.toTimeString().split(' ')[0]
    );
    const scoutMeeting = {
      title: 'Troop Meeting',
      description,
      datetime,
      day: weekday,
      time,
      shakedown: shakedownWeek,
      location: {
        lng: route.params['ChooseLocation'].longitude,
        lat: route.params['ChooseLocation'].latitude,
      },
    };
    addScoutMeeting({
      variables: {
        scoutMeeting,
      },
    }).catch((err) => console.log(err));
    Constants.isDevice && sendPushNotification('Troop Meeting');
    navigation.popToTop();
    navigation.pop();
    navigation.navigate('Calendar');
  };

  return (
    <KeyboardAvoidingView style={{flex: 1}} behavior="padding" enabled>
      <ScrollView contentContainerStyle={{flexGrow: 1, width: '100%'}}>
        <View style={styles.screen}>
          <Text style={styles.formHeading}>
            What day will this Troop Meeting be on?
          </Text>
          <View style={styles.time}>
            <RadioForm
              radio_props={[
                {label: 'M', value: 'MONDAY'},
                {label: 'T', value: 'TUESDAY'},
                {label: 'W', value: 'WEDNESDAY'},
                {label: 'Th', value: 'THURSDAY'},
                {label: 'F', value: 'FRIDAY'},
                {label: 'S', value: 'SATURDAY'},
                {label: 'Su', value: 'SUNDAY'},
              ]}
              buttonSize={Dimensions.get('window').width / 14}
              formHorizontal={true}
              labelHorizontal={false}
              buttonColor={'#2196f3'}
              initial={'MONDAY'}
              onPress={(value) => setWeekday(value)}
            />
          </View>
          <Text style={styles.formHeading}>What time will you start?</Text>
          <View style={styles.dateTime}>
            <Button
              title="Pick a time"
              onPress={() => {
                showClock ? setShowClock(false) : setShowClock(true);
              }}
            />
            {showClock && (
              <DateTimePicker
                value={time}
                minuteInterval={10}
                mode="time"
                is24Hour={false}
                display="default"
                onChange={(event, date) => {
                  setTime(new Date(date));
                }}
              />
            )}
          </View>

          <Text style={styles.formHeading}>
            What activities will be taking place this week?
          </Text>
        </View>

        <RTE description={description} setDescription={setDescription} />

        <Toggle
          heading="Will there be a shakedown this week?"
          active={shakedownWeek}
          onChange={setShakedownWeek}
        />

        <TouchableOpacity onPress={submit} style={styles.submitBtn}>
          <Text style={styles.text}>Complete</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
  dateTime: {
    margin: 15,
  },
  time: {
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 12,
    // justifyContent: 'center',
    alignItems: 'center',
  },
  formHeading: {
    borderColor: Colors.secondary,
    fontSize: 15,
    fontFamily: 'oxygen-bold',
    marginTop: 25,
    margin: 18,
  },
  submitBtn: {
    backgroundColor: Colors.green,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    height: 62,
  },
  text: {
    color: '#ffffff',
    fontSize: 18,
    fontFamily: 'oxygen-bold',
  },
});

export default ScoutMeetingDetails;
