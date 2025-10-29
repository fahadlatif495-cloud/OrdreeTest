import { createMMKV } from "react-native-mmkv";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
const mmkv = createMMKV();

type AppState = {
  favoriteIds: string[];
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
  clearFavorites: () => void;
};

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      favoriteIds: [],
      toggleFavorite: (id: string) => {
        const current = get().favoriteIds;
        const exists = current.includes(id);
        const next = exists ? current.filter((x) => x !== id) : [...current, id];
        set({ favoriteIds: next });
      },
      isFavorite: (id: string) => get().favoriteIds.includes(id),
      clearFavorites: () => set({ favoriteIds: [] }),
    }),
    {
      name: "app-store",
      storage: createJSONStorage(() => ({
        getItem: (name: string) => mmkv.getString(name) ?? null,
        setItem: (name: string, value: string) => mmkv.set(name, value),
        removeItem: (name: string) => mmkv.remove(name),
      })),
      partialize: (state) => ({ favoriteIds: state.favoriteIds }),
    }
  )
);


