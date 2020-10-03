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
import {canoeingSchema} from '../../../../constants/DataSchema';

const ADD_CANOEING = gql`
  mutation AddCanoeing($canoeing: AddCanoeingInput!) {
    event: addCanoeing(input: $canoeing) {
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
  const [addCanoeing] = useMutation(ADD_CANOEING, updateEventCacheOptions);

  const submit = () => {
    addCanoeing({
      variables: {
        canoeing: {...eventData()},
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
            schema={canoeingSchema}
            navigation={navigation}
          />
        </View>
        <SubmitBtn submit={submit} title="Complete" />
      </View>
    </RichInputContainer>
  );
};

export default ConfirmEventDetails;
