import React from 'react';
import {Button, View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {Ionicons} from '@expo/vector-icons';

import CalendarView from './CalendarView';

import ChatModule from './EventThreads/ChatModule';

const Stack = createStackNavigator();

export function ChatStack({navigation, route}) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Message Board"
        component={ChatModule}
        initialParams={route.params}
        options={{
          headerHideBackButton: false,
          backButtonInCustomView: true,
          headerLeft: () => (
            <Ionicons
              name="ios-arrow-back"
              size={30}
              style={{paddingHorizontal: 20}}
              onPress={() => {
                navigation.pop();
              }}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
}

const CalendarStack = createStackNavigator();

function CalendarStackNavigator({navigation, route}) {
  return (
    <CalendarStack.Navigator
      initialRouteName="Calendar"
      screenOptions={() => ({
        headerShown: false,
      })}>
      <CalendarStack.Screen name="Calendar" component={CalendarView} />
    </CalendarStack.Navigator>
  );
}

export default CalendarStackNavigator;
