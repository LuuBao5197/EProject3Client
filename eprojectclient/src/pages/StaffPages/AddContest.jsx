import React from "react";
//import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Icon } from "@chakra-ui/react";
import { MdAddBox } from "react-icons/md";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const AddContest = () => {
    const formik = useFormik({
        initialValues: {
            name: "",
            description: "",
            startDate: "",
            endDate: "",
            submissionDeadline: "",
            participationCriteria: "",
            organizedBy: 5,
            isActive: false,
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
            participationCriteria: Yup.string().required("Participation criteria is required"),
            organizedBy: Yup.number().required("Organizer ID is required"),
        }),
        
        onSubmit: async (values, { resetForm }) => {
            try {
                await axios.post("http://localhost:5190/api/Staff/AddContest", {
                    ...values,
                    startDate: new Date(values.startDate),
                    endDate: new Date(values.endDate),
                    submissionDeadline: new Date(values.submissionDeadline),
                    createdAt: new Date(),
                    updatedAt: new Date(),
                });
                alert("Contest added successfully!");
                resetForm();
            } catch (error) {
                console.error("Error adding contest:", error);
                alert(`Failed to add contest: ${error.response?.data?.message || error.message}`);
            }
        },
    });

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
                    <label className="form-label">Participation Criteria</label>
                    <textarea
                        name="participationCriteria"
                        className="form-control"
                        value={formik.values.participationCriteria}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}

                    ></textarea>
                    {formik.touched.participationCriteria && formik.errors.participationCriteria && (
                        <div className="text-danger">{formik.errors.participationCriteria}</div>
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
                <div className="form-check mb-1">
                    <input
                        type="checkbox"
                        name="isActive"
                        className="form-check-input"
                        id="isActive"
                        checked={formik.values.isActive}
                        onChange={formik.handleChange}
                    />
                    <label className="form-check-label" htmlFor="isActive">
                        Is Active
                    </label>
                </div>
                <button type="submit" className="btn btn-primary w-100">
                    <Icon as={MdAddBox} width="20px" height="20px" color="inherit" />
                </button>
            </form>
        </div>
    );
};

export default AddContest;
