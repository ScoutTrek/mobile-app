import {useRef, useEffect} from 'react';
import {SectionList, StyleSheet, Platform} from 'react-native';
import EventCard from './components/EventCard';
import NoEvents from '../../components/NoEvents';
import * as Device from 'expo-device';
import {plusThin} from 'ScoutDesign/icons';
import {Container, LargeFloatingButton, Text} from 'ScoutDesign/library';

import * as Notifications from 'expo-notifications';
import {gql, useMutation, useQuery} from '@apollo/client';
import Colors from '../../../constants/Colors';

export const EVENT_FIELDS = gql`
  fragment EventFragment on Event {
    id
    type
    title
    description
    date
    day
    startTime
    distance
    uniqueMeetLocation
    meetTime
    leaveTime
    pickupTime
    checkoutTime
    endTime
    endDate
    recurring
    location {
      lat
      lng
      address
    }
    meetLocation {
      lat
      lng
      address
    }
    creator {
      id
      name
    }
  }
`;

export const GET_EVENTS = gql`
  query Events {
    events {
      ...EventFragment
    }
  }
  ${EVENT_FIELDS}
`;

export const UPDATE_EXPO_TOKEN = gql`
  mutation UpdateExpoToken($token: UpdateUserInput!) {
    updateCurrUser(input: $token) {
      id
    }
  }
`;

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export type EventSignature = {
  id: string;
  type: Event;
};

export default function UpcomingEvents({navigation}) {
  const {loading, error, data} = useQuery(GET_EVENTS);

  const [updateToken] = useMutation(UPDATE_EXPO_TOKEN);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    (async () => {
      await registerForPushNotificationsAsync();
      responseListener.current =
        Notifications.addNotificationResponseReceivedListener((response) => {
          const notificationType =
            response.notification.request.content.data.type;
          const ID = response.notification.request.content.data.ID;

          switch (notificationType) {
            case 'event':
              navigation.navigate('ViewEvent', {
                params: {currItem: ID},
              });
              break;
          }
        });
    })();

    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
      Notifications.removeNotificationSubscription(responseListener);
    };
  }, []);

  const viewEvent = (item) => {
    navigation.navigate('ViewEvent', {currItem: item.id});
  };

  const registerForPushNotificationsAsync = async () => {
    let token;
    if (Device.isDevice) {
      const {status: existingStatus} =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const {status} = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;

      if (Device.isDevice) {
        await updateToken({
          variables: {
            token: {
              expoNotificationToken: token,
            },
          },
        });
      }
    }

    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
  };

  if (error) return <Text>Error: {error}</Text>;
  if (loading) return <Text>Loading...</Text>;
  const eventListData = [
    {
      title: 'Happening Now',
      data: data.events.filter(({date}) => new Date(+date) - new Date() < 0),
    },
    {
      title: 'Upcoming Events',
      data: data.events.filter(({date}) => new Date(+date) - new Date() >= 0),
    },
  ];
  return (
    <Container flex={1}>
      <SectionList
        sections={!data?.events?.length ? [] : eventListData}
        keyExtractor={(item) => item.id}
        renderItem={({item}) => (
          <EventCard
            key={item.id}
            id={item.id}
            title={item.title}
            type={item.type}
            date={item.date}
            onSelect={viewEvent}
          />
        )}
        renderSectionHeader={({section: {title, data}}) =>
          data.length > 0 ? <Text preset="sublabel">{title}</Text> : null
        }
        ListEmptyComponent={<NoEvents navigation={navigation} />}
      />
      <LargeFloatingButton
        accessibilityLabel="add event button"
        text="New Event"
        icon={plusThin}
        onPress={() => navigation.navigate('CreateEvent')}
        corner="bottom-right"
        distanceFromCorner="l"
      />
    </Container>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.offWhite2,
  },
});
