import React, {useState} from 'react';
import {
  View,
  Text,
  Button,
  TextInput,
  Platform,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
} from 'react-native';

import CNRichTextEditor, {
  CNToolbar,
  getInitialObject,
  getDefaultStyles,
} from 'react-native-cn-richtext-editor';

// const defaultStyles = getDefaultStyles()

import {createScoutMeetingEventDocument} from '../../../firebase/firebase.utils';

import DateTimePicker from '@react-native-community/datetimepicker';

import Colors from '../../../../constants/Colors';
import Constants from 'expo-constants';
import {Ionicons} from '@expo/vector-icons';
import ScoutMeeting from '../../../../data-models/ScoutMeeting';
import Toggle from '../../../components/formfields/Toggle';

const SelectScoutMeetingInfo = ({navigation}) => {
  // ## Below will become a reducer

  const [time, setTime] = useState(new Date(Date.now()));
  const [visible, setVisible] = useState(false);
  const [startDate, setStartDate] = useState(new Date(Date.now()));
  const [endDate, setEndDate] = useState(new Date(Date.now()));

  const [description, setDescription] = useState('');
  const [shakedownWeek, setShakedownWeek] = useState(false);

  const back = () => navigation.goBack();
  const submit = () => {
    const newScoutMeeting = new ScoutMeeting(
      'KW Henley',
      navigation.getParam('location'),
      time,
      startDate,
      endDate,
      description,
      shakedownWeek
    );
    createScoutMeetingEventDocument(newScoutMeeting);
    navigation.popToTop();
    navigation.dispatch({
      type: 'Navigation/NAVIGATE',
      routeName: 'Main',
      action: {
        type: 'Navigation/NAVIGATE',
        routeName: 'Home',
      },
    });
  };

  return (
    <KeyboardAvoidingView style={{flex: 1}} behavior="padding" enabled>
      <ScrollView contentContainerStyle={{flexGrow: 1, width: '100%'}}>
        <View style={styles.dateTime}>
          <View style={styles.btns}>
            <Button
              title="Choose Time"
              onPress={() => setVisible(Platform.OS === 'ios')}
            />
          </View>
          <View style={styles.btns}>
            <Text>{time.toTimeString().substr(0, 5)}</Text>
          </View>
        </View>
        {visible && (
          <DateTimePicker
            value={time}
            mode="time"
            is24Hour={false}
            display="default"
            onChange={(event, date) => {
              console.log(date);
              setTime(new Date(date));
            }}
          />
        )}

        <Text style={styles.formHeading}>
          What activities will be taking place this week?
        </Text>
        <TextInput
          multiline
          numberOfLines={1}
          style={styles.input}
          onChangeText={setDescription}
          value={description}
          onFocus={() => setVisible(false)}
        />

        <Toggle
          heading="Will there be a shakedown this week?"
          active={shakedownWeek}
          onChange={setShakedownWeek}
        />

        <TouchableOpacity onPress={submit} style={styles.submitBtn}>
          <Text style={styles.text}>Complete</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  input: {
    padding: 12,
    marginHorizontal: 18,
    borderRadius: 7,
    borderWidth: 1,
    fontSize: 15,
    flexDirection: 'row',
    flex: 1,
    fontFamily: 'oxygen',
    backgroundColor: '#fff',
    textAlignVertical: 'top',
    borderColor: Colors.primary,
  },
  dateTime: {
    marginTop: 15,
    flexDirection: 'row',
  },
  btns: {
    width: Dimensions.get('window').width / 2 - 30,
    height: Dimensions.get('window').height / 5,
    margin: 15,
    justifyContent: 'space-evenly',
  },
  inputContainer: {
    width: '100%',
    marginTop: 10 + Constants.statusBarHeight,
  },
  formHeading: {
    borderColor: Colors.secondary,
    fontSize: 15,
    fontFamily: 'oxygen-bold',
    margin: 18,
  },
  displayContactContainer: {
    width: '100%',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    marginTop: 15,
  },
  displayContact: {
    marginHorizontal: 18,
  },
  sliderContainer: {
    flexDirection: 'row',
    flex: 1,
  },
  slider: {
    flex: 7,
    justifyContent: 'flex-start',
  },
  sliderText: {
    flex: 1,
    textAlignVertical: 'center',
    textAlign: 'center',
    fontSize: 18,
    fontFamily: 'oxygen-bold',
    paddingTop: 4,
  },
  submitBtn: {
    backgroundColor: Colors.secondary,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    height: 52,
    marginTop: 30,
    position: 'absolute',
    bottom: 12,
  },
  text: {
    color: '#ffffff',
    fontSize: 18,
    fontFamily: 'oxygen-bold',
  },
  main: {
    flex: 1,
    height: '30%',
    marginTop: 10,
    paddingLeft: 30,
    paddingRight: 30,
    paddingBottom: 1,
    alignItems: 'stretch',
  },
});

export default SelectScoutMeetingInfo;
