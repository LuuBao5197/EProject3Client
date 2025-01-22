import axios from 'axios';

const API_URL = 'http://localhost:5190/api/AdminStudent';

export const getAllStudents = async () => {
  try {
    const response = await axios.get(`${API_URL}/getall`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch students');
  }
};
export const getAllClasses = async () => {
    try {
      const response = await axios.get(`${API_URL}/classes`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch students');
    }
  };

export const addStudent = async (studentData) => {
  try {
    const response = await axios.post(`${API_URL}/student`, studentData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to add student');
  }
};

export const updateStudent = async (id, studentData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, studentData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to update student');
  }
};

export const deleteStudent = async (id) => {
    try {
      console.log(`Attempting to delete student with ID: ${id}`); // Debug log
      const response = await axios.delete(`${API_URL}/${id}`);
      console.log('Delete response:', response);  // Debug log
      return response.data;
    } catch (error) {
      console.error('Error deleting student:', error);
      throw new Error(error.response?.data?.message || 'Failed to delete student');
    }
  };
  export const getStudentDetails = async (id) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch student details');
    }
  };
  
  
