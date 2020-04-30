import {ADD_EVENT, LOAD_EVENTS} from './events.actions.types';

export const addEvent = event => ({
  type: ADD_EVENT,
  payload: event,
});

export const loadEventsFromServer = events => ({
  type: LOAD_EVENTS,
  payload: events,
});
