import axios from 'axios';

const API_URL = 'http://localhost:5190/api/AdminStaff'; 
export const getAllStaff = async () => {
  const response = await axios.get(`${API_URL}/getall`);
  return response.data;
};

export const addStaff = async (staffData) => {
  try {
    const response = await axios.post(`${API_URL}`, staffData);
    return response.data; // Hoặc có thể trả về response tùy theo nhu cầu của bạn
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to add staff');
  }
};

export const updateStaff = async (id, staffData) => {
  const response = await axios.put(`${API_URL}/${id}`, staffData);
  return response.data;
};

export const deleteStaff = async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
