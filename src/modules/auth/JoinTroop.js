import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import {gql} from '@apollo/client';
import {useQuery} from '@apollo/react-hooks';
import Constants from 'expo-constants';
import Colors from '../../../constants/Colors';
import {AntDesign} from '@expo/vector-icons';
import NextButton from '../../components/buttons/NextButton';

const GET_TROOPS = gql`
  query GetTroops {
    troops {
      id
      unitNumber
      council
      state
    }
  }
`;

const JoinTroop = ({navigation, route}) => {
  const {data, error, loading} = useQuery(GET_TROOPS, {
    fetchPolicy: 'network-only',
  });
  const [troopId, setTroopId] = useState('');
  const [isValid, setIsValid] = useState(false);

  const nextForm = () => {
    if (isValid) {
      const signUpData = {
        ...route.params,
        troop: troopId,
      };
      delete signUpData.nextView;
      navigation.navigate(route.params.nextView, signUpData);
    } else {
      Alert.alert(
        'No troop selected.',
        'please select the troop that you belong to or add a new one.'
      );
    }
  };

  if (loading) return null;
  if (error) return <Text>`Error! ${error}`</Text>;

  console.log('What the fuck?');
  return (
    <KeyboardAvoidingView style={{flex: 1}} behavior="padding">
      <View style={{flex: 1}}>
        <View style={styles.inputContainer}>
          <Text style={styles.formHeading}>What troop are you in?</Text>
          {data.troops.map((troop) => (
            <TouchableOpacity
              onPress={() => {
                setIsValid(true);
                setTroopId(troop.id);
              }}
              style={
                troop.id === troopId
                  ? [styles.patrol, styles.active]
                  : styles.patrol
              }
              key={troop.id}>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: 'bold',
                  fontFamily: 'oxygen-bold',
                  color: '#fff',
                }}>
                Troop {troop.unitNumber} of {troop.council} council
              </Text>
            </TouchableOpacity>
          ))}
          {!isValid && <Text>Please select a troop or add one below</Text>}
          <View style={styles.btnContainer}>
            <TouchableOpacity
              style={{
                justifyContent: 'center',
                width: '100%',
                borderRadius: 15,
                backgroundColor: '#A0CD72',
                paddingHorizontal: 20,
                borderWidth: 1,
              }}
              onPress={() => {
                const signUpData = {...route.params};
                delete signUpData.nextView;
                navigation.navigate('CreateTroop', signUpData);
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 19,
                    paddingVertical: 10,
                    fontFamily: 'oxygen',
                  }}>
                  Add Troop
                </Text>
                <AntDesign
                  style={{position: 'absolute', left: 15, top: 10}}
                  name="pluscircleo"
                  size={24}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
        {isValid && (
          <NextButton
            text="Select your role"
            iconName="ios-arrow-round-forward"
            onClick={nextForm}
          />
        )}
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
    fontSize: 16,
    fontFamily: 'oxygen-bold',
    margin: 18,
  },
  btnContainer: {
    alignItems: 'center',
    marginHorizontal: 20,
    width: '100%',
    marginVertical: 20,
  },
});

export default JoinTroop;
