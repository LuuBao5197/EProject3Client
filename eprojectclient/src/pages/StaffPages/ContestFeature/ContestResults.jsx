import React, { useState, useEffect } from "react";
import { Table, Button, Container, Row, Col } from "react-bootstrap";
import { Box, Heading, Text, Stack, Select } from "@chakra-ui/react";
import axios from "axios";
import { toast } from "react-toastify";
const ContestResults = () => {
    const [contests, setContests] = useState([]);
    const [selectedContest, setSelectedContest] = useState(null);
    const [submissions, setSubmissions] = useState([]);
    const [winners, setWinners] = useState([]);
    const [isFinalizing, setIsFinalizing] = useState(false);
    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    const pageSize = 20;
    useEffect(() => {
        const fetchContests = async (page, search = "", status = "Published") => {
            try {
                const response = await axios.get(`http://localhost:5190/api/Staff/GetAllContest`, {
                    params: {
                        page,
                        pageSize,
                        search,
                        status

                    },
                });
                setContests(response.data.contests);
                setPageCount(response.data.totalPages);
                // setPageCount(response.data.totalPages);
            } catch (error) {
                console.error("Error fetching contests:", error);
                alert("Failed to fetch contests. Please try again.");
            } finally {

            }
        };
        fetchContests(currentPage);


    }, []);

    const handleContestSelect = (contestID) => {
        setSelectedContest(contestID);
        setIsFinalizing(false);
        setWinners([]);
        const fetchRankingSubmission = async (contestID) => {
            var respone = await axios.get(`http://localhost:5190/api/Staff/GetProjectedRanking?contestId=${contestID}`);
            console.log(respone.data);
            setSubmissions(respone.data);
        }
        fetchRankingSubmission(contestID);

    };

    const handleFinalizeResults = (contestID) => {
        console.log(contestID);
        const ComputeAndAssignAward = async (contestID) => {
            try {
                var respone = await axios.get(`http://localhost:5190/api/Staff/ComputeAndAssignAwards?contestId=${contestID}`);
                console.log(respone);
                setWinners(respone.data);
                toast.info("Compute average mark and assign draft award successfully");
                setIsFinalizing(true);
            } catch (error) {
                console.log(error);
                toast.error(`Something occurs errors, ${error.response.data}`);
            }

        }

        ComputeAndAssignAward(contestID);

    };

    return (
        <Container>
            <Heading mb={4}>Contest Results Management</Heading>
            <Row>
                <Col md={4}>
                    <Select placeholder="Select a contest" onChange={(e) => handleContestSelect(e.target.value)}>
                        {contests.map((contest) => (
                            <option key={contest.id} value={contest.id}>{contest.name}</option>
                        ))}
                    </Select>
                </Col>
            </Row>

            {selectedContest && (
                <>
                    <Box mt={5}>
                        <Heading size="md">Current Leaderboard</Heading>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Student ID</th>
                                    <th>Participant</th>
                                    <th>Name Submission</th>
                                    <th>Average Score</th>
                                    <th>Review Count</th>
                                    <th>Number review require</th>

                                </tr>
                            </thead>
                            <tbody>

                                {submissions.map((submission) => (
                                    <tr key={submission.id}>
                                        <td>{submission.student.id}</td>

                                        <td>{submission.student.user.name}</td>
                                        <td>{submission.name}</td>
                                        <td>{submission.averageRating}</td>
                                        <td>{submission.submissionReviews.length}</td>
                                        <td>{submission.contest.contestJudge.length}</td>

                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Box>

                    <Stack direction="row" mt={4}>
                        <Button variant="primary" onClick={() => handleFinalizeResults(selectedContest)} disabled={isFinalizing}>
                            {isFinalizing ? "Finalizing..." : "Finalize Contest Results"}
                        </Button>
                    </Stack>

                    {winners.length > 0 && (
                        <Box mt={5}>
                            <Heading size="md">Projected Award Winners</Heading>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>Student</th>
                                        <th>Award</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {winners.map((winner) => (
                                        <tr key={winner.studentId}>
                                            <td>{winner.student.user.name}</td>
                                            <td>{winner.award.name}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Box>
                    )}
                </>
            )}
        </Container>
    );
};

export default ContestResults;
