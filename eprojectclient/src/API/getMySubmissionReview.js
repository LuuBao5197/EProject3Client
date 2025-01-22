import axios from 'axios';

export const getMySubmissionReview= async (id) => {
    try {
        const response = await axios.get(`http://localhost:5190/api/Student/GetAllSubmissionReview/${id}`); 
        return response.data; 
    } catch (error) {
        console.error('Error fetching:', error);
        throw error;
    }
}
