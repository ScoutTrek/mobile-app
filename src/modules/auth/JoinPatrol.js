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
  Vibration,
} from 'react-native';
import {gql} from '@apollo/client';
import {useApolloClient, useMutation, useQuery} from '@apollo/react-hooks';
import GradientButton from '../../components/buttons/GradientButton';
import Constants from 'expo-constants';
import Colors from '../../../constants/Colors';
import {AntDesign, Ionicons} from '@expo/vector-icons';
import {Notifications} from 'expo';
import * as Permissions from 'expo-permissions';

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
  const [addPatrol, {data: patrolData}] = useMutation(ADD_PATROL);

  const [patrolName, setPatrolName] = useState('');
  const [patrolId, setPatrolId] = useState('');
  const [patrolIsValid, setPatrolIsValid] = useState(false);
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
      let token;
      try {
        token = await Notifications.getExpoPushTokenAsync();
      } catch (e) {
        console.log(e);
      }
      await signUp({
        variables: {
          userInfo: {
            ...route.params,
            expoNotificationToken: token,
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
  }, [signUpData.data]);

  if (loading) return null;
  if (error) return <Text>`Error! ${error}`</Text>;

  return (
    <KeyboardAvoidingView style={{flex: 1}} behavior="padding">
      <View style={{flex: 1}}>
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
                  fontFamily: 'oxygen-bold',
                  color: '#fff',
                }}>
                {patrol.name}
              </Text>
            </TouchableOpacity>
          ))}
          {!patrolData && (
            <View style={styles.createPatrolWidget}>
              <Text style={styles.patrolHeading}>
                Add your Patrol if you don't see yours listed above.
              </Text>
              <View style={{flexDirection: 'row'}}>
                <TextInput
                  placeholder="patrol name..."
                  style={styles.patrolName}
                  onChangeText={(value) => {
                    setPatrolName(value);
                    if (value.length > 2) {
                      setPatrolIsValid(true);
                    } else {
                      setPatrolIsValid(false);
                    }
                  }}
                  value={patrolName}
                />
                {patrolIsValid && (
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
                      setPatrolIsValid(false);
                    }}
                    style={styles.btnAddPatrol}>
                    <Text style={styles.addPatrol}>
                      Add <AntDesign name="plus" size={18} />
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          )}
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
    height: 48,
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
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 6,
    marginRight: 7,
    borderRadius: 7,
    padding: 10,
    backgroundColor: Colors.lightGreen,
  },
  addPatrol: {
    fontSize: 18,
    fontFamily: 'oxygen-bold',
  },
  check: {
    position: 'absolute',
    top: 5,
    left: 15,
    color: '#fff',
  },
});

export default JoinPatrol;
