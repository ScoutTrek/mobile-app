import React, {useState, useEffect} from 'react';
import {
  Platform,
  View,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity,
  Keyboard,
  Text,
} from 'react-native';

import Constants from 'expo-constants';
import uuidv4 from 'uuid/v1';
import Colors from '../../../../constants/Colors';
import CalModal from '../../../components/CalModal';
import DateTimePicker from '@react-native-community/datetimepicker';
import DateAndTimePicker from '../../../components/DateAndTimePicker';

const ChooseEndDateTime = ({navigation, route}) => {
  const {nextView, placeholder} = route.params;

  const [date, setDate] = useState('');
  // const [time, setTime] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(Platform.OS === 'ios');
  const [checkoutTime, setCheckoutTime] = useState(
    new Date('January 1, 2000 11:00:00')
  );
  const [showDateModal, setShowDateModal] = useState(true);
  const [showMeetTimeModal, setShowMeetTimeModal] = useState(false);
  const [showFirstModal, setShowFirstModal] = useState(true);

  const back = () => navigation.popToTop();
  const nextForm = () => {
    // update to have separate checkout time in the future.
    const datetime = `${date}T${checkoutTime.toISOString().split('T')[1]}`;
    const navData = {
      name: route.params.name,
      datetime: route.params.datetime,
      location: route.params.location,
      meetLocation: route.params.meetLocation,
      meetTime: route.params.meetTime,
      leaveTime: route.params.leaveTime,
      endDatetime: datetime,
    };
    delete navData.nextView;
    navigation.navigate(nextView, navData);
  };

  return (
    <View style={styles.container}>
      {route.params.initialModal === 'date' ? (
        <DateAndTimePicker
          chooseDay={route.params.chooseCheckoutTime}
          chooseTime={route.params.chooseReturnTime}
          nextForm={nextForm}
          date={date}
          setDate={setDate}
          time={checkoutTime}
          setTime={setCheckoutTime}
          showModal={showDateModal}
          setShowModal={setShowDateModal}
        />
      ) : (
        <CalModal show={showMeetTimeModal} setShow={setShowMeetTimeModal}>
          <View>
            <View style={styles.heading}>
              <Text style={styles.headingText}>
                {route.params.chooseLeaveTime}
              </Text>
            </View>
            {showTimePicker && (
              <DateTimePicker
                value={checkoutTime}
                minuteInterval={5}
                mode="time"
                is24Hour={false}
                display="default"
                onChange={(event, date) => {
                  setShowTimePicker(Platform.OS === 'ios');
                  setCheckoutTime(new Date(date));
                  if (Platform.OS === 'android') {
                    setShowMeetTimeModal(false);
                    nextForm();
                  }
                }}
              />
            )}
            <TouchableOpacity
              onPress={() => {
                setShowTimePicker(true);
                if (Platform.OS === 'ios') {
                  setShowMeetTimeModal(false);
                  nextForm();
                }
              }}
              style={{
                padding: 12,
                alignItems: 'center',
                backgroundColor: Colors.lightGreen,
                borderRadius: 4,
              }}>
              <Text style={{fontSize: 18, fontFamily: 'oxygen-bold'}}>
                Choose Checkout Time
              </Text>
            </TouchableOpacity>
          </View>
          )}
        </CalModal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    margin: 15,
    borderBottomWidth: 1,
    borderBottomColor: Colors.tabIconDefault,
  },
  headingText: {
    fontFamily: 'oxygen-bold',
    fontSize: 19,
    lineHeight: 28,
    padding: 5,
    paddingBottom: 14,
  },
  mapStyle: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  searchContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
    left: 10,
  },
});

export default ChooseEndDateTime;
