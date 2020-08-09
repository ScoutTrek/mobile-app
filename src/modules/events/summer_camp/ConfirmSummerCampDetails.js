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
import {summerCampSchema} from '../../../../constants/DataSchema';
import {updateEventCacheOptions} from '../hike/ConfirmHikeDetails';

const ADD_SUMMER_CAMP = gql`
  mutation AddSummerCamp($summer_camp: AddSummerCampInput!) {
    event: addSummerCamp(input: $summer_camp) {
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

const ConfirmSummerCampDetails = ({navigation}) => {
  const {data, loading} = useQuery(gql`
    {
      eventFormState @client
    }
  `);

  const [addSummerCamp] = useMutation(ADD_SUMMER_CAMP, updateEventCacheOptions);

  const submit = () => {
    addSummerCamp({
      variables: {
        summer_camp: {...eventData()},
      },
    })
      .then(() => {
        navigation.popToTop();
        navigation.pop();
        navigation.navigate('UpcomingEvents');
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
            edit="create"
            schema={summerCampSchema}
            navigation={navigation}
          />
        </View>
        <SubmitBtn submit={submit} title="Complete" />
      </View>
    </RichInputContainer>
  );
};

export default ConfirmSummerCampDetails;
