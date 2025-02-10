import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { jwtDecode } from "jwt-decode";

const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    startDate: Yup.date().required("Start date is required"),
    endDate: Yup.date()
        .required("End date is required")
        .min(Yup.ref("startDate"), "End date must be after start date"),
    location: Yup.string().required("Location is required"),
    organizedBy: Yup.string().required("Organizer ID is required"),
    description: Yup.string()
        .test("notEmpty", "Description is required", (value) => {
            return value && value.replace(/<(.|\n)*?>/g, "").trim() !== "";
        }),
    image: Yup.mixed()
        .test("fileType", "Only JPG, PNG, or GIF files are allowed", (value) => {
            if (!value) return true;
            const file = value instanceof FileList ? value[0] : value;
            return file && ["image/jpeg", "image/png", "image/gif"].includes(file.type);
        }),
});

const AddExhibition = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const userId = jwtDecode(token).Id;

    const formik = useFormik({
        initialValues: {
            name: "",
            startDate: "",
            endDate: "",
            location: "",
            organizedBy: "",
            description: "",
            image: null,
        },
        validationSchema,
        onSubmit: async (values) => {
            const formData = new FormData();
            formData.append("name", values.name);
            formData.append("startDate", values.startDate);
            formData.append("endDate", values.endDate);
            formData.append("location", values.location);
            formData.append("organizedBy", values.organizedBy);
            formData.append("description", values.description);
            if (values.image) {
                formData.append("image", values.image);
            }

            try {
                await axios.post("http://localhost:5190/api/Staff/AddExhibition", formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
                toast.success("Exhibition added successfully!");
                navigate(-1);
            } catch (error) {
                
                toast.error(`Exhibition addition failed! Because ${error.response.data.message}`);
            }
        },
    });

    useEffect(() => {


        const fetchInfoOfStaff = async (userId) => {
            var result = await axios.get(`http://localhost:5190/api/Staff/GetInfoStaff/${userId}`);
            console.log(result);
            if (!result.data.isReviewer) {
                // setTimeout(()=>  navigate('/staff'), 2000) 
                toast.dark("You do not have permission to access this page");
                navigate(-1);
            }
            formik.setValues({
                name: "",
                startDate: "",
                endDate: "",
                location: "",
                organizedBy: Number(result.data.id)||"",
                description: "",
                image: null,

            })

        }
        fetchInfoOfStaff(userId);
    }, [token]);
    return (
        <div className="container mt-4">
            <ToastContainer />
            <h2>Add New Exhibition</h2>
            <form onSubmit={formik.handleSubmit} className="mt-3">
                {/* Exhibition Name */}
                <div className="mb-3">
                    <label className="form-label">Exhibition Name</label>
                    <input
                        type="text"
                        className={`form-control ${formik.touched.name && formik.errors.name ? "is-invalid" : ""}`}
                        {...formik.getFieldProps("name")}
                    />
                    {formik.touched.name && formik.errors.name && <div className="invalid-feedback">{formik.errors.name}</div>}
                </div>

                {/* Description */}
                <div className="mb-3">
                    <label className="form-label">Description</label>
                    <ReactQuill
                        theme="snow"
                        value={formik.values.description}
                        onChange={(value) => formik.setFieldValue("description", value)}
                        onBlur={() => formik.setFieldTouched("description", true)}
                        className="bg-light text-black"
                        style={{ height: "200px", width: "100%" }}
                    />
                    {formik.touched.description && formik.errors.description && (
                        <div className="text-danger">{formik.errors.description}</div>
                    )}
                </div>

                {/* Start Date */}
                <div className="mb-3">
                    <label className="form-label">Start Date</label>
                    <input
                        type="datetime-local"
                        className={`form-control ${formik.touched.startDate && formik.errors.startDate ? "is-invalid" : ""}`}
                        {...formik.getFieldProps("startDate")}
                    />
                    {formik.touched.startDate && formik.errors.startDate && (
                        <div className="invalid-feedback">{formik.errors.startDate}</div>
                    )}
                </div>

                {/* End Date */}
                <div className="mb-3">
                    <label className="form-label">End Date</label>
                    <input
                        type="datetime-local"
                        className={`form-control ${formik.touched.endDate && formik.errors.endDate ? "is-invalid" : ""}`}
                        {...formik.getFieldProps("endDate")}
                    />
                    {formik.touched.endDate && formik.errors.endDate && (
                        <div className="invalid-feedback">{formik.errors.endDate}</div>
                    )}
                </div>

                {/* Location */}
                <div className="mb-3">
                    <label className="form-label">Location</label>
                    <input
                        type="text"
                        className={`form-control ${formik.touched.location && formik.errors.location ? "is-invalid" : ""}`}
                        {...formik.getFieldProps("location")}
                    />
                    {formik.touched.location && formik.errors.location && (
                        <div className="invalid-feedback">{formik.errors.location}</div>
                    )}
                </div>

                {/* Organizer ID */}
                {/* <div className="mb-3">
                    <label className="form-label">Organizer ID</label>
                    <input
                        type="number"
                        className={`form-control ${formik.touched.organizedBy && formik.errors.organizedBy ? "is-invalid" : ""}`}
                        {...formik.getFieldProps("organizedBy")}
                    />
                    {formik.touched.organizedBy && formik.errors.organizedBy && (
                        <div className="invalid-feedback">{formik.errors.organizedBy}</div>
                    )}
                </div> */}

                {/* Image Upload */}
                <div className="mb-3">
                    <label className="form-label">Exhibition Image</label>
                    <input
                        type="file"
                        className={`form-control ${formik.touched.image && formik.errors.image ? "is-invalid" : ""}`}
                        onChange={(event) => formik.setFieldValue("image", event.currentTarget.files[0])}
                    />
                    {formik.touched.image && formik.errors.image && (
                        <div className="invalid-feedback">{formik.errors.image}</div>
                    )}
                </div>

                <button type="submit" className="btn btn-primary">Add Exhibition</button>
            </form>
        </div>
    );
};

export default AddExhibition;
