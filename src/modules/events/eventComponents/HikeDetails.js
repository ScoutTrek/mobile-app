import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  Button,
  TextInput,
  Switch,
  Slider,
  Platform,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
} from 'react-native';

import Hike from '../../../../data-models/Hike';

import {createHikeEventDocument} from '../../../firebase/firebase.utils';

import DateTimePicker from '@react-native-community/datetimepicker';

import Colors from '../../../../constants/Colors';
import Constants from 'expo-constants';
import {useSelector} from 'react-redux';

const HikeDetails = ({navigation, route}) => {
  const expoToken = useSelector(state => state.auth.expoToken);

  const [date, setDate] = useState(new Date(Date.now()));
  const [mode, setMode] = useState('date');
  const [visible, setVisible] = useState(false);

  // description
  const [description, setDescription] = useState(
    '<h1>We are going to the moon</h1><p>And you should bring some oxygen.</p>'
  );
  const [title, setTitle] = useState('');
  // display contact
  const [distance, setDistance] = useState(1);
  const [duration, setDuration] = useState(1);
  const [contact, setContact] = useState(false);

  const setState = (event, newDate) => {
    setDate(() => {
      setVisible(Platform.OS === 'ios');
      return newDate;
    });
  };

  const show = mode => {
    setMode(() => {
      setVisible(true);
      return mode;
    });
  };

  const sendPushNotification = async body => {
    const message = {
      to: expoToken,
      sound: 'default',
      title: 'ScoutTrek Reminder',
      body: `${body} event has been created!`,
      icon: '../../assets/images/Icon.png',
    };
    const response = await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });
  };

  const back = () => navigation.goBack();

  const submit = () => {
    const newHike = new Hike(
      'Jake',
      route.params['ChooseMeetPoint'],
      route.params['ChooseLocation'],
      date,
      title,
      description,
      distance
    );
    createHikeEventDocument(newHike);
    sendPushNotification(title);
    navigation.popToTop();
    navigation.pop();
    navigation.navigate('Calendar');
  };

  return (
    <View style={{flex: 1}}>
      <KeyboardAvoidingView
        behavior="padding"
        keyboardVerticalOffset={0}
        style={{flex: 1}}
        enabled>
        <ScrollView
          contentContainerStyle={{
            // flexGrow: 1,
            paddingBottom: 40,
            width: '100%',
          }}>
          <View style={styles.inputContainer}>
            <Text style={styles.formHeading}>
              What will the event be called?
            </Text>
            <TextInput
              style={styles.input}
              onChangeText={setTitle}
              value={title}
              placeholder="Event Name"
              placeholderTextColor={Colors.placeholderTextColor}
            />
          </View>
          <View style={styles.dateTime}>
            <View style={styles.btns}>
              <Button title="Choose Date" onPress={() => show('date')} />
              <Button title="Meet Time" onPress={() => show('time')} />
            </View>
            <View style={styles.btns}>
              <Text>{date.toDateString()}</Text>
              <Text>{date.toTimeString().substr(0, 5)}</Text>
            </View>
          </View>
          {visible && (
            <DateTimePicker
              value={date}
              mode={mode}
              is24Hour={false}
              display="default"
              onChange={setState}
            />
          )}

          <Text style={styles.formHeading}>
            What do you want people to know about the event?
          </Text>
          <View style={styles.displayContactContainer}>
            <Text style={styles.formHeading}>Hike Distance (in miles)?</Text>
            <View style={styles.sliderContainer}>
              <Slider
                minimumValue={1}
                maximumValue={20}
                step={1}
                style={styles.slider}
                value={distance}
                onValueChange={setDistance}
              />
              <Text style={styles.sliderText}>{distance}</Text>
            </View>
          </View>

          <TouchableOpacity onPress={submit} style={styles.submitBtn}>
            <Text style={styles.text}>Complete</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  inputContainer: {
    width: '100%',
    marginTop: 10 + Constants.statusBarHeight,
  },
  input: {
    padding: 12,
    paddingHorizontal: 22,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: Colors.purple,
    fontSize: 15,
    flexDirection: 'row',
    flex: 1,
    fontFamily: 'oxygen',
    backgroundColor: '#fff',
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
  textEditor: {
    height: 80,
    backgroundColor: Colors.green,
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
    backgroundColor: Colors.green,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    height: 52,
    marginTop: 30,
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
  toolbarButton: {
    fontSize: 20,
    width: 28,
    height: 28,
    textAlign: 'center',
  },
  italicButton: {
    fontStyle: 'italic',
  },
  boldButton: {
    fontWeight: 'bold',
  },
  underlineButton: {
    textDecorationLine: 'underline',
  },
  lineThroughButton: {
    textDecorationLine: 'line-through',
  },
});

export default HikeDetails;
