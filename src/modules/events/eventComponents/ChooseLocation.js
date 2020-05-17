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

const locationToken = uuidv4();

const ChooseLocation = ({navigation, route}) => {
  const {nextView, placeholder} = route.params;

  const [location, setLocation] = useState();
  // const [locationId, setLocationId] = useState(null)
  const [locationCoords, setLocationCoords] = useState();
  const [locationString, setLocationString] = useState('');
  const [error, setError] = useState(null);

  const [date, setDate] = useState('');
  const [time, setTime] = useState(new Date());
  const [meetTime, setMeetTime] = useState(new Date());
  const [leaveTime, setLeaveTime] = useState(new Date());
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
        meetTime,
        leaveTime,
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
        provider={PROVIDER_GOOGLE}
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
        <CalModal show={showDateModal} setShow={setShowDateModal}>
          {!date || showFirstModal ? (
            <View>
              <View style={styles.heading}>
                <Text style={styles.headingText}>When is the hike?</Text>
              </View>
              <Calendar
                current={date}
                markedDates={{
                  [date]: {
                    selected: true,
                    disableTouchEvent: true,
                    selectedDotColor: 'orange',
                  },
                }}
                onDayPress={(day) => {
                  setDate(day.dateString);
                }}
              />
              <TouchableOpacity
                onPress={() => {
                  setShowFirstModal(false);
                }}
                style={{
                  padding: 12,
                  alignItems: 'center',
                  backgroundColor: Colors.lightGray,
                  borderRadius: 4,
                }}>
                <Text style={{fontSize: 18, fontFamily: 'oxygen-bold'}}>
                  Confirm
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View>
              <View style={styles.heading}>
                <Text style={styles.headingText}>
                  What time do you want to be at the trailhead?
                </Text>
              </View>
              <DateTimePicker
                value={time}
                minuteInterval={5}
                mode="time"
                is24Hour={false}
                display="default"
                onChange={(event, date) => {
                  setTime(new Date(date));
                }}
              />
              <TouchableOpacity
                onPress={() => {
                  nextForm();
                  setShowDateModal(false);
                }}
                style={{
                  padding: 12,
                  alignItems: 'center',
                  backgroundColor: Colors.lightGray,
                  borderRadius: 4,
                }}>
                <Text style={{fontSize: 18, fontFamily: 'oxygen-bold'}}>
                  Choose Time
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </CalModal>
      ) : (
        <CalModal show={showMeetTimeModal} setShow={setShowMeetTimeModal}>
          {!meetTime || showFirstModal ? (
            <View>
              <View style={styles.heading}>
                <Text style={styles.headingText}>
                  {route.params.chooseMeetTime}
                </Text>
              </View>
              <DateTimePicker
                value={meetTime}
                minuteInterval={5}
                mode="time"
                is24Hour={false}
                display="default"
                onChange={(event, date) => {
                  setMeetTime(new Date(date));
                }}
              />
              <TouchableOpacity
                onPress={() => {
                  setShowFirstModal(false);
                }}
                style={{
                  padding: 12,
                  alignItems: 'center',
                  backgroundColor: Colors.lightGray,
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
              <DateTimePicker
                value={leaveTime}
                minuteInterval={5}
                mode="time"
                is24Hour={false}
                display="default"
                onChange={(event, date) => {
                  setLeaveTime(new Date(date));
                }}
              />
              <TouchableOpacity
                onPress={() => {
                  setShowMeetTimeModal(false);
                  nextForm();
                }}
                style={{
                  padding: 12,
                  alignItems: 'center',
                  backgroundColor: Colors.lightGray,
                  borderRadius: 4,
                }}>
                <Text style={{fontSize: 18, fontFamily: 'oxygen-bold'}}>
                  Confirm Leave Time
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
