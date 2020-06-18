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
  ScrollView,
} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';

import ENV from '../../../../helpers/env';

import MapSearch from '../../../components/MapSearch';

import {Ionicons} from '@expo/vector-icons';

import Constants from 'expo-constants';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import uuidv4 from 'uuid/v1';
import Colors from '../../../../constants/Colors';
import NextButton from '../../../components/buttons/NextButton';
import CalModal from '../../../components/CalModal';
import {Calendar} from 'react-native-calendars';
import DateTimePicker from '@react-native-community/datetimepicker';
import DateAndTimePicker from '../../../components/DateAndTimePicker';

const ChooseDatesModal = (isMultipleDays) => {
  if (isMultipleDays) {
    return <View></View>;
  }
};

const locationToken = uuidv4();

const ChooseLocation = ({navigation, route}) => {
  const {nextView, placeholder} = route.params;

  const [location, setLocation] = useState();
  // const [locationId, setLocationId] = useState(null)
  const [locationCoords, setLocationCoords] = useState();
  const [locationString, setLocationString] = useState('');
  const [error, setError] = useState(null);

  const [date, setDate] = useState('');
  const [date2, setDate2] = useState('');
  const [time, setTime] = useState(new Date('January 1, 2000 11:00:00'));
  const [time2, setTime2] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(Platform.OS === 'ios');
  const [meetTime, setMeetTime] = useState(new Date('January 1, 2000 9:30:00'));
  const [leaveTime, setLeaveTime] = useState(
    new Date('January 1, 2000 10:00:00')
  );
  const [showDateModal, setShowDateModal] = useState(false);
  const [showMeetTimeModal, setShowMeetTimeModal] = useState(false);
  const [showFirstModal, setShowFirstModal] = useState(true);

  const _getLocationAsync = async () => {
    let {status} = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      setError('Permission to access location was denied');
    }
    const userLocation = await Location.getCurrentPositionAsync({});
    setLocation({
      latitude: userLocation.coords.latitude,
      longitude: userLocation.coords.longitude,
    });
  };

  const _getPlaceDetails = async (id) => {
    console.log(ENV.googleApiKey);
    const locationDetails = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${id}&key=${ENV.googleApiKey}`
    ).catch((err) => console.log(err));
    const locationData = await locationDetails.json();

    const chosenPlace = {
      latitude: locationData.result.geometry.location.lat,
      longitude: locationData.result.geometry.location.lng,
    };
    setLocation(chosenPlace);
    setLocationCoords(chosenPlace);
    setLocationString(locationData.result.formatted_address);

    Keyboard.dismiss();
  };

  const back = () => navigation.popToTop();
  const nextForm = () => {
    if (route.name === 'ChooseLocation') {
      const datetime = `${date}T${time.toISOString().split('T')[1]}`;
      const navData = {
        name: route.params.name,
        location: locationCoords,
        datetime,
      };
      delete navData.nextView;
      navigation.navigate(nextView, navData);
    } else if (route.name === 'ChooseMeetPoint') {
      const navData = {
        name: route.params.name,
        datetime: route.params.datetime,
        location: route.params.location,
        meetLocation: locationCoords,
        meetTime: meetTime.toString(),
        leaveTime: leaveTime.toString(),
      };
      delete navData.nextView;
      navigation.navigate(nextView, navData);
    }
  };

  const selectLocationHandler = async (event) => {
    const tappedLocation = {
      latitude: event.nativeEvent.coordinate.latitude,
      longitude: event.nativeEvent.coordinate.longitude,
    };
    setLocationCoords(tappedLocation);
    const locationDetails = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${tappedLocation.latitude},${tappedLocation.longitude}&key=${ENV.googleApiKey}`
    );
    const locationData = await locationDetails.json();
    setLocationString(locationData.results[0].formatted_address);
  };

  useEffect(() => {
    _getLocationAsync();
  }, []);

  if (!location) {
    return <ActivityIndicator />;
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.mapStyle}
        onPress={selectLocationHandler}
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        region={
          locationCoords && {
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.0822,
            longitudeDelta: 0.04,
          }
        }>
        {locationCoords && <Marker coordinate={locationCoords} />}
      </MapView>
      <View style={styles.searchContainer}>
        <MapSearch
          locationToken={locationToken}
          back={back}
          nextForm={() => {
            nextForm();
          }}
          placeholder={locationString ? locationString : placeholder}
          _getPlaceDetails={_getPlaceDetails}
          style={styles.searchBar}
        />
      </View>
      {route.params.initialModal === 'date' ? (
        <DateAndTimePicker
          chooseDay={route.params.chooseDate}
          chooseTime={route.params.chooseTime}
          nextForm={nextForm}
          date={date}
          setDate={setDate}
          time={time}
          setTime={setTime}
          showModal={showDateModal}
          setShowModal={setShowDateModal}
        />
      ) : (
        <CalModal show={showMeetTimeModal} setShow={setShowMeetTimeModal}>
          {!meetTime || showFirstModal ? (
            <View>
              <View style={styles.heading}>
                <Text style={styles.headingText}>
                  {route.params.chooseMeetTime}
                </Text>
              </View>
              {showTimePicker && (
                <DateTimePicker
                  value={meetTime}
                  minuteInterval={5}
                  mode="time"
                  is24Hour={false}
                  display="default"
                  onChange={(event, date) => {
                    setShowTimePicker(Platform.OS === 'ios');
                    setMeetTime(new Date(date));
                    if (Platform.OS === 'android') {
                      setShowFirstModal(false);
                    }
                  }}
                />
              )}
              <TouchableOpacity
                onPress={() => {
                  setShowTimePicker(true);
                  if (Platform.OS === 'ios') {
                    setShowFirstModal(false);
                  }
                }}
                style={{
                  padding: 12,
                  alignItems: 'center',
                  backgroundColor: Colors.lightGreen,
                  borderRadius: 4,
                }}>
                <Text style={{fontSize: 18, fontFamily: 'oxygen-bold'}}>
                  Confirm Meet Time
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View>
              <View style={styles.heading}>
                <Text style={styles.headingText}>
                  {route.params.chooseLeaveTime}
                </Text>
              </View>
              {showTimePicker && (
                <DateTimePicker
                  value={leaveTime}
                  minuteInterval={5}
                  mode="time"
                  is24Hour={false}
                  display="default"
                  onChange={(event, date) => {
                    setShowTimePicker(Platform.OS === 'ios');
                    setLeaveTime(new Date(date));
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
                  Choose Leave Time
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </CalModal>
      )}
      {locationCoords && (
        <NextButton
          text="Next"
          iconName="ios-arrow-round-forward"
          onClick={() => {
            route.params.initialModal === 'date'
              ? setShowDateModal(true)
              : setShowMeetTimeModal(true);
          }}
        />
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

export default ChooseLocation;
