import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import DataTable from 'react-data-table-component';

import { Icon } from '@chakra-ui/react';
import {

    MdInfoOutline,
} from 'react-icons/md';

import { Box, Select, Flex } from "@chakra-ui/react";

const ContestList = () => {
    const navigate = useNavigate();
    const [contests, setContests] = useState([]);
    const [loading, setLoading] = useState(false);
    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState(""); // Trạng thái tìm kiếm
    const pageSize = 10;

    // Filter 
    const [status, setStatus] = useState(""); // Lưu trạng thái đã chọn
    const [phase, setPhase] = useState(""); // Lưu phase đã chọn

    const handleStatusChange = (e) => {
        setStatus(e.target.value);
        console.log("Selected Status:", e.target.value);
    };

    const handlePhaseChange = (e) => {
        setPhase(e.target.value);
        console.log("Selected Phase:", e.target.value);
    };


    const columns = [
        {
            name: 'ID',
            selector: row => row.id,
            sortable: true,
        },
        {
            name: 'Name',
            selector: row => row.name,
            sortable: true,
        },
        {
            name: 'Description',
            selector: row => row.description,
            sortable: true,
        },
        {
            name: 'StartDate',
            selector: row => row.startDate,
            sortable: true,
        },
        {
            name: 'EndDate',
            selector: row => row.endDate,
            sortable: true,
        },
        {
            name: 'Status',
            selector: row => row.status,
            sortable: true,
        },
        {
            name: 'Phase',
            selector: row => row.phase,
            sortable: true,
        },

        {
            name: 'Action',
            selector: row => (<div className="d-flex">
                <button className="btn btn-primary" onClick={() => navigate(`/staff/contests/${row.id}`)}>  <Icon as={MdInfoOutline} width="20px" height="20px" color="inherit" /></button>

            </div>),
            sortable: false,
        },
    ];

    const fetchContests = async (page, search = "") => {
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:5190/api/Staff/GetAllContest`, {
                params: {
                    page,
                    pageSize,
                    search,
                },
            });
            setContests(response.data.contests);
            // setPageCount(response.data.totalPages);
        } catch (error) {
            console.error("Error fetching contests:", error);
            alert("Failed to fetch contests. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchContests(currentPage, searchQuery);
    }, [currentPage, searchQuery]);

    const handlePageClick = (event) => {
        const selectedPage = event.selected + 1;
        setCurrentPage(selectedPage);
    };
    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa cuộc thi này?");
        if (!confirmDelete) return;

        try {
            // toast.success("OK");
            const response = await fetch(`http://localhost:5190/api/Staff/DeleteContest/${id}`, {
                method: "DELETE",
            });
            console.log("respone", response);

            if (response.ok) {
                setContests(contests.filter((contest) => contest.id !== id));
                alert("Xóa thành công!");
            } else {
                toast.error("Xoa that bai", {
                    position: "top-left",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: "colored",
                });
                // alert("Có lỗi xảy ra khi xóa.");
            }
        } catch (error) {
            console.error("Lỗi khi xóa dữ liệu:", error);
        }
    }
    return (
        <div className="container mx-auto my-1">
            <div className="text-start mb-3">
                <button
                    className="btn btn-primary"
                    onClick={() => navigate("/staff/contests/add")}
                >
                    Add Contest
                </button>
            </div>

            <Flex
                gap={4}
                direction={{ base: "column", md: "row" }}
                alignItems="center"
                justifyContent="space-between"
                bg="gray.50"
                p={4}
                rounded="md"
                boxShadow="sm"
            >
                {/* Dropdown lọc Status */}
                <Box>
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
                        <option value="active">Pending</option>
                        <option value="inactive"> Approved by Manager</option>
                        <option value="pending">Approved by Director</option>
                        <option value="completed">Rejected</option>
                    </Select>
                </Box>

                {/* Dropdown lọc Phase */}
                <Box>
                    <Select
                        placeholder="Select Phase"
                        value={phase}
                        onChange={handlePhaseChange}
                        bg="white"
                        border="1px solid"
                        borderColor="gray.300"
                        _hover={{ borderColor: "gray.400" }}
                        _focus={{ borderColor: "green.500", boxShadow: "0 0 0 1px green.500" }}
                    >
                        <option value="planning">Upcoming</option>
                        <option value="development">Ongoing</option>
                        <option value="testing">Completed</option>
                    </Select>
                </Box>
            </Flex>


            {/* Ô tìm kiếm */}

            <div className="input-group">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search by contest name"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>



            {loading ? (
                <div className="text-center">Loading...</div>
            ) : (
                <>
                    {/* <table className="table table-bordered">
                        <thead className="thead-light">
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Start Date</th>
                                <th>End Date</th>
                                <th>Active</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {contests.map((contest) => (
                                <tr key={contest.id}>
                                    <td>{contest.id}</td>
                                    <td>{contest.name}</td>
                                    <td>{contest.description}</td>
                                    <td>{new Date(contest.startDate).toLocaleString()}</td>
                                    <td>{new Date(contest.endDate).toLocaleString()}</td>
                                    <td>{contest.isActive ? "Yes" : "No"}</td>
                                    <td>
                                        <button className="btn btn-primary" onClick={() => navigate(`/staff/contest/edit/${contest.id}`)}>Edit</button>
                                        <button className="btn btn-warning" onClick={() => handleDelete(contest.id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table> */}
                    <DataTable
                        title="CONTEST LIST"
                        columns={columns}
                        data={contests}
                        pagination
                        highlightOnHover
                    />
                    {/* <ReactPaginate
                        previousLabel={"Previous"}
                        nextLabel={"Next"}
                        breakLabel={"..."}
                        pageCount={pageCount}
                        forcePage={currentPage - 1}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={3}
                        onPageChange={handlePageClick}
                        containerClassName={"pagination justify-content-center"}
                        pageClassName={"page-item"}
                        pageLinkClassName={"page-link"}
                        previousClassName={"page-item"}
                        previousLinkClassName={"page-link"}
                        nextClassName={"page-item"}
                        nextLinkClassName={"page-link"}
                        breakClassName={"page-item"}
                        breakLinkClassName={"page-link"}
                        activeClassName={"active"}
                    /> */}
                </>
            )}
        </div>
    );
};

export default ContestList;
