import React from 'react';
import {View} from 'react-native';
import SubmitBtn from '../../../components/buttons/SubmitButton';
import EventSnapshotList from '../../../components/EventSnapshotList';
import Colors from '../../../../constants/Colors';
import RichInputContainer from '../../../components/containers/RichInputContainer';
import {gql, useMutation, useQuery} from '@apollo/client';
import {GET_EVENTS} from '../../calendar/CalendarView';
import {eventData} from '../event_components/ChooseName';
import FormHeading from '../../../components/Headings/FormHeading';
import {hikeSchema} from '../../../../constants/DataSchema';

const ADD_HIKE = gql`
  mutation AddHike($hike: AddHikeInput!) {
    event: addHike(input: $hike) {
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
  const [addHike] = useMutation(ADD_HIKE, {
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
    addHike({
      variables: {
        hike: {...eventData()},
      },
    })
      .then(() => {
        navigation.popToTop();
        navigation.pop();
        navigation.navigate('UpcomingEvents');
        eventData({});
      })
      .catch((err) => console.log(err));
  };

  const back = () => {
    navigation.goBack();
  };

  return (
    <RichInputContainer icon="back" back={back}>
      <View style={{flex: 1, justifyContent: 'space-between'}}>
        <View style={{marginVertical: 10}}>
          <FormHeading title="Review Event Info" />

          <EventSnapshotList
            data={data.eventFormState}
            edit="create"
            schema={hikeSchema}
            navigation={navigation}
          />
        </View>
        <SubmitBtn submit={submit} title="Complete" />
      </View>
    </RichInputContainer>
  );
};

export default ConfirmEventDetails;
