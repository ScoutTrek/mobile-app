import React from 'react';
import {StyleSheet, View, ActivityIndicator, FlatList} from 'react-native';

import Constants from 'expo-constants';

// import {ConfirmButton} from '@ScoutDesign';
import {Ionicons} from '@expo/vector-icons';

import EventBtn from './components/EventBtn';
import Colors from '../../../constants/Colors';
import {gql, useQuery} from '@apollo/client';

export const GET_EVENT_SCHEMAS = gql`
  query EventSchemas {
    eventSchemas
  }
`;

const EventTypesScreen = ({navigation}) => {
  const {loading, error, data} = useQuery(GET_EVENT_SCHEMAS);

  if (loading) {
    return <ActivityIndicator />;
  }

  const eventSchemasArr = Object.values(data['eventSchemas']);

  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={{flexGrow: 1, paddingBottom: 2}}
        keyExtractor={(item) => item.metaData.eventID}
        data={eventSchemasArr}
        renderItem={({item}) => {
          return (
            <EventBtn
              item={item.metaData}
              onPress={() =>
                navigation.navigate('CreateEvent', {
                  type: item.metaData.eventID,
                })
              }
            />
          );
        }}
      />
      {/*<ConfirmButton*/}
      {/*  text="Cancel"*/}
      {/*  icon={<Ionicons size={27} name="arrow-forward" color="white" />}*/}
      {/*  color={Colors.darkOrange}*/}
      {/*  onClick={() => navigation.navigate('UpcomingEvents')}*/}
      {/*/>*/}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    flex: 1,
    backgroundColor: 'white',
  },
});

export default EventTypesScreen;
