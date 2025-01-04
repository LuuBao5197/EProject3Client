import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import ReactPaginate from "react-paginate";

const ContestList = () => {
    const [contests, setContests] = useState([]);
    const [loading, setLoading] = useState(false);
    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState(""); // Trạng thái tìm kiếm
    const pageSize = 5;

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
            setPageCount(response.data.totalPages);
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

    return (
        <div className="container mx-auto">
            <h2 className="text-center mb-4">Contest List</h2>

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
                    <table className="table table-bordered">
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
                                        <button className="btn btn-primary">Edit</button>
                                        <button className="btn btn-warning">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <ReactPaginate
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
                    />
                </>
            )}
        </div>
    );
};

export default ContestList;
