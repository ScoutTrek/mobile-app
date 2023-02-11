import { ApolloError, useQuery } from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GET_INITIAL_USER_FIELDS } from 'src/data/getCurrUser';
import { AsyncStorageItems } from 'src/utils/constants';

import { StoreGet, StoreSet } from './useStore';

export interface AuthStore {
  token: string | undefined;
  getToken: () => void;

  isNewUser: boolean;

  _onComplete: (data: any) => void;
  _onError: (error: ApolloError) => void;
}

const authStore = (set: StoreSet, get: StoreGet): AuthStore => ({
  token: undefined,
  getToken: () => {
    const { _onComplete, _onError } = get();
    useQuery(GET_INITIAL_USER_FIELDS, {
      fetchPolicy: 'network-only',
      onCompleted: _onComplete,
      onError: _onError,
    });
  },
  isNewUser: false,
  _onComplete: async (data) => {
    if (data) {
      const userToken = await AsyncStorage.getItem(AsyncStorageItems.userToken);
      if (userToken) {
        set({
          token: userToken,
          isNewUser: !data.currUser || data.currUser.noGroups,
        });
      }
    }
  },
  _onError: ({ graphQLErrors }) => {
    graphQLErrors.forEach((err) => {
      if (err.extensions.code === 'UNAUTHORIZED') {
        set({
          isNewUser: true,
          isLoading: false,
        });
      }
    });
  },
});

export default authStore;
