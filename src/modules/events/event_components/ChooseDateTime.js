import React, {useState} from 'react';
import DateAndTimePicker from '../../../components/formfields/DateAndTimePicker';
import {eventData} from './ChooseName';
import moment from 'moment';

const ChooseDateTime = ({navigation, route}) => {
  const [date, setDate] = useState(
    moment(eventData()?.[route.params.valName], 'MM-DD-YYYY').isValid()
      ? moment(eventData()?.[route.params.valName])
      : moment()
  );

  console.log('Date', eventData()?.[route.params.valName]);
  console.log('moment ', moment(eventData()?.[route.params.valName]));

  const [time, setTime] = useState(
    moment(eventData()?.[route.params.valName], 'MM-DD-YYYY').isValid()
      ? moment(eventData()?.[route.params.valName])
      : moment().set({
          hour: 9,
          minute: 30,
          second: 0,
          millisecond: 0,
        })
  );

  const [showTimePicker, setShowTimePicker] = useState(Platform.OS === 'ios');
  const nextForm = (timeParam) => {
    const finalTime = timeParam || time;
    let datetime = date.set({
      hour: finalTime.get('hour'),
      minute: finalTime.get('minute'),
      second: 0,
      millisecond: 0,
    });
    datetime = datetime.toISOString();
    const prevData = eventData();
    eventData({
      ...prevData,
      [route.params.valName]: datetime,
    });
    navigation.navigate(
      route.params.edit === 'create'
        ? 'ConfirmEventDetails'
        : route.params.edit === 'edit'
        ? 'EditEvent'
        : route.params.nextView
    );
  };

  return (
    <DateAndTimePicker
      chooseDayMsg={route.params.chooseDateMsg}
      chooseTimeMsg={route.params.chooseTimeMsg}
      nextForm={nextForm}
      date={date}
      timeOnly={route.params.timeOnly}
      setDate={setDate}
      time={time}
      setTime={setTime}
      showTimePicker={showTimePicker}
      setShowTimePicker={setShowTimePicker}
      navigation={navigation}
    />
  );
};

export default ChooseDateTime;
