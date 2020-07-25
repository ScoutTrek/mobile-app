import React, {useState, useRef} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

import {GET_EVENTS} from '../../calendar/CalendarView';

import RTE from '../../../components/RichTextEditor';
import CalModal from '../../../components/CalModal';

import DateTimePicker from '@react-native-community/datetimepicker';

import Colors from '../../../../constants/Colors';
import Fonts from '../../../../constants/Fonts';
import Constants from 'expo-constants';
import {gql} from '@apollo/client';
import {useMutation, useQuery} from '@apollo/react-hooks';
import {Ionicons} from '@expo/vector-icons';
import ShowChosenTimeRow from '../../../components/ShowChosenTimeRow';
import RichInputContainer from '../../../components/containers/RichInputContainer';
import SubmitBtn from '../../../components/buttons/SubmitButton';
import Slider from '../../../components/formfields/Slider';
import FormHeading from '../../../components/Headings/FormHeading';

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
      meetLocation {
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

      <Slider distance={distance} setDistance={setDistance} min={1} max={20} />
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
    fontFamily: Fonts.primaryTextBold,
    marginHorizontal: 22,
    marginVertical: 18,
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

export default HikeDetails;
