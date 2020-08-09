import React, {useRef, useEffect} from 'react';
import {View, SafeAreaView, FlatList, StyleSheet, Text} from 'react-native';
import EventListItem from '../../components/EventListItem';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';

import * as Notifications from 'expo-notifications';
import {gql, useApolloClient, useMutation, useQuery} from '@apollo/client';
import Colors from '../../../constants/Colors';
import {eventData} from '../events/event_components/ChooseName';

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

export default function UpcomingEvents({navigation}) {
  const {loading, error, data} = useQuery(GET_UPCOMING_EVENTS);

  const [updateToken] = useMutation(UPDATE_EXPO_TOKEN);
  const responseListener = useRef();

  React.useEffect(() => {
    eventData({});
  });

  useEffect(() => {
    registerForPushNotificationsAsync();

    Constants.isDevice && alertIfRemoteNotificationsDisabledAsync();

    responseListener.current = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        const notificationType =
          response.notification.request.content.data.type;
        const eventType = response.notification.request.content.data?.eventType;
        const ID = response.notification.request.content.data.ID;

        switch (notificationType) {
          case 'event':
            navigation.navigate('ViewEvents', {
              screen: eventType,
              params: {currItem: ID},
            });
            break;
          case 'message':
            navigation.navigate('ViewEvents', {
              screen: 'EventThread',
              params: {id: ID, name: ''},
            });
            break;
        }
      }
    );
    return () => {
      Notifications.removeNotificationSubscription(responseListener);
    };
  }, [navigation]);

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
              expoNotificationToken: token.data,
            },
          },
        });
      }
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

  if (error) return <Text>Error: {error}</Text>;
  if (loading) return <Text>Loading...</Text>;
  const currentEvents = data.upcomingEvents.filter(
    ({datetime}) => new Date(+datetime) - new Date() < 0
  );
  return (
    <SafeAreaView style={styles.screen}>
      {!!currentEvents.length && (
        <FlatList
          ListHeaderComponent={() => (
            <Text style={styles.heading}>Happening Now</Text>
          )}
          data={currentEvents}
          renderItem={({item}) => (
            <EventListItem
              key={item.id}
              id={item.id}
              title={item.title}
              type={item.type}
              date={item.datetime}
              creator={item.creator.name}
              onSelect={viewEvent}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      )}
      <FlatList
        data={data.upcomingEvents.filter(
          ({datetime}) => new Date(+datetime) - new Date() > 0
        )}
        ListHeaderComponent={() => (
          <Text style={styles.heading}>Upcoming Events</Text>
        )}
        ListFooterComponent={() => <View style={{margin: 30}} />}
        renderItem={({item}) => (
          <EventListItem
            key={item.id}
            id={item.id}
            title={item.title}
            type={item.type}
            date={item.datetime}
            creator={item.creator.name}
            onSelect={viewEvent}
          />
        )}
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
    fontSize: 20,
    fontFamily: 'raleway-bold',
    padding: 12,
    paddingBottom: 10,
  },
});
