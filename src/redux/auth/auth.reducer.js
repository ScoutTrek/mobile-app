import {
  RESTORE_TOKEN,
  SAVE_EXPO_TOKEN,
  SIGN_IN,
  SIGN_OUT,
} from './auth.actions';

const initialState = {
  isSignOut: false,
  userToken: null,
  expoToken: null,
};

export default function AuthReducer(state = initialState, action) {
  switch (action.type) {
    case RESTORE_TOKEN:
      return {
        ...state,
        isSignOut: false,
        userToken: action.token,
      };
    case SAVE_EXPO_TOKEN:
      return {
        ...state,
        expoToken: action.expoToken,
      };
    case SIGN_IN:
      return {
        ...state,
        isSignOut: false,
        userToken: action.token,
      };
    case SIGN_OUT:
      return {
        ...state,
        isSignOut: true,
        userToken: null,
      };
    default:
      return state;
  }
}
