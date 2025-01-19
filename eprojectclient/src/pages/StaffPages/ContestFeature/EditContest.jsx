import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Image, Input } from "@chakra-ui/react";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
const EditContest = () => {
    // const navigate = useNavigate();
    const { id } = useParams();
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const userId = jwtDecode(token).Id;
    const formik = useFormik({
        initialValues: {
            id: id,
            name: "",
            description: "",
            startDate: "",
            endDate: "",
            submissionDeadline: "",
            organizedBy: 5,
            thumbnail: "",
            createdAt: "",
            updateAt: "",
            status: "",
            phase: "",
            file: null,
        },
        validationSchema: Yup.object({
            name: Yup.string().required("Name is required"),
            description: Yup.string().min(10, "Description must be at least 10 characters").required("Description is required"),
            startDate: Yup.date().required("Start date is required"),
            endDate: Yup.date().required("End date is required").test(
                "is-after-startDate",
                "End date must be after start date",
                function (value) {
                    const { startDate } = this.parent;
                    return value && startDate && value > startDate;
                }
            ),

            submissionDeadline: Yup.date().required("Submission deadline is required")
                .test(
                    "is-before-startDate",
                    "Submission deadline must be after start date and before end date",
                    function (value) {
                        const { startDate } = this.parent;
                        const { endDate } = this.parent;
                        return value && startDate && value > startDate && value < endDate
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
            // console.log("Form submitted!", values);
            try {
                const formData = new FormData();
                Object.keys(values).forEach((key) => {
                    if (key === "file" && values[key]) {
                        // Chỉ thêm file nếu người dùng chọn
                        formData.append(key, values[key]);
                    } else {
                        // Bỏ qua "thumbnail" nếu không cần thay đổi
                        formData.append(key, values[key]);
                    }
                });
                console.log("FormData content:");
                for (let pair of formData.entries()) {
                    console.log(pair[0], pair[1]);
                }

                var response = await axios.put(`http://localhost:5190/api/Staff/EditContest/${id}`, formData);

                alert("Contest edit successfully!");
                navigate('/staff/contests');
            } catch (error) {

                console.error("Error adding contest:", error);
                alert(`Failed to add contest: ${error.response?.data?.message || error.message}`);
            }
        },
    });
    useEffect(() => {
        const fetchContest = async () => {
            try {
                const result = await axios.get(`http://localhost:5190/api/Staff/GetDetailContest/${id}`);
                formik.setValues(
                    {
                        id: id,
                        name: result.data.name || "",
                        description: result.data.description || "",
                        startDate: result.data.startDate || "",
                        endDate: result.data.endDate || "",
                        submissionDeadline: result.data.submissionDeadline || "",
                        organizedBy: result.data.organizedBy || 5,
                        thumbnail: result.data.thumbnail || "",
                        createdAt: result.data.createdAt || "",
                        updateAt: result.data.UpdateAt || "",
                        status: result.data.status || "",
                        phase: result.data.phase || "",
                        file: null,

                    });

            } catch (error) {
                console.error("Error fetching contest details:", error);
            }
        };
        fetchContest();
        const fetchInfoOfStaff = async (userId) => {
            var result = await axios.get(`http://localhost:5190/api/Staff/GetInfoStaff/${userId}`);
            console.log(result);
            if (result.data.isReviewer) {
                toast.dark("Ban ko co quyen han vao trang nay");
                navigate('/staff');
            }
            formik.setValues({

                organizedBy: Number(result.data.id),

            })

        }
        fetchInfoOfStaff(userId);
    }, [id, token]);


    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Update Contest</h2>
            <form onSubmit={formik.handleSubmit} className="needs-validation" noValidate>
                <div className="mb-1">
                    <label className="form-label">ID</label>
                    <input
                        type="text"
                        name="id"
                        className="form-control text-center"
                        value={formik.values.id || ""}
                        readOnly
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />

                </div>
                <div className="mb-1">
                    <label className="form-label">Name</label>
                    <input
                        type="text"
                        name="name"
                        className="form-control text-center"
                        value={formik.values.name || ""}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}

                    />
                    {formik.touched.name && formik.errors.name && (
                        <div className="text-danger">{formik.errors.name}</div>
                    )}
                </div>
                <div className="mb-1">
                    <label className="form-label">Description</label>
                    <ReactQuill
                        theme="snow"
                        style={{
                            height: "200px", // Set height
                            width: "100%", // Set width
                        }}
                        value={formik.values.description || ""}
                        onChange={(value) => formik.setFieldValue("description", value)}
                        onBlur={() => {
                            formik.setFieldTouched("description", true); // Đánh dấu là đã blur
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
                        className="form-control text-center"
                        value={formik.values.startDate || ""}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}

                    />
                    {formik.touched.startDate && formik.errors.startDate && (
                        <div className="text-danger">{formik.errors.startDate}</div>
                    )}
                </div>
                <div className="mb-1">
                    <label className="form-label">End Date</label>
                    <Input
                        focusBorderColor='pink.400'
                        placeholder='Select Date and Time' size='md'
                        name="endDate"
                        className="text-center"
                        type='datetime-local'
                        value={formik.values.endDate || ""}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur} />
                    {/* <input
                            type="datetime-local"
                            name="endDate"
                            className="form-control text-center"
                            value={formik.values.endDate || ""}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}

                        /> */}
                    {formik.touched.endDate && formik.errors.endDate && (
                        <div className="text-danger">{formik.errors.endDate}</div>
                    )}
                </div>
                <div className="mb-1">
                    <label className="form-label">Submission Deadline</label>
                    <input
                        type="datetime-local"
                        name="submissionDeadline"
                        className="form-control text-center"
                        value={formik.values.submissionDeadline || ""}
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
                        className="form-control text-center"
                        value={formik.values.organizedBy || ""}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        readOnly
                    />
                    {formik.touched.organizedBy && formik.errors.organizedBy && (
                        <div className="text-danger">{formik.errors.organizedBy}</div>
                    )}
                </div>
                <div className="mb-1">
                    <label className="form-label">Thumbnaill </label>
                    <Image src={formik.values.thumbnail}
                        boxSize="150px"
                        borderRadius="full"
                        fit="cover"
                        alt={formik.values.thumbnail} />
                    <div className="mb-1">
                        <label className="form-label">Change Thumbnail</label>
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


                </div>
                <button type="submit" className="btn btn-primary w-100">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default EditContest;
