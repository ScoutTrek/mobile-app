import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {Agenda} from 'react-native-calendars';
import Constants from 'expo-constants';

import colors from '../../styles/colors';
import fonts from '../../styles/fonts';

import {useSelector} from 'react-redux';
import useReduxEvents from '../../hooks/useReduxEvents';

const CalendarView = ({navigation}) => {
  const items = useSelector(state => state.calendar.items);
  let dates = useSelector(state => state.events.events);
  const loadEvents = useReduxEvents(dates);

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
            backgroundColor:
              label === 'hike' ? colors.primary : colors.secondary,
            borderRadius: 3,
          }}>
          <Text style={{color: 'white'}}>{label}</Text>
        </View>
      ));

    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('Event', {currItem: item.id})}
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

  return (
    <Agenda
      style={styles.container}
      items={items}
      loadItemsForMonth={month => loadEvents(month)}
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
