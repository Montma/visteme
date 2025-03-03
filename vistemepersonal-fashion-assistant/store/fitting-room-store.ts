import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FittingRoomItem } from '@/types';

interface FittingRoomState {
  items: FittingRoomItem[];
  addItem: (item: FittingRoomItem) => void;
  removeItem: (id: string) => void;
  updateItem: (id: string, updates: Partial<FittingRoomItem>) => void;
  clearItems: () => void;
}

export const useFittingRoomStore = create<FittingRoomState>()(
  persist(
    (set) => ({
      items: [],
      addItem: (item) => 
        set((state) => ({ 
          items: [...state.items, item] 
        })),
      removeItem: (id) => 
        set((state) => ({ 
          items: state.items.filter(item => item.id !== id) 
        })),
      updateItem: (id, updates) => 
        set((state) => ({ 
          items: state.items.map(item => 
            item.id === id ? { ...item, ...updates } : item
          ) 
        })),
      clearItems: () => set({ items: [] }),
    }),
    {
      name: 'visteme-fitting-room-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);