import axios from 'axios';

export const getContest= async () => {
    try {
        const response = await axios.get('http://localhost:5190/api/Student/GetAllContest'); 
        return response.data; 
    } catch (error) {
        console.error('Error fetching contests:', error);
        throw error;
    }
}
