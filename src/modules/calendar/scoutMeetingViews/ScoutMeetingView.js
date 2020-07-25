import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {WebView} from 'react-native-webview';
import EventHeader from '../components/EventHeader';
import Colors from '../../../../constants/Colors';
import Fonts from '../../../../constants/Fonts';
import InlineButton from '../../../components/buttons/InlineButton';

import {GOOGLE_MAPS_API_KEY} from '../../../../env';

import {gql} from '@apollo/client';
import {useMutation, useQuery} from '@apollo/react-hooks';
import NoShadowPurpleBtn from '../../../components/buttons/NoShadowPurpleBtn';
import Location from '../../../components/EventInfoComponents/Location';
import Time from '../../../components/EventInfoComponents/Time';
import {DELETE_EVENT} from '../campoutViews/CampoutView';

export const GET_SCOUT_MEETING = gql`
  query GetScoutMeeting($id: ID!) {
    event: scoutMeeting(id: $id) {
      id
      type
      title
      description
      date
      time
      datetime
      day
      shakedown
      messages {
        _id
        text
        createdAt
        user {
          id
          name
        }
      }
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

const ScoutMeetingDetails = ({route, navigation}) => {
  const {currItem} = route.params;
  const {loading, error, data} = useQuery(GET_SCOUT_MEETING, {
    fetchPolicy: 'network-only',
    variables: {id: currItem},
  });

  const [deleteEvent] = useMutation(DELETE_EVENT);

  const [address, setAddress] = useState('');
  const [meetAddress, setMeetAddress] = useState('');

  useEffect(() => {
    const getAddresses = async () => {
      const address = await getAddress(
        +data.event.location.lat,
        +data.event.location.lng
      );
      const meetAddress = await getAddress(
        +data.event.meetLocation.lat,
        +data.event.meetLocation.lng
      );
      Promise.all([address, meetAddress]).then((values) => {
        setAddress(address);
        setMeetAddress(meetAddress);
      });
    };
    if (data && !address) {
      getAddresses();
    }
  }, [data]);

  if (loading) return null;
  if (error) return `Error! ${error}`;

  const mapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${data.event.location.lat},${data.event.location.lng}&zoom=13&size=325x375&maptype=roadmap&markers=color:blue%7C${data.event.location.lat},${data.event.location.lng}&key=${GOOGLE_MAPS_API_KEY}`;

  return (
    <View style={styles.container}>
      <View style={{flex: 1}}>
        <EventHeader
          navigation={navigation}
          image_path={data.event.location ? mapUrl : null}
          title={data.event.title}
          name={data.event.creator.name}
          date={+data.event.datetime}
        />
        <Location heading="Event location" address={address} />
        <Location heading="Meet Place" address={meetAddress} />
        <Time time={+data.event.meetTime} text="arrive at meet place" />
        <Time time={+data.event.leaveTime} text="leave meet place" />
        <View style={styles.info}>
          <View style={styles.leftInfoContainer}>
            <Text style={styles.date}>
              {new Date(+data.event.datetime).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
              })}
            </Text>
          </View>
          <View style={styles.centerInfoContainer}>
            <Text style={[styles.text, styles.eventType]}>Scout Meeting</Text>
          </View>
        </View>

        <WebView
          originWhitelist={['*']}
          style={styles.description}
          source={{
            html: `<!DOCTYPE html>
                    <html lang="en">
                        <head>
                            <meta charset="UTF-8">
                            <meta name="viewport" content="width=device-width, initial-scale=.99">
                        </head>
                        <body style="background-color: ${Colors.offWhite}; overflow: hidden;">
                            ${data.event.description}
                        </body>
                    </html>`,
          }}
        />

        <Text style={styles.weekDay}>
          <Text style={styles.bold}>
            {data.event.day.charAt(0) + data.event.day.toLowerCase().slice(1)}
          </Text>
          ,{' '}
          {new Date(+data.event.datetime).toLocaleTimeString([], {
            hour: 'numeric',
            minute: '2-digit',
          })}
        </Text>
        <View style={styles.shakedown}>
          {data.event.shakedown && (
            <Text>There will be a shakedown this week!</Text>
          )}
        </View>
      </View>
      <View style={{margin: 15}}>
        <NoShadowPurpleBtn
          onPress={() =>
            navigation.navigate('EventThread', {
              id: data.event.id,
              name: data.event.title,
              messages: data.event.messages,
            })
          }
        />
        <InlineButton
          title="Edit"
          onPress={() => navigation.navigate('EditScoutMeeting', {currItem})}
        />
        <InlineButton
          title="Cancel"
          color={Colors.red}
          onPress={Alert.alert(
            'Are you sure you want to cancel this event?',
            'This action cannot be undone.',
            [
              {text: 'Cancel', style: 'cancel'},
              {
                text: 'Confirm',
                onPress: async () => {
                  await deleteEvent({
                    variables: {
                      id: data.event.id,
                    },
                  });
                  navigation.goBack();
                },
              },
            ],
            {cancelable: true}
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.offWhite,
    color: Colors.purple,
    justifyContent: 'space-between',
    paddingBottom: 15,
  },
  text: {
    paddingVertical: 3,
    fontSize: 15,
  },
  info: {
    flexDirection: 'row',
    fontFamily: Fonts.primaryTextBold,
    marginVertical: 5,
    height: 50,
  },
  leftInfoContainer: {
    flex: 1,
    alignItems: 'flex-end',
    height: '100%',
    justifyContent: 'center',
  },
  date: {
    overflow: 'hidden',
    color: Colors.offWhite,
    backgroundColor: Colors.brown,
    padding: 7,
    paddingHorizontal: 10,
    borderRadius: 5,
    textAlign: 'center',
  },
  centerInfoContainer: {
    flex: 1.15,
    alignItems: 'center',
    height: '100%',
    justifyContent: 'center',
  },
  eventType: {
    textAlign: 'center',
    fontSize: 18,
    fontFamily: Fonts.primaryTextBold,
  },
  rightInfoContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: '100%',
  },
  creator: {
    fontFamily: Fonts.primaryTextBold,
    overflow: 'hidden',
    color: Colors.darkBrown,
    backgroundColor: Colors.orange,
    fontSize: 16,
    paddingVertical: 7,
    paddingHorizontal: 12,
    marginLeft: 2,
    borderRadius: 5,
    textAlign: 'center',
  },
  description: {
    margin: 20,
    backgroundColor: Colors.offWhite,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  weekDay: {
    fontFamily: Fonts.primaryText,
    fontSize: 18,
    paddingHorizontal: 30,
  },
  shakedown: {
    fontFamily: Fonts.primaryText,
    fontSize: 16,
    paddingVertical: 10,
    paddingHorizontal: 30,
  },
  bold: {
    fontFamily: Fonts.primaryTextBold,
    fontSize: 21,
  },
});

export default ScoutMeetingDetails;
