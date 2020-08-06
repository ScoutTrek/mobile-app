import React, {useState} from 'react';
import {eventData} from './ChooseName';
import {toTitleCase} from '../../../components/utils/toTitleCase';
import moment from 'moment';
import {Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Colors from '../../../../constants/Colors';
import Fonts from '../../../../constants/Fonts';
import CalModal from '../../../components/CalModal';

const ChooseOneTime = ({navigation, route}) => {
  const {nextView, chooseTimeMsg} = route.params;

  const [time, setTime] = useState(
    moment(+eventData()?.[route.params.valName], 'MM-DD-YYYY').isValid()
      ? moment(+eventData()?.[route.params.valName])
      : new Date('January 1, 2000 17:30:00')
  );

  const nextForm = () => {
    eventData({
      ...eventData(),
      [route.params.valName]: time,
    });
    navigation.navigate(
      route.params.edit === 'create'
        ? 'ConfirmEventDetails'
        : route.params.edit === 'edit'
        ? 'EditEvent'
        : nextView
    );
  };

  return (
    <CalModal goBack={navigation.goBack}>
      <View>
        <View style={styles.heading}>
          <Text style={styles.headingText}>{chooseTimeMsg}</Text>
        </View>
        <DateTimePicker
          value={time}
          minuteInterval={5}
          mode="time"
          is24Hour={false}
          display="default"
          onChange={(event, date) => {
            setTime(new Date(date));
            if (Platform.OS === 'android') {
              nextForm();
            }
          }}
        />
        <TouchableOpacity
          onPress={() => {
            nextForm();
          }}
          style={{
            padding: 12,
            alignItems: 'center',
            backgroundColor: Colors.lightGreen,
            borderRadius: 4,
          }}>
          <Text style={{fontSize: 18, fontFamily: Fonts.primaryTextBold}}>
            Choose End Time
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
    color: '#000',
    fontSize: 18,
    lineHeight: 28,
    padding: 5,
    paddingBottom: 14,
  },
});

export default ChooseOneTime;
