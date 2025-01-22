import axios from "axios";
import { SweetAlert } from "../pages/StudentPages/Notifications/SweetAlert";

export const updateMySubmission = async (subId,formUpdate) => {
  try {
    const response = await axios.put(`http://localhost:5190/api/Student/UpdateSubmission?subId=${subId}`, formUpdate);

    // Kiểm tra phản hồi từ API
    if (response.status === 200) {
      SweetAlert("Edit submission successfully",'success');  // Hiển thị thông báo thành công
    } else {
      SweetAlert("Đã có lỗi xảy ra: " + response.data.Message,'error');  // Hiển thị thông báo lỗi từ API
    }
  } catch (error) {
    console.error("Lỗi khi gửi dữ liệu:", error);
    alert("Có lỗi xảy ra khi gửi dữ liệu!");
  }
};
