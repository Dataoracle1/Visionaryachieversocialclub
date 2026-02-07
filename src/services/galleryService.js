import api from '../api/axios';

export const galleryService = {
  // Get all gallery items
  getAllItems: async () => {
    try {
      const response = await api.get('/gallery');
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Get single gallery item
  getItem: async (id) => {
    try {
      const response = await api.get(`/gallery/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Upload gallery item (admin only)
  uploadItem: async (formData) => {
    try {
      const response = await api.post('/gallery', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Delete gallery item (admin only)
  deleteItem: async (id) => {
    try {
      const response = await api.delete(`/gallery/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
};