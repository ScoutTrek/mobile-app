import React, {useState} from 'react';
import TimePicker from '../../../components/formfields/TimePicker';
import {eventData} from './ChooseName';
import {toTitleCase} from '../../../components/utils/toTitleCase';
import moment from 'moment';

const ChooseTwoTimes = ({navigation, route}) => {
  const {nextView, chooseTime1Msg, chooseTime2Msg, btn1, btn2} = route.params;

  const formState = eventData();

  const [time1, setTime1] = useState(
    formState?.[route.params.time1Name] || new Date('January 1, 2000 10:30:00')
  );
  const [time2, setTime2] = useState(
    formState?.[route.params.time2Name] || new Date('January 1, 2000 11:00:00')
  );

  const nextForm = (time2) => {
    eventData({
      ...formState,
      [route.params.time1Name]: time1,
      [route.params.time2Name]: time2,
    });
    navigation.navigate(route.params.edit ? 'ConfirmEventDetails' : nextView);
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
