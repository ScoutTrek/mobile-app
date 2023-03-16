import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScoutTrekApolloClient } from 'data';
import { IsNewUserQuery, IS_NEW_USER_QUERY } from 'data/getCurrUser';
import {
  SignupInput,
  SignUpQuery,
  SIGN_UP,
} from 'src/gqlClient/queries/signUp';
import { AsyncStorageKeys } from '../constants/asyncStorageKeys';
import { executeQuery } from '../gqlClient/executeQuery';
import { StoreGet, StoreSet } from './useStore';

export interface AuthStore {
  token: string | null;
  isNewUser: boolean;

  clearToken: () => Promise<void>;
  initUser: () => Promise<void>;
  signUp: (input: SignupInput) => Promise<void>;

  __signOutCompletely: () => Promise<void>;
}

const authStore = (set: StoreSet, get: StoreGet): AuthStore => ({
  token: null,
  isNewUser: true,

  clearToken: async () => {
    await AsyncStorage.removeItem(AsyncStorageKeys.userToken);
    set({ token: null });
  },

  initUser: async () => {
    const token = await AsyncStorage.getItem(AsyncStorageKeys.userToken);
    const ret = await executeQuery<IsNewUserQuery>(IS_NEW_USER_QUERY);

    set({ token });

    if (ret && ret.currUser) {
      set({ isNewUser: ret.currUser.noGroups });
    }
  },

  signUp: async (input: SignupInput) => {
    const ret = await executeQuery<SignUpQuery, SignupInput>(SIGN_UP, {
      input,
    });

    if (ret) {
      await AsyncStorage.setItem(AsyncStorageKeys.userToken, ret.token);
      set({ token: ret.token, isNewUser: ret.noGroups });
    }

    // const [signUp] = useMutation(SIGN_UP, {
    //   onCompleted: async ({ signup }) => {
    //     try {
    //       console.log('Signing up');
    //       const token = await AsyncStorage.setItem('userToken', signup.token);
    //       setNewUser(true);
    //       setToken(signup.token);
    //     } catch (e) {
    //       console.log(e);
    //     }
    //   },
    // });
  },

  __signOutCompletely: async () => {
    const { clearToken } = get();
    clearToken();
    AsyncStorage.removeItem('userToken');
    AsyncStorage.removeItem('currMembershipID');
    ScoutTrekApolloClient.stop();
    ScoutTrekApolloClient.clearStore();
  },
});

export default authStore;
