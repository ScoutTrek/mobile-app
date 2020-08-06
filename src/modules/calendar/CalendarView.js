import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {Agenda} from 'react-native-calendars';
import Constants from 'expo-constants';

import Colors from '../../../constants/Colors';
import Fonts from '../../../constants/Fonts';

import useFetchEvents from '../../hooks/useFetchEvents';
import {gql, useQuery} from '@apollo/client';
import moment from 'moment';

export const GET_EVENTS = gql`
  query ALL_EVENTS {
    events {
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

const getColor = (label) => {
  switch (label) {
    case 'Hike':
      return Colors.blue;
    case 'Meeting':
      return Colors.orange;
    case 'Campout':
      return Colors.yellow;
    case 'SummerCamp':
      return Colors.green;
    default:
      return Colors.brown;
  }
};

const currDate = new Date();

const CalendarView = ({navigation}) => {
  const {data, loading, error} = useQuery(GET_EVENTS, {pollInterval: 10000});

  const [events, setEvents] = useFetchEvents();

  const renderEmptyDate = () => {
    return (
      <View style={styles.emptyDate}>
        <Text style={{fontSize: 12, color: Colors.lightBlue}}>
          No events on this day.
        </Text>
      </View>
    );
  };

  const viewEvent = (item) => {
    if (item.type === 'Hike') {
      navigation.navigate('ViewEvents', {
        screen: 'Hike',
        params: {currItem: item.id},
      });
    } else if (item.type === 'Meeting') {
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

  const renderItem = (item) => {
    const labels =
      item.labels &&
      item.labels.map((label) => (
        <View
          key={`label-${label}`}
          style={{
            padding: 3,
            paddingHorizontal: 5,
            margin: 2,
            fontSize: 10,
            backgroundColor: getColor(label),
            borderRadius: 3,
          }}>
          <Text style={{color: 'white', textAlign: 'center'}}>{label}</Text>
        </View>
      ));

    return (
      <TouchableOpacity
        onPress={() => viewEvent(item)}
        style={styles.calendarEvent}>
        <View>
          <Text
            numberOfLines={1}
            style={{
              color: '#000',
              fontFamily: Fonts.primaryTextBold,
              fontSize: 16,
              marginBottom: 10,
              maxWidth: Dimensions.get('window').width * 0.5,
            }}>
            {item.title}
          </Text>
          <Text
            style={{
              color: '#000',
              fontFamily: Fonts.primaryText,
              marginBottom: 5,
            }}>
            {new Date(+item.datetime).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
            })}
          </Text>
        </View>

        <View styleName="horizontal h-start">{labels}</View>
      </TouchableOpacity>
    );
  };

  if (error) return <Text>Error: {error}</Text>;
  if (loading) return <Text>Loading...</Text>;
  return (
    <Agenda
      current={new Date()}
      style={styles.container}
      items={events}
      onVisibleMonthsChange={(calData) => {
        if (calData.length === 2) {
          setEvents(data, calData[0]);
        }
        if (calData.length === 3) {
          setEvents(data, calData[1]);
        }
      }}
      renderItem={renderItem}
      renderEmptyDate={renderEmptyDate}
      theme={{
        dotColor: Colors.yellow,
        selectedDayBackgroundColor: Colors.purple,
        agendaTodayColor: Colors.purple,
        backgroundColor: '#F1F1F8',
      }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    flex: 1,
  },
  calendarEvent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 10,
  },
  emptyDate: {
    height: 15,
    flex: 1,
    justifyContent: 'center',
    paddingTop: 30,
  },
});

export default CalendarView;
