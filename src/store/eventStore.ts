import { StoreGet, StoreSet } from './useStore';

export interface EventStore {}

const eventStore = (set: StoreSet, get: StoreGet): EventStore => ({});

export default eventStore;
