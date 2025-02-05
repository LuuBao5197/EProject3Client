import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { Icon, Image } from '@chakra-ui/react';
import { MdEdit, MdDelete, MdSend } from 'react-icons/md';
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";

const ContestDetail = () => {
    const token = localStorage.getItem('token');
    const userId = jwtDecode(token).Id;
    const { id } = useParams();
    const navigate = useNavigate();
    const [contest, setContest] = useState({});
    const [staffCurent, setStaffCurrent] = useState({});

    useEffect(() => {
        const fetchContest = async (id) => {
            try {
                const result = await axios.get(`http://localhost:5190/api/Staff/GetDetailContest/${id}`);
                setContest(result.data);
            } catch (error) {
                console.error("Error fetching contest:", error);
            }
        };

        const fetchInfoOfStaff = async (userId) => {
            try {
                const result = await axios.get(`http://localhost:5190/api/Staff/GetInfoStaff/${userId}`);
                setStaffCurrent(result.data);
            } catch (error) {
                console.error("Error fetching staff info:", error);
            }
        };

        fetchContest(id);
        fetchInfoOfStaff(userId);
    }, [id, token]);

    const handleEdit = (id) => {
        navigate(`/staff/contests/edit/${id}`);
    };

    const sendContestDraftForReview = async (id) => {
        const token = localStorage.getItem("token");
        console.log(token);
        try {
            await axios.patch(`http://localhost:5190/api/Staff/SendContestDraftForReview/${id}`,
                null, // nếu không có data gửi đi, đặt null
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                    }
                }
            );
            toast.success("Sent draft contest successfully!");
        } catch (error) {
            console.error(error.response);
            toast.error("Something went wrong. Please try again.");
        }
    };

    return (
        <Container className="py-1">
            <Row className="justify-content-center">
                <Col xs={12} md={10} lg={8}>
                    {Object.keys(contest).length === 0 ? (
                        <div>Loading contest details...</div>
                    ) : (
                        <Card>
                            <Card.Header className="text-center bg-primary text-white row">
                                <Image src={contest.thumbnail} className="col-md-6" maxWidth={300} />
                                <h2 className="col-md-6">{contest.name}</h2>
                            </Card.Header>
                            <Card.Body>
                                <Row className="mb-3">
                                    <Col xs={12} md={6}>
                                        <h5 className="text-secondary">Start Date:</h5>
                                        <p>{new Date(contest.startDate).toLocaleString()}</p>
                                    </Col>
                                    <Col xs={12} md={6}>
                                        <h5 className="text-secondary">End Date:</h5>
                                        <p>{new Date(contest.endDate).toLocaleString()}</p>
                                    </Col>
                                </Row>
                                <Row className="mb-3">
                                    <Col xs={12}>
                                        <h5 className="text-secondary">Description:</h5>
                                        <p>{contest.description}</p>
                                    </Col>
                                </Row>
                                <Row className="mb-3">
                                    <Col xs={6}>
                                        <h5 className="text-secondary">Status:</h5>
                                        <p>{contest.status}</p>
                                    </Col>
                                    <Col xs={6}>
                                        <h5 className="text-secondary">Phase:</h5>
                                        <p>{contest.phase}</p>
                                    </Col>
                                </Row>
                            </Card.Body>
                            <Card.Footer className="text-center">
                                {(contest.organizedBy === staffCurent.id) && (
                                    <>
                                        <Button variant="primary" className="mx-2" onClick={() => handleEdit(contest.id)}>
                                            <Icon as={MdEdit} width="20px" height="20px" color="inherit" />
                                        </Button>
                                        <Button variant="danger" className="mx-2">
                                            <Icon as={MdDelete} width="20px" height="20px" color="inherit" />
                                        </Button>
                                    </>
                                )}

                                {/* Hiển thị nút gửi nếu trạng thái là "Draft" hoặc "Rejected" */}
                                {(contest.status === "Draft" || contest.status === "Rejected") && staffCurent.isReviewer && (
                                    <Button
                                        variant="success"
                                        className="mx-2"
                                        onClick={() => sendContestDraftForReview(contest.id)}
                                    >
                                        <Icon as={MdSend} width="20px" height="20px" color="inherit" />
                                        {" "}Send for Review
                                    </Button>
                                )}
                            </Card.Footer>
                        </Card>
                    )}
                </Col>
            </Row>
        </Container>
    );
};
export default ContestDetail;
