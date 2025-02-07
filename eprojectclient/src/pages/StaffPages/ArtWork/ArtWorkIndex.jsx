import React, { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import { Button, Modal, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";

const schema = yup.object().shape({
    price: yup.number().required("Price is required").positive("Price must be positive").max(1000, "Price must be less than 1000 $"),
    status: yup.string().matches(/^(Available|Sold)$/, "Invalid status").required("Status is required"),
    sellingPrice: yup.number().nullable().positive("Selling price must be positive"),
    paymentStatus: yup.string().matches(/^(Unpaid|Paid)$/, "Invalid payment status").required("Payment status is required"),
    exhibitionDate: yup.date().required("Exhibition date is required"),
});
const ArtworkIndex = () => {
    const [awards, setAwards] = useState([]);
    const [artwork, setArtwork] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedArtwork, setSelectedArtwork] = useState(null);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get("http://localhost:5190/api/Staff/GetSubmissionOfStudentAwards")
            .then((response) => setAwards(response.data))
            .catch((error) => console.error("Error fetching awards:", error));

        const fetchArtWorks = async () => {
            try {
                const response = await axios.get("http://localhost:5190/api/Staff/GetAllArtWork");
                setArtwork(response.data);
            } catch (error) {
                console.error("Error fetching artworks:", error);
            }
        };
        fetchArtWorks();
    }, []);

    const handleCreateArtWork = (awards) => {
        const postArtWorks = async (data) => {
            try {
                await axios.post("http://localhost:5190/api/Staff/CreateManyArtWork", data);
                toast.info("Create Art Work successfully");
            } catch (error) {
                console.error(error);
                toast.error(`${error.response?.data || "An error occurred"}`);
            }
        };

        const data = awards.map(award => ({ submissionId: award.submissionId }));
        postArtWorks(data);
    };

    const handleEditArtWork = (artwork) => {
        setSelectedArtwork(artwork);
        formik.setValues({
            id: artwork.id,
            price: artwork.price,
            status: artwork.status,
            sellingPrice: artwork.sellingPrice||null,
            paymentStatus: artwork.paymentStatus,
            exhibitionDate: artwork.exhibitionDate.split("T")[0],
            submissionId: artwork.submissionId,
        });
        setShowModal(true);
    };

    const formik = useFormik({
        initialValues: {
            id: "",
            price: "",
            status: "Available",
            sellingPrice: "",
            paymentStatus: "Unpaid",
            exhibitionDate: "",
            submissionId: "",

        },
        validationSchema: schema,
        onSubmit: async (values) => {
            try {
                console.log(values);
                await axios.patch(`http://localhost:5190/api/Staff/EditArtwork/${selectedArtwork.id}`, values);
                toast.success("Artwork updated successfully");
                setShowModal(false);
                // navigate(0);
                setArtwork(prev => prev.map(a => a.id === selectedArtwork.id ? { ...a, ...values } : a));
            } catch (error) {
                console.log(error);
                toast.error("Error updating artwork");
            }
        },
    });
    const awardColumns = [
        {
            name: "Contest Name",
            selector: row => row.contestName,
            sortable: true,
        },
        {
            name: "Awards",
            cell: row => (
                <div>
                    {row.awards.map(award => (
                        <div key={award.awardId}>
                            {award.studentName} - {award.awardName} - Submission ID: {award.submissionId}
                        </div>
                    ))}
                </div>
            ),
        },
        {
            name: "Action",
            selector: row => (
                <Button variant="primary" size="sm" onClick={() => handleCreateArtWork(row.awards)}>Create Artwork</Button>
            ),

        },
    ];

    const artworkColumns = [
        { name: "Submission ID", selector: row => row.submissionId, sortable: true },
        { name: "Price", selector: row => row.price, sortable: true },
        { name: "Status", selector: row => row.status, sortable: true },
        { name: "Selling Price", selector: row => row.sellingPrice, sortable: true },
        { name: "Payment Status", selector: row => row.paymentStatus, sortable: true },
        { name: "Exhibition Date", selector: row => row.exhibitionDate, sortable: true },
        {
            name: "Action",
            cell: row => <Button variant="primary" onClick={() => handleEditArtWork(row)}>Edit</Button>,
        },
    ];

    return (
        <div className="container mt-4">
            <h2 className="mb-3">Student Award Submissions</h2>
            <DataTable
                columns={awardColumns}
                data={awards}
                pagination
                highlightOnHover
                striped
            />
            <h2 className="mb-3 mt-3">List Submission Has Been Received Award (Artwork)</h2>
            <DataTable
                columns={artworkColumns}
                data={artwork}
                pagination
                highlightOnHover
                striped
            />

            {/* Modal for Editing */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Artwork</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={formik.handleSubmit}>
                        <Form.Group>
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                type="number"
                                {...formik.getFieldProps("price")}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.price && formik.errors.price && (
                                <p className="text-danger">{formik.errors.price}</p>
                            )}
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Status</Form.Label>
                            <Form.Control as="select" {...formik.getFieldProps("status")} onBlur={formik.handleBlur}>
                                <option value="Available">Available</option>
                                <option value="Sold">Sold</option>
                            </Form.Control>
                            {formik.touched.status && formik.errors.status && (
                                <p className="text-danger">{formik.errors.status}</p>
                            )}
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Selling Price</Form.Label>
                            <Form.Control
                                type="number"
                                {...formik.getFieldProps("sellingPrice")}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.sellingPrice && formik.errors.sellingPrice && (
                                <p className="text-danger">{formik.errors.sellingPrice}</p>
                            )}
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Payment Status</Form.Label>
                            <Form.Control as="select" {...formik.getFieldProps("paymentStatus")} onBlur={formik.handleBlur}>
                                <option value="Unpaid">Unpaid</option>
                                <option value="Paid">Paid</option>
                            </Form.Control>
                            {formik.touched.paymentStatus && formik.errors.paymentStatus && (
                                <p className="text-danger">{formik.errors.paymentStatus}</p>
                            )}
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Exhibition Date</Form.Label>
                            <Form.Control
                                type="date"
                                {...formik.getFieldProps("exhibitionDate")}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.exhibitionDate && formik.errors.exhibitionDate && (
                                <p className="text-danger">{formik.errors.exhibitionDate}</p>
                            )}
                        </Form.Group>
                        <Button
                            type="submit"
                            variant="success"
                            className="mt-3"
                            disabled={!formik.isValid || formik.isSubmitting}
                        >
                            Save Changes
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default ArtworkIndex;
