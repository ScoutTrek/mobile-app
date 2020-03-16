import React, {useState, useEffect} from 'react';
import {
  Platform,
  View,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import MapView, {Marker} from 'react-native-maps';

import ENV from '../../../../helpers/env';

import MapSearch from '../../../components/MapSearch';

import {Ionicons} from '@expo/vector-icons';

import Constants from 'expo-constants';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import uuidv4 from 'uuid/v1';
import Colors from '../../../../constants/Colors';
import NextButton from '../../../components/buttons/NextButton';

const locationToken = uuidv4();

// const mapFormReducer = (state, action) => {
//   switch (action.type) {
//     case 'increment':
//       return {count: state.count + 1};
//     case 'decrement':
//       return {count: state.count - 1};
//     default:
//       throw new Error();
//   }
// }

const ChooseLocation = ({navigation, nextView, placeholder}) => {
  const [location, setLocation] = useState();
  // const [locationId, setLocationId] = useState(null)
  const [locationString, setLocationString] = useState('');
  const [meetPointLocation, setMeetPointLocation] = useState();
  // const [error, setError] = useState(null)

  const _getLocationAsync = async () => {
    let {status} = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      // setError('Permission to access location was denied')
    }
    const userLocation = await Location.getCurrentPositionAsync({});
    setLocation({
      latitude: userLocation.coords.latitude,
      longitude: userLocation.coords.longitude,
    });
  };

  const _getPlaceDetails = async id => {
    const hikeLocationDetails = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${id}&key=${ENV.googleApiKey}`
    );
    const hikeLocationData = await hikeLocationDetails.json();

    const chosenPlace = {
      latitude: hikeLocationData.result.geometry.location.lat,
      longitude: hikeLocationData.result.geometry.location.lng,
    };
    setMeetPointLocation(chosenPlace);
    setLocationString(hikeLocationData.result.formatted_address);
    Keyboard.dismiss();
  };

  const back = () => navigation.goBack();
  const nextForm = () =>
    navigation.navigate(nextView, {
      meetLocation: meetPointLocation,
      location: navigation.getParam('location'),
    });

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
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        region={
          meetPointLocation && {
            latitude: meetPointLocation.latitude,
            longitude: meetPointLocation.longitude,
            latitudeDelta: 0.0822,
            longitudeDelta: 0.04,
          }
        }>
        {meetPointLocation && <Marker coordinate={meetPointLocation} />}
      </MapView>
      <View style={styles.searchContainer}>
        <MapSearch
          locationToken={locationToken}
          back={back}
          nextForm={nextForm}
          placeholder={locationString ? locationString : placeholder}
          _getPlaceDetails={_getPlaceDetails}
          style={styles.searchBar}
        />
      </View>
      {meetPointLocation && <NextButton onClick={nextForm} />}
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
