import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Table, Thead, Tbody, Tr, Th, Td, Input, Select } from "@chakra-ui/react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import ReactPaginate from "react-paginate";
import { jwtDecode } from "jwt-decode";

export default function ContestJudgeList() {
    const [contests, setContests] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [status, setStatus] = useState("");
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const userId = jwtDecode(token).Id;
    const [currentPage, setCurrentPage] = useState(1);
    const [currentStaff, setCurrentStaff] = useState({});
    const [pageCount, setPageCount] = useState(0);
    const pageSize = 10;
    const handlePageClick = (event) => {
        const selectedPage = event.selected + 1;
        setCurrentPage(selectedPage);
    };

    useEffect(() => {
        const fetchContestJudges = async (page, search = "", status = "") => {
            await axios.get("http://localhost:5190/api/Staff/getAllContestWithJudge", {
                params: { page, pageSize, search, status }
            })
                .then((response) => {
                    setContests(response.data.contests);
                    setPageCount(response.data.totalPages);
                })
                .catch((error) => console.error("Error fetching contests:", error));

        }
        fetchContestJudges(currentPage, searchTerm, status);
        const fetchInfoOfStaff = async () => {
            const result = await axios.get(`http://localhost:5190/api/Staff/GetInfoStaff/${userId}`);
            setCurrentStaff(result.data);
        };
        fetchInfoOfStaff();

    }, [currentPage, searchTerm, status]);
    const handleStatusChange = (e) => {
        setStatus(e.target.value);
        console.log("Selected Status:", e.target.value);
    };

    const handleEdit = (contestID) => {
        navigate(`/staff/contestjudge/edit/${contestID}`);
    };

    const handleApprove = (contestID) => {
        axios.patch(`http://localhost:5190/api/Staff/SendJudgeForReview/${contestID}`)
            .then(() => {
                alert("Judges approved successfully!");
            })
            .catch((error) => {
                alert("Error approving judges: " + error.response?.data || error.message);
            });
    };

    const handleCreateJudges = (contestID) => {
        navigate(`/staff/contestjudge/${contestID}`);
    };


    return (
        <div className="container mt-4">
            <h2 className="text-primary">Contest Judge List</h2>
            <div className="d-flex mb-3">
                <Input
                    placeholder="Search contests..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="me-2"
                />

                <Select
                    placeholder="Select Status"
                    value={status}
                    onChange={handleStatusChange}
                    bg="white"
                    border="1px solid"
                    borderColor="gray.300"
                    _hover={{ borderColor: "gray.400" }}
                    _focus={{ borderColor: "blue.500", boxShadow: "0 0 0 1px blue.500" }}
                >
                    <option value="Draft">Draft</option>
                    <option value="Pending"> Pending</option>
                    <option value="Reject">Reject</option>
                    <option value="Approved">Approved</option>
                    <option value="Published">Published</option>
                    <option value="Canceled">Canceled</option>

                </Select>
            </div>
            <Table variant="striped" className="table table-bordered mt-3">
                <Thead>
                    <Tr>
                        <Th>Contest Name</Th>
                        <Th>Judges</Th>
                        <Th>Status</Th>
                        <Th>Actions</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {contests.map((contest) => (
                        <Tr key={contest.id}>
                            <Td>{contest.name}</Td>
                            <Td>
                                {contest.contestJudge.length > 0 ? (
                                    contest.contestJudge.map((judge, index) => (
                                        <span key={index} className="badge bg-primary me-1">
                                            {judge.staff.user.name}
                                        </span>
                                    ))
                                ) : (
                                    <span className="text-muted">No judges assigned</span>
                                )}
                            </Td>
                            <Td>{contest.contestJudge.length > 0 ? contest.contestJudge[0].status : ""}</Td>
                            <Td>
                                {contest.contestJudge.length > 0 && contest.organizer.id == currentStaff.id
                                    ? (
                                        <>
                                            {contest.contestJudge.every(cj => cj.status !== "Pending") && (
                                                <div className="row">

                                                    <Button className="col-md-4" colorScheme="blue" size="sm" onClick={() => handleEdit(contest.id)}>
                                                        Edit
                                                    </Button>
                                                    <Button colorScheme="green" size="sm" className="ms-2 col-md-7" onClick={() => handleApprove(contest.id)}>
                                                        Send for Approval
                                                    </Button>


                                                </div>
                                            )}

                                        </>
                                    ) : (<>
                                        {currentStaff.isReviewer && contest.contestJudge.every(cj => cj.status !== "Pending") && <Button colorScheme="teal" size="sm" onClick={() => handleCreateJudges(contest.id)}>
                                            Create Judges
                                        </Button>}

                                    </>
                                    )}
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
            <ReactPaginate
                previousLabel={"Previous"}
                nextLabel={"Next"}
                pageCount={pageCount}
                onPageChange={handlePageClick}
                containerClassName={"pagination justify-content-center"}
                activeClassName={"active"}
                breakLabel={"..."}
                forcePage={currentPage - 1}
                marginPagesDisplayed={2}
                pageRangeDisplayed={3}
                pageClassName={"page-item"}
                pageLinkClassName={"page-link"}
                previousClassName={"page-item"}
                previousLinkClassName={"page-link"}
                nextClassName={"page-item"}
                nextLinkClassName={"page-link"}
                breakClassName={"page-item"}
                breakLinkClassName={"page-link"}
            />
        </div>
    );
}
