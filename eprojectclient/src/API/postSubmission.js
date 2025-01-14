import axios from "axios";

export const postSubmission = async (formData) => {
  try {
    const response = await axios.post("http://localhost:5190/api/Student/CreateNewSubmission", formData);

    // Kiểm tra phản hồi từ API
    if (response.status === 200) {
      alert(response.data.Message);  // Hiển thị thông báo thành công
    } else {
      alert("Đã có lỗi xảy ra: " + response.data.Message);  // Hiển thị thông báo lỗi từ API
    }
  } catch (error) {
    console.error("Lỗi khi gửi dữ liệu:", error);
    alert("Có lỗi xảy ra khi gửi dữ liệu!");
  }
};
