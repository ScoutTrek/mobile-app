import {create} from 'zustand';
import {devtools, persist} from 'zustand/middleware';

type Store = EventStore;

const useStore = create<Store>()(
  devtools(
    persist(
      (set, get) => ({
        ...eventStore(set, get),
      }),

      {
        name: 'ScoutTrekStore',
      }
    )
  )
);

export default useStore;
