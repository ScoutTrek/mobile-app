import React, {useState} from 'react';
import {Platform} from 'react-native';

import DateTimePicker from '@react-native-community/datetimepicker';

import {useQuery, useMutation} from '@apollo/react-hooks';
import {gql} from '@apollo/client';

import {GET_SUMMER_CAMP} from './SummerCampView';
import RTE from '../../../components/RichTextEditor';
import {GET_EXPO_TOKEN} from '../../events/hike/HikeDetails';
import RichInputContainer from '../../../components/containers/RichInputContainer';
import EditHeadingInput from '../components/EditHeadingInput';
import SubmitBtn from '../../../components/buttons/SubmitButton';

const GET_VISIBILITY_FILTER = gql`
  {
    token: expoNotificationToken @client
  }
`;

const UPDATE_SUMMER_CAMP = gql`
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

const EditSummerCampView = ({navigation, route}) => {
  const {currItem} = route.params;
  const {
    loading,
    error,
    data: {event},
  } = useQuery(GET_SUMMER_CAMP, {
    variables: {id: currItem},
  });

  const {data} = useQuery(GET_EXPO_TOKEN);

  const [updateEvent] = useMutation(UPDATE_SUMMER_CAMP);

  const [date, setDate] = useState(event.datetime);
  const [mode, setMode] = useState('date');
  const [visible, setVisible] = useState(false);

  // description
  const [description, setDescription] = useState(event.description);
  const [title, setTitle] = useState(event.title);

  const [numDays, setNumDays] = useState(event.numDays);

  const setState = (event, newDate) => {
    setDate(() => {
      setVisible(Platform.OS === 'ios');
      return newDate;
    });
  };

  const show = (mode) => {
    setMode(() => {
      setVisible(true);
      return mode;
    });
  };

  const back = () => navigation.goBack();

  const submit = () => {
    updateEvent({
      variables: {
        id: event.id,
        updates: {
          title,
          description,
          datetime: date,
          numDays,
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
        heading="What do you want to title this summer camp?"
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
        heading="What do you want people to know about this summer camp?"
        description={description}
        setDescription={setDescription}
      />
      <SubmitBtn submit={submit} title="Update" />
    </RichInputContainer>
  );
};

export default EditSummerCampView;
