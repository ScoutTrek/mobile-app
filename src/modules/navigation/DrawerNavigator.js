import * as React from 'react';
import {
  Button,
  Text,
  View,
  Dimensions,
  AsyncStorage,
  Vibration,
} from 'react-native';
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
import {AuthContext} from '../../../App';

const GET_CURR_USER = gql`
  query GetCurrUser {
    user: currUser {
      id
      name
      email
      phone
      birthday
      role
      troop {
        id
        unitNumber
      }
      patrol {
        id
        name
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
  const {data, loading, error} = useQuery(GET_CURR_USER);
  const client = useApolloClient();
  const {setAuthToken} = useContext(AuthContext);

  if (loading) return <Text> </Text>;
  if (error) return <Text>`Error, ${error}`</Text>;

  return (
    <DrawerContentScrollView {...props}>
      <View
        style={{
          height: Dimensions.get('window').height - 140,
          justifyContent: 'space-between',
        }}>
        <View>
          <DrawerItemList {...props} />
          <DrawerItem
            label="Logout"
            onPress={async () => {
              await AsyncStorage.removeItem('userToken');
              setAuthToken('');
              client.stop();
              await client.clearStore();
            }}
          />
          {data.user.role && (
            <View style={{marginTop: 10}}>
              <View style={{padding: 20}}>
                <Text style={{fontSize: 18, fontFamily: Fonts.primaryTextBold}}>
                  {data.user.name}
                </Text>
                <Text
                  style={{
                    fontSize: 15,
                    fontFamily: Fonts.primaryText,
                    marginTop: 12,
                  }}>
                  {data.user.email}
                </Text>
                <Text
                  style={{
                    fontSize: 15,
                    fontFamily: Fonts.primaryText,
                    marginTop: 18,
                  }}>
                  {data.user.role}
                </Text>
              </View>
              {data.user.patrol && (
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
                    {data.user.patrol.name}
                  </Text>
                </View>
              )}
              <View style={{padding: 20, alignItems: 'flex-start'}}>
                <Text
                  style={{
                    fontSize: 16,
                    fontFamily: Fonts.primaryTextBold,
                  }}>
                  Troop
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    fontFamily: Fonts.primaryText,
                    marginTop: 10,
                  }}>
                  {data.user.troop.unitNumber}
                </Text>
              </View>
            </View>
          )}
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
    </Drawer.Navigator>
  );
}
