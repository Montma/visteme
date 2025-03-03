import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthState {
  isAuthenticated: boolean;
  userId: string | null;
  email: string | null;
  login: (email: string, userId: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      userId: null,
      email: null,
      login: (email, userId) => set({ isAuthenticated: true, email, userId }),
      logout: () => set({ isAuthenticated: false, userId: null, email: null }),
    }),
    {
      name: 'visteme-auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);