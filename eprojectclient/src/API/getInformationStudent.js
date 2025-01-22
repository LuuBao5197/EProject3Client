import axios from 'axios';

export const getInformationStudent= async (id) => {
    try {
        const response = await axios.get(`http://localhost:5190/api/Student/MyInformation?id=${id}`); 
        return response.data; 
    } catch (error) {
        console.error('Error fetching:', error);
        throw error;
    }
}
