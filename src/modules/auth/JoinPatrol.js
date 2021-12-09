import React, {useEffect, useState, useContext} from 'react';
import {
  StyleSheet,
  Text,
  View,
  AsyncStorage,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {gql, useApolloClient, useMutation, useQuery} from '@apollo/client';
import GradientButton from '../../components/buttons/GradientButton';
import Constants from 'expo-constants';
import Colors from '../../../constants/Colors';
import Fonts from '../../../constants/Fonts';
import {AntDesign, Ionicons} from '@expo/vector-icons';
import RichInputContainer from '../../components/containers/RichInputContainer';
import AddItemForm from './components/AddItemFormSmall';
import {_updateCurrentGroup} from '../navigation/DrawerNavigator';
export const AuthContext = React.createContext({
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

  const back = () => {
    navigation.goBack();
  };

  const handleSignUp = async () => {
    if (route.params?.shouldAddGroup) {
      const {shouldAddGroup, ...newGroup} = route.params;
      await addGroup({
        variables: {
          membershipInfo: {
            ...newGroup,
            patrolID: patrolId,
          },
        },
      });
      navigation.navigate('UpcomingEvents');
    } else if (isValid) {
      await signUp({
        variables: {
          userInfo: {
            ...route.params,
            patrol: patrolId,
            expoNotificationToken: '',
          },
        },
      });
    } else {
      Alert.alert(
        'No patrol selected.',
        'please select the patrol that you belong to or add a new one.'
      );
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

  if (loading) return null;
  if (error) return <Text>`Error! ${error}`</Text>;

  return (
    <RichInputContainer icon="back" back={back}>
      <View style={styles.inputContainer}>
        <Text style={styles.formHeading}>Select your patrol.</Text>
        {data.patrols.map((patrol) => (
          <TouchableOpacity
            onPress={() => {
              setPatrolId(patrol.id);
              setIsValid(true);
            }}
            style={
              patrol.id === patrolId
                ? [styles.patrol, styles.active]
                : styles.patrol
            }
            key={patrol.id}>
            {patrol.id === patrolId && (
              <Ionicons style={styles.check} name="ios-checkmark" size={32} />
            )}
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                fontFamily: Fonts.primaryTextBold,
                color: '#fff',
              }}>
              {patrol.name}
            </Text>
          </TouchableOpacity>
        ))}
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
        <TouchableOpacity
          onPress={() => {
            setNoPatrol(true);
            setIsValid(true);
          }}
          style={[styles.patrol, noPatrol && styles.active]}>
          {noPatrol && (
            <Ionicons style={styles.check} name="ios-checkmark" size={32} />
          )}
          <Text
            style={{
              fontSize: 18,
              fontWeight: 'bold',
              fontFamily: Fonts.primaryTextBold,
              color: '#fff',
            }}>
            N/A - I don't belong to a Patrol
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.btnContainer}>
        {(!!patrolId || noPatrol) && (
          <GradientButton
            title={signUpData.loading ? `Loading...` : `Finish`}
            onPress={handleSignUp}
          />
        )}
      </View>
    </RichInputContainer>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    width: '100%',
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  patrol: {
    padding: 11,
    margin: 10,
    width: '100%',
    paddingHorizontal: 22,
    backgroundColor: Colors.green,
    borderRadius: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    color: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 3,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  active: {
    backgroundColor: Colors.darkGreen,
  },
  input: {
    padding: 12,
    width: '100%',
    paddingHorizontal: 22,
    borderWidth: 1,
    borderColor: Colors.purple,
    borderRadius: 10,
    fontSize: 17,
    flexDirection: 'row',
    fontFamily: Fonts.primaryText,
    backgroundColor: '#fff',
  },
  troopNumber: {
    padding: 16,
    alignItems: 'flex-start',
    width: 100,
    height: 50,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: Colors.purple,
    fontSize: 15,
    flexDirection: 'row',
    fontFamily: Fonts.primaryText,
    backgroundColor: '#fff',
  },
  formHeading: {
    borderColor: Colors.secondary,
    fontSize: 15,
    fontFamily: Fonts.primaryTextBold,
    margin: 18,
  },
  btnContainer: {
    paddingVertical: 22,
    paddingHorizontal: 20,
  },
  check: {
    position: 'absolute',
    top: 5,
    left: 15,
    color: '#fff',
  },
});

export default JoinPatrol;
