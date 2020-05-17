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
import EventListItem from '../../components/EventListItem';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';

import {Notifications} from 'expo';
import {gql} from '@apollo/client';
import {useQuery} from '@apollo/react-hooks';
import Colors from '../../../constants/Colors';

export const GET_RECENT_EVENTS = gql`
  query RECENT_EVENTS {
    upcomingEvents {
      id
      type
      title
      description
      datetime
      location {
        lat
        lng
      }
      creator {
        id
        name
      }
    }
  }
`;

export default function Adventures({navigation}) {
  const [notifications, setNotifications] = useState({});
  const {
    loading,
    error,
    data: {upcomingEvents},
  } = useQuery(GET_RECENT_EVENTS, {pollInterval: 100000});

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

  const handleNotification = (notification) => {
    Vibration.vibrate();
    setNotifications(notification);
  };

  const viewEvent = (item) => {
    if (item.type === 'Hike') {
      navigation.navigate('Hike', {currItem: item.id});
    } else if (item.type === 'ScoutMeeting') {
      navigation.navigate('ScoutMeeting', {currItem: item.id});
    } else if (item.type === 'Campout') {
      navigation.navigate('Campout', {currItem: item.id});
    }
  };

  useEffect(() => {
    registerForPushNotificationsAsync();
    Notifications.addListener(handleNotification);
    Constants.isDevice && alertIfRemoteNotificationsDisabledAsync();
  }, []);

  if (error) return <Text>Error: {error}</Text>;
  if (loading) return <Text>Loading...</Text>;

  return (
    <View style={styles.screen}>
      <Text style={styles.heading}>Upcoming events</Text>
      <View style={styles.container}>
        {upcomingEvents.map((event) => (
          <EventListItem
            key={event.id}
            id={event.id}
            title={event.title}
            type={event.type}
            date={event.datetime}
            creator={event.creator.name}
            onSelect={viewEvent}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.offWhite2,
  },
  container: {
    flex: 1,
    alignItems: 'center',
  },
  heading: {
    fontSize: 24,
    fontFamily: 'oxygen-bold',
    padding: 22,
  },
});
