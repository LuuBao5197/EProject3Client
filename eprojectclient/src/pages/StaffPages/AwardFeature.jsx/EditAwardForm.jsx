import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom"; // Dùng để lấy tham số từ URL
import "bootstrap/dist/css/bootstrap.min.css";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const EditAwardForm = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Lấy ID từ tham số URL
  const [initialData, setInitialData] = useState({}); // Lưu dữ liệu ban đầu của giải thưởng
  const [contestOptions, setContestOptions] = useState([]); // Lưu danh sách cuộc thi từ API
  const [loading, setLoading] = useState(true); // Trạng thái tải dữ liệu
  const token = localStorage.getItem('token');
  const userId = jwtDecode(token).Id;
  // Lấy dữ liệu giải thưởng và danh sách cuộc thi từ API
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Lấy dữ liệu giải thưởng
        const awardResponse = await fetch(`http://localhost:5190/api/Staff/GetDetailAward/${id}`); // Đổi URL phù hợp với API của bạn
        const awardData = await awardResponse.json();
        console.log(awardData);

        // Lấy danh sách cuộc thi
        const contestResponse = await fetch("http://localhost:5190/api/Staff/GetAllContest"); // Đổi URL phù hợp với API của bạn
        const contestData = await contestResponse.json();


        setInitialData({
          id: id,
          name: awardData.name,
          value: awardData.value,
          contestId: awardData.contestId,
          awardQuantity: awardData.awardQuantity,
        });
        setContestOptions(contestData.contests);
        setLoading(false);
      } catch (error) {
        console.error("Error loading data:", error);
        setLoading(false);
      }
    };
    fetchData();
    const fetchInfoOfStaff = async (userId) => {
      var result = await axios.get(`http://localhost:5190/api/Staff/GetInfoStaff/${userId}`);
      console.log(result);
      if (!result.data.isReviewer) {
        toast.dark("You do not have permission to access this page. Please contact the administrator if you believe this is a mistake");
        navigate('/staff');
      }
    }
    fetchInfoOfStaff(userId);

  }, [id, token]);

  // Sử dụng useFormik
  const formik = useFormik({
    enableReinitialize: true, // Cho phép khởi tạo lại form khi initialValues thay đổi
    initialValues: initialData || {
      id: id,
      name: "",
      value: "",
      contestId: "",
      awardQuantity: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .max(50, "Name must be less than 50 character")
        .required("Name must be not blank"),
      value: Yup.number()
        .typeError("Value must be a number")
        .positive("Value must be greater than 0")
        .required("Value must be not blank"),
      contestId: Yup.string().required("You must be choice one of contest"),
      awardQuantity: Yup.number()
        .typeError("Quantity must be a number")
        .integer("Quantity must be a integer number")
        .min(1, "Quantity must be greater than 1")
        .required("Quantity must be not blank"),
    }),
    onSubmit: async (values) => {
      try {
        // console.log("Dữ liệu cập nhật:", values);
        const response = await fetch(`http://localhost:5190/api/Staff/EditAward/${id}`, {
          method: "PUT", // Hoặc PATCH nếu API của bạn hỗ trợ
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });

        if (response.ok) {
          toast.success("Update award successfully", {
            position: "top-left",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "colored",
          });
          navigate(-1);

          // alert("Cập nhật giải thưởng thành công!");
        } else {
          alert("Something errors occurs.");
        }
      } catch (error) {
        console.error("Lỗi khi gửi dữ liệu:", error);
      }
    },
  });

  return (
    <div className="container mt-5">
      <h2 className="text-center">Edit Award</h2>
      {loading ? (
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <form onSubmit={formik.handleSubmit} className="mt-4">
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              className={`form-control ${formik.touched.name && formik.errors.name ? "is-invalid" : ""
                }`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name || ""}
            />
            {formik.touched.name && formik.errors.name ? (
              <div className="invalid-feedback">{formik.errors.name}</div>
            ) : null}
          </div>

          <div className="mb-3">
            <label htmlFor="value" className="form-label">
              Value
            </label>
            <input
              id="value"
              name="value"
              type="number"
              className={`form-control ${formik.touched.value && formik.errors.value ? "is-invalid" : ""
                }`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.value || 1}
            />
            {formik.touched.value && formik.errors.value ? (
              <div className="invalid-feedback">{formik.errors.value}</div>
            ) : null}
          </div>

          <div className="mb-3">
            <label htmlFor="contestId" className="form-label">
              Contest 
            </label>
            <select
              id="contestId"
              name="contestId"
              className={`form-select ${formik.touched.contestId && formik.errors.contestId
                ? "is-invalid"
                : ""
                }`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.contestId || ""}
            >
              <option value="">-- Choice contest --</option>
              {contestOptions.map((contest) => (
                <option key={contest.id} value={contest.id}>
                  {contest.name}
                </option>
              ))}
            </select>
            {formik.touched.contestId && formik.errors.contestId ? (
              <div className="invalid-feedback">{formik.errors.contestId}</div>
            ) : null}
          </div>

          <div className="mb-3">
            <label htmlFor="awardQuantity" className="form-label">
              Quantity award
            </label>
            <input
              id="awardQuantity"
              name="awardQuantity"
              type="number"
              className={`form-control ${formik.touched.awardQuantity && formik.errors.awardQuantity
                ? "is-invalid"
                : ""
                }`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.awardQuantity || 0}
            />
            {formik.touched.awardQuantity && formik.errors.awardQuantity ? (
              <div className="invalid-feedback">{formik.errors.awardQuantity}</div>
            ) : null}
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Update
          </button>
        </form>
      )}
    </div>
  );
};

export default EditAwardForm;
