import React, {useEffect, useState, useContext} from 'react';
import {ActivityIndicator} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {gql, useApolloClient, useMutation, useQuery} from '@apollo/client';
import RichInputContainer from '../../components/containers/RichInputContainer';
import AddItemForm from './components/AddItemForm';
import {_updateCurrentGroup} from '../profile/ProfileScreen';
import {Container, Text, Button, Stack} from 'ScoutDesign/library';

type AuthContextType = {
  authToken?: string | null;
  setAuthToken?: React.Dispatch<any>;
};

export const AuthContext = React.createContext<AuthContextType>({
  authToken: '',
  setAuthToken: () => {},
});

const ADD_GROUP = gql`
  mutation AddGroup($membershipInfo: AddMembershipInput!) {
    addGroup(input: $membershipInfo) {
      groupID
    }
  }
`;

const SIGN_UP = gql`
  mutation SignUp($userInfo: SignupInput!) {
    signup(input: $userInfo) {
      token
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

const JoinPatrol = ({navigation, route}) => {
  const [signUp, signUpData] = useMutation(SIGN_UP);
  const [addGroup] = useMutation(ADD_GROUP, {
    onCompleted: (data) => {
      console.log('Data ', data);
      _updateCurrentGroup(data?.addGroup?.groupID, navigation);
    },
  });
  const [addPatrol] = useMutation(ADD_PATROL, {
    onCompleted: (data) => setPatrolId(data.addPatrol.id),
  });

  const [patrolName, setPatrolName] = useState('');
  const [patrolId, setPatrolId] = useState(null);
  const [noPatrol, setNoPatrol] = useState(false);
  const [patrolIsValid, setPatrolIsValid] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const {data, error, loading} = useQuery(GET_PATROLS, {
    pollInterval: 500,
    variables: {
      troopId: route.params.troopID,
    },
  });

  const {setAuthToken} = useContext(AuthContext);

  const handleSignUp = async (patrolID: string) => {
    if (route.params?.shouldAddGroup) {
      const {shouldAddGroup, ...newGroup} = route.params;
      await addGroup({
        variables: {
          membershipInfo: {
            ...newGroup,
            patrolID: patrolID,
          },
        },
      });
      navigation.navigate('UpcomingEvents');
    } else {
      console.log({
        ...route.params,
        patrol: patrolID,
        expoNotificationToken: '',
      });
      // await signUp({
      //   variables: {
      //     userInfo: {
      //       ...route.params,
      //       patrol: patrolId,
      //       expoNotificationToken: '',
      //     },
      //   },
      // });
    }
  };

  useEffect(() => {
    const setToken = async () => {
      try {
        const token = await AsyncStorage.setItem(
          'userToken',
          signUpData.data.signup.token
        );
        await AsyncStorage.setItem(
          'currMembershipID',
          signUpData.data.signup.groupID
        );
        setAuthToken(signUpData.data.signup.token);
      } catch (e) {
        console.log(e);
      }
    };

    if (signUpData.data) {
      setToken();
    }
  }, [signUpData.data]);

  if (loading || signUpData.loading) return <ActivityIndicator />;
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

        <AddItemForm
          value={patrolName}
          setValue={setPatrolName}
          isValid={patrolIsValid}
          setIsValid={setPatrolIsValid}
          onPress={async () => {
            await addPatrol({
              variables: {
                troopId: route.params.troopID,
                patrolInfo: {
                  name: patrolName,
                },
              },
            });
            setPatrolName('');
            setIsValid(true);
            setPatrolIsValid(false);
          }}
          heading="Add your Patrol if you don't see yours listed above."
          placeholder="patrol name..."
        />
        <Button
          accessibilityLabel="don't-belong-to-a-patrol"
          text="I don't belong to a Patrol"
          onPress={() => handleSignUp('')}
          fullWidth
        />
      </Container>
    </RichInputContainer>
  );
};

export default JoinPatrol;
