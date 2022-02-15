import {Image} from 'react-native';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import CalendarNav from '../calendar/CalendarNavigator';
import ProfileScreen from '../profile/ProfileScreen';

import {Icon, Avatar} from 'ScoutDesign/library';
import {home, calendar} from 'ScoutDesign/icons';

import HomeNav from '../home/UpcomingEvents';

// Global Styles
const MainBottomTab = createBottomTabNavigator();

// Icons
const homeDark = require('../../../assets/images/tabbar/homeDark.png');
const calendarDark = require('../../../assets/images/tabbar/calendarDark.png');

const MainBottomTabNavigator = () => {
  return (
    <MainBottomTab.Navigator
      screenOptions={MainBottomTabConfig}
      tabBarOptions={{
        showLabel: false,
      }}>
      <MainBottomTab.Screen
        options={{tabBarLabel: 'Home'}}
        name="UpcomingEvents"
        component={HomeNav}
      />
      <MainBottomTab.Screen name="Calendar" component={CalendarNav} />
      <MainBottomTab.Screen name="Profile" component={ProfileScreen} />
    </MainBottomTab.Navigator>
  );
};

const MainBottomTabConfig = ({route}) => ({
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
            size="m"
            source={{
              uri: 'https://picsum.photos/28',
            }}
          />
        );
      default:
        return null;
    }
  },
});

export default MainBottomTabNavigator;
