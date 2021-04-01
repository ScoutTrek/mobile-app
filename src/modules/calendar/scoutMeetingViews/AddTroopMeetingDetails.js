import React, {useState} from 'react';

import {useQuery, useMutation} from '@apollo/client';
import RTE from '../../../components/RichTextEditor';
import RichInputContainer from '../../../components/containers/RichInputContainer';
import SubmitBtn from '../../../components/buttons/SubmitButton';
import {UPDATE_EVENT} from '../../events/components/UpdateEventDetails';
import {GET_SCOUT_MEETING} from './TroopMeetingView';

const AddTroopMeetingDetails = ({navigation, route}) => {
  const {currItem} = route.params;

  const {
    data: {event},
  } = useQuery(GET_SCOUT_MEETING, {
    variables: {id: currItem},
  });

  const [updateEvent] = useMutation(UPDATE_EVENT);

  const [description, setDescription] = useState(event.description);

  const submit = () => {
    updateEvent({
      variables: {
        id: event.id,
        updates: {
          description,
        },
      },
    })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    navigation.pop();
  };

  return (
    <RichInputContainer back={navigation.goBack}>
      <RTE
        heading="What do you want people to know about this Troop Meeting?"
        description={description}
        setDescription={setDescription}
      />

      <SubmitBtn submit={submit} title="Update" />
    </RichInputContainer>
  );
};

export default AddTroopMeetingDetails;
