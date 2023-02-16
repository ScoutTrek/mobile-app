import { StoreGet, StoreSet } from './useStore';

export interface AppStore {}

const appStore = (set: StoreSet, get: StoreGet): AppStore => ({});

export default appStore;
