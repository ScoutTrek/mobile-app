import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  AsyncStorage,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import {gql} from '@apollo/client';
import {useApolloClient, useMutation, useQuery} from '@apollo/react-hooks';
import GradientButton from '../../components/buttons/GradientButton';
import Constants from 'expo-constants';
import Colors from '../../../constants/Colors';
import {AntDesign} from '@expo/vector-icons';

export const GET_TOKEN = gql`
  {
    userToken @client
  }
`;

const SIGN_UP = gql`
  mutation SignUp($userInfo: SignupInput!) {
    signup(input: $userInfo) {
      token
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
  const client = useApolloClient();
  const [signUp, signUpData] = useMutation(SIGN_UP);
  const [addPatrol] = useMutation(ADD_PATROL);

  const [patrolName, setPatrolName] = useState('');
  const [patrolId, setPatrolId] = useState('');
  const [isValid, setIsValid] = useState(false);

  const {data, error, loading} = useQuery(GET_PATROLS, {
    fetchPolicy: 'network-only',
    pollInterval: 500,
    variables: {
      troopId: route.params.troop,
    },
  });

  const handleSignUp = async () => {
    if (isValid) {
      await signUp({
        variables: {
          userInfo: {
            ...route.params,
            patrol: patrolId,
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
        await AsyncStorage.setItem('userToken', signUpData.data.signup.token);
        await client.writeQuery({
          query: GET_TOKEN,
          data: {userToken: signUpData.data.signup.token},
        });
      } catch (e) {
        console.log(e);
      }
    };
    if (signUpData.data) {
      setToken();
    }
  });

  if (loading) return null;
  if (error) return <Text>`Error! ${error}`</Text>;

  console.log(route.params);
  return (
    <KeyboardAvoidingView style={{flex: 1}} behavior="padding">
      <View style={{flex: 1}}>
        <View style={styles.inputContainer}>
          <Text style={styles.formHeading}>Select your patrol.</Text>
          {data.patrols.map(patrol => (
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
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 'bold',
                  fontFamily: 'oxygen-bold',
                  color: '#fff',
                }}>
                {patrol.name}
              </Text>
            </TouchableOpacity>
          ))}
          <View style={styles.createPatrolWidget}>
            <Text style={styles.patrolHeading}>Add a Patrol</Text>
            <View style={{flexDirection: 'row'}}>
              <TextInput
                style={styles.patrolName}
                onChangeText={setPatrolName}
                value={patrolName}
              />
              <TouchableOpacity
                onPress={() => {
                  addPatrol({
                    variables: {
                      troopId: route.params.troop,
                      patrolInfo: {
                        name: patrolName,
                      },
                    },
                  });
                  setPatrolName('');
                }}
                style={styles.btnAddPatrol}>
                <AntDesign name="plus" size={35} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.btnContainer}>
          {!!patrolId && (
            <GradientButton
              title={signUpData.loading ? `Loading...` : `Finish`}
              onPress={handleSignUp}
            />
          )}
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    width: '100%',
    flex: 1,
    alignItems: 'center',
    marginTop: 15 + Constants.statusBarHeight,
    paddingHorizontal: 15,
  },
  patrol: {
    padding: 12,
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
    fontFamily: 'oxygen',
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
    fontFamily: 'oxygen',
    backgroundColor: '#fff',
  },
  formHeading: {
    borderColor: Colors.secondary,
    fontSize: 15,
    fontFamily: 'oxygen-bold',
    margin: 18,
  },
  btnContainer: {
    paddingVertical: 22,
    paddingHorizontal: 20,
  },
  createPatrolWidget: {
    width: '100%',
    borderColor: Colors.orange,
    borderWidth: 1,
    borderRadius: 7,
    marginTop: 40,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  patrolHeading: {
    padding: 10,
    fontSize: 18,
    fontFamily: 'oxygen-bold',
  },
  patrolName: {
    flex: 1,
    backgroundColor: Colors.offWhite,
    fontSize: 16,
    padding: 12,
    margin: 6,
    marginLeft: 7,
    borderRadius: 7,
    borderColor: Colors.tabIconDefault,
    borderWidth: 1,
  },
  btnAddPatrol: {
    justifyContent: 'center',
    margin: 6,
    marginRight: 7,
    borderRadius: 7,
    padding: 2,
    backgroundColor: Colors.offWhite,
    borderColor: Colors.tabIconDefault,
    borderWidth: 1,
  },
});

export default JoinPatrol;
