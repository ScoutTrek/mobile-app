import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Colors from '../../constants/Colors';
import {Ionicons, MaterialCommunityIcons} from '@expo/vector-icons';
import Fonts from '../../constants/Fonts';

function getIcon(eventType) {
  switch (eventType) {
    case 'Hike':
      return <MaterialCommunityIcons name="hiking" size={27} />;
    case 'ScoutMeeting':
      return <Ionicons name="md-people" size={27} />;
    case 'Campout':
      return <Ionicons name="md-bonfire" size={27} />;
    case 'SummerCamp':
      return <MaterialCommunityIcons name="tent" size={24} color="black" />;
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
          <Text numberOfLines={1} style={styles.title}>
            {title}
          </Text>
        </View>
        <View style={styles.weekday}>
          <Text style={styles.day}>
            {
              ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][
                localDate.getDay()
              ]
            }
          </Text>

          <View style={styles.dateContainer}>
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
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    paddingHorizontal: 17,
    borderColor: Colors.darkGray,
    borderWidth: 0.5,
    borderRadius: 4,
    marginHorizontal: 10,
    marginVertical: 5,
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
    fontFamily: Fonts.primaryText,
    fontSize: 15,
    paddingBottom: 1,
    maxWidth: Dimensions.get('window').width * 0.5,
  },
  weekday: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  day: {
    color: '#fff',
    fontSize: 14,
    paddingVertical: 4,
    paddingHorizontal: 8,
    textAlign: 'center',
    width: 53,
    marginRight: 20,
    backgroundColor: Colors.darkOrange,
    borderRadius: 13,
    overflow: 'hidden',
    justifyContent: 'center',
  },
  month: {
    fontFamily: Fonts.primaryText,
    fontSize: 14,
    paddingTop: 1,
  },
  dateContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    paddingVertical: 2,
  },
  date: {
    fontFamily: Fonts.primaryTextBold,
    lineHeight: 24,
    fontSize: 22,
    color: Colors.darkBrown,
  },
});

export default EventListItem;
