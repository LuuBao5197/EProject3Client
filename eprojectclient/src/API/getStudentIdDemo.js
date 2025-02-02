import {jwtDecode} from 'jwt-decode';
import axios from 'axios';

// Hàm lấy studentId dựa vào token
export const getStudentIdDemo = async () => {
    const token = localStorage.getItem("token");
    if (token) {
        const decodedToken = jwtDecode(token);
        // console.log(decodedToken);
        const userId = decodedToken.Id;
        try {
            const response = await axios.get(`http://localhost:5190/api/Student/GetStudentIdByUserId?userId=${userId}`);
            // console.log(response.data.studentId);
            return response.data.studentId;
            
        } catch (error) {
            console.error('Error fetching student ID:', error);
            throw error;
        }
    }
    return Promise.resolve(null);}
