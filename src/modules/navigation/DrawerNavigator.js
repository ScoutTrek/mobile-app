import * as React from 'react';
import {Button, Text, View, Dimensions, AsyncStorage} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import AdventuresNav from '../home/Adventures';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

import {AntDesign} from '@expo/vector-icons';
import {gql} from '@apollo/client';
import {useApolloClient, useQuery} from '@apollo/react-hooks';
import {GET_TOKEN} from '../auth/JoinPatrol';
import Colors from '../../../constants/Colors';
import HikeView from '../calendar/hikeViews/HikeView';
import EditHikeDetails from '../calendar/hikeViews/EditHikeDetails';
import ScoutMeetingView from '../calendar/scoutMeetingViews/ScoutMeetingView';
import EditScoutMeeting from '../calendar/scoutMeetingViews/EditScoutMeetingDetails';
import CampoutView from '../calendar/campoutViews/CampoutView';
import EditCampoutDetails from '../calendar/campoutViews/EditCampoutDetails';
import SummerCampView from '../calendar/summerCampViews/SummerCampView';
import EditSummerCampView from '../calendar/summerCampViews/EditSummerCampView';

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

function HomeScreen({navigation}) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Button
        onPress={() => navigation.navigate('Notifications')}
        title="Go to notifications"
      />
    </View>
  );
}

function NotificationsScreen({navigation}) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
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
          <View style={{padding: 22, alignItems: 'center'}}>
            <Text style={{fontSize: 18, fontFamily: 'oxygen-bold'}}>
              {data.user.name}
            </Text>
            <Text style={{fontSize: 15, fontFamily: 'oxygen', marginTop: 12}}>
              {data.user.email}
            </Text>
            <Text style={{fontSize: 15, fontFamily: 'oxygen', marginTop: 18}}>
              {data.user.role}
            </Text>
          </View>
          <View style={{padding: 24, alignItems: 'flex-start'}}>
            <Text
              style={{fontSize: 16, fontFamily: 'oxygen-bold', marginTop: 18}}>
              Patrol
            </Text>
            <Text style={{fontSize: 16, fontFamily: 'oxygen', marginTop: 10}}>
              {data.user.patrol.name}
            </Text>
          </View>
        </View>

        <DrawerItem
          label="Logout"
          onPress={() => {
            AsyncStorage.removeItem('userToken').then(() => {
              client.writeQuery({
                query: GET_TOKEN,
                data: {userToken: null},
              });
            });
          }}
        />
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

      <HomeStack.Screen name="Hike" component={HikeView} />
      <HomeStack.Screen name="EditHike" component={EditHikeDetails} />

      <HomeStack.Screen name="ScoutMeeting" component={ScoutMeetingView} />
      <HomeStack.Screen name="EditScoutMeeting" component={EditScoutMeeting} />

      <HomeStack.Screen name="Campout" component={CampoutView} />
      <HomeStack.Screen name="EditCampout" component={EditCampoutDetails} />

      <HomeStack.Screen name="SummerCamp" component={SummerCampView} />
      <HomeStack.Screen name="EditSummerCamp" component={EditSummerCampView} />
    </HomeStack.Navigator>
  );
};

const Drawer = createDrawerNavigator();

export default function Home() {
  return (
    <Drawer.Navigator
      screenOptions={() => ({
        headerShown: true,
      })}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      initialRouteName="Adventures">
      <Drawer.Screen name="Adventures" component={HomeStackNavigator} />
      <Drawer.Screen name="Notifications" component={NotificationsScreen} />
    </Drawer.Navigator>
  );
}
