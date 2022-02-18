import {useContext} from 'react';
import {ActivityIndicator} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CommonActions} from '@react-navigation/native';
import {
  Button,
  Text,
  LineItem,
  Stack,
  Container,
  ScreenContainer,
  Badge,
  Avatar,
} from 'ScoutDesign/library';
import {ScoutTrekApolloClient} from 'data';
import {convertRoleToText} from '../../data/utils/convertIDsToStrings';
import * as WebBrowser from 'expo-web-browser';

import {AuthContext} from '../auth/SignUp';

import {gql, useApolloClient, useQuery} from '@apollo/client';
import {plusThin} from 'ScoutDesign/icons';

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
        council
        patrols {
          id
          name
          members {
            id
            name
          }
        }
      }
      userPhoto
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
  const {setToken} = useContext(AuthContext);

  const _handlePressButtonAsync = async () => {
    let result = await WebBrowser.openBrowserAsync(
      'https://scouttrek.com/#feedback'
    );
  };

  if (loading) return <ActivityIndicator />;

  return (
    <ScreenContainer justifyContent="space-between">
      <Container padding="none">
        <Container paddingBottom="xs">
          <Container
            alignItems="center"
            justifyContent="center"
            padding="none"
            paddingBottom="m">
            <Avatar
              size="xl"
              source={{
                uri: data.currUser.userPhoto,
              }}
            />
            <Text preset="h2" paddingTop="m">
              {data.currUser.name}
            </Text>
          </Container>

          <Container
            flexDirection="row"
            alignItems="center"
            paddingHorizontal="none"
            paddingBottom="s">
            <Badge accessibilityLabel="role" color="interactive" text="Role" />
            <Text size="l" weight="bold" paddingLeft="m">
              {convertRoleToText(data.currUser.currRole)}
            </Text>
          </Container>

          {data.currUser.currPatrol && (
            <Container
              flexDirection="row"
              alignItems="center"
              paddingHorizontal="none"
              paddingTop="s"
              paddingBottom="none">
              <Badge
                accessibilityLabel="role"
                color="information"
                text="Patrol"
              />
              <Text size="l" weight="bold" paddingLeft="m">
                {data.currUser.currPatrol.name}
              </Text>
            </Container>
          )}
        </Container>
        <LineItem
          accessibilityLabel="current-troop-dropdown"
          type={data.currUser.otherGroups?.length ? 'accordion' : 'static'}
          leftComponent={
            <Badge
              accessibilityLabel="role"
              color="brandSecondaryDark"
              text="Troop"
            />
          }
          accordionContent={
            <Stack
              accessibilityLabel="other-groups"
              items={[...data.currUser.otherGroups]}
              RenderItem={({item, ...rest}) => {
                return (
                  <LineItem
                    {...rest}
                    type="button"
                    backgroundColor="lightMintGrey"
                    onPress={() => _updateCurrentGroup(item.id, navigation)}
                    accessibilityLabel={item.troopNumber}>
                    <Text size="s">Switch to Troop</Text>
                    <Text preset="h2">{item.troopNumber}</Text>
                  </LineItem>
                );
              }}
            />
          }>
          <Text size="l" weight="bold">
            {data.currUser.currTroop.council}
          </Text>
          <Text>{data.currUser.currTroop.unitNumber}</Text>
        </LineItem>

        <Container>
          <Badge
            color="brandPrimary"
            accessibilityLabel="join-additional-troop"
            icon={plusThin}
            text="Connect Additional Troop"
            alignSelf="flex-start"
            onPress={() => navigation.navigate('JoinGroup')}
          />
        </Container>
        <Button
          accessibilityLabel="link-to-suggest-a-feature"
          text="Suggest a Feature"
          textColor="interactiveDark"
          backgroundColor="white"
          onPress={_handlePressButtonAsync}
        />
      </Container>

      <Container paddingHorizontal="none">
        <Button
          accessibilityLabel="logout"
          textColor="darkGrey"
          backgroundColor="white"
          text="Logout"
          onPress={async () => {
            await AsyncStorage.removeItem('userToken');
            await AsyncStorage.removeItem('currMembershipID');
            setToken('');
            client.stop();
            await client.clearStore();
          }}
        />
      </Container>
    </ScreenContainer>
  );
};

export default ProfileScreen;
