import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {Agenda} from 'react-native-calendars';
import Constants from 'expo-constants';

import colors from '../../styles/colors';
import Colors from '../../../constants/Colors';
import fonts from '../../styles/fonts';

import useReduxEvents from '../../hooks/useReduxEvents';
import {useQuery} from '@apollo/react-hooks';
import {gql} from '@apollo/client';

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

const getColor = label => {
  switch (label) {
    case 'Hike':
      return colors.secondary;
    case 'ScoutMeeting':
      return Colors.orange;
    case 'Campout':
      return colors.yellow;
    default:
      return colors.primary;
  }
};

const CalendarView = ({navigation}) => {
  const {data, loading, error} = useQuery(GET_EVENTS);

  const [items, setItems] = useState({});

  const getItems = useReduxEvents(data);

  const rowHasChanged = (r1, r2) => {
    return r1.name !== r2.name;
  };

  const renderEmptyDate = () => {
    return (
      <View style={styles.emptyDate}>
        <Text style={{fontSize: 12}}>No events on this day.</Text>
      </View>
    );
  };

  const renderItem = item => {
    const labels =
      item.labels &&
      item.labels.map(label => (
        <View
          key={`label-${label}`}
          style={{
            padding: 3,
            margin: 2,
            fontSize: 10,
            backgroundColor: getColor(label),
            borderRadius: 3,
          }}>
          <Text style={{color: 'white'}}>{label}</Text>
        </View>
      ));

    return (
      <TouchableOpacity
        onPress={() => {
          if (item.type === 'Hike') {
            navigation.navigate('Hike', {currItem: item.id});
          } else if (item.type === 'ScoutMeeting') {
            navigation.navigate('ScoutMeeting', {currItem: item.id});
          } else if (item.type === 'Campout') {
            navigation.navigate('Campout', {currItem: item.id});
          }
        }}
        style={styles.item}>
        <View>
          <Text
            style={{
              color: '#48506B',
              fontFamily: fonts.primaryRegular,
              marginBottom: 10,
            }}>
            {item.name}
          </Text>
          <Text style={{color: '#9B9B9B', fontFamily: fonts.primaryRegular}}>
            {item.time}
          </Text>
        </View>

        <View styleName="horizontal h-start">{labels}</View>
      </TouchableOpacity>
    );
  };

  if (error) return console.log(error);
  if (loading) return <Text>Loading...</Text>;
  return (
    <Agenda
      style={styles.container}
      current={new Date()}
      items={items}
      onVisibleMonthsChange={() => {}}
      loadItemsForMonth={calData => {
        const newItems = getItems(calData);
        setItems(newItems);
      }}
      renderItem={renderItem}
      renderEmptyDate={renderEmptyDate}
      rowHasChanged={rowHasChanged}
      theme={{
        dotColor: colors.primaryLight,
        selectedDayBackgroundColor: colors.primaryLight,
        agendaDayTextColor: colors.primaryLight,
        agendaDayNumColor: colors.primaryLight,
        agendaTodayColor: '#4F44B6',
        backgroundColor: '#F1F1F8',
      }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
  item: {
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
    paddingTop: 30,
  },
});

export default CalendarView;
