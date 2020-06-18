import * as WebBrowser from 'expo-web-browser';
import React, {useState, useEffect} from 'react';
import {
  View,
  SafeAreaView,
  FlatList,
  StyleSheet,
  Text,
  Vibration,
} from 'react-native';
import EventListItem from '../../components/EventListItem';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';

import {Notifications} from 'expo';
import {gql} from '@apollo/client';
import {useApolloClient, useQuery} from '@apollo/react-hooks';
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
  const {loading, error, data} = useQuery(GET_RECENT_EVENTS, {
    pollInterval: 1000,
  });

  const [notifications, setNotifications] = useState({});

  // Create Hook
  const viewEvent = (item) => {
    if (item.type === 'Hike') {
      navigation.navigate('ViewEvents', {
        screen: 'Hike',
        params: {currItem: item.id},
      });
    } else if (item.type === 'ScoutMeeting') {
      navigation.navigate('ViewEvents', {
        screen: 'ScoutMeeting',
        params: {
          currItem: item.id,
        },
      });
    } else if (item.type === 'Campout') {
      navigation.navigate('ViewEvents', {
        screen: 'Campout',
        params: {currItem: item.id},
      });
    } else if (item.type === 'SummerCamp') {
      navigation.navigate('ViewEvents', {
        screen: 'SummerCamp',
        params: {
          currItem: item.id,
        },
      });
    }
  };

  const registerForPushNotificationsAsync = async () => {
    const {status: sampleStatus} = await Permissions.askAsync(
      Permissions.NOTIFICATIONS
    );
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
      let token = await Notifications.getExpoPushTokenAsync();
    } else {
      alert('Must use physical device for Push Notifications');
    }
  };

  async function alertIfRemoteNotificationsDisabledAsync() {
    const {status} = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    if (status !== 'granted') {
      alert(
        'Hey! If you enable notifications for ScoutTrek it will help you stay updated about events.'
      );
    }
  }

  const handleNotification = (notification) => {
    Vibration.vibrate();
    setNotifications(notification);
  };

  useEffect(() => {
    registerForPushNotificationsAsync();
    Notifications.addListener(handleNotification);
    Constants.isDevice && alertIfRemoteNotificationsDisabledAsync();
  }, []);

  if (error) return <Text>Error: {error}</Text>;
  if (loading) return <Text>Loading...</Text>;
  return (
    <SafeAreaView style={styles.screen}>
      <FlatList
        data={data.upcomingEvents}
        ListHeaderComponent={() => (
          <Text style={styles.heading}>Upcoming Events</Text>
        )}
        ListFooterComponent={() => <View style={{margin: 30}} />}
        renderItem={({item}) => {
          return (
            <EventListItem
              key={item.id}
              id={item.id}
              title={item.title}
              type={item.type}
              date={item.datetime}
              creator={item.creator.name}
              onSelect={viewEvent}
            />
          );
        }}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.offWhite2,
  },
  heading: {
    fontSize: 24,
    fontFamily: 'oxygen-bold',
    padding: 18,
    paddingBottom: 10,
  },
});
