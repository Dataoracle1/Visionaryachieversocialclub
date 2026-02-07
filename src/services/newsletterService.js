import api from '../api/axios';

export const newsletterService = {
  // Subscribe to newsletter
  subscribe: async (email) => {
    try {
      const response = await api.post('/newsletter/subscribe', { email });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Unsubscribe from newsletter
  unsubscribe: async (email) => {
    try {
      const response = await api.post('/newsletter/unsubscribe', { email });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Get all subscribers (admin only)
  getAllSubscribers: async () => {
    try {
      const response = await api.get('/newsletter/subscribers');
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
};