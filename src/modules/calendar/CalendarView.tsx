import {useRef} from 'react';
import {StyleSheet, View, TouchableOpacity, Dimensions} from 'react-native';
import {Agenda} from 'react-native-calendars';
import Constants from 'expo-constants';

import Colors from '../../../constants/Colors';
import Fonts from '../../../constants/Fonts';

import {gql, useQuery} from '@apollo/client';
import {EVENT_FIELDS} from '../home/UpcomingEvents';
import NoEvents from '../../components/NoEvents';
import {Container, Text} from 'ScoutDesign/library';
import moment from 'moment';
import useCurrMonthEvents from './hooks/useCurrMonthEvents';

export const GET_EVENTS = gql`
  ${EVENT_FIELDS}
  query ALL_EVENTS {
    events {
      ...EventFragment
    }
  }
`;

const getColor = () => {
  const allColors = [
    'interactive',
    'urgent',
    'information',
    'brandSecondary',
    'brandSecondaryDark',
    'brandPrimary',
    'brandPrimaryDark',
  ];
  return allColors[Math.floor(Math.random() * allColors.length)];
};

const CalendarView = ({navigation}) => {
  const {data, loading, error} = useQuery(GET_EVENTS);

  const {currMonthEvents, loadItemsForMonth} = useCurrMonthEvents();

  const itemColor = useRef(getColor());

  const renderEmptyDate = () => {
    return (
      <Container>
        <Text size="s" color="interactiveLight">
          No events on this day.
        </Text>
      </Container>
    );
  };

  const viewEvent = (item) => {
    navigation.navigate('ViewEvents', {
      screen: 'Event',
      params: {currItem: item.id},
    });
  };

  const renderItem = (item) => {
    const labels =
      item.labels &&
      item.labels.map((label, index) => {
        if (!index) {
          return (
            <View
              key={`label-${label}`}
              style={{
                padding: 3,
                paddingHorizontal: 5,
                marginTop: 2,
                fontSize: 10,
                backgroundColor: Colors.brown,
                borderRadius: 3,
              }}>
              <Text style={{color: 'white', textAlign: 'center'}}>{label}</Text>
            </View>
          );
        }
        return (
          <View
            key={`label-${label}`}
            style={{
              padding: 3,
              paddingHorizontal: 5,
              margin: 2,
              fontSize: 10,
              backgroundColor: itemColor,
              borderRadius: 3,
            }}>
            <Text style={{color: 'white', textAlign: 'center'}}>
              {label.toLowerCase().replace('_', ' ')}
            </Text>
          </View>
        );
      });

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
            {new Date(+item.date).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
            })}
          </Text>
        </View>

        <View styleName="horizontal d-start">{labels}</View>
      </TouchableOpacity>
    );
  };

  if (error) return <Text>Error: {error}</Text>;
  if (loading) return <Text>Loading...</Text>;
  console.log('Curr Month Events ', currMonthEvents);
  if (!data.events.length) {
    return <NoEvents navigation={navigation} />;
  }
  return (
    <Agenda
      current={moment().format('YYYY-MM-DD')}
      // style={styles.container}
      // loadItemsForMonth={(calData) => loadItemsForMonth(data.events, calData)}
      // items={currMonthEvents}
      // renderItem={renderItem}
      // renderEmptyDate={renderEmptyDate}
      // theme={{
      //   dotColor: Colors.yellow,
      //   selectedDayBackgroundColor: Colors.purple,
      //   agendaTodayColor: Colors.purple,
      //   backgroundColor: '#F1F1F8',
      // }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
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
