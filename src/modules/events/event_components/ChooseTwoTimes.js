import React, {useState} from 'react';
import TimePicker from '../../../components/formfields/TimePicker';
import {eventData} from './ChooseName';
import {toTitleCase} from '../../../components/utils/toTitleCase';
import moment from 'moment';

const ChooseTwoTimes = ({navigation, route}) => {
  const {nextView, chooseTime1Msg, chooseTime2Msg} = route.params;

  const [time1, setTime1] = useState(new Date('January 1, 2000 10:30:00'));
  const [time2, setTime2] = useState(new Date('January 1, 2000 11:00:00'));

  const nextForm = () => {
    const prevData = eventData();
    eventData({
      ...prevData,
      [route.params.time1Name]: {
        title: toTitleCase(route.params.time1Name),
        value: moment(time1).format('hh:mm A'),
        time: time1,
        type: 'time',
        view: route.name,
      },
      [route.params.time2Name]: {
        title: toTitleCase(route.params.time2Name),
        value: moment(time2).format('hh:mm A'),
        time: time2,
        type: 'time',
        view: route.name,
      },
    });
    navigation.navigate(route.params.edit ? 'ConfirmEventDetails' : nextView);
  };

  return (
    <TimePicker
      chooseTime1Msg={chooseTime1Msg}
      chooseTime2Msg={chooseTime2Msg}
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
