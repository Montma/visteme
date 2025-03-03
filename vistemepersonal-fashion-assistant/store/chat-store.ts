import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ChatMessage } from '@/types';

interface ChatState {
  messages: ChatMessage[];
  addMessage: (message: ChatMessage) => void;
  clearMessages: () => void;
}

export const useChatStore = create<ChatState>()(
  persist(
    (set) => ({
      messages: [],
      addMessage: (message) => 
        set((state) => ({ 
          messages: [...state.messages, message] 
        })),
      clearMessages: () => set({ messages: [] }),
    }),
    {
      name: 'visteme-chat-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);