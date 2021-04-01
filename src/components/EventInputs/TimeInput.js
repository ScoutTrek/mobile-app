import React, {useEffect, useState} from 'react';
import {eventData} from '../../../App';
import DateTimePicker from '@react-native-community/datetimepicker';
import DefaultInputButton from '../buttons/DefaultInputButton';
import DateTimeLineItem from '../DateTimeLineItem';
import Colors from '../../../constants/Colors';
import {View, Platform, Modal} from 'react-native';
import InputModalContainer from '../containers/InputModalContainer';

const ChooseTime = ({
  id,
  setModalVisible,
  editing,
  showAndroidClock,
  setShowAndroidClock,
  questionText,
}) => {
  const [time, setTime] = useState(+eventData()?.[id] || new Date());

  const back = () => setModalVisible(false);
  const nextView = (androidTime) => {
    eventData({
      ...eventData(),
      [id]: androidTime || time,
    });
    setModalVisible(false);
  };

  if (Platform.OS === 'ios') {
    return (
      <Modal animationType="fade" transparent={true} visible={editing}>
        <InputModalContainer
          onPress={nextView}
          cancel={back}
          title={questionText}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                width: 218,
                height: 64,
                paddingHorizontal: 10,
                paddingVertical: 5,
                borderRadius: 40,
                backgroundColor: '#fff',
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 0,
                },
                shadowOpacity: 0.08,
                shadowRadius: 6,

                elevation: 3,
              }}>
              <DateTimePicker
                value={time}
                minuteInterval={5}
                mode="time"
                display="inline"
                onChange={(_, newDateString) => {
                  setTime(new Date(newDateString));
                }}
                textColor={Colors.orange}
                style={{
                  width: '100%',
                  height: '100%',
                }}
              />
            </View>
          </View>
        </InputModalContainer>
      </Modal>
    );
  }
  return showAndroidClock ? (
    <DateTimePicker
      value={time}
      minuteInterval={5}
      mode="time"
      display="default"
      onChange={(_, newDateString) => {
        nextView(new Date(newDateString));
        setShowAndroidClock(false);
      }}
      textColor={Colors.orange}
      style={{flex: 1}}
    />
  ) : null;
};

export default {
  InitialButton: DefaultInputButton,
  EditingComponent: ChooseTime,
  CompletedComponent: (props) => <DateTimeLineItem {...props} format="time" />,
};
