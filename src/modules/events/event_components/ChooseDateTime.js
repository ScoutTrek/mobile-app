import React, {useState} from 'react';
import DateAndTimePicker from '../../../components/formfields/DateAndTimePicker';
import {eventData} from './ChooseName';
import moment from 'moment';
import useStateCallback from '../../../hooks/useStateWithCallback';

const ChooseDateTime = ({navigation, route}) => {
  const [date, setDate] = useState(
    moment(+eventData()?.[route.params.valName], 'MM-DD-YYYY').isValid()
      ? moment(+eventData()?.[route.params.valName])
      : new Date()
  );
  const [time, setTime] = useState(
    moment(+eventData()?.[route.params.valName], 'MM-DD-YYYY').isValid()
      ? moment(+eventData()?.[route.params.valName], 'MM-DD-YYYY')
      : new Date()
  );
  const [showTimePicker, setShowTimePicker] = useState(Platform.OS === 'ios');

  const nextForm = (timeParam) => {
    const finalTime = timeParam || time;
    const prevData = eventData();
    eventData({
      ...prevData,
      [route.params.valName]: new Date(
        `${date}T${finalTime.toISOString().split('T')[1]}`
      ),
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
