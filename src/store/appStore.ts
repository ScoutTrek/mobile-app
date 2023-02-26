import { StoreGet, StoreSet } from './useStore';

export interface AppStore {
  isLoading: boolean;

  setIsLoading: (isLoading: boolean) => void;
}

const appStore = (set: StoreSet, get: StoreGet): AppStore => ({
  isLoading: true,
  setIsLoading: (isLoading: boolean) => {
    set({ isLoading });
  },
});

export default appStore;
