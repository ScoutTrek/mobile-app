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
import * as AuthActions from '../../redux/auth/auth.actions';
import {saveExpoToken} from '../../redux/auth/auth.actions';
import {gql} from '@apollo/client';
import {useQuery} from '@apollo/react-hooks';

export default function Adventures() {
  const [notifications, setNotifications] = useState({});

  async function alertIfRemoteNotificationsDisabledAsync() {
    const {status} = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    if (status !== 'granted') {
      alert(
        'Hey! If you enable notifications for ScoutTrek it will help you stay updated about events.'
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
      }
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

  console.log(notifications);
  return (
    <View style={styles.container}>
      <Text>Welcome to ScoutTrek</Text>
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
