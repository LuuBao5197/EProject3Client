import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Icon } from "@chakra-ui/react";
import { MdDeleteForever, MdEdit, MdSend } from "react-icons/md";
import { toast } from "react-toastify";

const AwardDetails = () => {
    const { id } = useParams();
    const [award, setAward] = useState({});
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAwardDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:5190/api/Staff/GetDetailAward/${id}`);
                setAward(response.data);
                setLoading(false);
                console.log(response.data)
            } catch (error) {
                console.error("Lỗi khi tải dữ liệu:", error);
                setLoading(false);
            }
        };

        fetchAwardDetails();
    }, [id]);

    const handleDelete = async () => {
        if (window.confirm("Bạn có chắc chắn muốn xóa giải thưởng này?")) {
            try {
                await axios.delete(`http://localhost:5190/api/Staff/DeleteAward/${id}`);
                toast.success("Award deleted successfully!");
                navigate("/staff/awards");
            } catch (error) {
                toast.error("Error deleting award.");
            }
        }
    };

    const sendAwardForReview = async () => {
        try {
            await axios.patch(`http://localhost:5190/api/Staff/SendAwardForReview/${id}`);
            toast.info("Award sent for review successfully!");
        } catch (error) {
            toast.error("Error sending award for review.");
        }
    };

    return (
        <div className="container mt-5">
            {loading ? (
                <div className="text-center">
                    <div className="spinner-border text-primary"></div>
                </div>
            ) : (
                <>
                    <h2 className="text-center mb-3">Award Detail</h2>
                    <div className="row">
                        <div className="col-md-6">
                            <p><strong>Name:</strong> {award.name}</p>
                            <p><strong>Value:</strong> {award.value}$</p>
                            <p><strong>Quantity:</strong> {award.awardQuantity}</p>
                        </div>
                        <div className="col-md-6">
                            <p><strong>Contest Name:</strong> {award.contest.name}</p>
                            <p> Status: {award.status}</p>
                        </div>
                    </div>
                    {award.status === "Published" || award.studentAwards.length> 0 && (
                        <div className="col-md-8 text-center mx-auto">
                            <h1>List of award-winning students</h1>
                            <table className="table table-bordered table-striped">
                                <thead>
                                    <tr>
                                        <th className="text-center">Student ID</th>
                                        <th className="text-center"> Student Name</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {award.studentAwards.length > 0 ? (
                                        award.studentAwards.map((award, index) => (
                                            <tr key={index}>
                                                <td className="text-center">{award.student.id}</td>
                                                <td className="text-center">{award.student.user.name}</td>
                                    
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="8" className="text-center">No award.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}


                    {award.status === "Draft" || award.status === "Rejected" ? (
                        <div className="d-flex gap-2">
                            <button className="btn btn-warning" onClick={() => navigate(`/staff/award/edit/${id}`)}>
                                <Icon as={MdEdit} /> Edit
                            </button>
                            <button className="btn btn-danger" onClick={handleDelete}>
                                <Icon as={MdDeleteForever} /> Delete
                            </button>
                            <button className="btn btn-success" onClick={sendAwardForReview}>
                                <Icon as={MdSend} /> Send for Review
                            </button>
                        </div>
                    ) : null}
                </>
            )}
        </div>
    );
};

export default AwardDetails;
