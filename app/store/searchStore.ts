import type { SearchItem } from '@/features/search/types';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SearchStore {
  recent: SearchItem[];
  saveRecent: (item: SearchItem) => void;
  clearRecent: () => void;
}

const MAX_RECENT = 5;

export const useSearchStore = create<SearchStore>()(
  persist(
    (set) => ({
      recent: [],

      saveRecent: (item) =>
        set((state) => {
          const filtered = state.recent.filter((i) => i.id !== item.id);
          const newRecent = [item, ...filtered].slice(0, MAX_RECENT);
          return { recent: newRecent };
        }),

      clearRecent: () => set({ recent: [] })
    }),
    {
      name: 'recent-searches'
    }
  )
);
