import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {WebView} from 'react-native-webview';
import EventHeader from '../components/EventHeader';
import Colors from '../../../../constants/Colors';
import InlineButton from '../../../components/buttons/InlineButton';

import ENV from '../../../../helpers/env';

import {gql} from '@apollo/client';
import {useQuery} from '@apollo/react-hooks';
import ChatBtn from '../../../components/ChatBtn';

export const GET_SUMMER_CAMP = gql`
  query GetSummerCamp($id: ID!) {
    event: summerCamp(id: $id) {
      id
      type
      title
      description
      datetime
      numDays
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

const SummerCampDetailsScreen = ({route, navigation}) => {
  const {currItem} = route.params;
  const {loading, error, data} = useQuery(GET_SUMMER_CAMP, {
    variables: {id: currItem},
  });

  if (loading) return null;
  if (error) return `Error! ${error}`;

  // Clear database and
  let mapUrl;
  if (data.event.location) {
    mapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${data.event.location.lat},${data.event.location.lng}&zoom=13&size=325x375&maptype=roadmap&markers=color:blue%7C${data.event.location.lat},${data.event.location.lng}&key=${ENV.googleApiKey}`;
  }
  return (
    <View style={styles.container}>
      <View style={{flex: 1}}>
        <EventHeader
          navigation={navigation}
          image_path={data.event.location ? mapUrl : null}
          title={data.event.title}
        />
        <View style={styles.info}>
          <View style={styles.leftInfoContainer}>
            <Text style={styles.date}>
              {new Date(+data.event.datetime).toLocaleDateString()}
            </Text>
          </View>
          <View style={styles.centerInfoContainer}>
            <Text style={[styles.text, styles.eventType]}>Summer Camp</Text>
          </View>

          <View style={styles.rightInfoContainer}>
            <Text style={styles.creator}>
              {data.event.creator.name.split(' ')[0]}
            </Text>
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
                            <meta name="viewport" content="width=device-width, initial-scale=0.99">
                        </head>
                        <body style="background-color: ${Colors.offWhite}">
                            ${data.event.description}
                        </body>
                    </html>`,
          }}
        />
      </View>
      <View style={{margin: 15}}>
        <ChatBtn onPress={() => navigation.navigate('EventThread')} />
        <InlineButton
          title="Edit"
          onPress={() => navigation.navigate('EditSummerCamp', {currItem})}
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
  },
  text: {
    paddingVertical: 3,
    fontSize: 15,
  },
  info: {
    flexDirection: 'row',
    fontFamily: 'oxygen-bold',
    marginVertical: 5,
    height: 50,
  },
  leftInfoContainer: {
    flex: 1.25,
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
    flex: 1.5,
    alignItems: 'center',
    height: '100%',
    justifyContent: 'center',
  },
  eventType: {
    textAlign: 'center',
    fontSize: 18,
    fontFamily: 'oxygen-bold',
  },
  rightInfoContainer: {
    flex: 1.25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: '100%',
  },
  creator: {
    fontFamily: 'oxygen-bold',
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
  distance: {
    fontFamily: 'oxygen',
    fontSize: 16,
    paddingHorizontal: 30,
  },
  bold: {
    fontFamily: 'oxygen-bold',
    fontSize: 18,
  },
});

export default SummerCampDetailsScreen;
