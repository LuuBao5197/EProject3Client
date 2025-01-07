import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import * as Yup from "yup";
// import "bootstrap/dist/css/bootstrap.min.css";

const AddAwardForm = () => {
  const [contestOptions, setContestOptions] = useState([]); // Lưu danh sách cuộc thi từ API
  const [loading, setLoading] = useState(true); // Trạng thái tải dữ liệu

  // Lấy dữ liệu cuộc thi từ API
  useEffect(() => {
    const fetchContests = async () => {
      try {
        const response = await axios.get("http://localhost:5190/api/Staff/GetAllContest"); // Đổi URL phù hợp với API của bạn

        setContestOptions(response.data.contests); // Giả sử API trả về mảng các cuộc thi
        setLoading(false);
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu cuộc thi:", error);
        setLoading(false);
      }
    };

    fetchContests();
  }, []);

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
        .max(50, "Tên không được vượt quá 50 ký tự")
        .required("Tên là bắt buộc"),
      value: Yup.number()
        .typeError("Giá trị phải là số")
        .positive("Giá trị phải lớn hơn 0")
        .required("Giá trị là bắt buộc"),
      contestId: Yup.string()
        .required("Bạn phải chọn một cuộc thi"),
      awardQuantity: Yup.number()
        .typeError("Số lượng phải là số")
        .integer("Số lượng phải là số nguyên")
        .min(1, "Số lượng phải lớn hơn hoặc bằng 1")
        .required("Số lượng là bắt buộc"),
    }),
    onSubmit: async (values, {resetForm}) => {
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
      <h2 className="text-center">Thêm Giải Thưởng</h2>
      <form onSubmit={formik.handleSubmit} className="mt-4">
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Tên Giải Thưởng</label>
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
          <label htmlFor="contestId" className="form-label">Cuộc Thi</label>
          {loading ? (
            <select className="form-select" disabled>
              <option>Đang tải...</option>
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
              <option value="">-- Chọn cuộc thi --</option>
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
          <label htmlFor="awardQuantity" className="form-label">Số Lượng Giải Thưởng</label>
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
          Thêm Giải Thưởng
        </button>
      </form>
    </div>
  );
};

export default AddAwardForm;
