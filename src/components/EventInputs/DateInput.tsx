import React, {useState} from 'react';
import moment from 'moment';
import {
  useEventForm,
  addEventFieldOfType,
} from 'CreateEvent/CreateEventFormStore';
import DateAndTimePicker from '../formfields/DateAndTimePicker';
import DefaultInputButton from './components/DefaultInputButton';
import DateTimeLineItem from '../DateTimeLineItem';
import InputModalContainer from '../containers/InputModalContainer';
import Colors from '../../../constants/Colors';
import Fonts from '../../../constants/Fonts';
import {CalendarList} from 'react-native-calendars';
import {EventInputProps} from './EventInputTypes';

const ChooseDate = ({id, Modal, modalProps, questionText}: EventInputProps) => {
  const [{fields}, dispatch] = useEventForm();
  const [date, setDate] = useState(
    moment(+fields?.[id], 'MM-DD-YYYY').isValid()
      ? moment(+fields?.[id])
      : moment()
  );

  const nextForm = () => {
    dispatch(addEventFieldOfType(id, date));
  };

  return (
    <Modal {...modalProps} title={questionText} onNext={nextForm}>
      <CalendarList
        current={date.format('YYYY-MM-DD')}
        theme={{
          textDayFontFamily: Fonts.primaryText,
          textMonthFontFamily: Fonts.primaryTextBold,
        }}
        headerStyle={{fontSize: 30, fontFamily: Fonts.primaryTextBold}}
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
    </Modal>
  );
};

export default {
  InitialButton: DefaultInputButton,
  EditingComponent: ChooseDate,
  CompletedComponent: (props) => <DateTimeLineItem {...props} format="date" />,
};
