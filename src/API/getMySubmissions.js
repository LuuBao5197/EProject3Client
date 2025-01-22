import axios from 'axios';

export const getMySubmissions= async (studId) => {
    try {
        const response = await axios.get(`http://localhost:5190/api/Student/GetAllSubmission/${studId}`); 
        return response.data; 
    } catch (error) {
        console.error('Error fetching:', error);
        throw error;
    }
}
