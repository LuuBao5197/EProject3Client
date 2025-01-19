import React, { useEffect, useState } from "react";
//import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Icon } from "@chakra-ui/react";
import { MdAddBox } from "react-icons/md";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
const AddContest = () => {
    const token = localStorage.getItem('token');
    console.log("token", token);
    const userId = jwtDecode(token).Id;
    useEffect(() => {
        const fetchInfoOfStaff = async (userId) => {
            var result = await axios.get(`http://localhost:5190/api/Staff/GetInfoStaff/${userId}`);
            console.log(result);
            formik.setValues({
                name: "",
                description: "",
                startDate: "",
                endDate: "",
                submissionDeadline: "",
                organizedBy: Number(result.data.id),
                file: null,
            })
            if(result.data.isReviewer) {
                toast.dark("Ban ko co quyen han vao trang nay");
                navigate('/staff');
            }
        }
        fetchInfoOfStaff(userId);
    }, [token])

    console.log("userId", userId);
    const formik = useFormik({
        initialValues: {
            name: "",
            description: "",
            startDate: "",
            endDate: "",
            submissionDeadline: "",
            organizedBy: "",
            file: null,
        },
        validationSchema: Yup.object({
            name: Yup.string().required("Name is required"),
            description: Yup.string()
                .min(10, "Description must be at least 10 characters")
                .required("Description is required"),
            startDate: Yup.date()
                .required("Start date is required")
                .test(
                    "is-after-today",
                    "Start date must be after today",
                    function (value) {
                        const today = new Date();
                        // Xóa giờ, phút, giây của hôm nay để so sánh chỉ ngày
                        today.setHours(0, 0, 0, 0);
                        return value && value > today;
                    }
                ),
            endDate: Yup.date()
                .required("End date is required")
                .test(
                    "is-after-startDate",
                    "End date must be after start date",
                    function (value) {
                        const { startDate } = this.parent;
                        return value && startDate && value > startDate;
                    }
                ),
            submissionDeadline: Yup.date()
                .required("Submission deadline is required")
                .test(
                    "is-after-today",
                    "Submission deadline must be after today",
                    function (value) {
                        const today = new Date();
                        today.setHours(0, 0, 0, 0);
                        return value && value > today;
                    }
                )
                .test(
                    "is-before-startDate",
                    "Submission deadline must be after start date and before end date",
                    function (value) {
                        const { startDate, endDate } = this.parent;
                        return value && startDate && value > startDate && value < endDate;
                    }
                ),
            organizedBy: Yup.number().required("Organizer ID is required"),
            file: Yup.mixed().nullable()
                .test(
                    "fileType",
                    "Only images are allowed",
                    (value) => !value || ["image/jpeg", "image/png"].includes(value?.type)
                )
                .test(
                    "fileSize",
                    "File size is too large",
                    (value) => !value || value.size <= 2 * 1024 * 1024 // 2MB
                ),
        }),

        onSubmit: async (values, { resetForm }) => {
            try {
                const formData = new FormData();
                Object.keys(values).forEach((key) => {
                    if (key === "file") {
                        formData.append(key, values[key]);
                    } else {
                        formData.append(key, values[key]);
                    }
                })
                const result = await axios.post("http://localhost:5190/api/Staff/AddContest", formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
                // console.log("result add: ",result);
                toast.success("Contest added successfully!");
                resetForm();
                navigate(`/staff/contests`);
            } catch (error) {
                console.error("Error adding contest:", error);
                toast.error(`Failed to add contest: ${error.response?.data?.message || error.message}`);
                // alert(`Failed to add contest: ${error.response?.data?.message || error.message}`);
            }
        },
    });
    const navigate = useNavigate();
    const modules = {
        toolbar: [
            [{ header: [1, 2, 3, false] }], // Tiêu đề
            ["bold", "italic", "underline", "strike"], // In đậm, nghiêng, gạch chân, gạch ngang
            [{ list: "ordered" }, { list: "bullet" }], // Danh sách có thứ tự/không thứ tự
            [{ indent: "-1" }, { indent: "+1" }], // Thụt lề
            [{ align: [] }], // Căn chỉnh
            ["link", "image"], // Thêm liên kết, hình ảnh
            ["clean"], // Xóa định dạng
        ],
    };
    
   
    return (
        <div className="container pt-3">
            <form onSubmit={formik.handleSubmit} className="needs-validation" noValidate>
                <div className="mb-1">
                    <label className="form-label">Name</label>
                    <input
                        type="text"
                        name="name"
                        className="form-control"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}

                    />
                    {formik.touched.name && formik.errors.name && (
                        <div className="text-danger">{formik.errors.name}</div>
                    )}
                </div>
                <div className="mb-1">
                    <label className="form-label">Description</label>
                    <ReactQuill theme="snow" value={formik.values.description}
                        className="bg-light text-black"
                        style={{
                            height: "200px", // Set height
                            width: "100%", // Set width
                        }}
                        modules={modules}
                        onChange={(value) => formik.setFieldValue("description", value)} // Cập nhật giá trị cho Formik
                        onBlur={() => {
                            if (formik.values.description === "<p><br></p>") {
                                formik.setFieldValue("description", ""); // Chuyển về chuỗi trống
                                formik.setFieldError("description", "Description is required!"); // Set lỗi nếu cần
                            }
                        }} />
                    {formik.touched.description && formik.errors.description && (
                        <div className="text-danger">{formik.errors.description}</div>
                    )}
                </div>
                <div className="mb-1">
                    <label className="form-label">Start Date</label>
                    <input
                        type="datetime-local"
                        name="startDate"
                        className="form-control"
                        value={formik.values.startDate}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}

                    />
                    {formik.touched.startDate && formik.errors.startDate && (
                        <div className="text-danger">{formik.errors.startDate}</div>
                    )}
                </div>
                <div className="mb-1">
                    <label className="form-label">End Date</label>
                    <input
                        type="datetime-local"
                        name="endDate"
                        className="form-control"
                        value={formik.values.endDate}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}

                    />
                    {formik.touched.endDate && formik.errors.endDate && (
                        <div className="text-danger">{formik.errors.endDate}</div>
                    )}
                </div>
                <div className="mb-1">
                    <label className="form-label">Submission Deadline</label>
                    <input
                        type="datetime-local"
                        name="submissionDeadline"
                        className="form-control"
                        value={formik.values.submissionDeadline}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}

                    />
                    {formik.touched.submissionDeadline && formik.errors.submissionDeadline && (
                        <div className="text-danger">{formik.errors.submissionDeadline}</div>
                    )}
                </div>

                <div className="mb-1">
                    <label className="form-label">Organized By (Staff ID)</label>
                    <input
                        type="number"
                        name="organizedBy"
                        className="form-control"
                        value={formik.values.organizedBy}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        readOnly
                    />
                    {formik.touched.organizedBy && formik.errors.organizedBy && (
                        <div className="text-danger">{formik.errors.organizedBy}</div>
                    )}
                </div>
                <div className="mb-1">
                    <label className="form-label">Upload File</label>
                    <input
                        type="file"
                        name="file"
                        className="form-control"
                        onChange={(event) => {
                            const file = event.target.files[0];
                            formik.setFieldValue("file", file); // Cập nhật giá trị cho file
                        }}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.file && formik.errors.file && (
                        <div className="text-danger">{formik.errors.file}</div>
                    )}
                </div>
                <button type="submit" className="btn btn-primary w-100">
                    <Icon as={MdAddBox} width="20px" height="20px" color="inherit" />
                </button>
            </form>
        </div>
    );
};

export default AddContest;
