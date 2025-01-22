import axios from 'axios';

export const getOneSubmissionById= async (stuId,subId) => {
    try {
        const response = await axios.get(`http://localhost:5190/api/Student/GetOneSubmissionById/${stuId}/${subId}`); 
        return response.data; 
    } catch (error) {
        console.error('Error fetching:', error);
        throw error;
    }
}
