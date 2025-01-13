import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Image } from "@chakra-ui/react";

const EditExhibition = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
        watch,
    } = useForm();

    const startDate = watch("startDate");
    const endDate = watch("endDate");

    useEffect(() => {
        const fetchExhibition = () => {
            axios
                .get(`http://localhost:5190/api/Staff/GetDetailExhibition/${id}`)
                .then((response) => {
                    const data = response.data;
                    const formatDate = (dateString) => {
                        const date = new Date(dateString);
                        
                        return date.toISOString().split("T")[0];
                    };
                    setValue("id", id);
                    setValue("name", data.name);
                    setValue("startDate", data.startDate);
                    setValue("endDate", data.endDate);
                    setValue("location", data.location);
                    setValue("organizedBy", data.organizedBy);
                    setValue("thumbnail", data.thumbnail);
                    setValue("status", data.status);
                    setValue("phase", data.phase);
                    setLoading(false);
                })
                .catch((error) => {
                    console.error(error);
                    toast.error("Failed to fetch exhibition data.");
                    setLoading(false);
                });
        };
        fetchExhibition();
    }, [id, setValue]);

    const onSubmit = (data) => {
        const formData = new FormData();
        formData.append("id", id);
        formData.append("name", data.name);
        formData.append("startDate", data.startDate);
        formData.append("endDate", data.endDate);
        formData.append("location", data.location);
        formData.append("organizedBy", data.organizedBy);
        formData.append("thumbnail", data.thumbnail);
        formData.append("status", data.status);
        formData.append("phase", data.phase);


        if (data.image && data.image[0]) {
            formData.append("image", data.image[0]);
        }

        axios
            .put(`http://localhost:5190/api/Staff/EditExhibition/${id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then(() => {
                toast.success("Exhibition updated successfully!");
                setTimeout(() => navigate("/staff/exhibition"), 2000);
            })
            .catch((error) => {
                console.error(error);
                toast.error("Failed to update exhibition.");
            });
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="container mt-4">
            <ToastContainer />
            <h2>Edit Exhibition</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="mt-3">
                <input type="hidden" id="id" {...register("id")} />
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
                    <label htmlFor="file" className="form-label">
                        Exhibition Image (Optional)
                    </label>
                       <Image src={watch("thumbnail")}
                        boxSize="150px"
                        borderRadius="full"
                        fit="cover"
                        alt="" />
                    <input
                        type="file"
                        id="image"
                        className={`form-control ${errors.file ? "is-invalid" : ""}`}
                        {...register("image", {
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
                    Update Exhibition
                </button>
            </form>
        </div>
    );
};

export default EditExhibition;
