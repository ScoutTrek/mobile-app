import React, {useState} from 'react';
import TimePicker from '../../../components/formfields/TimePicker';
import {eventData} from './ChooseName';
import moment from 'moment';

const ChooseTwoTimes = ({navigation, route}) => {
  const {nextView, chooseTime1Msg, chooseTime2Msg, btn1, btn2} = route.params;

  const formState = eventData();

  const [time1, setTime1] = useState(
    moment(+eventData()?.[route.params.time1Name], 'MM-DD-YYYY').isValid()
      ? moment(+eventData()?.[route.params.time1Name])
      : new Date('January 1, 2020 10:30:00')
  );
  const [time2, setTime2] = useState(
    moment(+eventData()?.[route.params.time2Name], 'MM-DD-YYYY').isValid()
      ? moment(+eventData()?.[route.params.time2Name])
      : new Date('January 1, 2020 11:00:00')
  );

  const nextForm = (timeParam) => {
    const finalTime2 = timeParam || time2;
    eventData({
      ...formState,
      [route.params.time1Name]: time1,
      [route.params.time2Name]: finalTime2,
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
    <TimePicker
      chooseTime1Msg={chooseTime1Msg}
      chooseTime2Msg={chooseTime2Msg}
      btn1={btn1}
      btn2={btn2}
      nextForm={nextForm}
      time1={time1}
      setTime1={setTime1}
      time2={time2}
      setTime2={setTime2}
      navigation={navigation}
    />
  );
};

export default ChooseTwoTimes;
