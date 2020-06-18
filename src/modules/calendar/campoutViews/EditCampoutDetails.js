import React, {useState} from 'react';
import {StyleSheet, Dimensions} from 'react-native';

import DateTimePicker from '@react-native-community/datetimepicker';
import NextButton from '../../../components/buttons/NextButton';

import Colors from '../../../../constants/Colors';
import Constants from 'expo-constants';
import {Ionicons} from '@expo/vector-icons';
import {useQuery, useMutation} from '@apollo/react-hooks';
import {gql} from '@apollo/client';

import {GET_CAMPOUT} from './CampoutView';
import RTE from '../../../components/RichTextEditor';
import {GET_EXPO_TOKEN} from '../../events/hike/HikeDetails';
import RichInputContainer from '../../../components/containers/RichInputContainer';
import SubmitBtn from '../../../components/buttons/SubmitButton';
import EditHeadingInput from '../components/EditHeadingInput';

const GET_VISIBILITY_FILTER = gql`
  {
    token: expoNotificationToken @client
  }
`;

const UPDATE_CAMPOUT = gql`
  mutation UpdateCampout($id: ID!, $updates: UpdateCampoutInput!) {
    updateCampout(id: $id, input: $updates) {
      id
      type
      title
      description
      datetime
      numDays
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

const EditCampoutDetails = ({navigation, route}) => {
  const {currItem} = route.params;

  const {
    loading,
    error,
    data: {event},
  } = useQuery(GET_CAMPOUT, {
    variables: {id: currItem},
  });

  const {data} = useQuery(GET_EXPO_TOKEN);

  const [updateEvent] = useMutation(UPDATE_CAMPOUT);

  const [date, setDate] = useState(event.datetime);
  const [mode, setMode] = useState('date');
  const [visible, setVisible] = useState(false);

  // description
  const [description, setDescription] = useState(event.description);
  const [title, setTitle] = useState(event.title);

  const back = () => navigation.goBack();

  const submit = () => {
    updateEvent({
      variables: {
        id: event.id,
        updates: {
          title,
          description,
          datetime: date,
        },
      },
    })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    navigation.pop();
  };

  return (
    <RichInputContainer back={back}>
      <EditHeadingInput
        onChangeText={setTitle}
        value={title}
        heading="What will the campout be called?"
      />

      {visible && (
        <DateTimePicker
          value={date}
          mode={mode}
          is24Hour={false}
          display="default"
          onChange={setState}
        />
      )}

      <RTE
        heading="What do you want people to know about this campout?"
        description={description}
        setDescription={setDescription}
      />

      <SubmitBtn submit={submit} title="Update" />
    </RichInputContainer>
  );
};

export default EditCampoutDetails;
