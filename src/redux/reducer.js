import {combineReducers} from 'redux';

// import app from '../modules/AppState'
import calendar from '../modules/calendar/CalendarState';
import events from './events/events.reducer';
import auth from './auth/auth.reducer';

export default combineReducers({
  // ## Generator Reducers
  calendar,
  events,
  auth,
});
