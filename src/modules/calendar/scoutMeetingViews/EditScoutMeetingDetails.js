import React, {useState} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';

import DateTimePicker from '@react-native-community/datetimepicker';
import NextButton from '../../../components/buttons/NextButton';

import Colors from '../../../../constants/Colors';
import Fonts from '../../../../constants/Fonts';
import {gql, useQuery, useMutation} from '@apollo/client';
import {GET_EVENTS} from '../CalendarView';
import RadioForm from 'react-native-simple-radio-button';
import RTE from '../../../components/RichTextEditor';
import Toggle from '../../../components/formfields/Toggle';
import {GET_SCOUT_MEETING} from '../scoutMeetingViews/ScoutMeetingView';
import {
  getInitialDate,
  weekDays,
} from '../../events/meeting/ScoutMeetingDetails';
import {GET_EXPO_TOKEN} from '../../events/hike/HikeDetails';
import RichInputContainer from '../../../components/containers/RichInputContainer';
import SubmitBtn from '../../../components/buttons/SubmitButton';

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
    <RichInputContainer back={back}>
      // Turn into component
      <Text style={styles.formHeading}>
        Do you want to change the day of the troop meeting?
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
          buttonSize={Dimensions.get('window').width / 18}
          formHorizontal={true}
          labelHorizontal={false}
          buttonColor={'#2196f3'}
          animation={true}
          initial={event.day.toUpperCase()}
          onPress={(val) => setValue(val)}
        />
      </View>
      {/*<View style={styles.dateTime}>*/}
      {/*  <DateTimePicker*/}
      {/*    value={time}*/}
      {/*    mode="time"*/}
      {/*    is24Hour={false}*/}
      {/*    display="default"*/}
      {/*    onChange={(event, date) => {*/}
      {/*      setTime(new Date(date));*/}
      {/*    }}*/}
      {/*  />*/}
      {/*</View>*/}
      <RTE
        heading="What do you want people to know about this troop meeting?"
        description={description}
        setDescription={setDescription}
      />
      <Toggle
        heading="Will there be a shakedown this week?"
        active={shakedownWeek}
        onChange={setShakedownWeek}
      />
      <SubmitBtn submit={submit} title="Update" />
    </RichInputContainer>
  );
};

const styles = StyleSheet.create({
  time: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    justifyContent: 'flex-start',
  },
  formHeading: {
    borderColor: Colors.secondary,
    fontSize: 15,
    fontFamily: Fonts.primaryTextBold,
    marginTop: 25,
    margin: 18,
  },
});

export default EditScoutMeetingDetails;
