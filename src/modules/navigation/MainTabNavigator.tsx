import {ActivityIndicator, Image} from 'react-native';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';

import ProfileScreen, {GET_CURR_USER} from '../profile/ProfileScreen';
import CalendarScreen from '../calendar/CalendarView';

import {Icon, Text, Avatar, Container} from 'ScoutDesign/library';
import {home, calendar, notifications} from 'ScoutDesign/icons';

import UpcomingEvents from '../home/UpcomingEvents';
import {useQuery} from '@apollo/client';

const HomeStack = createStackNavigator();

const HomeNav = ({navigation}) => {
  const {data, error, loading} = useQuery(GET_CURR_USER);

  if (error) {
    console.error(error);
    return null;
  }
  if (loading) return <ActivityIndicator />;
  return (
    <HomeStack.Navigator
      screenOptions={({navigation}) => ({
        headerTitle: () => (
          <Container paddingVertical="none">
            <Text weight="bold">ScoutTrek</Text>
          </Container>
        ),
        headerRight: () => (
          <Container paddingVertical="none">
            <Icon
              icon={notifications}
              color="darkGrey"
              size="m"
              onPress={() => navigation.navigate('Notifications')}
              // @todo this should be updated with a GQL subscription because it should change if the app is open when another user modifies an event.
              badge={!!data.currUser?.unreadNotifications?.length}
            />
          </Container>
        ),
      })}>
      <HomeStack.Screen name="Home" component={UpcomingEvents} />
    </HomeStack.Navigator>
  );
};

// Global Styles
const MainBottomTab = createBottomTabNavigator();

// Icons
const homeDark = require('../../../assets/images/tabbar/homeDark.png');
const calendarDark = require('../../../assets/images/tabbar/calendarDark.png');

const MainBottomTabNavigator = () => {
  return (
    <MainBottomTab.Navigator screenOptions={MainBottomTabConfig}>
      <MainBottomTab.Screen
        options={{tabBarLabel: 'Home'}}
        name="UpcomingEvents"
        component={HomeNav}
      />
      <MainBottomTab.Screen name="Calendar" component={CalendarScreen} />
      <MainBottomTab.Screen name="Profile" component={ProfileScreen} />
    </MainBottomTab.Navigator>
  );
};

const MainBottomTabConfig = ({route}) => ({
  headerShown: false,
  tabBarShowLabel: false,
  tabBarIcon: ({focused}: {focused: boolean}) => {
    const size = 23;
    switch (route.name) {
      case 'UpcomingEvents':
        return focused ? (
          <Image source={homeDark} style={{width: size, height: size}} />
        ) : (
          <Icon icon={home} color="brandPrimary" size="m" />
        );
      case 'Calendar':
        return focused ? (
          <Image source={calendarDark} style={{width: size, height: size}} />
        ) : (
          <Icon icon={calendar} color="interactiveDark" size="m" />
        );
      case 'Profile':
        return (
          <Avatar
            border={focused}
            size="m"
            source={{
              uri: 'https://scontent.fphl1-1.fna.fbcdn.net/v/t1.6435-1/p200x200/118340926_1011702955945323_5696098932584800560_n.jpg?_nc_cat=105&ccb=1-5&_nc_sid=7206a8&_nc_ohc=bpE50jhr6n8AX8txH3C&_nc_ht=scontent.fphl1-1.fna&oh=00_AT_6Pv1FgzxZfWNjpVmM7q5JLcgVc132nSqFgkhqhDCivA&oe=6231BD49',
            }}
          />
        );
      default:
        return null;
    }
  },
});

export default MainBottomTabNavigator;
