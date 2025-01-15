import axios from 'axios';

export const getStudent= async () => {
    try {
        const response = await axios.get('http://localhost:5190/api/Staff/GetAllStudent'); 
        return response.data; 
    } catch (error) {
        console.error('Error fetching contests:', error);
        throw error;
    }
}
