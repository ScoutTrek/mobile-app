import {useContext} from 'react';
import {View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CommonActions} from '@react-navigation/native';
import {Button, Text, LineItem, Stack} from 'ScoutDesign/library';
import {ScoutTrekApolloClient} from '../../../App';
import AppLoading from 'expo-app-loading';
import * as WebBrowser from 'expo-web-browser';

import JoinPatrol, {AuthContext} from '../auth/JoinPatrol';

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
      role
      patrol {
        id
        name
      }
      troop {
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
        troopNum
      }
    }
  }
`;

const ProfileScreen = ({navigation}) => {
  const {data, loading} = useQuery(GET_CURR_USER);
  const client = useApolloClient();
  const {setAuthToken} = useContext(AuthContext);

  const _handlePressButtonAsync = async () => {
    let result = await WebBrowser.openBrowserAsync(
      'https://scouttrek.com/#feedback'
    );
  };

  if (loading) return <AppLoading />;

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'space-between',
      }}>
      <View>
        {!!data.currUser.role && (
          <View style={{marginTop: 10}}>
            <View style={{padding: 20}}>
              <Text preset="h2">{data.currUser.name}</Text>
              <Text>{data.currUser.email}</Text>
              <Text>{data.currUser.role}</Text>
            </View>
            {data.currUser.patrol && (
              <View style={{padding: 20, alignItems: 'flex-start'}}>
                <Text>Patrol</Text>
                <Text>{data.currUser.patrol.name}</Text>
              </View>
            )}
            {!!data.currUser.otherGroups?.length ? (
              <LineItem
                accessibilityLabel="current-troop-dropdown"
                type="accordion"
                accordionContent={
                  <Stack
                    type="Pressable"
                    RenderItem={({item, ...rest}) => {
                      return (
                        <LineItem
                          {...rest}
                          type="button"
                          onPress={() =>
                            _updateCurrentGroup(item.group.id, item.navigation)
                          }
                          accessibilityLabel={item.group.troopNum}>
                          <LineItem.Subheading>
                            Switch to Troop
                          </LineItem.Subheading>
                          <LineItem.Heading>
                            {item.group.troopNum}
                          </LineItem.Heading>
                        </LineItem>
                      );
                    }}
                    items={[{group: {troopNum: '5', id: '1'}, navigation}]}
                  />
                }>
                <Text>{data.currUser.troop.unitNumber}</Text>
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
            setAuthToken('');
            client.stop();
            await client.clearStore();
          }}
        />
      </View>
    </View>
  );
};

export default ProfileScreen;
