import React from 'react';
import {View, Text} from 'react-native';
import ShowChosenTimeRow from './ShowChosenTimeRow';
import Colors from '../../constants/Colors';
import moment from 'moment';

const EventSnapshotList = ({schema, edit, data, navigation}) => {
  if (data === {}) return <Text>Loading</Text>;
  return (
    <View>
      {schema.map((rule) => {
        switch (rule.type) {
          case 'date':
            return (
              <ShowChosenTimeRow
                key={rule.title}
                description={rule.title}
                value={moment(+data[rule.name]).format('MMM D, YYYY')}
                color={Colors.lightYellow}
                onPress={() =>
                  navigation.navigate(rule.view, {edit, timeOnly: false})
                }
                icon="ios-calendar"
              />
            );
          case 'time':
            return (
              <ShowChosenTimeRow
                key={rule.title}
                description={rule.title}
                value={moment(+data[rule.name]).format('hh:mm A')}
                color={Colors.lightOrange}
                onPress={() =>
                  navigation.navigate(rule.view, {
                    edit,
                    timeOnly: true,
                  })
                }
              />
            );
          case 'address':
            return (
              <ShowChosenTimeRow
                location
                key={rule.title}
                description={rule.title}
                value={data[rule.name].address}
                color={Colors.backgroundBlue}
                onPress={() => navigation.navigate(rule.view, {edit})}
                icon="ios-location"
              />
            );
          case 'description':
            return (
              <ShowChosenTimeRow
                small
                key={rule.title}
                description={rule.title}
                value={
                  data[rule.name]
                    .substring(0, 23)
                    .replace(/(<([^>]+)>)/gi, '') + '...'
                }
                color={Colors.lightRed}
                onPress={() => navigation.navigate(rule.view, {edit})}
                icon="ios-book"
              />
            );
          case 'numberWithUnits':
            return (
              <ShowChosenTimeRow
                key={rule.title}
                description={rule.title}
                value={`${data[rule.name]} ${rule.units}`}
                color={Colors.lightGreen}
                onPress={() => navigation.navigate(rule.view, {edit})}
                icon="ios-arrow-round-forward"
              />
            );
          default:
            return (
              <ShowChosenTimeRow
                key={rule.title}
                description={rule.title}
                value={data[rule.name]}
                color={Colors.lightGreen}
                onPress={() => navigation.navigate(rule.view, {edit})}
                icon="ios-information-circle"
              />
            );
        }
      })}
    </View>
  );
};

export default EventSnapshotList;
