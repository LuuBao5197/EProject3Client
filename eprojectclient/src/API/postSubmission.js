import axios from "axios";
import { SweetAlert } from "../pages/StudentPages/Notifications/SweetAlert"

export const postSubmission = async (stdId,contestId,formData) => {
  try {
    const response = await axios.post(`http://localhost:5190/api/Student/CreateNewSubmission/${contestId}?studentId=${stdId}`, formData);
    http://localhost:5190/api/Student/CreateNewSubmission/2?studentId=1

    // Kiểm tra phản hồi từ API
    if (response.status === 200) {
      SweetAlert("Submission successful!",'success');  // Hiển thị thông báo thành công
    } else {
      alert("Đã có lỗi xảy ra: " + response.data.Message);  // Hiển thị thông báo lỗi từ API
    }
  } catch (error) {
    console.error("Lỗi khi gửi dữ liệu:", error);
    alert("Có lỗi xảy ra khi gửi dữ liệu!");
  }
};
