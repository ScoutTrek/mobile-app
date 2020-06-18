import React from 'react';
import {Dimensions, Image} from 'react-native';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import CalendarNav from '../calendar/CalendarNav';
import NewEventNav from './EventsNavigator';
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
        activeTintColor: Colors.darkBrown,
        labelStyle: {top: -1},
      }}>
      <MainBottomTab.Screen name="Home" component={HomeNav} />
      <MainBottomTab.Screen
        name="Calendar"
        component={CalendarNav}
        headerMode="screen"
      />
      <MainBottomTab.Screen
        name="New Event"
        component={NewEventNav}
        options={{
          tabBarVisible: false,
          headerShown: true,
        }}
      />
    </MainBottomTab.Navigator>
  );
};

const MainBottomTabConfig = ({route}) => ({
  tabBarIcon: ({focused, color, size}) => {
    size = 24;
    let iconSource;
    switch (route.name) {
      case 'Home':
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
        size = 26;
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
