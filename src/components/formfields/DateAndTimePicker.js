import React, {useState} from 'react';
import CalModal from '../CalModal';
import {Platform, Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import {Calendar} from 'react-native-calendars';
import Colors from '../../../constants/Colors';
import DateTimePicker from '@react-native-community/datetimepicker';
import Fonts from '../../../constants/Fonts';

const DateAndTimePicker = ({
  chooseDayMsg,
  chooseTimeMsg,
  nextForm,
  date,
  setDate,
  time,
  setTime,
  navigation,
}) => {
  const [showFirstModal, setShowFirstModal] = useState(true);
  const [showTimePicker, setShowTimePicker] = useState(Platform.OS === 'ios');

  return (
    <CalModal goBack={navigation.goBack}>
      {!date || showFirstModal ? (
        <View>
          <View style={styles.heading}>
            <Text style={styles.headingText}>{chooseDayMsg}</Text>
          </View>
          <Calendar
            style={{backgroundColor: '#fff'}}
            current={date}
            markingType={'custom'}
            markedDates={{
              [new Date().toLocaleDateString('en-US')]: {
                customStyles: {
                  container: {
                    backgroundColor: Colors.lightGray,
                    elevation: 2,
                  },
                  text: {
                    color: 'black',
                  },
                },
              },
              [date]: {
                selected: true,
                disableTouchEvent: true,
              },
            }}
            onDayPress={(day) => {
              setDate(day.dateString);
            }}
          />
          <TouchableOpacity
            onPress={() => {
              setShowFirstModal(false);
            }}
            style={{
              padding: 12,
              alignItems: 'center',
              backgroundColor: Colors.lightGreen,
              borderRadius: 4,
            }}>
            <Text style={{fontSize: 18, fontFamily: Fonts.primaryTextBold}}>
              Confirm
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View>
          <View style={styles.heading}>
            <Text style={styles.headingText}>{chooseTimeMsg}</Text>
          </View>
          {showTimePicker && (
            <DateTimePicker
              value={time}
              minuteInterval={5}
              mode="time"
              display="default"
              onChange={(event, date) => {
                setShowTimePicker(Platform.OS === 'ios');
                setTime(new Date(date));
                if (Platform.OS === 'android') {
                  nextForm();
                  setShowFirstModal(true);
                }
              }}
            />
          )}
          <TouchableOpacity
            onPress={() => {
              if (Platform.OS === 'ios') {
                nextForm();
                setShowFirstModal(true);
              }
              setShowTimePicker(true);
            }}
            style={{
              padding: 12,
              alignItems: 'center',
              backgroundColor: Colors.lightGreen,
              borderRadius: 4,
            }}>
            <Text style={{fontSize: 18, fontFamily: Fonts.primaryTextBold}}>
              Choose Time
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

export default DateAndTimePicker;
