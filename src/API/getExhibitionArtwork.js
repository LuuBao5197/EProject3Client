import axios from "axios";

export const getExhibitionArtwork = async (studentId)=>{
    try {
        const response = await axios.get(`http://localhost:5190/api/Student/GetAllExhibitionArtwork?studentId=${studentId}`); 
        return response.data; 
    } catch (error) {
        console.error('Error fetching:', error);
        throw error;
    }
}