import React from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddExhibition = () => {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm();

    const onSubmit = async (data) => {
        const formData = new FormData();

        // Append form data fields
        formData.append("name", data.name);
        formData.append("startDate", data.startDate);
        formData.append("endDate", data.endDate);
        formData.append("location", data.location);
        formData.append("organizedBy", data.organizedBy);

        // Append file to FormData
        if (data.image[0]) {
            formData.append("image", data.image[0]);
        }

        try {
            await axios.post("http://localhost:5190/api/Staff/AddExhibition", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            toast.success("Exhibition added successfully!");
            navigate(-1);
        } catch (error) {
            toast.error("Exhibition addition failed!");
        }
    };

    const startDate = watch("startDate");
    const endDate = watch("endDate");

    return (
        <div className="container mt-4">
            <ToastContainer />
            <h2>Add New Exhibition</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="mt-3">
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                        Exhibition Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        className={`form-control ${errors.name ? "is-invalid" : ""}`}
                        {...register("name", { required: "Name is required" })}
                    />
                    {errors.name && <div className="invalid-feedback">{errors.name.message}</div>}
                </div>

                <div className="mb-3">
                    <label htmlFor="startDate" className="form-label">
                        Start Date
                    </label>
                    <input
                        type="datetime-local"
                        id="startDate"
                        className={`form-control ${errors.startDate ? "is-invalid" : ""}`}
                        {...register("startDate", {
                            required: "Start date is required",
                            validate: {
                                futureDate: (value) =>
                                    new Date(value) > new Date() || "Start date must be in the future",
                                beforeEndDate: (value) =>
                                    !endDate || new Date(value) < new Date(endDate) || "Start date must be before end date",
                            },
                        })}
                    />
                    {errors.startDate && <div className="invalid-feedback">{errors.startDate.message}</div>}
                </div>

                <div className="mb-3">
                    <label htmlFor="endDate" className="form-label">
                        End Date
                    </label>
                    <input
                        type="datetime-local"
                        id="endDate"
                        className={`form-control ${errors.endDate ? "is-invalid" : ""}`}
                        {...register("endDate", {
                            required: "End date is required",
                            validate: {
                                afterStartDate: (value) =>
                                    !startDate || new Date(value) > new Date(startDate) || "End date must be after start date",
                            },
                        })}
                    />
                    {errors.endDate && <div className="invalid-feedback">{errors.endDate.message}</div>}
                </div>

                <div className="mb-3">
                    <label htmlFor="location" className="form-label">
                        Location
                    </label>
                    <input
                        type="text"
                        id="location"
                        className={`form-control ${errors.location ? "is-invalid" : ""}`}
                        {...register("location", { required: "Location is required" })}
                    />
                    {errors.location && <div className="invalid-feedback">{errors.location.message}</div>}
                </div>

                <div className="mb-3">
                    <label htmlFor="organizedBy" className="form-label">
                        Organizer ID
                    </label>
                    <input
                        type="number"
                        id="organizedBy"
                        className={`form-control ${errors.organizedBy ? "is-invalid" : ""}`}
                        {...register("organizedBy", { required: "Organizer ID is required" })}
                    />
                    {errors.organizedBy && <div className="invalid-feedback">{errors.organizedBy.message}</div>}
                </div>

                <div className="mb-3">
                    <label htmlFor="image" className="form-label">
                        Exhibition Image
                    </label>
                    <input
                        type="file"
                        id="image"
                        className={`form-control ${errors.image ? "is-invalid" : ""}`}
                        {...register("image", {
                            // required: "Image is required",
                            validate: {
                                isImage: (value) => {
                                    if (!value.length) return true; // Cho phép giá trị null
                                    const file = value[0];
                                    const validImageTypes = ["image/jpeg", "image/png", "image/gif"];
                                    return file && validImageTypes.includes(file.type) || "File must be an image (jpg, png, gif)";
                                },
                            },
                        })}
                    />
                    {errors.image && <div className="invalid-feedback">{errors.image.message}</div>}
                </div>

                <button type="submit" className="btn btn-primary">
                    Add Exhibition
                </button>
            </form>
        </div>
    );
};

export default AddExhibition;
