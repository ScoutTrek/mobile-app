import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import {gql, useQuery} from '@apollo/client';
import ViewHeading from '../../components/Headings/ViewHeading';
import Fonts from '../../../constants/Fonts';
import Colors from '../../../constants/Colors';
import Constants from 'expo-constants';

const GET_CURR_TROOP = gql`
  query GetCurrTroop {
    user: currUser {
      id
      troop {
        unitNumber
        patrols {
          name
          members {
            id
            name
            role
          }
        }
      }
    }
  }
`;

const Name = ({name}) => (
  <View style={{paddingLeft: 25, paddingVertical: 2}}>
    <Text style={{fontSize: 18}}>{name}</Text>
  </View>
);

const PatrolName = ({name}) => (
  <View style={{paddingHorizontal: 20, paddingTop: 15, paddingBottom: 5}}>
    <Text
      style={{
        fontSize: 20,
        fontFamily: Fonts.primaryTextBold,
        color: Colors.purple,
      }}>
      {name}
    </Text>
  </View>
);

const TroopInfo = () => {
  const {data, loading} = useQuery(GET_CURR_TROOP);

  if (loading) return <Text>Loading...</Text>;
  return (
    <ScrollView
      style={{marginTop: Constants.statusBarHeight}}
      contentContainerStyle={{flexGrow: 1}}>
      <ViewHeading
        title={`Information for Troop ${data.user.troop.unitNumber}`}
      />
      <View>
        {data.user.troop.patrols.map((patrol) => (
          <View key={patrol.name}>
            <PatrolName name={patrol.name} />
            {patrol.members.map(({name}) => (
              <Name key={name} name={name} />
            ))}
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default TroopInfo;
