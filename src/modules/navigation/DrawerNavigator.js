import * as React from 'react';
import {
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  AsyncStorage,
} from 'react-native';
import {CommonActions} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import AdventuresNav from '../home/UpcomingEvents';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import Fonts from '../../../constants/Fonts';

import {AntDesign} from '@expo/vector-icons';
import {gql, useApolloClient, useQuery} from '@apollo/client';
import TroopInfo from '../troopInfo/troopInfo';
import {useContext} from 'react';
import JoinPatrol, {AuthContext} from '../auth/JoinPatrol';

import * as WebBrowser from 'expo-web-browser';
import AppLoading from 'expo-app-loading';
import SimpleLineItem from '../../components/widgets/SimpleLineItem';
import ChooseRole from '../auth/ChooseRole';
import JoinTroop from '../auth/JoinTroop';
import CreateTroop from '../auth/components/CreateTroop';
import Colors from '../../../constants/Colors';
import {ScoutTrekApolloClient} from '../../../App';

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

// function NotificationsScreen({navigation}) {
//   return (
//     <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
//       <View style={{alignItems: 'center', justifyContent: 'center'}}>
//         {/*<Text>Origin: {notifications.origin}</Text>*/}
//         {/*<Text>Data: {JSON.stringify(notifications)}</Text>*/}
//       </View>
//       <Button onPress={() => navigation.goBack()} title="Go back home" />
//     </View>
//   );
// }

function CustomDrawerContent(props) {
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
    <DrawerContentScrollView {...props}>
      <View
        style={{
          height: Dimensions.get('window').height - 140,
          justifyContent: 'space-between',
        }}>
        <View>
          <DrawerItemList {...props} />
          {!!data.currUser.role && (
            <View style={{marginTop: 10}}>
              <View style={{padding: 20}}>
                <Text style={{fontSize: 18, fontFamily: Fonts.primaryTextBold}}>
                  {data.currUser.name}
                </Text>
                <Text
                  style={{
                    fontSize: 15,
                    fontFamily: Fonts.primaryText,
                    marginTop: 12,
                  }}>
                  {data.currUser.email}
                </Text>
                <Text
                  style={{
                    fontSize: 15,
                    fontFamily: Fonts.primaryText,
                    marginTop: 18,
                  }}>
                  {data.currUser.role}
                </Text>
              </View>
              {data.currUser.patrol && (
                <View style={{padding: 20, alignItems: 'flex-start'}}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontFamily: Fonts.primaryTextBold,
                    }}>
                    Patrol
                  </Text>
                  <Text
                    style={{
                      fontSize: 16,
                      fontFamily: Fonts.primaryText,
                      marginTop: 10,
                    }}>
                    {data.currUser.patrol.name}
                  </Text>
                </View>
              )}
              {!!data.currUser.otherGroups?.length ? (
                <SimpleLineItem
                  troopName={data.currUser.troop.unitNumber}
                  accordionComponent={
                    <>
                      {data.currUser.otherGroups.map((group) => (
                        <TouchableOpacity
                          style={{
                            marginVertical: 4,
                            marginHorizontal: -8,
                            padding: 8,
                            backgroundColor: Colors.offWhite2,
                            borderRadius: 4,
                          }}
                          key={group.id}
                          onPress={() =>
                            _updateCurrentGroup(group.id, props.navigation)
                          }>
                          <Text>Switch to Troop</Text>
                          <Text style={{fontSize: 18}}>{group.troopNum}</Text>
                        </TouchableOpacity>
                      ))}
                    </>
                  }
                />
              ) : null}
            </View>
          )}
          <DrawerItem
            label="Suggest a feature."
            onPress={_handlePressButtonAsync}
          />
          <DrawerItem
            label="Logout"
            onPress={async () => {
              await AsyncStorage.removeItem('userToken');
              setAuthToken('');
              client.stop();
              await client.clearStore();
            }}
          />
        </View>
      </View>
    </DrawerContentScrollView>
  );
}

const HomeStack = createStackNavigator();

const HomeStackNavigator = ({navigation}) => {
  return (
    <HomeStack.Navigator
      screenOptions={() => ({
        title: 'ScoutTrek',
        headerLeft: () => {
          return (
            <AntDesign
              name="user"
              size={32}
              style={{paddingHorizontal: 15}}
              onPress={() => navigation.toggleDrawer()}
            />
          );
        },
      })}>
      <HomeStack.Screen name="Home" component={AdventuresNav} />
    </HomeStack.Navigator>
  );
};

const JoinAdditionalTroopStack = createStackNavigator();

const JoinAdditionalTroopStackNavigator = () => {
  return (
    <JoinAdditionalTroopStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <JoinAdditionalTroopStack.Screen
        name="ChooseRole"
        component={ChooseRole}
        initialParams={{
          nextView: 'JoinTroop',
        }}
      />
      <JoinAdditionalTroopStack.Screen
        name="JoinTroop"
        component={JoinTroop}
        initialParams={{
          nextView: 'JoinPatrol',
        }}
      />
      <JoinAdditionalTroopStack.Screen
        name="CreateTroop"
        component={CreateTroop}
        initialParams={{
          nextView: 'JoinPatrol',
        }}
      />
      <TroopInfoStack.Screen
        name="JoinPatrol"
        component={JoinPatrol}
        initialParams={{
          shouldAddGroup: true,
        }}
      />
    </JoinAdditionalTroopStack.Navigator>
  );
};

const TroopInfoStack = createStackNavigator();

const TroopInfoStackNavigator = ({navigation}) => {
  return (
    <TroopInfoStack.Navigator
      screenOptions={() => ({
        title: "See who's in your Troop",
        headerLeft: () => {
          return (
            <AntDesign
              name="menufold"
              size={23}
              style={{paddingLeft: 25, paddingTop: 5}}
              onPress={() => navigation.toggleDrawer()}
            />
          );
        },
      })}>
      <TroopInfoStack.Screen name="Troop Info" component={TroopInfo} />
    </TroopInfoStack.Navigator>
  );
};

const Drawer = createDrawerNavigator();

export default function UpcomingEvents() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      initialRouteName="UpcomingEvents">
      <Drawer.Screen name="Home" component={HomeStackNavigator} />
      <Drawer.Screen name="Troop Info" component={TroopInfoStackNavigator} />
      <Drawer.Screen
        name="Add Another Troop"
        component={JoinAdditionalTroopStackNavigator}
      />
    </Drawer.Navigator>
  );
}
