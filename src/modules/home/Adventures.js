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
import {gql, useMutation, useQuery} from '@apollo/client';
import Colors from '../../../constants/Colors';

export const GET_UPCOMING_EVENTS = gql`
  query UpcomingEvents {
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

export const UPDATE_EXPO_TOKEN = gql`
  mutation UpdateExpoToken($token: UpdateUserInput!) {
    updateCurrUser(input: $token) {
      id
    }
  }
`;

export default function Adventures({navigation}) {
  const {loading, error, data} = useQuery(GET_UPCOMING_EVENTS);

  const [updateToken] = useMutation(UPDATE_EXPO_TOKEN);

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
    if (Constants.isDevice) {
      const {status: existingStatus} = await Permissions.getAsync(
        Permissions.NOTIFICATIONS,
        Permissions.LOCATION
      );
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const {status} = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        const locationStatus = await Permissions.askAsync(Permissions.LOCATION);
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }

      let token = await Notifications.getExpoPushTokenAsync();

      if (Constants.isDevice) {
        await updateToken({
          variables: {
            token: {
              expoNotificationToken: token,
            },
          },
        });
      }
    } else {
      alert('Must use physical device for Push Notifications');
    }

    if (Platform.OS === 'android') {
      Notifications.createChannelAndroidAsync('default', {
        name: 'default',
        sound: true,
        priority: 'max',
        vibrate: [0, 250, 250, 250],
      });
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

  useEffect(() => {
    registerForPushNotificationsAsync();
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
    fontFamily: 'raleway-bold',
    padding: 18,
    paddingBottom: 10,
  },
});
