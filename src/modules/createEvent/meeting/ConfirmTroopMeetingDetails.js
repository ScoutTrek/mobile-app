import React from 'react';
import {View} from 'react-native';
import SubmitBtn from '../../../components/buttons/SubmitButton';
import ShowChosenTimeRow from '../../../components/ShowChosenTimeRow';
import Colors from '../../../../constants/Colors';
import RichInputContainer from '../../../components/containers/RichInputContainer';
import {gql, useMutation, useQuery} from '@apollo/client';
import {GET_EVENTS} from '../../calendar/CalendarView';
import {eventData} from '../../../../App';
import {updateEventCacheOptions} from '../hike/ConfirmHikeDetails';
import FormHeading from '../../../components/Headings/FormHeading';
import EventSnapshotList from '../../../components/EventSnapshotList';
import {troopMeetingSchema} from '../../../../constants/DataSchema';

const ADD_SCOUT_MEETING = gql`
  mutation AddScoutMeeting($scoutMeeting: AddScoutMeetingInput!) {
    event: addScoutMeeting(input: $scoutMeeting) {
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

const ConfirmTroopMeetingDetails = ({navigation, route}) => {
  const {data} = useQuery(gql`
    {
      eventData @client
    }
  `);

  const [addScoutMeeting] = useMutation(
    ADD_SCOUT_MEETING,
    updateEventCacheOptions
  );

  const submit = () => {
    addScoutMeeting({
      variables: {
        scoutMeeting: {...eventData()},
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

  return (
    <RichInputContainer icon="back" back={navigation.goBack}>
      <View style={{flex: 1, justifyContent: 'space-between'}}>
        <View style={{marginVertical: 10}}>
          <FormHeading title="Review Event Info" />
          <EventSnapshotList
            data={data.eventData}
            edit="create"
            schema={troopMeetingSchema}
            navigation={navigation}
          />
        </View>
        <SubmitBtn submit={submit} title="Complete" />
      </View>
    </RichInputContainer>
  );
};

export default ConfirmTroopMeetingDetails;
