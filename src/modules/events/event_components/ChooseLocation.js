import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Dimensions, Keyboard} from 'react-native';
import MapView, {Marker} from 'react-native-maps';

import MapSearch from '../../../components/MapSearch';

import {GOOGLE_MAPS_API_KEY} from '../../../../env';

import Constants from 'expo-constants';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import uuidv4 from 'uuid/v1';
import Colors from '../../../../constants/Colors';
import Fonts from '../../../../constants/Fonts';
import NextButton from '../../../components/buttons/NextButton';
import {eventData} from './ChooseName';

const locationToken = uuidv4();

const ChooseLocation = ({navigation, route}) => {
  const initialLocation = eventData()?.[route.params.valName];
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
    eventData()?.[route.params.valName]?.address || ''
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

  const back = () => navigation.goBack();
  const nextForm = () => {
    eventData({
      ...eventData(),
      [route.params.valName]: {
        address: locationString,
        lat: location.latitude,
        lng: location.longitude,
      },
    });
    navigation.navigate(
      route.params.edit === 'create'
        ? 'ConfirmEventDetails'
        : route.params.edit === 'edit'
        ? 'EditEvent'
        : route.params.nextView
    );
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
          nextForm={nextForm}
          placeholder={locationString || route.params.placeholder}
          textValue={initialLocation?.address}
          _getPlaceDetails={_getPlaceDetails}
          style={styles.searchBar}
        />
      </View>
      {locationCoords && (
        <NextButton
          text="Next"
          iconName="ios-arrow-round-forward"
          onClick={nextForm}
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
    top: 10,
    right: 10,
    left: 10,
  },
});

export default ChooseLocation;
