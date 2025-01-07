import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useParams } from "react-router-dom"; // Dùng để lấy tham số từ URL
import "bootstrap/dist/css/bootstrap.min.css";

const EditAwardForm = () => {
  const { id } = useParams(); // Lấy ID từ tham số URL
  const [initialData, setInitialData] = useState(null); // Lưu dữ liệu ban đầu của giải thưởng
  const [contestOptions, setContestOptions] = useState([]); // Lưu danh sách cuộc thi từ API
  const [loading, setLoading] = useState(true); // Trạng thái tải dữ liệu

  // Lấy dữ liệu giải thưởng và danh sách cuộc thi từ API
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Lấy dữ liệu giải thưởng
        const awardResponse = await fetch(`https://api.example.com/awards/${id}`); // Đổi URL phù hợp với API của bạn
        const awardData = await awardResponse.json();

        // Lấy danh sách cuộc thi
        const contestResponse = await fetch("https://api.example.com/contests"); // Đổi URL phù hợp với API của bạn
        const contestData = await contestResponse.json();

        setInitialData({
          name: awardData.name,
          value: awardData.value,
          contestId: awardData.contestId,
          awardQuantity: awardData.awardQuantity,
        });
        setContestOptions(contestData);
        setLoading(false);
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // Sử dụng useFormik
  const formik = useFormik({
    enableReinitialize: true, // Cho phép khởi tạo lại form khi initialValues thay đổi
    initialValues: initialData || {
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
      contestId: Yup.string().required("Bạn phải chọn một cuộc thi"),
      awardQuantity: Yup.number()
        .typeError("Số lượng phải là số")
        .integer("Số lượng phải là số nguyên")
        .min(1, "Số lượng phải lớn hơn hoặc bằng 1")
        .required("Số lượng là bắt buộc"),
    }),
    onSubmit: async (values) => {
      try {
        console.log("Dữ liệu cập nhật:", values);
        const response = await fetch(`https://api.example.com/awards/${id}`, {
          method: "PUT", // Hoặc PATCH nếu API của bạn hỗ trợ
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });

        if (response.ok) {
          alert("Cập nhật giải thưởng thành công!");
        } else {
          alert("Có lỗi xảy ra khi cập nhật.");
        }
      } catch (error) {
        console.error("Lỗi khi gửi dữ liệu:", error);
      }
    },
  });

  return (
    <div className="container mt-5">
      <h2 className="text-center">Chỉnh Sửa Giải Thưởng</h2>
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
              Tên Giải Thưởng
            </label>
            <input
              id="name"
              name="name"
              type="text"
              className={`form-control ${
                formik.touched.name && formik.errors.name ? "is-invalid" : ""
              }`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
            />
            {formik.touched.name && formik.errors.name ? (
              <div className="invalid-feedback">{formik.errors.name}</div>
            ) : null}
          </div>

          <div className="mb-3">
            <label htmlFor="value" className="form-label">
              Giá Trị
            </label>
            <input
              id="value"
              name="value"
              type="number"
              className={`form-control ${
                formik.touched.value && formik.errors.value ? "is-invalid" : ""
              }`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.value}
            />
            {formik.touched.value && formik.errors.value ? (
              <div className="invalid-feedback">{formik.errors.value}</div>
            ) : null}
          </div>

          <div className="mb-3">
            <label htmlFor="contestId" className="form-label">
              Cuộc Thi
            </label>
            <select
              id="contestId"
              name="contestId"
              className={`form-select ${
                formik.touched.contestId && formik.errors.contestId
                  ? "is-invalid"
                  : ""
              }`}
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
            {formik.touched.contestId && formik.errors.contestId ? (
              <div className="invalid-feedback">{formik.errors.contestId}</div>
            ) : null}
          </div>

          <div className="mb-3">
            <label htmlFor="awardQuantity" className="form-label">
              Số Lượng Giải Thưởng
            </label>
            <input
              id="awardQuantity"
              name="awardQuantity"
              type="number"
              className={`form-control ${
                formik.touched.awardQuantity && formik.errors.awardQuantity
                  ? "is-invalid"
                  : ""
              }`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.awardQuantity}
            />
            {formik.touched.awardQuantity && formik.errors.awardQuantity ? (
              <div className="invalid-feedback">{formik.errors.awardQuantity}</div>
            ) : null}
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Cập Nhật Giải Thưởng
          </button>
        </form>
      )}
    </div>
  );
};

export default EditAwardForm;
