import React, {useState} from 'react';
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

const getColor = (label) => {
  switch (label) {
    case 'Hike':
      return Colors.red;
    case 'Meeting':
      return Colors.orange;
    case 'Campout':
      return Colors.yellow;
    case 'SummerCamp':
      return Colors.green;
    default:
      return Colors.red;
  }
};

const CalendarView = ({navigation}) => {
  const {data, loading, error} = useQuery(GET_EVENTS, {pollInterval: 10000});

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
            margin: 2,
            fontSize: 10,
            backgroundColor: getColor(label),
            borderRadius: 3,
          }}>
          <Text style={{color: 'white', textAlign: 'center'}}>{label}</Text>
        </View>
      ));

    return (
      <TouchableOpacity onPress={() => viewEvent(item)} style={styles.item}>
        <View>
          <Text
            numberOfLines={1}
            style={{
              color: '#48506B',
              fontFamily: 'oxygen-bold',
              fontSize: 18,
              marginBottom: 10,
              maxWidth: Dimensions.get('window').width * 0.5,
            }}>
            {item.title}
          </Text>
          <Text
            style={{
              color: '#48506B',
              fontFamily: 'oxygen',
              marginBottom: 10,
            }}>
            {item.name}
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
      style={styles.container}
      current={new Date()}
      items={items}
      onVisibleMonthsChange={() => {}}
      loadItemsForMonth={(calData) => {
        const newItems = getItems(calData);
        setItems(newItems);
      }}
      renderItem={renderItem}
      renderEmptyDate={renderEmptyDate}
      rowHasChanged={rowHasChanged}
      theme={{
        dotColor: Colors.red,
        selectedDayBackgroundColor: Colors.red,
        agendaDayTextColor: Colors.red,
        agendaDayNumColor: Colors.red,
        agendaTodayColor: '#4F44B6',
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
