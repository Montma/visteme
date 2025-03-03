import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User, ColorimetryResult, Size } from '@/types';

interface UserState {
  user: User | null;
  setUser: (user: User) => void;
  updateProfile: (updates: Partial<User>) => void;
  updateColorimetry: (colorimetry: ColorimetryResult) => void;
  updateSize: (size: Size) => void;
  updateFavoriteColors: (colors: string[]) => void;
  updatePreferredStyles: (styles: string[]) => void;
  updateProfilePicture: (url: string) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      updateProfile: (updates) => 
        set((state) => ({ 
          user: state.user ? { ...state.user, ...updates } : null 
        })),
      updateColorimetry: (colorimetry) => 
        set((state) => ({ 
          user: state.user ? { ...state.user, colorimetry } : null 
        })),
      updateSize: (size) => 
        set((state) => ({ 
          user: state.user ? { ...state.user, size } : null 
        })),
      updateFavoriteColors: (colors) => 
        set((state) => ({ 
          user: state.user ? { ...state.user, favoriteColors: colors } : null 
        })),
      updatePreferredStyles: (styles) => 
        set((state) => ({ 
          user: state.user ? { ...state.user, preferredStyles: styles } : null 
        })),
      updateProfilePicture: (profilePicture) => 
        set((state) => ({ 
          user: state.user ? { ...state.user, profilePicture } : null 
        })),
      clearUser: () => set({ user: null }),
    }),
    {
      name: 'visteme-user-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);