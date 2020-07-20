import {Linking} from 'expo';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import uuidv4 from 'uuid/v1';

import {Alert} from 'react-native';

const {ReactNativeFile} = require('apollo-upload-client');

export default async function getPermissionAsync(permission) {
  const {status} = await Permissions.askAsync(permission);
  if (status !== 'granted') {
    const permissionName = permission.toLowerCase().replace('_', ' ');
    Alert.alert(
      'Cannot be done 😞',
      `If you would like to use this feature, you'll need to enable the ${permissionName} permission in your phone settings.`,
      [
        {
          text: "Let's go!",
          onPress: () => Linking.openURL('app-settings:'),
        },
        {text: 'Nevermind', onPress: () => {}, style: 'cancel'},
      ],
      {cancelable: true}
    );

    return false;
  }
  return true;
}

export async function getLocationAsync(onSend) {
  if (await getPermissionAsync(Permissions.LOCATION)) {
    const location = await Location.getCurrentPositionAsync({});
    if (location) {
      onSend([{location: location.coords}]);
    }
  }
}

export async function uploadAssetAsync(uri) {
  const uriParts = uri.split('.');
  const fileType = uriParts[uriParts.length - 1];
  return new ReactNativeFile({
    uri,
    name: `${uuidv4()}.${fileType}`,
    type: 'image/jpeg', // Customize later
  });
}

export async function pickImageAsync(uploadFileMutation) {
  if (await getPermissionAsync(Permissions.CAMERA_ROLL)) {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
    });

    if (!result.cancelled) {
      const file = await uploadAssetAsync(result.uri);
      await uploadFileMutation({variables: {file}});
      return result.uri;
    }
  }
}

export async function takePictureAsync(onSend, uploadFileMutation) {
  if (await getPermissionAsync(Permissions.CAMERA)) {
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
    });

    if (!result.cancelled) {
      const file = await uploadAssetAsync(result.uri);
      await uploadFileMutation({variables: {file}});
      return result.uri;
    }
  }
}
