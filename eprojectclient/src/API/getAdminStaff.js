import axios from 'axios';
import { error } from 'jquery';

const API_URL = 'http://localhost:5190/api/AdminStaff'; 
export const getAllStaff = async () => {
  const response = await axios.get(`${API_URL}/getall`);
  return response.data;
};
export const CreateStaff = async (staffData) => {
  try {
    const response = await axios.post(`${API_URL}/staff`, staffData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to add staff');
  }
};
export const updateStaffStatus = async (id, newStatus) => {
  try {
    const response = await axios.put(`${API_URL}/${id}/status`, { status: newStatus });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to update staff status');
  }
}

export const updateStaff = async (id, staffData) => {
  const response = await axios.put(`${API_URL}/staff/${id}`, staffData);
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
export const sendEmailToManager = async (staffInfo) => {
  try {
    const response = await axios.post(`${API_URL}/send-email-to-manager`, staffInfo);
    return response.data;
  } catch (error) {
    return handleError(error, 'Không thể gửi email đến quản lý');
  }
};
