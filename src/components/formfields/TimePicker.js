import {Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Colors from '../../../constants/Colors';
import Fonts from '../../../constants/Fonts';

import React, {useState} from 'react';
import CalModal from '../CalModal';
import moment from 'moment';

const TimePicker = ({
  chooseTime1Msg,
  chooseTime2Msg,
  btn1,
  btn2,
  nextForm,
  time1,
  setTime1,
  time2,
  setTime2,
  navigation,
}) => {
  const [showFirstModal, setShowFirstModal] = useState(true);
  const [showTimePicker, setShowTimePicker] = useState(Platform.OS === 'ios');

  return (
    <CalModal goBack={navigation.goBack}>
      {!time1 || showFirstModal ? (
        <View>
          <View style={styles.heading}>
            <Text style={styles.headingText}>{chooseTime1Msg}</Text>
          </View>
          {showTimePicker && (
            <DateTimePicker
              value={new Date(time1.format())}
              minuteInterval={5}
              mode="time"
              is24Hour={false}
              display="default"
              onChange={(event, date) => {
                setShowTimePicker(Platform.OS === 'ios');
                setTime1(moment(date));
                if (Platform.OS === 'android') {
                  setShowFirstModal(false);
                }
              }}
            />
          )}
          <TouchableOpacity
            onPress={() => {
              setShowTimePicker(true);
              if (Platform.OS === 'ios') {
                setShowFirstModal(false);
              }
            }}
            style={{
              padding: 12,
              alignItems: 'center',
              backgroundColor: Colors.lightGreen,
              borderRadius: 4,
            }}>
            <Text style={{fontSize: 18, fontFamily: Fonts.primaryTextBold}}>
              {btn1}
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View>
          <View style={styles.heading}>
            <Text style={styles.headingText}>{chooseTime2Msg}</Text>
          </View>
          {showTimePicker && (
            <DateTimePicker
              value={new Date(time2.format())}
              minuteInterval={5}
              mode="time"
              is24Hour={false}
              display="default"
              onChange={(event, time) => {
                if (Platform.OS === 'android') {
                  setShowTimePicker(false);
                  nextForm(moment(time));
                  setShowFirstModal(true);
                }
                setTime2(moment(time));
              }}
            />
          )}
          <TouchableOpacity
            onPress={() => {
              if (Platform.OS === 'ios') {
                nextForm();
                setShowFirstModal(true);
              } else {
                setShowTimePicker(true);
              }
            }}
            style={{
              padding: 12,
              alignItems: 'center',
              backgroundColor: Colors.lightGreen,
              borderRadius: 4,
            }}>
            <Text style={{fontSize: 18, fontFamily: Fonts.primaryTextBold}}>
              {btn2}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </CalModal>
  );
};

const styles = StyleSheet.create({
  heading: {
    margin: 15,
    borderBottomWidth: 1,
    borderBottomColor: Colors.tabIconDefault,
  },
  headingText: {
    fontSize: 18,
    lineHeight: 28,
    padding: 5,
    paddingBottom: 14,
  },
});

export default TimePicker;
