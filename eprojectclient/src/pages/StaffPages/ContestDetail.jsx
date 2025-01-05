import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

const ContestDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [contest, setContest] = useState({});
    useEffect(() => {
        const fetchContest = async (id) => {
            try {
                await axios.get(`http://localhost:5190/api/Staff/GetDetailContest/${id}`

                ).then(result => setContest(result.data));
            } catch (error) {
                console.error("Error fetching data:", error);
            }


        }
        fetchContest(id);
    }, [id]); // Update dependency array to include id


    const handleEdit = (id) => {
        navigate(`/staff/contest/edit/${id}`);
    }
    console.log("Param: ", id);


    return (
        <Container className="my-5">
            <Row className="justify-content-center">
                <Col xs={12} md={10} lg={8}>
                    {Object.keys(contest).length === 0 ? (
                        <div>Loading contest details...</div>
                    ) : (
                        <Card>
                            <Card.Header className="text-center bg-primary text-white">
                                <h2>{contest.name}</h2>
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
                                    <Col xs={12}>
                                        <h5 className="text-secondary">Status:</h5>
                                        <p>{contest.isActive ? "Active" : "Inactive"}</p>
                                    </Col>
                                </Row>
                            </Card.Body>
                            <Card.Footer className="text-center">
                                <Button variant="primary" className="mx-2" onClick={() => handleEdit(contest.id)}>
                                    Edit Contest
                                </Button>
                                <Button variant="danger" className="mx-2">
                                    Delete Contest
                                </Button>
                            </Card.Footer>
                        </Card>
                    )}
                </Col>
            </Row>
        </Container>
    );

};

export default ContestDetail;


