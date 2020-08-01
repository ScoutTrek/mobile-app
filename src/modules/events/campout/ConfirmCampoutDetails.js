import React from 'react';
import {Text, View} from 'react-native';
import SubmitBtn from '../../../components/buttons/SubmitButton';
import ShowChosenTimeRow from '../../../components/ShowChosenTimeRow';
import Colors from '../../../../constants/Colors';
import RichInputContainer from '../../../components/containers/RichInputContainer';
import {gql, useMutation, useQuery} from '@apollo/client';
import {GET_EVENTS} from '../../calendar/CalendarView';
import {eventData} from '../event_components/ChooseName';
import FormHeading from '../../../components/Headings/FormHeading';
import EventSnapshotList from '../../../components/EventSnapshotList';
import {campoutSchema} from '../../../../constants/DataSchema';

const ADD_CAMPOUT = gql`
  mutation AddCampout($campout: AddCampoutInput!) {
    event: addCampout(input: $campout) {
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

const ConfirmCampoutDetails = ({navigation}) => {
  const {data, loading} = useQuery(gql`
    {
      eventFormState @client
    }
  `);

  const [addCampout] = useMutation(ADD_CAMPOUT, {
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

  const submit = () => {
    addCampout({
      variables: {
        campout: {...eventData()},
      },
    })
      .then(() => {
        navigation.popToTop();
        navigation.pop();
        navigation.navigate('Calendar');
        eventData({});
      })
      .catch((err) => console.log(err));
  };

  const back = () => {
    navigation.goBack();
  };

  if (loading) return <Text>Loading...</Text>;

  return (
    <RichInputContainer icon="back" back={back}>
      <View style={{flex: 1, justifyContent: 'space-between'}}>
        <View style={{marginVertical: 8}}>
          <FormHeading title="Review Event Info" />
          <EventSnapshotList
            data={data.eventFormState}
            schema={campoutSchema}
            navigation={navigation}
          />
        </View>
        <SubmitBtn submit={submit} title="Complete" />
      </View>
    </RichInputContainer>
  );
};

export default ConfirmCampoutDetails;
