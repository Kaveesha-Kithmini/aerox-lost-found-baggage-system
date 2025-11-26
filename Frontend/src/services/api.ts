import axios, { AxiosResponse } from 'axios';

const API_BASE_URL = 'http://localhost:3001'; // Changed port to match backend

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds timeout
});

// Add request interceptor for logging
api.interceptors.request.use(
  (config) => {
    console.log('Making request to:', config.url);
    console.log('Request data:', config.data);
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    console.log('Response received:', response.data);
    return response;
  },
  (error) => {
    console.error('Response error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export interface LostLuggageFormData {
  _id?: string;
  passengerName: string;
  passengerId: string;
  email: string;
  phone: string;
  whatsappNumber: string;
  airline: string;
  flightNumber: string;
  flightDate: string;
  flightTime: string;
  bagSize: string;
  bagColor: string;
  bagBrand: string;
  uniqueIdentifiers: string;
  status?: string;
  qrCodeImage?: string;
  bagImage?: string;
  dateOfLoss: string;
  lastSeenLocation: string;
}

export interface FoundLuggageFormData {
  finderName: string;
  phone: string;
  location: string;
  findDate: string;
  findTime: string;
  bagDescription: string;
  bagColor: string;
  bagSize: string;
  bagImage?: string;
  qrCodeImage?: string;
  status?: string;
  createdAt?: string;
}

interface LostLuggageApi {
  submitForm: (data: LostLuggageFormData | FormData) => Promise<AxiosResponse<any>>;
  getAllLostItems: () => Promise<AxiosResponse<any>>;
  getLostItemById: (id: string) => Promise<AxiosResponse<any>>;
  updateLostItem: (id: string, data: Partial<LostLuggageFormData>) => Promise<AxiosResponse<any>>;
  deleteLostItem: (id: string) => Promise<AxiosResponse<any>>;
  getAllFoundItems: () => Promise<AxiosResponse<any>>;
  getFoundItemById: (id: string) => Promise<AxiosResponse<any>>;
  updateFoundItem: (id: string, data: Partial<FoundLuggageFormData> | FormData) => Promise<AxiosResponse<any>>;
  deleteFoundItem: (id: string) => Promise<AxiosResponse<any>>;
}

export const lostLuggageApi: LostLuggageApi = {
  submitForm: async (data: LostLuggageFormData | FormData): Promise<AxiosResponse> => {
    try {
      console.log('Submitting form data to API:', data);
      
      // Validate required fields if data is not FormData
      if (!(data instanceof FormData)) {
        const requiredFields = ['passengerName', 'passengerId', 'email', 'phone', 'airline', 
          'flightNumber', 'flightDate', 'flightTime', 'bagSize', 'bagColor', 'bagBrand', 
          'uniqueIdentifiers', 'dateOfLoss', 'lastSeenLocation'];
        
        const missingFields = requiredFields.filter(field => !data[field as keyof LostLuggageFormData]);
        if (missingFields.length > 0) {
          throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
        }
      }

      // Make the API request with appropriate content type
      const response = await api.post('/Losts', data, {
        headers: {
          'Content-Type': data instanceof FormData ? 'multipart/form-data' : 'application/json',
        },
      });
      
      if (!response.data) {
        throw new Error('No data received from server');
      }
      
      console.log('API response:', response.data);
      return response;
    } catch (error) {
      console.error('API Error:', error);
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.message || 
                           error.response?.data?.error || 
                           'Failed to submit form';
        console.error('Detailed error:', error.response?.data);
        throw new Error(errorMessage);
      }
      throw error;
    }
  },

  getAllLostItems: async () => {
    try {
      const response = await api.get('/Losts');
      return response;
    } catch (error) {
      console.error('Error fetching lost items:', error);
      throw error;
    }
  },

  getLostItemById: async (id: string) => {
    try {
      const response = await api.get(`/Losts/${id}`);
      return response;
    } catch (error) {
      console.error('Error fetching lost item:', error);
      throw error;
    }
  },

  updateLostItem: async (id: string, data: Partial<LostLuggageFormData>) => {
    try {
      const response = await api.put(`/Losts/${id}`, data);
      return response;
    } catch (error) {
      console.error('Error updating lost item:', error);
      throw error;
    }
  },

  deleteLostItem: async (id: string) => {
    try {
      const response = await api.delete(`/Losts/${id}`);
      return response;
    } catch (error) {
      console.error('Error deleting lost item:', error);
      throw error;
    }
  },

  getAllFoundItems: async () => {
    try {
      const response = await api.get('/Founds');
      return response;
    } catch (error) {
      console.error('API Error:', error);
      if (axios.isAxiosError(error) && error.response) {
        console.error('Server error details:', error.response.data);
      }
      throw error;
    }
  },

  getFoundItemById: async (id: string) => {
    try {
      const response = await api.get(`/Founds/${id}`);
      return response;
    } catch (error) {
      console.error('API Error:', error);
      if (axios.isAxiosError(error) && error.response) {
        console.error('Server error details:', error.response.data);
      }
      throw error;
    }
  },

  updateFoundItem: async (id: string, data: Partial<FoundLuggageFormData> | FormData) => {
    try {
      console.log('Sending update request for found luggage:', { id, data });
      let response;
      if (data instanceof FormData) {
        response = await api.put(`/Founds/${id}`, data, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      } else {
        response = await api.put(`/Founds/${id}`, data, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
      }
      console.log('Update response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error updating found luggage:', error);
      throw error;
    }
  },

  deleteFoundItem: async (id: string) => {
    try {
      const response = await api.delete(`/Founds/${id}`);
      return response;
    } catch (error) {
      console.error('API Error:', error);
      if (axios.isAxiosError(error) && error.response) {
        console.error('Server error details:', error.response.data);
      }
      throw error;
    }
  }
};

export const foundLuggageApi = {
  submitForm: async (formData: FoundLuggageFormData | FormData) => {
    try {
      // If FormData, send as multipart/form-data
      if (formData instanceof FormData) {
        const response = await api.post('/Founds', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        return response;
      }
      // Otherwise, send as JSON (legacy)
      const response = await api.post('/Founds', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response;
    } catch (error) {
      console.error('API Error:', error);
      if (axios.isAxiosError(error) && error.response) {
        console.error('Server error details:', error.response.data);
        throw new Error(error.response.data.message || 'Failed to submit form. Please try again.');
      }
      throw error;
    }
  },

  getAllFoundItems: async () => {
    try {
      const response = await api.get('/Founds');
      return response;
    } catch (error) {
      console.error('API Error:', error);
      if (axios.isAxiosError(error) && error.response) {
        console.error('Server error details:', error.response.data);
      }
      throw error;
    }
  },

  getFoundItemById: async (id: string) => {
    try {
      const response = await api.get(`/Founds/${id}`);
      return response;
    } catch (error) {
      console.error('API Error:', error);
      if (axios.isAxiosError(error) && error.response) {
        console.error('Server error details:', error.response.data);
      }
      throw error;
    }
  },

  updateFoundItem: async (id: string, data: Partial<FoundLuggageFormData> | FormData) => {
    try {
      console.log('Sending update request for found luggage:', { id, data });
      let response;
      if (data instanceof FormData) {
        response = await api.put(`/Founds/${id}`, data, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      } else {
        response = await api.put(`/Founds/${id}`, data, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
      }
      console.log('Update response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error updating found luggage:', error);
      throw error;
    }
  },

  deleteFoundItem: async (id: string) => {
    try {
      const response = await api.delete(`/Founds/${id}`);
      return response;
    } catch (error) {
      console.error('API Error:', error);
      if (axios.isAxiosError(error) && error.response) {
        console.error('Server error details:', error.response.data);
      }
      throw error;
    }
  }
};
