import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Image } from "@chakra-ui/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { jwtDecode } from "jwt-decode";

const EditExhibition = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem('token');
    const userId = jwtDecode(token).Id;
    const formik = useFormik({
        initialValues: {
            id: "",
            name: "",
            startDate: "",
            endDate: "",
            location: "",
            organizedBy: "",
            description: "",
            thumbnail: "",
            status: "",
            phase: "",
            image: null,
        },
        validationSchema: Yup.object({
            name: Yup.string().required("Name is required"),
            startDate: Yup.date().required("Start date is required"),
            endDate: Yup.date()
                .required("End date is required")
                .min(Yup.ref("startDate"), "End date must be after start date"),
            location: Yup.string().required("Location is required"),
            organizedBy: Yup.number().required("Organizer ID is required"),
            description: Yup.string().required("Description is required"),
            image: Yup.mixed().nullable().test("fileType", "Only JPG/PNG/GIF files are allowed", (value) => {
                if (!value) return true;
                return ["image/jpeg", "image/png", "image/gif"].includes(value.type);
            }),
        }),
        onSubmit: (values) => {
            const formData = new FormData();
            Object.keys(values).forEach((key) => {
                if (key === "image" && values.image) {
                    formData.append("image", values.image);
                } else {
                    formData.append(key, values[key]);
                }
            });

            axios
                .put(`http://localhost:5190/api/Staff/EditExhibition/${id}`, formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                })
                .then(() => {
                    toast.success("Exhibition updated successfully!");
                    setTimeout(() => navigate("/staff/exhibition"), 2000);
                })
                .catch((error) => {
                    console.error(error);
                    toast.error("Failed to update exhibition.");
                });
        },
    });

    useEffect(() => {
        axios
            .get(`http://localhost:5190/api/Staff/GetDetailExhibition/${id}`)
            .then((response) => {
                console.log(response.data);
                formik.setValues(
                    {
                        id: id,
                        name: response.data.name,
                        startDate: response.data.startDate || "",
                        endDate: response.data.endDate || "",
                        location: response.data.location || "",
                        organizedBy: response.data.organizedBy || "",
                        description: response.data.description || "",
                        thumbnail: response.data.thumbnail || "",
                        status: response.data.status,
                        phase: response.data.phase,
                        image: null,
                    }
                );
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
                toast.error("Failed to fetch exhibition data.");
                setLoading(false);
            });
        const fetchInfoOfStaff = async (userId) => {
            var result = await axios.get(`http://localhost:5190/api/Staff/GetInfoStaff/${userId}`);
            console.log(result);
            if (!result.data.isReviewer) {
                // setTimeout(()=>  navigate('/staff'), 2000) 
                toast.dark("You do not have permission to access this page");
                navigate(-1);
            }
            // formik.setValues({

            //     organizedBy: Number(result.data.id),

            // })

        }
        fetchInfoOfStaff(userId);
    }, [id, token]);

    if (loading) return <div>Loading...</div>;

    return (
        <div className="container mt-4">
            <ToastContainer />
            <h2>Edit Exhibition</h2>
            <form onSubmit={formik.handleSubmit} className="mt-3">
                <div className="mb-3">
                    <label className="form-label">Exhibition Name</label>
                    <input type="text" className="form-control" {...formik.getFieldProps("name")} />
                    {formik.touched.name && formik.errors.name && <div className="text-danger">{formik.errors.name}</div>}
                </div>

                <div className="mb-3">
                    <label className="form-label">Description</label>
                    <ReactQuill value={formik.values.description}
                        style={{ height: "200px", width: "100%" }}
                        onChange={(value) => formik.setFieldValue("description", value)} />
                    {formik.touched.description && formik.errors.description && <div className="text-danger">{formik.errors.description}</div>}
                </div>

                <div className="mb-3">
                    <label className="form-label">Start Date</label>
                    <input type="datetime-local" className="form-control" {...formik.getFieldProps("startDate")} />
                    {formik.touched.startDate && formik.errors.startDate && <div className="text-danger">{formik.errors.startDate}</div>}
                </div>

                <div className="mb-3">
                    <label className="form-label">End Date</label>
                    <input type="datetime-local" className="form-control" {...formik.getFieldProps("endDate")} />
                    {formik.touched.endDate && formik.errors.endDate && <div className="text-danger">{formik.errors.endDate}</div>}
                </div>

                <div className="mb-3">
                    <label className="form-label">Location</label>
                    <input type="text" className="form-control" {...formik.getFieldProps("location")} />
                    {formik.touched.location && formik.errors.location && <div className="text-danger">{formik.errors.location}</div>}
                </div>

                <div className="mb-3">
                    <label className="form-label">Exhibition Image</label>
                    <Image src={formik.values.thumbnail} boxSize="150px" borderRadius="full" fit="cover" alt="Exhibition" />
                    <input type="file" className="form-control" onChange={(event) => formik.setFieldValue("image", event.currentTarget.files[0])} />
                    {formik.touched.image && formik.errors.image && <div className="text-danger">{formik.errors.image}</div>}
                </div>

                <button type="submit" className="btn btn-primary">Update Exhibition</button>
            </form>
        </div>
    );
};

export default EditExhibition;
