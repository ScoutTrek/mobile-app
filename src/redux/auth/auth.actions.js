export const RESTORE_TOKEN = 'RESTORE_TOKEN';
export const SAVE_EXPO_TOKEN = 'SAVE_EXPO_TOKEN';
export const SIGN_IN = 'SIGN_IN';
export const SIGN_OUT = 'SIGN_OUT';

import {AsyncStorage} from 'react-native';

export const getTokenFromMemory = userToken => ({
  type: RESTORE_TOKEN,
  token: userToken,
});

export const saveExpoToken = expoToken => ({
  type: SAVE_EXPO_TOKEN,
  expoToken: expoToken,
});

export const signUp = (
  name,
  email,
  password,
  confirmPassword
) => async dispatch => {
  const response = await fetch(
    'https://scouttrek-node-api.appspot.com/api/v1/users/signup',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
        passwordConfirm: confirmPassword,
      }),
    }
  );

  if (!response.ok) {
    console.log('User sign up failed');
    return;
  }
  const responseData = await response.json();

  console.log(responseData);

  try {
    await AsyncStorage.setItem('userToken', responseData.token);
  } catch (e) {
    console.log(e);
    // saving error
  }

  dispatch({
    type: SIGN_IN,
    token: responseData.token,
  });
};

export const signIn = (email, password) => async dispatch => {
  const response = await fetch(
    'https://scouttrek-node-api.appspot.com/api/v1/users/login',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    }
  );
  if (!response.ok) {
    console.log('Incorrect login');
    return;
  }
  const responseData = await response.json();

  console.log(responseData);

  try {
    await AsyncStorage.setItem('userToken', responseData.token);
  } catch (e) {
    console.log(e);
    // saving error
  }

  dispatch({
    type: SIGN_IN,
    token: responseData.token,
  });
};

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
