import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Colors from '../../constants/Colors';
import {Ionicons, MaterialCommunityIcons} from '@expo/vector-icons';

function getIcon(eventType) {
  switch (eventType) {
    case 'Hike':
      return <MaterialCommunityIcons name="hiking" size={27} />;
    case 'ScoutMeeting':
      return <Ionicons name="md-people" size={27} />;
    case 'Campout':
      return <Ionicons name="md-bonfire" size={27} />;
  }
}

const EventListItem = ({id, title, type, date, onSelect}) => {
  const absDate = new Date(+date);
  const offset = -1 * absDate.getTimezoneOffset() * 60 * 1000;
  const localDate = new Date(absDate.getTime() - offset);
  return (
    <TouchableOpacity style={styles.card} onPress={() => onSelect({id, type})}>
      <View style={styles.row}>
        <View style={styles.info}>
          <Text style={styles.type}>{getIcon(type)}</Text>
          <Text style={styles.title}>{title}</Text>
        </View>
        <View style={styles.weekday}>
          <Text style={styles.day}>
            {
              ['Sun.', 'Mon.', 'Tue.', 'Wed.', 'Thur.', 'Fri.', 'Sat.'][
                localDate.getDay()
              ]
            }
          </Text>

          <View style={styles.date}>
            <Text style={styles.month}>
              {
                [
                  'Jan',
                  'Feb',
                  'Mar',
                  'Apr',
                  'May',
                  'June',
                  'July',
                  'Aug',
                  'Sept',
                  'Oct',
                  'Nov',
                  'Dec',
                ][localDate.getMonth()]
              }
            </Text>
            <Text style={styles.date}>{localDate.getDate()}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
    maxHeight: 80,
    marginVertical: 2,
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 1,
    elevation: 2,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    marginVertical: 5,
    marginHorizontal: 11,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  type: {
    paddingRight: 10,
    width: 36,
  },
  title: {
    fontFamily: 'oxygen',
    fontSize: 16,
    paddingBottom: 2,
  },
  weekday: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  day: {
    color: '#fff',
    height: 26,
    fontSize: 15,
    paddingVertical: 4,
    paddingHorizontal: 10,
    marginRight: 20,
    backgroundColor: Colors.darkOrange,
    borderRadius: 13,
    overflow: 'hidden',
  },
  month: {
    fontFamily: 'oxygen',
    fontSize: 14,
  },
  date: {
    justifyContent: 'center',
    fontFamily: 'oxygen-bold',
    fontSize: 24,
    color: Colors.darkBrown,
  },
});

export default EventListItem;
