import React, {useState} from 'react';
import DateAndTimePicker from '../../../components/formfields/DateAndTimePicker';
import {eventData} from './ChooseName';
import moment from 'moment';

const ChooseDateTime = ({navigation, route}) => {
  const [date, setDate] = useState();
  const [time, setTime] = useState(new Date('January 1, 2000 11:00:00'));

  const nextForm = () => {
    const prevData = eventData();
    eventData({
      ...prevData,
      date: {
        title: 'Date',
        value: moment(date).format('MMM D YYYY'),
        type: 'date',
        date,
        view: route.name,
      },
      time: {
        title: 'Time',
        value: moment(time).format('hh:mm A'),
        type: 'time',
        time,
        view: route.name,
      },
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
      setDate={setDate}
      time={time}
      setTime={setTime}
      navigation={navigation}
    />
  );
};

export default ChooseDateTime;
