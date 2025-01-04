import axios from 'axios';

export const getAwardReceived= async (id) => {
    try {
        const response = await axios.get(`http://localhost:5190/api/Student/GetAllAwardReceived/${id}`); 
        return response.data; 
    } catch (error) {
        console.error('Error fetching contests:', error);
        throw error;
    }
}
