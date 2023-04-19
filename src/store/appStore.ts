import AsyncStorage from '@react-native-async-storage/async-storage';
import { StoreGet, StoreSet } from './useStore';

export interface AppStore {
  isLoading: boolean;

  clearAsyncStorage: () => Promise<void>;
}

const appStore = (set: StoreSet, get: StoreGet): AppStore => ({
  isLoading: false,

  clearAsyncStorage: async () => {
    await AsyncStorage.clear();
  },
});

export default appStore;
