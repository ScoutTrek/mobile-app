import {createStackNavigator} from '@react-navigation/stack';

import {
  initialState,
  createEventFormReducer,
} from '../createEvent/createEventForm/createEventFormReducer';

import ViewEvents from '../createEvent/eventList/ViewEventsList';
import CreateEvent from '../createEvent/CreateEvent';
import {CreateEventFormProvider} from '../createEvent/createEventForm/CreateEventFormStore';

const EventStack = createStackNavigator();

const EventStackNavigator = () => {
  return (
    <CreateEventFormProvider
      initialState={initialState}
      reducer={createEventFormReducer}>
      <EventStack.Navigator
        screenOptions={() => ({
          headerShown: false,
        })}>
        <EventStack.Screen name="ViewEventsList" component={ViewEvents} />
        <EventStack.Screen name="CreateEvent" component={CreateEvent} />
      </EventStack.Navigator>
    </CreateEventFormProvider>
  );
};

export default EventStackNavigator;
