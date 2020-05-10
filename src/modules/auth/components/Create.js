import React, {useReducer} from 'react';
import {
  Button,
  Dimensions,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Picker,
} from 'react-native';
import Colors from '../../../../constants/Colors';
import Constants from 'expo-constants';
import NextButton from '../../../components/buttons/NextButton';
import {gql} from '@apollo/client';
import {useMutation} from '@apollo/react-hooks';
import {add} from 'react-native-reanimated';

const STATES = [
  'Alabama',
  'Alaska',
  'American Samoa',
  'Arizona',
  'Arkansas',
  'California',
  'Colorado',
  'Connecticut',
  'Delaware',
  'District of Columbia',
  'Federated States of Micronesia',
  'Florida',
  'Georgia',
  'Guam',
  'Hawaii',
  'Idaho',
  'Illinois',
  'Indiana',
  'Iowa',
  'Kansas',
  'Kentucky',
  'Louisiana',
  'Maine',
  'Marshall Islands',
  'Maryland',
  'Massachusetts',
  'Michigan',
  'Minnesota',
  'Mississippi',
  'Missouri',
  'Montana',
  'Nebraska',
  'Nevada',
  'New Hampshire',
  'New Jersey',
  'New Mexico',
  'New York',
  'North Carolina',
  'North Dakota',
  'Northern Mariana Islands',
  'Ohio',
  'Oklahoma',
  'Oregon',
  'Pennsylvania',
  'Puerto Rico',
  'Rhode Island',
  'South Carolina',
  'South Dakota',
  'Tennessee',
  'Texas',
  'Utah',
  'Vermont',
  'Virgin Island',
  'Virginia',
  'Washington',
  'West Virginia',
  'Wisconsin',
  'Wyoming',
];

const ADD_TROOP = gql`
  mutation AddTroop($troopInfo: AddTroopInput) {
    addTroop(input: $troopInfo) {
      id
    }
  }
`;

import {formReducer} from '../SignUp';

const CreateTroop = ({navigation, route}) => {
  const [addTroop, {data, loading}] = useMutation(ADD_TROOP);

  const [formState, dispatchFormChange] = useReducer(formReducer, {
    inputValues: {
      council: '',
      state: '',
      city: '',
      unitNumber: '',
    },
    inputValidities: {
      council: false,
      state: false,
      unitNumber: false,
    },
    formIsValid: false,
  });

  const handleInputChange = (inputIdentifier, value) => {
    let isValid = false;
    if (value.trim().length > 0) {
      isValid = true;
    }

    dispatchFormChange({
      type: 'UPDATE_INPUT_FIELD',
      value: value,
      input: inputIdentifier,
      isValid,
    });
  };

  const nextForm = async () => {
    console.log(formState);
    await addTroop({
      variables: {
        troopInfo: {
          council: formState.inputValues.council,
          state: formState.inputValues.state,
          unitNumber: +formState.inputValues.unitNumber,
        },
      },
    });
  };

  if (data && !loading) {
    const signUpData = {
      ...route.params,
      troop: data.addTroop.id,
    };
    delete signUpData.nextView;
    navigation.navigate(route.params.nextView, signUpData);
  }

  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={0}
      style={{flex: 1}}
      enabled>
      <View style={{flex: 1}}>
        <View style={styles.inputContainer}>
          <Text style={styles.formHeading}>
            What is the name of your troop council?
          </Text>
          <TextInput
            style={styles.input}
            onChangeText={value => handleInputChange('council', value)}
            value={formState.inputValues.council}
            placeholder="Council Name"
            placeholderTextColor={Colors.placeholderTextColor}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.formHeading}>What state do you live in?</Text>
          <Picker
            style={{
              width: (Dimensions.get('window').width * 2) / 3,
            }}
            selectedValue={formState.inputValues.state}
            onValueChange={value => handleInputChange('state', value)}
            onSelect={value => handleInputChange('state', value)}>
            {STATES.map(state => (
              <Picker.Item key={state} label={state} value={state} />
            ))}
          </Picker>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.formHeading}>What is your troop number?</Text>
          <TextInput
            style={styles.troopNumber}
            onChangeText={value => handleInputChange('unitNumber', value)}
            value={formState.inputValues.unitNumber}
            placeholderTextColor={Colors.placeholderTextColor}
          />
        </View>
        <NextButton
          text="Select your role"
          iconName="ios-arrow-round-forward"
          onClick={nextForm}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 15 + Constants.statusBarHeight,
    paddingHorizontal: 15,
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
  textBar: {
    flex: 1,
    backgroundColor: Colors.offWhite,
  },
  formHeading: {
    borderColor: Colors.secondary,
    fontSize: 15,
    fontFamily: 'oxygen-bold',
    margin: 18,
  },
});

export default CreateTroop;
