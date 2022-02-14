import {useContext} from 'react';
import {View, ActivityIndicator} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CommonActions} from '@react-navigation/native';
import {Button, Text, LineItem, Stack} from 'ScoutDesign/library';
import {ScoutTrekApolloClient} from '../../../App';
import * as WebBrowser from 'expo-web-browser';

import {AuthContext} from '../auth/SignUp';

import {gql, useApolloClient, useQuery} from '@apollo/client';

export const _updateCurrentGroup = async (groupID, navigation) => {
  await AsyncStorage.setItem('currMembershipID', groupID);
  navigation.dispatch(
    CommonActions.reset({
      index: 1,
      routes: [{name: 'Home'}],
    })
  );
  await ScoutTrekApolloClient.resetStore();
};

export const GET_CURR_USER = gql`
  query GetCurrUser {
    currUser {
      id
      name
      email
      currRole
      currPatrol {
        id
        name
      }
      currTroop {
        id
        unitNumber
        patrols {
          id
          name
          members {
            id
            name
          }
        }
      }
      otherGroups {
        id
        troopNumber
      }
    }
  }
`;

const ProfileScreen = ({navigation}) => {
  const {data, loading} = useQuery(GET_CURR_USER);
  const client = useApolloClient();
  const {setAuthData} = useContext(AuthContext);

  const _handlePressButtonAsync = async () => {
    let result = await WebBrowser.openBrowserAsync(
      'https://scouttrek.com/#feedback'
    );
  };

  if (loading) return <ActivityIndicator />;

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'space-between',
      }}>
      <View>
        {!!data.currUser.currRole && (
          <View style={{marginTop: 10}}>
            <View style={{padding: 20}}>
              <Text preset="h2">{data.currUser.name}</Text>
              <Text>{data.currUser.email}</Text>
              <Text>{data.currUser.currRole}</Text>
            </View>
            {data.currUser.currPatrol && (
              <View style={{padding: 20, alignItems: 'flex-start'}}>
                <Text>Patrol</Text>
                <Text>{data.currUser.currPatrol.name}</Text>
              </View>
            )}
            {!!data.currUser.otherGroups?.length ? (
              <LineItem
                accessibilityLabel="current-troop-dropdown"
                type="accordion"
                accordionContent={
                  <Stack
                    accessibilityLabel="other-groups"
                    items={[...data.currUser.otherGroups]}
                    RenderItem={({item, ...rest}) => {
                      return (
                        <LineItem
                          {...rest}
                          type="button"
                          onPress={() =>
                            _updateCurrentGroup(item.id, navigation)
                          }
                          accessibilityLabel={item.troopNumber}>
                          <LineItem.Subheading>
                            Switch to Troop
                          </LineItem.Subheading>
                          <LineItem.Heading>
                            {item.troopNumber}
                          </LineItem.Heading>
                        </LineItem>
                      );
                    }}
                  />
                }>
                <Text>{data.currUser.currTroop.unitNumber}</Text>
              </LineItem>
            ) : null}
          </View>
        )}
        <Button
          accessibilityLabel="link-to-suggest-a-feature"
          text="Suggest a feature."
          onPress={_handlePressButtonAsync}
        />
        <Button
          accessibilityLabel="logout"
          text="Logout"
          onPress={async () => {
            await AsyncStorage.removeItem('userToken');
            await AsyncStorage.removeItem('currMembershipID');
            setAuthData({token: '', noGroups: false});
            client.stop();
            await client.clearStore();
          }}
        />
      </View>
    </View>
  );
};

export default ProfileScreen;
