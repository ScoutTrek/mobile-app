import * as WebBrowser from 'expo-web-browser';
import React, {useState, useEffect} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Vibration,
  Button,
} from 'react-native';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';

import {Notifications} from 'expo';
import {useDispatch} from 'react-redux';
import * as AuthActions from '../redux/auth/auth.actions';
import {saveExpoToken} from '../redux/auth/auth.actions';

export default function HomeScreen() {
  const dispatch = useDispatch();

  const [notifications, setNotifications] = useState({});

  async function alertIfRemoteNotificationsDisabledAsync() {
    const {status} = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    if (status !== 'granted') {
      alert(
        'Hey! You might want to enable notifications for my app, they are good.'
      );
    }
  }

  const registerForPushNotificationsAsync = async () => {
    if (Constants.isDevice) {
      const {status: existingStatus} = await Permissions.getAsync(
        Permissions.NOTIFICATIONS
      );
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const {status} = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }

      const token = await Notifications.getExpoPushTokenAsync();

      console.log(token);

      dispatch(saveExpoToken(token));
    }
  };

  const handleNotification = notification => {
    Vibration.vibrate();
    setNotifications(notification);
  };

  useEffect(() => {
    registerForPushNotificationsAsync();
    Notifications.addListener(handleNotification);
    alertIfRemoteNotificationsDisabledAsync();
  }, []);

  return (
    <View style={styles.container}>
      <Button
        title="Sign Out"
        onPress={() => dispatch(AuthActions.signOut())}
      />
      <Text>Welcome to ScoutTrek</Text>
      <Text>{console.log(notifications)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});
