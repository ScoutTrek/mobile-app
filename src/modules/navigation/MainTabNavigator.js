import React from 'react'
import {Platform, Image, View, StyleSheet, Text} from 'react-native'
import {createStackNavigator} from 'react-navigation-stack'
import {createBottomTabNavigator} from 'react-navigation-tabs'

import HomeScreen from '../../screens/HomeScreen'
import CalendarView from '../calendar/CalendarView'
import EventView from '../events/EventsView'

// Global Styles
import colors from '../../styles/colors'
import fonts from '../../styles/fonts'

// Icons
const iconHome = require('../../../assets/images/tabbar/home.png')
const iconCalendar = require('../../../assets/images/tabbar/calendar.png')
const iconGrids = require('../../../assets/images/tabbar/memories.png')
const iconPages = require('../../../assets/images/tabbar/pages.png')
const iconComponents = require('../../../assets/images/tabbar/components.png')

const config = Platform.select({
  web: {headerMode: 'screen'},
  default: {},
})

// const HomeStack = createStackNavigator(
//   {
//     Home: HomeScreen,
//   },
//   config,
// )
//
// HomeStack.navigationOptions = {
//   tabBarLabel: 'Home',
//   tabBarIcon: ({focused}) => (
//     <TabBarIcon
//       focused={focused}
//       name={
//         Platform.OS === 'ios'
//           ? `ios-information-circle${focused ? '' : '-outline'}`
//           : 'md-information-circle'
//       }
//     />
//   ),
// }
//
// HomeStack.path = ''

const styles = StyleSheet.create({
  tabBarItemContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 2,
    borderBottomColor: colors.white,
    paddingHorizontal: 10,
  },
  tabBarIcon: {
    width: 23,
    height: 23,
  },
  tabBarIconFocused: {
    tintColor: colors.primary,
  },
  headerContainer: {
    height: 70,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 10,
  },
  headerImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    height: 70,
    resizeMode: 'cover',
  },
  headerCaption: {
    fontFamily: fonts.primaryRegular,
    color: colors.white,
    fontSize: 18,
  },
})

const tabNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        header: null,
      },
    },
    // config,
    Calendar: {
      screen: CalendarView,
      navigationOptions: {
        header: (
          <View style={styles.headerContainer}>
            {/*<Image style={styles.headerImage} source={hederBackground} />*/}
            <Text style={styles.headerCaption}>Calendar</Text>
          </View>
        ),
      },
    },
    Memories: {
      screen: EventView,
      // config,
      navigationOptions: {
        header: (
          <View style={styles.headerContainer}>
            {/*<Image style={styles.headerImage} source={hederBackground} />*/}
            <Text style={styles.headerCaption}>Memories</Text>
          </View>
        ),
      },
    },
    'New Event': {
      screen: EventView,
      // config,
      navigationOptions: {
        header: (
          <View style={styles.headerContainer}>
            {/*<Image style={styles.headerImage} source={hederBackground} />*/}
            <Text style={styles.headerCaption}>New Event</Text>
          </View>
        ),
      },
    },
  },
  {
    defaultNavigationOptions: ({navigation}) => ({
      tabBarIcon: ({focused}) => {
        const {routeName} = navigation.state
        let iconSource
        switch (routeName) {
          case 'Home':
            iconSource = iconHome
            break
          case 'Calendar':
            iconSource = iconCalendar
            break
          case 'Memories':
            iconSource = iconGrids
            break
          case 'New Event':
            iconSource = iconPages
            break
          case 'Components':
            iconSource = iconComponents
            break
          default:
            iconSource = iconComponents
        }
        return (
          <View style={styles.tabBarItemContainer}>
            <Image
              resizeMode="contain"
              source={iconSource}
              style={[styles.tabBarIcon, focused && styles.tabBarIconFocused]}
            />
          </View>
        )
      },
    }),
    tabBarPosition: 'bottom',
    animationEnabled: false,
    swipeEnabled: false,
    tabBarOptions: {
      showLabel: true,
      style: {
        backgroundColor: colors.white,
        borderTopWidth: 0.5,
        borderTopColor: '#d6d6d6',
      },
      labelStyle: {
        color: colors.grey,
      },
    },
  },
)

// const tabNavigator = createBottomTabNavigator({
//   HomeStack,
//   LinksStack,
//   SettingsStack,
// })

tabNavigator.path = ''

export default tabNavigator
