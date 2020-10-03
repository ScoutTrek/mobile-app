import React from 'react';
import {View, ActivityIndicator} from 'react-native';
import SubmitBtn from '../../../components/buttons/SubmitButton';
import EventSnapshotList from '../../../components/EventSnapshotList';
import Colors from '../../../../constants/Colors';
import RichInputContainer from '../../../components/containers/RichInputContainer';
import {gql, useMutation, useQuery} from '@apollo/client';
import {eventData} from '../event_components/ChooseName';
import FormHeading from '../../../components/Headings/FormHeading';
import {specialEventSchema} from '../../../../constants/DataSchema';
import {updateEventCacheOptions} from '../hike/ConfirmHikeDetails';

const ADD_SPECIAL_EVENT = gql`
  mutation AddSpecialEvent($specialEvent: AddSpecialEventInput!) {
    event: addSpecialEvent(input: $specialEvent) {
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

const ConfirmEventDetails = ({navigation}) => {
  const {data, loading} = useQuery(gql`
    {
      eventFormState @client
    }
  `);
  const [addSpecialEvent] = useMutation(
    ADD_SPECIAL_EVENT,
    updateEventCacheOptions
  );

  const submit = () => {
    addSpecialEvent({
      variables: {
        specialEvent: {...eventData()},
      },
    })
      .then(() => {
        return new Promise((res, rej) => {
          navigation.popToTop();
          navigation.pop();
          navigation.navigate('UpcomingEvents');
          res();
        });
      })
      .catch((err) => console.log(err));
  };

  const back = () => {
    navigation.goBack();
  };

  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <RichInputContainer icon="back" back={back}>
      <View style={{flex: 1, justifyContent: 'space-between'}}>
        <View style={{marginVertical: 10}}>
          <FormHeading title="Review Event Info" />
          <EventSnapshotList
            data={data.eventFormState}
            edit="create"
            schema={specialEventSchema}
            navigation={navigation}
          />
        </View>
        <SubmitBtn submit={submit} title="Complete" />
      </View>
    </RichInputContainer>
  );
};

export default ConfirmEventDetails;
