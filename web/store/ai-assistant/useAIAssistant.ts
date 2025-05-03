import { create } from 'zustand';
import { Message, MessageContent } from '@/types/ai-assistant';
import { aiAssistantService } from '@/services/ai-assistant/aiAssistantService';

interface AIAssistantState {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
  sendMessage: (text: string, images?: File[]) => Promise<void>;
  clearChat: () => void;
}

export const useAIAssistant = create<AIAssistantState>((set, get) => ({
  messages: [],
  isLoading: false,
  error: null,
  
  sendMessage: async (text: string, images: File[] = []) => {
    try {
      set({ isLoading: true });
      
      // Add user message to the chat
      const userContent: MessageContent = images.length > 0 
        ? { type: 'image', imageUrl: URL.createObjectURL(images[0]), text } 
        : { type: 'text', text };
      
      const userMessage: Message = {
        id: Date.now().toString(),
        role: 'user',
        content: userContent,
        timestamp: new Date().toISOString(),
      };
      
      // Get current messages
      const currentMessages = get().messages;
      
      // Update messages with user message
      const updatedMessages = [...currentMessages, userMessage];
      
      set(state => ({ 
        messages: updatedMessages,
        error: null
      }));
      
      // Get AI response, passing the updated message history
      const response = await aiAssistantService.getResponse(text, images, updatedMessages);
      
      // Add AI response to the chat
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: { type: 'text', text: response },
        timestamp: new Date().toISOString(),
      };
      
      set(state => ({ 
        messages: [...state.messages, aiMessage],
        isLoading: false
      }));
      
    } catch (error) {
      set({ 
        isLoading: false,
        error: error instanceof Error ? error.message : 'An unknown error occurred'
      });
      
      // Add error message
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: { 
          type: 'text', 
          text: 'Sorry, I encountered an error processing your request. Please try again.' 
        },
        timestamp: new Date().toISOString(),
      };
      
      set(state => ({ 
        messages: [...state.messages, errorMessage]
      }));
    }
  },
  
  clearChat: () => {
    set({ messages: [], error: null });
  }
}));