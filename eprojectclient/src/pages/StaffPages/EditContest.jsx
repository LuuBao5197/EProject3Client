import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useParams } from "react-router-dom";
const EditContest = () => {
    const {id} = useParams();
    const [contestEdit, setContestEdit] = useState({});
    const formik = useFormik({
        initialValues: {
            id: id,
            name: contestEdit.name,
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
            participationCriteria: Yup.string().required("Participation criteria is required"),
            organizedBy: Yup.number().required("Organizer ID is required"),
        }),
        onSubmit: async (values, { resetForm }) => {
            try {
                await axios.put(`http://localhost:5190/api/Staff/EditContest/${id}`, {
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
    useEffect(() => {
        const fetchContest = async () => {
            try {
                const result = await axios.get(`http://localhost:5190/api/Staff/GetDetailContest/${id}`);
                setContestEdit(result.data);
            } catch (error) {
                console.error("Error fetching contest details:", error);
            }
        };
        fetchContest();
    }, [id]);
    
    
    useEffect(() => {
        formik.setValues(
            {
                id: id,
                name: contestEdit.name || "",
                description: contestEdit.description || "",
                startDate: contestEdit.startDate || "",
                endDate: contestEdit.endDate || "",
                submissionDeadline: contestEdit.submissionDeadline || "",
                participationCriteria: contestEdit.participationCriteria || "",
                organizedBy: contestEdit.organizedBy || 5,
                isActive: contestEdit.isActive || false,

            });
    }, [contestEdit]);


    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Add New Contest</h2>
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
                    <textarea
                        name="description"
                        className="form-control text-center"
                        value={formik.values.description || ""}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}

                    ></textarea>
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
                    <input
                        type="datetime-local"
                        name="endDate"
                        className="form-control text-center"
                        value={formik.values.endDate || ""}
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
                    <label className="form-label">Participation Criteria</label>
                    <textarea
                        name="participationCriteria"
                        className="form-control text-center"
                        value={formik.values.participationCriteria || ""}
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
                <div className="form-check mb-1">
                    <input
                        type="checkbox"
                        name="isActive"
                        className="form-check-input text-center"
                        id="isActive"
                        checked={formik.values.isActive || false}
                        onChange={formik.handleChange}
                    />
                    <label className="form-check-label" htmlFor="isActive">
                        Is Active
                    </label>
                </div>
                <button type="submit" className="btn btn-primary w-100">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default EditContest;
