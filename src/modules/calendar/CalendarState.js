const ITEMS_LOADED = 'CalendarState/ITEMS_LOADED'

const defaultState = {
  items: [],
  isLoading: false,
}

export default function CalendarStateReducer(state = defaultState, action) {
  switch (action.type) {
    case ITEMS_LOADED:
      return Object.assign({}, state, {
        isLoading: true,
        items: action.items,
      })
    default:
      return state
  }
}
