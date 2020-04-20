import React, {useState} from 'react';
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
  KeyboardAvoidingView,
} from 'react-native';

import Hike from '../../../data-models/Hike';
// import {editHikeEventDocument} from '../../firebase/firebase.utils';

import DateTimePicker from '@react-native-community/datetimepicker';
import NextButton from '../../components/buttons/NextButton';

import Colors from '../../../constants/Colors';
import Constants from 'expo-constants';
import {Ionicons} from '@expo/vector-icons';
import {useSelector} from 'react-redux';

const EditHikeDetails = ({navigation, route}) => {
  let dates = useSelector((state) => state.events.events);
  const {currItem} = route.params;
  const event = dates.find((event) => event.id === currItem);

  const expoToken = useSelector((state) => state.auth.expoToken);

  const [date, setDate] = useState(event.date);
  const [mode, setMode] = useState('date');
  const [visible, setVisible] = useState(false);

  // description
  const [description, setDescription] = useState(event.description);
  const [title, setTitle] = useState(event.name);
  // display contact
  const [distance, setDistance] = useState(event.distance);

  const setState = (event, newDate) => {
    setDate(() => {
      setVisible(Platform.OS === 'ios');
      return newDate;
    });
  };

  const show = (mode) => {
    setMode(() => {
      setVisible(true);
      return mode;
    });
  };

  const sendPushNotification = async (body) => {
    console.log(expoToken);
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
      event.meetPoint,
      event.location,
      date,
      title,
      description,
      distance
    );
    editHikeEventDocument(newHike, event.id);
    sendPushNotification(title);
    navigation.pop();
  };

  return (
    <KeyboardAvoidingView style={{flex: 1}} behavior="padding" enabled>
      <ScrollView
        contentContainerStyle={{flexGrow: 1, paddingBottom: 40, width: '100%'}}>
        <View style={styles.inputContainer}>
          <Text style={styles.formHeading}>What will the event be called?</Text>
          <TextInput
            style={styles.input}
            onChangeText={setTitle}
            value={title}
          />
        </View>
        {/*<View style={styles.dateTime}>*/}
        {/*  <View style={styles.btns}>*/}
        {/*    <Button title="Choose Date" onPress={() => show('date')} />*/}
        {/*    <Button title="Meet Time" onPress={() => show('time')} />*/}
        {/*  </View>*/}
        {/*  <View style={styles.btns}>*/}
        {/*    <Text>{date}</Text>*/}
        {/*    <Text>{date}</Text>*/}
        {/*  </View>*/}
        {/*</View>*/}
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
        <TextInput
          multiline
          numberOfLines={1}
          style={styles.input}
          onChangeText={setDescription}
          value={description}
          onFocus={() => setVisible(false)}
        />
        <View style={styles.displayContactContainer}>
          <Text style={styles.formHeading}>Hike Distance (in miles)?</Text>
          <View style={styles.sliderContainer}>
            <Slider
              minimumValue={1}
              maximumValue={30}
              step={1}
              style={styles.slider}
              value={distance}
              onValueChange={setDistance}
            />
            <Text style={styles.sliderText}>{distance}</Text>
          </View>
        </View>

        <TouchableOpacity onPress={submit} style={styles.submitBtn}>
          <Text style={styles.text}>Update</Text>
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

export default EditHikeDetails;
