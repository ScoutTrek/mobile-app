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

import {Notifications} from 'expo';
import {userToken} from '../../../App';

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
        council
      }
      patrol {
        id
        name
      }
    }
  }
`;

function NotificationsScreen({navigation}) {
  const [notifications, setNotifications] = React.useState({});
  const client = useApolloClient();

  const handleNotification = (notification) => {
    Vibration.vibrate();
    setNotifications(notification);
  };

  React.useEffect(() => {
    Notifications.addListener(handleNotification);
  }, []);

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <View style={{alignItems: 'center', justifyContent: 'center'}}>
        {/*<Text>Origin: {notifications.origin}</Text>*/}
        {/*<Text>Data: {JSON.stringify(notifications)}</Text>*/}
      </View>
      <Button onPress={() => navigation.goBack()} title="Go back home" />
    </View>
  );
}

function CustomDrawerContent(props) {
  const {data, loading, error} = useQuery(GET_CURR_USER);
  const client = useApolloClient();

  if (loading) return <Text> </Text>;
  if (error) return <Text>`Error, ${error}`</Text>;

  return (
    <DrawerContentScrollView {...props}>
      <View
        style={{
          height: Dimensions.get('window').height - 150,
          justifyContent: 'space-between',
        }}>
        <View>
          <DrawerItemList {...props} />
          <DrawerItem
            label="Logout"
            onPress={async () => {
              await userToken('');
              await client.resetStore();
              await AsyncStorage.removeItem('userToken');
            }}
          />
          {data.user.role === 'SCOUT' && (
            <View>
              <View style={{padding: 22, alignItems: 'center'}}>
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
              <View style={{padding: 24, alignItems: 'flex-start'}}>
                <Text
                  style={{
                    fontSize: 16,
                    fontFamily: Fonts.primaryTextBold,
                    marginTop: 18,
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

const Drawer = createDrawerNavigator();

export default function UpcomingEvents() {
  return (
    <Drawer.Navigator
      screenOptions={() => ({
        headerShown: true,
      })}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      initialRouteName="UpcomingEvents">
      <Drawer.Screen name="Home" component={HomeStackNavigator} />
      <Drawer.Screen name="Notifications" component={NotificationsScreen} />
    </Drawer.Navigator>
  );
}
