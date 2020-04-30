import {combineReducers} from 'redux';

import events from './events/events.reducer';
import auth from './auth/auth.reducer';

export default combineReducers({
  // ## Generator Reducers
  events,
  auth,
});
