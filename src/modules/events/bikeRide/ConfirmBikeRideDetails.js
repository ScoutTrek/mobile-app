import React from 'react';
import {View, ActivityIndicator} from 'react-native';
import SubmitBtn from '../../../components/buttons/SubmitButton';
import EventSnapshotList from '../../../components/EventSnapshotList';
import Colors from '../../../../constants/Colors';
import RichInputContainer from '../../../components/containers/RichInputContainer';
import {gql, useMutation, useQuery} from '@apollo/client';
import {eventData} from '../event_components/ChooseName';
import {updateEventCacheOptions} from '../hike/ConfirmHikeDetails';
import FormHeading from '../../../components/Headings/FormHeading';
import {bikeRideSchema} from '../../../../constants/DataSchema';

const ADD_BIKE_RIDE = gql`
  mutation AddBikeRide($bikeRide: AddBikeRideInput!) {
    event: addBikeRide(input: $bikeRide) {
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
  const [addBikeRide] = useMutation(ADD_BIKE_RIDE, updateEventCacheOptions);

  const submit = () => {
    addBikeRide({
      variables: {
        bikeRide: {...eventData()},
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
            schema={bikeRideSchema}
            navigation={navigation}
          />
        </View>
        <SubmitBtn submit={submit} title="Complete" />
      </View>
    </RichInputContainer>
  );
};

export default ConfirmEventDetails;
