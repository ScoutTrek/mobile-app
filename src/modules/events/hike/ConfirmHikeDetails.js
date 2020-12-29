import React from 'react';
import {View, ActivityIndicator} from 'react-native';
import SubmitBtn from '../../../components/buttons/SubmitButton';
import EventSnapshotList from '../../../components/EventSnapshotList';
import Colors from '../../../../constants/Colors';
import RichInputContainer from '../../../components/containers/RichInputContainer';
import {gql, useMutation, useQuery} from '@apollo/client';
import {GET_EVENTS} from '../../calendar/CalendarView';
import {eventData} from '../event_components/ChooseName';
import FormHeading from '../../../components/Headings/FormHeading';
import {hikeSchema} from '../../../../constants/DataSchema';
import {GET_UPCOMING_EVENTS} from '../../home/UpcomingEvents';

const ADD_EVENT = gql`
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

export const updateEventCacheOptions = {
  update(cache, {data: {event}}) {
    try {
      const {events} = cache.readQuery({query: GET_EVENTS});
      cache.writeQuery({
        query: GET_EVENTS,
        data: {events: events.concat([event])},
      });
      const {upcomingEvents} = cache.readQuery({query: GET_UPCOMING_EVENTS});
      cache.writeQuery({
        query: GET_UPCOMING_EVENTS,
        data: {upcomingEvents: upcomingEvents.concat([event])},
      });
    } catch {
      cache.writeQuery({
        query: GET_EVENTS,
        data: {events: [event]},
      });
    }
  },
};

const ConfirmEventDetails = ({navigation}) => {
  const {data, loading} = useQuery(gql`
    {
      eventFormState @client
    }
  `);
  const [addHike] = useMutation(ADD_HIKE, updateEventCacheOptions);

  const submit = () => {
    addHike({
      variables: {
        hike: {...eventData()},
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
