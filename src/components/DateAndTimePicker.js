import React, {useState} from 'react';
import CalModal from './CalModal';
import {Platform, Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import {Calendar} from 'react-native-calendars';
import Colors from '../../constants/Colors';
import DateTimePicker from '@react-native-community/datetimepicker';

const DateAndTimePicker = ({
  chooseDay,
  chooseTime,
  nextForm,
  date,
  setDate,
  time,
  setTime,
  showModal,
  setShowModal,
}) => {
  const [showFirstModal, setShowFirstModal] = useState(true);
  const [showTimePicker, setShowTimePicker] = useState(Platform.OS === 'ios');

  return (
    <CalModal show={showModal} setShow={setShowModal}>
      {!date || showFirstModal ? (
        <View>
          <View style={styles.heading}>
            <Text style={styles.headingText}>{chooseDay}</Text>
          </View>
          <Calendar
            current={date}
            markingType={'custom'}
            markedDates={{
              [new Date().toLocaleDateString('fr-CA')]: {
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
            <Text style={{fontSize: 18, fontFamily: 'oxygen-bold'}}>
              Confirm
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View>
          <View style={styles.heading}>
            <Text style={styles.headingText}>{chooseTime}</Text>
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
                  setShowModal(false);
                  nextForm();
                }
              }}
            />
          )}
          <TouchableOpacity
            onPress={() => {
              if (Platform.OS === 'ios') {
                setShowModal(false);
                nextForm();
              }
              setShowTimePicker(true);
            }}
            style={{
              padding: 12,
              alignItems: 'center',
              backgroundColor: Colors.lightGreen,
              borderRadius: 4,
            }}>
            <Text style={{fontSize: 18, fontFamily: 'oxygen-bold'}}>
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
    fontFamily: 'oxygen-bold',
    fontSize: 19,
    lineHeight: 28,
    padding: 5,
    paddingBottom: 14,
  },
});

export default DateAndTimePicker;
