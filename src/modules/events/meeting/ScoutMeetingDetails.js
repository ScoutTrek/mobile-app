import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';

import DateTimePicker from '@react-native-community/datetimepicker';

import Colors from '../../../../constants/Colors';
import Fonts from '../../../../constants/Fonts';
import Constants from 'expo-constants';
import {Ionicons} from '@expo/vector-icons';
import Toggle from '../../../components/formfields/Toggle';
import RTE from '../../../components/RichTextEditor';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';
import {gql, useMutation, useQuery} from '@apollo/client';
import {GET_EVENTS} from '../../calendar/CalendarView';
import RichInputContainer from '../../../components/containers/RichInputContainer';
import SubmitBtn from '../../../components/buttons/SubmitButton';
import FormHeading from '../../../components/Headings/FormHeading';

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
  const [weekday, setWeekday] = useState('MONDAY');

  // Add meeting day ranges in the future.

  const [description, setDescription] = useState('');
  const [shakedownWeek, setShakedownWeek] = useState(false);

  const back = () => navigation.pop();
  const submit = () => {
    const d = new Date();
    d.setDate(d.getDate() + getInitialDate(weekDays[weekday], d.getDay()));
    const scoutMeeting = {
      title: 'Troop Meeting',
      description,
      datetime: route.params.datetime,
      day: weekday,
      time: route.params.datetime,
      shakedown: shakedownWeek,
      location: {
        lng: route.params.location.longitude,
        lat: route.params.location.latitude,
      },
    };
    addScoutMeeting({
      variables: {
        scoutMeeting,
      },
    }).catch((err) => console.log(err));
    navigation.popToTop();
    navigation.pop();
    navigation.navigate('UpcomingEvents');
  };

  return (
    <RichInputContainer icon="back" back={back}>
      <FormHeading title="What day will your Troop meeting take place?" />
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

      <RTE
        heading="What activities will be taking place at these meetings? (You can add
        information into individual meetings at a later time.)"
        description={description}
        setDescription={setDescription}
      />

      <Toggle
        heading="Will there be a shakedown this week?"
        active={shakedownWeek}
        onChange={setShakedownWeek}
      />

      <SubmitBtn submit={submit} title="Complete" />
    </RichInputContainer>
  );
};

const styles = StyleSheet.create({
  time: {
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 12,
    alignItems: 'center',
  },
  formHeading: {
    borderColor: Colors.secondary,
    fontSize: 15,
    fontFamily: Fonts.primaryTextBold,
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
    fontFamily: Fonts.primaryTextBold,
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

export default ScoutMeetingDetails;
