import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Icon } from "@chakra-ui/react";
import { MdDeleteForever, MdEdit, MdSend } from "react-icons/md";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";

const AwardDetails = () => {
    const { id } = useParams();
    const [award, setAward] = useState({});
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const userId = jwtDecode(token).Id;
    const [staffCurrent, setStaffCurrent] = useState({});
    useEffect(() => {
        const fetchAwardDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:5190/api/Staff/GetDetailAward/${id}`);
                setAward(response.data);
                setLoading(false);
                console.log(response.data)
            } catch (error) {
                console.error("Error loading data:", error);
                setLoading(false);
            }
        };

        fetchAwardDetails();
        const fetchInfoOfStaff = async (userId) => {
            var result = await axios.get(`http://localhost:5190/api/Staff/GetInfoStaff/${userId}`);
            console.log(result);
            setStaffCurrent(result.data);
          }
          fetchInfoOfStaff(userId);
    }, [id, token]);

    const handleDelete = async (awardId) => {
        if (window.confirm("Are you sure to delete this award ?")) {
            try {
                await axios.delete(`http://localhost:5190/api/Staff/DeleteAward/${awardId}`);
                toast.success("Award deleted successfully!");
                navigate('/staff/award');
            } catch (error) {
                console.log(error)
                toast.error(`Error deleting award. ${error.response.data}`);
            }
        }
    };

    const sendAwardForReview = async () => {
        try {
            await axios.patch(`http://localhost:5190/api/Staff/SendAwardForReview/${id}`,null);
            toast.info("Award sent for review successfully!");
            navigate(0);
        } catch (error) {
            console.log(error.response)
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
                    {award.status === "Published" || award.studentAwards.length > 0 && (
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


                    {staffCurrent.isReviewer&&(award.status === "Draft" || award.status === "Rejected")? (
                        <div className="d-flex gap-2">
                            <button className="btn btn-warning" onClick={() => navigate(`/staff/award/edit/${id}`)}>
                                <Icon as={MdEdit} /> Edit
                            </button>
                            <button className="btn btn-danger" onClick={()=>handleDelete(award.id )}>
                                <Icon as={MdDeleteForever} /> Delete
                            </button>
                            <button className="btn btn-success" onClick={()=>sendAwardForReview(award.id)}>
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
