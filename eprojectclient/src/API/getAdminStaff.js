import axios from 'axios';
import { error } from 'jquery';

const API_URL = 'http://localhost:5190/api/AdminStaff'; 
export const getAllStaff = async () => {
  const response = await axios.get(`${API_URL}/getall`);
  return response.data;
};
export const addStaff = async (staffData) => {
  try {
    const response = await axios.post(`${API_URL}/staff`, staffData);
    console.log("Chi tiết lỗi:", error.response?.data?.errors);
    return response.data;
  
    
  } catch (error) {
    // Kiểm tra lỗi nếu có phản hồi từ API
    if (error.response) {
      console.error('API error response:', error.response);
      console.error('Error status:', error.response.status);
      console.error('Error data:', error.response.data);
      throw new Error(error.response.data.message || 'Failed to add staff');
    }
    // Nếu không có phản hồi, kiểm tra lỗi yêu cầu
    else if (error.request) {
      console.error('API did not respond:', error.request);
    } 
    // Lỗi cấu hình hoặc sự cố khác
    else {
      console.error('Error setting up the request:', error.message);
    }
    throw new Error('Failed to add staff');
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
export const getStaffDetails = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data; // Trả về dữ liệu chi tiết Staff
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch staff details');
  }
};
export const getSubjects = async () => {
  try {
    const response = await axios.get(`${API_URL}/subjects`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch subjects');
  }
};

// Lấy danh sách các trình độ (Qualifications)
export const getQualifications = async () => {
  try {
    const response = await axios.get(`${API_URL}/qualifications`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch qualifications');
  }
};

