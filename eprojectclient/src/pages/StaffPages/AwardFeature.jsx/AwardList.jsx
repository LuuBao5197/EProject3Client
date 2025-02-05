import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ReactPaginate from "react-paginate";
import "bootstrap/dist/css/bootstrap.min.css";
import { Icon } from "@chakra-ui/react";
import { MdInfoOutline } from "react-icons/md";
import { jwtDecode } from "jwt-decode";

const AwardList = () => {
    const [awards, setAwards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const [filterStatus, setFilterStatus] = useState("");
    const [filterPhase, setFilterPhase] = useState("");
    const pageSize = 10;
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const [currentStaff, setCurrentStaff] = useState({});
    const userId = jwtDecode(token).Id;

    const fetchAwards = async (page, search = "", status = "", phase = "") => {
        try {
            const response = await axios.get(`http://localhost:5190/api/Staff/GetAllAward`, {
                params: { page, pageSize, search, status, phase },
            });
            setAwards(response.data.awards);
            setPageCount(response.data.totalPages);
            setLoading(false);
        } catch (error) {
            console.error("Lỗi khi tải dữ liệu:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAwards(currentPage, searchQuery, filterStatus, filterPhase);
        const fetchInfoOfStaff = async (userId) => {
            var result = await axios.get(`http://localhost:5190/api/Staff/GetInfoStaff/${userId}`);
            setCurrentStaff(result.data);
        };
        fetchInfoOfStaff(userId);
    }, [currentPage, searchQuery, filterStatus, filterPhase]);

    const handlePageClick = (event) => {
        setCurrentPage(event.selected + 1);
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center">List Awards</h2>

            {currentStaff.isReviewer &&
                <div className="text-end mb-3">
                    <button className="btn btn-primary" onClick={() => navigate("/staff/award/add")}>
                        Create Award
                    </button>
                </div>
            }

            <div className="row mb-3">
                <div className="col-md-4">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search by award name"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                <div className="col-md-4">
                    <select
                        className="form-control"
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                    >
                        <option value="">Filter by Status</option>
                        <option value="Draft">Draft</option>
                        <option value="Pending">Pending</option>
                        <option value="Approved">Approved</option>
                        <option value="Rejected">Rejected</option>
                    </select>
                </div>

                <div className="col-md-4">
                    <select
                        className="form-control"
                        value={filterPhase}
                        onChange={(e) => setFilterPhase(e.target.value)}
                    >
                        <option value="">Filter by Phase</option>
                        <option value="Phase 1">Phase 1</option>
                        <option value="Phase 2">Phase 2</option>
                        <option value="Phase 3">Phase 3</option>
                    </select>
                </div>
            </div>

            {loading ? (
                <div className="text-center">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) : (
                <>
                    <table className="table table-bordered table-striped">
                        <thead>
                            <tr>
                                <th className="text-center">ID</th>
                                <th className="text-center">Name</th>
                                <th className="text-center">Value($)</th>
                                <th className="text-center">Quantity</th>
                                <th className="text-center">Status</th>
                                <th className="text-center">Phase</th>
                                <th className="text-center">For Contest</th>
                                <th className="text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {awards.length > 0 ? (
                                awards.map((award, index) => (
                                    <tr key={index}>
                                        <td className="text-center">{award.id}</td>
                                        <td className="text-center">{award.name}</td>
                                        <td className="text-center">{award.value}</td>
                                        <td className="text-center">{award.awardQuantity}</td>
                                        <td className="text-center">{award.status}</td>
                                        <td className="text-center">{award.phase}</td>
                                        <td className="text-center">{award.contestId}</td>
                                        <td className="text-center">
                                            <button className="btn btn-info btn-sm"
                                                onClick={() => navigate(`/staff/award/${award.id}`)}>
                                                <Icon as={MdInfoOutline} width="20px" height="20px" />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="8" className="text-center">No award.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                    <ReactPaginate
                        previousLabel={"Previous"}
                        nextLabel={"Next"}
                        pageCount={pageCount}
                        onPageChange={handlePageClick}
                        containerClassName={"pagination justify-content-center"}
                        activeClassName={"active"}
                    />
                </>
            )}
        </div>
    );
};

export default AwardList;
