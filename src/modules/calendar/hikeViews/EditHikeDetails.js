import React, {useState} from 'react';
import {Text, TextInput, StyleSheet} from 'react-native';

import DateTimePicker from '@react-native-community/datetimepicker';

import {useQuery, useMutation} from '@apollo/react-hooks';
import {gql} from '@apollo/client';

import {GET_HIKE} from './HikeView';
import RTE from '../../../components/RichTextEditor';

import {GET_EXPO_TOKEN} from '../../events/hike/HikeDetails';
import RichInputContainer from '../../../components/containers/RichInputContainer';
import SubmitBtn from '../../../components/buttons/SubmitButton';
import Input from '../../../components/formfields/Input';
import EditHeadingInput from '../components/EditHeadingInput';

const UPDATE_EVENT = gql`
  mutation UpdateHike($id: ID!, $updates: UpdateHikeInput!) {
    updateHike(id: $id, input: $updates) {
      id
      type
      title
      description
      date
      time
      distance
      creator {
        id
        name
      }
    }
  }
`;

const EditHikeDetails = ({navigation, route}) => {
  const {currItem} = route.params;
  const {
    loading,
    error,
    data: {event},
  } = useQuery(GET_HIKE, {
    variables: {id: currItem},
  });
  const {data} = useQuery(GET_EXPO_TOKEN);

  const [updateEvent] = useMutation(UPDATE_EVENT);

  const [date, setDate] = useState(event.datetime);
  const [visible, setVisible] = useState(false);

  const [description, setDescription] = useState(event.description);
  const [title, setTitle] = useState(event.title);

  const back = () => navigation.goBack();

  const submit = () => {
    updateEvent({
      variables: {
        id: event.id,
        updates: {
          datetime: date,
          title,
          description,
        },
      },
    }).catch((err) => console.log(err));
    navigation.pop();
  };

  return (
    <RichInputContainer back={back}>
      <EditHeadingInput
        onChangeText={setTitle}
        value={title}
        heading="What will the event be called?"
      />

      {visible && (
        <DateTimePicker
          value={date}
          mode="time"
          is24Hour={false}
          display="default"
          onChange={setState}
        />
      )}

      <RTE
        heading="What do you want people to know about this hike?"
        description={description}
        setDescription={setDescription}
      />

      <SubmitBtn submit={submit} title="Update" />
    </RichInputContainer>
  );
};

export default EditHikeDetails;
