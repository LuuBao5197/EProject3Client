import axios from 'axios';
import { data } from 'react-router-dom';

const API_URL = 'http://localhost:5190/api/Class';

export const getAllClasses = async () => {
    try {
      const response = await axios.get(`${API_URL}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch classes');
    }
  };
  export const getAllStaff = async () => {
    try {
      const response = await axios.get(`${API_URL}/staff`);
      console.log(response.data);  // In ra response từ API
      return response.data;
    } catch (error) {
      console.error('Error fetching staff:', error);
      console.error('Error details:', error.response?.data);  // In chi tiết lỗi từ API
      throw new Error(error.response?.data?.message || 'Failed to fetch staff');
    }
  };
  
export const addClass = async (classData) => {
    try {
      const response = await axios.post(`${API_URL}`, classData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to add class');
    }
  };
  export const getClassById = async (id) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch class details');
    }
  };
  
  export const updateClass = async (id, classData) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, classData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to update class');
    }
  };
  export const deleteClass = async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to delete class');
    }
  };
      