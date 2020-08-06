import React, {useState} from 'react';
import {View} from 'react-native';

import {gql, useQuery, useMutation} from '@apollo/client';

import RichInputContainer from '../../../components/containers/RichInputContainer';
import SubmitBtn from '../../../components/buttons/SubmitButton';
import {eventData} from './ChooseName';
import FormHeading from '../../../components/Headings/FormHeading';
import EventSnapshotList from '../../../components/EventSnapshotList';
import {
  hikeSchema,
  summerCampSchema,
  campoutSchema,
} from '../../../../constants/DataSchema';

const getSchema = (type) => {
  switch (type) {
    case 'Hike':
      return hikeSchema;
    case 'SummerCamp':
      return summerCampSchema;
    case 'Campout':
      return campoutSchema;
  }
};

const UPDATE_EVENT = gql`
  mutation UpdateEvent($id: ID!, $updates: UpdateEventInput!) {
    updateEvent(id: $id, input: $updates) {
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

const EditEventDetails = ({navigation, route}) => {
  const {data} = useQuery(gql`
    {
      eventFormState @client
    }
  `);

  const [updateEvent] = useMutation(UPDATE_EVENT);

  const submit = () => {
    const newData = {...eventData()};
    const omitTypename = (key, value) =>
      key === '__typename' ? undefined : value;
    const newPayload = JSON.parse(JSON.stringify(newData), omitTypename);
    updateEvent({
      variables: {id: route.params.id, updates: newPayload},
    })
      .then(() => eventData({}))
      .catch((err) => console.log(err));
    navigation.pop();
  };

  return (
    <RichInputContainer back={navigation.goBack}>
      <View style={{flex: 1, justifyContent: 'space-between'}}>
        <View style={{marginVertical: 10}}>
          <FormHeading title="Change Event Info" />
          <EventSnapshotList
            data={data.eventFormState}
            edit="edit"
            schema={getSchema(route.params.type)}
            navigation={navigation}
          />
        </View>
        <SubmitBtn submit={submit} title="Complete" />
      </View>
    </RichInputContainer>
  );
};

export default EditEventDetails;
