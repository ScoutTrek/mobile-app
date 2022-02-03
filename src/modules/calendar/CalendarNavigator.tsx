import {createStackNavigator} from '@react-navigation/stack';

import CalendarView from './CalendarView';

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
