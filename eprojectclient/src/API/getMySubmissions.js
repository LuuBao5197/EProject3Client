import axios from 'axios';

// API để lấy tất cả bài nộp của sinh viên
export const getMySubmissions = async (studId) => {
    try {
        const response = await axios.get(`http://localhost:5190/api/Student/GetAllSubmission/${studId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching:', error);
        throw error;
    }
};

// API để kiểm tra xem sinh viên đã nộp bài cho cuộc thi chưa
export const checkIfSubmitted = async (studId, contestId) => {
    try {
        const submissions = await getMySubmissions(studId);

        // Kiểm tra xem có bài nộp nào cho contestId này hay không
        const hasSubmitted = submissions.some(submission => submission.contestId === contestId);

        return !hasSubmitted; // Nếu đã nộp bài thì trả về false, ngược lại thì true
    } catch (error) {
        console.error('Error checking submission:', error);
        throw error;
    }
};
