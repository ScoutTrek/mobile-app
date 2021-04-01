import React, {useEffect, useState} from 'react';
import CalModal from '../CalModal';
import {Platform, Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import {Calendar} from 'react-native-calendars';
import Colors from '../../../constants/Colors';
import Fonts from '../../../constants/Fonts';
import moment from 'moment';

const DateAndTimePicker = ({
  chooseDayMsg,
  handleSubmit,
  date,
  setDate,
  goBack,
}) => {
  return (
    <CalModal goBack={goBack}>
      <View>
        <View style={styles.heading}>
          <Text style={styles.headingText}>{chooseDayMsg}</Text>
        </View>
        <Calendar
          style={{backgroundColor: '#fff'}}
          current={date.format('YYYY-MM-DD')}
          markingType={'custom'}
          markedDates={{
            [moment().format('YYYY-MM-DD')]: {
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
            [date.format('YYYY-MM-DD')]: {
              selected: true,
              disableTouchEvent: true,
            },
          }}
          onDayPress={(day) => {
            setDate(moment(day.dateString));
          }}
        />
        <TouchableOpacity
          onPress={handleSubmit}
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
