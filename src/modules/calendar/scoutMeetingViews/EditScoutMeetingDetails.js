import React, {useState} from 'react';
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
  KeyboardAvoidingView,
} from 'react-native';

import DateTimePicker from '@react-native-community/datetimepicker';
import NextButton from '../../../components/buttons/NextButton';

import Colors from '../../../../constants/Colors';
import Constants from 'expo-constants';
import {Ionicons} from '@expo/vector-icons';
import {useQuery, useMutation} from '@apollo/react-hooks';
import {gql} from '@apollo/client';
import {GET_EVENTS} from '../CalendarView';
import RadioForm from 'react-native-simple-radio-button';
import RTE from '../../../components/RichTextEditor';
import Toggle from '../../../components/formfields/Toggle';
import {GET_SCOUT_MEETING} from '../scoutMeetingViews/ScoutMeetingView';
import {
  getInitialDate,
  weekDays,
} from '../../events/meeting/ScoutMeetingDetails';

const UPDATE_SCOUT_MEETING = gql`
  mutation UpdateScoutMeeting($id: ID!, $updates: UpdateScoutMeetingInput!) {
    event: updateScoutMeeting(id: $id, input: $updates) {
      id
      type
      title
      description
      date
      time
      datetime
      day
      shakedown
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

const EditScoutMeetingDetails = ({navigation, route}) => {
  const {currItem} = route.params;
  const {
    loading,
    error,
    data: {event},
  } = useQuery(GET_SCOUT_MEETING, {
    variables: {id: currItem},
  });

  const [updateScoutMeeting] = useMutation(UPDATE_SCOUT_MEETING);
  // ## Below will become a reducer

  const [time, setTime] = useState(new Date(+event.datetime));
  const [value, setValue] = useState(event.day);
  // const [startDate, setStartDate] = useState(new Date(Date.now()));
  // const [endDate, setEndDate] = useState(new Date(Date.now()));

  const [description, setDescription] = useState(event.description);
  const [shakedownWeek, setShakedownWeek] = useState(event.shakedown);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error...</Text>;

  const back = () => navigation.goBack();
  const submit = () => {
    const d = new Date();
    d.setDate(d.getDate() + getInitialDate(weekDays[value], d.getDay()));
    const datetime = new Date(
      d.toISOString().split('T')[0] + 'T' + time.toTimeString().split(' ')[0]
    );
    console.log(shakedownWeek);
    const scoutMeeting = {
      title: 'Troop Meeting',
      description,
      datetime,
      day: value,
      time,
      shakedown: shakedownWeek,
    };
    updateScoutMeeting({
      variables: {
        id: event.id,
        updates: scoutMeeting,
      },
    }).then((res) => console.log(res));
    navigation.pop();
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
              animation={true}
              initial={'MONDAY'}
              onPress={(val) => setValue(val)}
            />
          </View>
          <Text style={styles.formHeading}>
            What activities will be taking place this week?
          </Text>
          <View style={styles.dateTime}>
            <DateTimePicker
              value={time}
              mode="time"
              is24Hour={false}
              display="default"
              onChange={(event, date) => {
                setTime(new Date(date));
              }}
            />
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
    justifyContent: 'center',
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

export default EditScoutMeetingDetails;
