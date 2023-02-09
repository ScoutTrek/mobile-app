import {useQuery} from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {GET_INITIAL_USER_FIELDS} from 'src/data/getCurrUser';
import {StoreGet, StoreSet} from './useStore';

export interface AuthStore {
  token: string | undefined;
  getToken: () => void;

  isNewUser: boolean;
}

const authStore = (set: StoreSet, get: StoreGet): AuthStore => {
  let token = undefined;

  const getToken = () => {
    useQuery(GET_INITIAL_USER_FIELDS, {
      fetchPolicy: 'network-only',
      onCompleted: async (data) => {
        if (!data) {
          return;
        }

        try {
          const userToken = await AsyncStorage.getItem('userToken');
          if (userToken) {
            set({
              token: userToken,
              isNewUser: !data.currUser || data.currUser.noGroups,
            });
          }
        } catch (e) {
          console.log(e);
        }
      },
      onError: ({graphQLErrors}) => {
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
  };

  return {token, getToken};
};

export default authStore;
