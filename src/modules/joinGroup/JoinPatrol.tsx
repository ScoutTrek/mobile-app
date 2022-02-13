import React, {useState} from 'react';
import {ActivityIndicator} from 'react-native';

import {gql, useMutation, useQuery} from '@apollo/client';
import RichInputContainer from '../../components/containers/RichInputContainer';
import {plusBold} from 'ScoutDesign/icons';
import {_updateCurrentGroup} from '../profile/ProfileScreen';
import {
  Container,
  Text,
  Button,
  Stack,
  TextInputWithButton,
} from 'ScoutDesign/library';

import {useJoinGroupForm} from './JoinGroupForm/JoinGroupFormStore';

const ADD_GROUP = gql`
  mutation AddGroup($membershipInfo: AddMembershipInput!) {
    addGroup(input: $membershipInfo) {
      groupID
    }
  }
`;

const GET_PATROLS = gql`
  query GetPatrols($troopId: ID!) {
    patrols: patrolsOfTroop(id: $troopId) {
      id
      name
    }
  }
`;

const ADD_PATROL = gql`
  mutation AddPatrol($troopId: ID!, $patrolInfo: AddPatrolInput!) {
    addPatrol(troopId: $troopId, input: $patrolInfo) {
      id
      name
    }
  }
`;

const JoinPatrol = ({navigation}) => {
  const [joinGroupFormState] = useJoinGroupForm();

  const [addGroup] = useMutation(ADD_GROUP, {
    onCompleted: (data) => {
      console.log('Data ', data);
      _updateCurrentGroup(data?.addGroup?.groupID, navigation);
    },
  });
  const [addPatrol] = useMutation(ADD_PATROL);

  const [patrolName, setPatrolName] = useState('');
  const [patrolIsValid, setPatrolIsValid] = useState(false);

  const {data, error, loading} = useQuery(GET_PATROLS, {
    pollInterval: 500,
    variables: {
      troopId: joinGroupFormState.troop,
    },
  });

  const joinGroup = async (patrolID: string) => {
    // if (route.params?.shouldAddGroup) {
    await addGroup({
      variables: {
        membershipInfo: {
          ...joinGroupFormState,
          patrolID: patrolID,
        },
      },
    });

    // }
  };

  if (loading) return <ActivityIndicator />;
  if (error) return <Text>`Error! ${error}`</Text>;

  return (
    <RichInputContainer icon="back" back={navigation.goBack}>
      <Container>
        <Text preset="h2" textAlign="center" padding="m">
          Choose your patrol.
        </Text>
        <Stack
          accessibilityLabel="test-stack"
          radius="l"
          items={data.patrols}
          everyItemProps={{
            fullWidth: true,
            paddingVertical: 'm',
          }}
          RenderItem={({item, ...rest}) => {
            return (
              <Button
                accessibilityLabel={item.id}
                onPress={() => handleSignUp(item.id)}
                text={item.name}
                {...rest}
              />
            );
          }}
        />

        <Container paddingHorizontal="s">
          <Text paddingTop="s" preset="label">
            Add your Patrol if you don't see yours listed above.
          </Text>

          <TextInputWithButton
            placeholder="patrol name..."
            onValueChange={(value) => {
              setPatrolName(value);
              if (value.toString().length > 2) {
                setPatrolIsValid(true);
              } else {
                setPatrolIsValid(false);
              }
            }}
            value={patrolName}
            buttonText="Add"
            buttonIcon={plusBold}
            buttonColor="brandSecondary"
            disabled={!patrolIsValid}
            onPress={async () => {
              await addPatrol({
                variables: {
                  troopId: joinGroupFormState.troop,
                  patrolInfo: {
                    name: patrolName,
                  },
                },
              });
              setPatrolName('');
            }}
          />
        </Container>
        <Button
          accessibilityLabel="don't-belong-to-a-patrol"
          text="I don't belong to a Patrol"
          onPress={() => joinGroup('')}
          fullWidth
        />
      </Container>
    </RichInputContainer>
  );
};

export default JoinPatrol;
