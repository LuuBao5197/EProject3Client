import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";

const AddAwardForm = () => {
  const [contestOptions, setContestOptions] = useState([]); // Lưu danh sách cuộc thi từ API
  const [loading, setLoading] = useState(true); // Trạng thái tải dữ liệu
  const token = localStorage.getItem('token');
  console.log("token", token);
  const userId = jwtDecode(token).Id;
  const navigate = useNavigate();
  // Lấy dữ liệu cuộc thi từ API
  useEffect(() => {
    const fetchContests = async (status = "Approved") => {
      try {
        const response = await axios.get("http://localhost:5190/api/Staff/GetAllContest", {
          params: {status}
        }); // Đổi URL phù hợp với API của bạn

        setContestOptions(response.data.contests); // Giả sử API trả về mảng các cuộc thi
        setLoading(false);
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu cuộc thi:", error);
        setLoading(false);
      }
    };

    fetchContests();

    const fetchInfoOfStaff = async (userId) => {
      var result = await axios.get(`http://localhost:5190/api/Staff/GetInfoStaff/${userId}`);
      console.log(result);
      if (!result.data.isReviewer) {
        toast.dark("You do not have permission to access this page. Please contact the administrator if you believe this is a mistake");
        setTimeout(() => {
          navigate("/staff/award");
        }, 1000);
       

      }
    }
    fetchInfoOfStaff(userId);
  }, [token]);

  // Sử dụng useFormik
  const formik = useFormik({
    initialValues: {
      name: "",
      value: "",
      contestId: "",
      awardQuantity: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .max(50, "Name must be not greater than 50 character")
        .required("Name must be not blank"),
      value: Yup.number()
        .typeError("Value must be a number")
        .positive("Value must be greater than 0")
        .max(5000,"Value must be less than 5000 USD")
        .required("Value must be not blank"),
      contestId: Yup.string()
        .required("You must be choice contest"),
      awardQuantity: Yup.number()
        .typeError("Quantity must be a number")
        .integer("Quantity must be a integer number")
        .min(1, "Quantity must be greater than 1")
        .required("Quantity must be not blank"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        await axios.post("http://localhost:5190/api/Staff/AddAward", {
          ...values,
        });
        alert("Award added successfully!");
        resetForm();
      } catch (error) {
        console.error("Error adding contest:", error);
        alert(`Failed to add contest: ${error.response?.data?.message || error.message}`);
      }

    },
  });

  return (
    <div className="container mt-5">
      <h2 className="text-center">Add award</h2>
      <form onSubmit={formik.handleSubmit} className="mt-4">
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            className={`form-control ${formik.touched.name && formik.errors.name ? "is-invalid" : ""}`}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
          />
          {formik.touched.name && formik.errors.name ? (
            <div className="invalid-feedback">{formik.errors.name}</div>
          ) : null}
        </div>

        <div className="mb-3">
          <label htmlFor="value" className="form-label">Giá Trị</label>
          <input
            id="value"
            name="value"
            type="number"
            className={`form-control ${formik.touched.value && formik.errors.value ? "is-invalid" : ""}`}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.value}
          />
          {formik.touched.value && formik.errors.value ? (
            <div className="invalid-feedback">{formik.errors.value}</div>
          ) : null}
        </div>

        <div className="mb-3">
          <label htmlFor="contestId" className="form-label">Contest</label>
          {loading ? (
            <select className="form-select" disabled>
              <option>Loading...</option>
            </select>
          ) : (
            <select
              id="contestId"
              name="contestId"
              className={`form-select ${formik.touched.contestId && formik.errors.contestId ? "is-invalid" : ""}`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.contestId}
            >
              <option value="">-- Choice contest --</option>
              {contestOptions.map((contest) => (
                <option key={contest.id} value={contest.id}>
                  {contest.name}
                </option>
              ))}
            </select>
          )}
          {formik.touched.contestId && formik.errors.contestId ? (
            <div className="invalid-feedback">{formik.errors.contestId}</div>
          ) : null}
        </div>

        <div className="mb-3">
          <label htmlFor="awardQuantity" className="form-label">Quantity Award</label>
          <input
            id="awardQuantity"
            name="awardQuantity"
            type="number"
            className={`form-control ${formik.touched.awardQuantity && formik.errors.awardQuantity ? "is-invalid" : ""}`}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.awardQuantity}
          />
          {formik.touched.awardQuantity && formik.errors.awardQuantity ? (
            <div className="invalid-feedback">{formik.errors.awardQuantity}</div>
          ) : null}
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Create
        </button>
      </form>
    </div>
  );
};

export default AddAwardForm;
