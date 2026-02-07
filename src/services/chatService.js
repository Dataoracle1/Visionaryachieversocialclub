import api from '../api/axios';

export const chatService = {
  // Send message to AI chatbot
  sendMessage: async (message, sessionId = null) => {
    try {
      const response = await api.post('/chat/ai', { 
        message,
        sessionId 
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Get chat history (optional)
  getChatHistory: async (sessionId) => {
    try {
      const response = await api.get(`/chat/history/${sessionId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Clear session (optional)
  clearSession: async (sessionId) => {
    try {
      const response = await api.delete(`/chat/session/${sessionId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
};