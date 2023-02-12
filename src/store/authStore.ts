import { StoreGet, StoreSet } from './useStore';

export interface AuthStore {}

const authStore = (set: StoreSet, get: StoreGet): AuthStore => ({});

export default authStore;
