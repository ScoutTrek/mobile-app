export const RESTORE_TOKEN = 'RESTORE_TOKEN';
export const SIGN_IN = 'SIGN_IN';
export const SIGN_OUT = 'SIGN_OUT';

import {AsyncStorage} from 'react-native';

export const saveExpoToken = expoToken => ({
  type: SAVE_EXPO_TOKEN,
  expoToken: expoToken,
});

export const signOut = () => async dispatch => {
  try {
    await AsyncStorage.removeItem('userToken');
  } catch (e) {
    console.log(e);
    // saving error
  }
  dispatch({
    type: SIGN_OUT,
  });
};
