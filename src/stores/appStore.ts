import { StoreGet, StoreSet } from './useStore';

export interface AppStore {
  isLoading: boolean;
}

const appStore = (set: StoreSet, get: StoreGet): AppStore => ({
  isLoading: false,
});

export default appStore;
