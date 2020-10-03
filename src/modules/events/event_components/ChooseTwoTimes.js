import React, {useState} from 'react';
import TimePicker from '../../../components/formfields/TimePicker';
import {eventData} from './ChooseName';
import moment from 'moment';

const ChooseTwoTimes = ({navigation, route}) => {
  const {nextView, chooseTime1Msg, chooseTime2Msg, btn1, btn2} = route.params;

  const formState = eventData();

  // Need to handle if the date does not already exist in the form state.
  const [time1, setTime1] = useState(
    moment(formState?.[route.params.time1Name], 'MM-DD-YYYY').isValid()
      ? moment(formState?.[route.params.time1Name])
      : moment(formState.datetime)
  );
  const [time2, setTime2] = useState(
    moment(formState?.[route.params.time2Name], 'MM-DD-YYYY').isValid()
      ? moment(formState?.[route.params.time2Name])
      : moment(formState.datetime)
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
