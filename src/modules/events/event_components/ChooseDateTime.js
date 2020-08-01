import React, {useState} from 'react';
import DateAndTimePicker from '../../../components/formfields/DateAndTimePicker';
import {eventData} from './ChooseName';
import moment from 'moment';
import useStateCallback from '../../../hooks/useStateWithCallback';

const ChooseDateTime = ({navigation, route}) => {
  const [date, setDate] = useState();
  const [time, setTime] = useState(
    eventData()?.[route.params.valName] || new Date('January 1, 2000 11:00:00')
  );
  const [showTimePicker, setShowTimePicker] = useState(Platform.OS === 'ios');

  const nextForm = (timeParam) => {
    const finalTime = timeParam || time;
    const prevData = eventData();
    eventData({
      ...prevData,
      [route.params.valName]: new Date(
        `${date}T${time.toISOString().split('T')[1]}`
      ),
    });
    navigation.navigate(
      route.params.edit ? 'ConfirmEventDetails' : route.params.nextView
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
