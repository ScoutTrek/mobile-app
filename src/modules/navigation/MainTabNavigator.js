import React from 'react';
import {Image} from 'react-native';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import CalendarNav from '../calendar/CalendarNav';
import EventsCreatorNavigator from './EventCreatorNavigator';
import {AntDesign} from '@expo/vector-icons';
import HomeNav from './DrawerNavigator';

// Global Styles
import Colors from '../../../constants/Colors';

const MainBottomTab = createBottomTabNavigator();

// Icons
const homeDark = require('../../../assets/images/tabbar/homeDark.png');
const calendarDark = require('../../../assets/images/tabbar/calendarDark.png');
const iconComponents = require('../../../assets/images/tabbar/components.png');

const MainBottomTabNavigator = () => {
  return (
    <MainBottomTab.Navigator
      screenOptions={MainBottomTabConfig}
      tabBarOptions={{
        showLabel: true,
        inactiveTintColor: Colors.lightBrown,
        activeTintColor: Colors.darkBrown,
        labelStyle: {fontSize: 11.5, bottom: 3},
      }}>
      <MainBottomTab.Screen
        options={{tabBarLabel: 'Home'}}
        name="UpcomingEvents"
        component={HomeNav}
      />
      <MainBottomTab.Screen
        name="Calendar"
        component={CalendarNav}
        headerMode="screen"
      />
      <MainBottomTab.Screen
        name="New Event"
        component={EventsCreatorNavigator}
        options={{
          tabBarVisible: false,
          headerShown: true,
        }}
      />
    </MainBottomTab.Navigator>
  );
};

const MainBottomTabConfig = ({route}) => ({
  tabBarIcon: ({focused, size}) => {
    size = 24.5;
    let iconSource;
    switch (route.name) {
      case 'UpcomingEvents':
        return focused ? (
          <Image
            source={homeDark}
            style={{width: size - 4, height: size - 4}}
          />
        ) : (
          <AntDesign name="home" color={Colors.activeGreen} size={size} />
        );
      case 'Calendar':
        iconSource = 'calendar';
        return focused ? (
          <Image
            source={calendarDark}
            style={{width: size - 4, height: size - 4}}
          />
        ) : (
          <AntDesign name="calendar" color={Colors.purple} size={size} />
        );
      // case 'Memories':
      //   iconSource = iconGrids
      //   break
      case 'New Event':
        return (
          <AntDesign
            name="pluscircle"
            color={focused ? Colors.darkOrange : Colors.orange}
            size={size}
          />
        );
      default:
        iconSource = iconComponents;
    }
  },
});

export default MainBottomTabNavigator;
