import api from '../api/axios';

export const contactService = {
  // Send contact message
  sendMessage: async (contactData) => {
    try {
      const response = await api.post('/contact', contactData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Get all messages (admin only)
  getAllMessages: async () => {
    try {
      const response = await api.get('/contact');
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Get single message (admin only)
  getMessage: async (id) => {
    try {
      const response = await api.get(`/contact/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Delete message (admin only)
  deleteMessage: async (id) => {
    try {
      const response = await api.delete(`/contact/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
};