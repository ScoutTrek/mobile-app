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
  Alert,
} from 'react-native';
import Colors from '../../../../constants/Colors';
import Fonts from '../../../../constants/Fonts';
import NextButton from '../../../components/buttons/NextButton';
import {gql, useMutation} from '@apollo/client';

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
import RichInputContainer from '../../../components/containers/RichInputContainer';

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
      city: false,
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

  const back = () => {
    navigation.goBack();
  };

  const nextForm = async () => {
    if (formState.formIsValid) {
      await addTroop({
        variables: {
          troopInfo: {
            council: formState.inputValues.council,
            state: formState.inputValues.state,
            city: formState.inputValues.city,
            unitNumber: +formState.inputValues.unitNumber,
          },
        },
      });
    } else {
      Alert.alert(
        'Almost finished!',
        'Please fill out all of the Troop information before continuing to the next step.'
      );
    }
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
    <RichInputContainer icon="back" back={back}>
      <View style={{flex: 1, paddingBottom: 100}}>
        <View style={styles.inputContainer}>
          <Text style={styles.formHeading}>
            What is the name of your Troop council?
          </Text>
          <TextInput
            style={styles.input}
            onChangeText={(value) => handleInputChange('council', value)}
            value={formState.inputValues.council}
            placeholder="Council Name"
            placeholderTextColor={Colors.placeholderTextColor}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.formHeading}>What state do you live in?</Text>
          <View style={{alignItems: 'center'}}>
            <Picker
              style={{
                width: (Dimensions.get('window').width * 2) / 2.5,
              }}
              selectedValue={formState.inputValues.state}
              onValueChange={(value) => handleInputChange('state', value)}
              onSelect={(value) => handleInputChange('state', value)}>
              {STATES.map((state) => (
                <Picker.Item key={state} label={state} value={state} />
              ))}
            </Picker>
          </View>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.formHeading}>What city is your Troop in?</Text>
          <TextInput
            style={styles.input}
            onChangeText={(value) => handleInputChange('city', value)}
            value={formState.inputValues.city}
            placeholder="City"
            placeholderTextColor={Colors.placeholderTextColor}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.formHeading}>What is your Troop number?</Text>
          <TextInput
            style={styles.troopNumber}
            onChangeText={(value) => handleInputChange('unitNumber', value)}
            value={formState.inputValues.unitNumber}
            placeholder=""
            placeholderTextColor={Colors.placeholderTextColor}
          />
        </View>
        {formState.formIsValid && (
          <NextButton
            text="Select your role"
            iconName="arrow-forward-outline"
            onClick={nextForm}
          />
        )}
      </View>
    </RichInputContainer>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    width: '100%',
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
    fontFamily: Fonts.primaryText,
    backgroundColor: '#fff',
  },
  troopNumber: {
    padding: 12,
    alignItems: 'flex-start',
    width: 100,
    height: 50,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: Colors.purple,
    fontSize: 17,
    flexDirection: 'row',
    fontFamily: Fonts.primaryText,
    backgroundColor: '#fff',
  },
  textBar: {
    flex: 1,
    backgroundColor: Colors.offWhite,
  },
  formHeading: {
    borderColor: Colors.secondary,
    fontSize: 15,
    fontFamily: Fonts.primaryTextBold,
    marginVertical: 18,
  },
});

export default CreateTroop;
