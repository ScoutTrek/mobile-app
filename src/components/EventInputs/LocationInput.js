import React, {useEffect, useState} from 'react';
import {eventData} from '../../../App';
import {Dimensions, Keyboard, StyleSheet, View} from 'react-native';
import Input from '../formfields/Input';
import LocationLineItem from '../LocationLineItem';
import DefaultInputButton from '../buttons/DefaultInputButton';
import Fonts from '../../../constants/Fonts';
import Colors from '../../../constants/Colors';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import {GOOGLE_MAPS_API_KEY} from '../../../env';
import MapView, {Marker} from 'react-native-maps';
import MapSearch from '../MapSearch';
import Constants from 'expo-constants';

import uuidv4 from 'uuid/v1';
import ConfirmCircle from '../buttons/ConfirmCircle';

const locationToken = uuidv4();

const ChooseLocation = ({
  id,
  setModalVisible,
  questionText,
  primary,
  goToSecondary,
}) => {
  const initialLocation = eventData()?.[id];
  const [location, setLocation] = useState(
    initialLocation
      ? {latitude: initialLocation.lat, longitude: initialLocation.lng}
      : null
  );
  const [locationCoords, setLocationCoords] = useState(
    initialLocation
      ? {latitude: initialLocation.lat, longitude: initialLocation.lng}
      : null
  );
  const [locationString, setLocationString] = useState(
    initialLocation?.address || ''
  );

  const _getLocationAsync = async () => {
    let {status} = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      // setError('Permission to access location was denied');
    }
    const userLocation = await Location.getCurrentPositionAsync({});
    setLocation({
      latitude: userLocation.coords.latitude,
      longitude: userLocation.coords.longitude,
    });
  };

  const _getPlaceDetails = async (id) => {
    const locationDetails = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${id}&key=${GOOGLE_MAPS_API_KEY}`
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

  const back = () => setModalVisible(false);
  const nextView = () => {
    eventData({
      ...eventData(),
      [id]: {
        address: locationString,
        lat: location.latitude,
        lng: location.longitude,
      },
    });
    setModalVisible(false);
  };

  const selectLocationHandler = async (event) => {
    const tappedLocation = {
      latitude: event.nativeEvent.coordinate.latitude,
      longitude: event.nativeEvent.coordinate.longitude,
    };
    setLocationCoords(tappedLocation);
    const locationDetails = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${tappedLocation.latitude},${tappedLocation.longitude}&key=${GOOGLE_MAPS_API_KEY}`
    );
    const locationData = await locationDetails.json();
    setLocationString(locationData.results[0].formatted_address);
  };

  useEffect(() => {
    _getLocationAsync();
  }, []);

  if (!location) {
    return <View />;
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
          placeholder={locationString || questionText}
          textValue={initialLocation?.address}
          _getPlaceDetails={_getPlaceDetails}
          style={styles.searchBar}
        />
      </View>
      {locationCoords && (
        <ConfirmCircle
          onClick={goToSecondary || nextView}
          primaryView={primary}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    margin: 15,
    borderBottomWidth: 1,
    borderBottomColor: Colors.tabIconDefault,
  },
  headingText: {
    fontFamily: Fonts.primaryTextBold,
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
    top: Constants.statusBarHeight,
    right: 10,
    left: 10,
  },
});

export default {
  InitialButton: DefaultInputButton,
  EditingComponent: ChooseLocation,
  CompletedComponent: LocationLineItem,
};
