import axiosInstance from './axiosInstance';

export const login = async (data) => {
  try {
    const response = await axiosInstance.post('/auth/login',data);
    return response.data;
  } catch (error) {
    console.error('Login failed:', error.response?.data?.message || error.message);
    throw error;
  }
};

export const signup = async (data) => {
  try {
    const response = await axiosInstance.post('/auth/signup', data);
    return response.data;
  } catch (error) {
    console.error('Signup failed:', error.response?.data?.message || error.message);
    throw error;
  }
};
