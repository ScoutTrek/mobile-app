import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Ionicons} from '@expo/vector-icons';

import CalendarView from './CalendarView';

import ChatModule from '../threads/ChatModule';

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
              name="arrow-back"
              size={26}
              style={{paddingHorizontal: 20}}
              onPress={navigation.goBack}
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
