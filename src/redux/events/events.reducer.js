import {ADD_EVENT, LOAD_EVENTS} from './events.actions.types';

const initialState = {
  events: [],
};

export default function EventsReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_EVENT:
      return {
        ...state,
        events: [...state.events, action.payload],
      };
    case LOAD_EVENTS:
      return {
        ...state,
        events: [...state.events, ...action.payload],
      };
    default:
      return state;
  }
}
