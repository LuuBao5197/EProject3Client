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
<<<<<<< HEAD
// <<<<<<< HEAD
// =======
//             // console.log(response.data.awards);
// >>>>>>> 5c143185e4d46f2109797ef2df334d975828827a
=======
            // console.log(response.data.awards);
>>>>>>> 5c143185e4d46f2109797ef2df334d975828827a
            setAwards(response.data.awards);
            setPageCount(response.data.totalPages);
            setLoading(false);
        } catch (error) {
            console.error("Something occurs error when loading data:", error);
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
<<<<<<< HEAD
<<<<<<< HEAD
                <div className="col-md-4">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search by award name"
=======
=======
>>>>>>> 5c143185e4d46f2109797ef2df334d975828827a
                <div className="col-md-6">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search by award name or contest name"
<<<<<<< HEAD
>>>>>>> 5c143185e4d46f2109797ef2df334d975828827a
=======
>>>>>>> 5c143185e4d46f2109797ef2df334d975828827a
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

<<<<<<< HEAD
<<<<<<< HEAD
                <div className="col-md-4">
=======
                <div className="col-md-6">
>>>>>>> 5c143185e4d46f2109797ef2df334d975828827a
=======
                <div className="col-md-6">
>>>>>>> 5c143185e4d46f2109797ef2df334d975828827a
                    <select
                        className="form-control"
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                    >
                        <option value="">Filter by Status</option>
                        <option value="Draft">Draft</option>
                        <option value="Pending">Pending</option>
                        <option value="Approved">Approved</option>
<<<<<<< HEAD
<<<<<<< HEAD
                        <option value="Rejected">Rejected</option>
                    </select>
                </div>

                <div className="col-md-4">
=======
=======
>>>>>>> 5c143185e4d46f2109797ef2df334d975828827a
                        <option value="Published">Published</option>
                        <option value="Canceled">Canceled</option>d 

                    </select>
                </div>

                {/* <div className="col-md-4">
<<<<<<< HEAD
>>>>>>> 5c143185e4d46f2109797ef2df334d975828827a
=======
>>>>>>> 5c143185e4d46f2109797ef2df334d975828827a
                    <select
                        className="form-control"
                        value={filterPhase}
                        onChange={(e) => setFilterPhase(e.target.value)}
                    >
                        <option value="">Filter by Phase</option>
<<<<<<< HEAD
<<<<<<< HEAD
                        <option value="Phase 1">Phase 1</option>
                        <option value="Phase 2">Phase 2</option>
                        <option value="Phase 3">Phase 3</option>
                    </select>
                </div>
=======
=======
>>>>>>> 5c143185e4d46f2109797ef2df334d975828827a
                        <option value="True">Has Awarded</option>
                        <option value="False">No Awarded</option>

                    </select>
                </div> */}
<<<<<<< HEAD
>>>>>>> 5c143185e4d46f2109797ef2df334d975828827a
=======
>>>>>>> 5c143185e4d46f2109797ef2df334d975828827a
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
                                {/* <th className="text-center">Value($)</th>
                                <th className="text-center">Quantity</th> */}
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
                                        {/* <td className="text-center">{award.value}</td>
                                        <td className="text-center">{award.awardQuantity}</td> */}
                                        <td className="text-center">{award.status}</td>
<<<<<<< HEAD
<<<<<<< HEAD
                                        <td className="text-center">{award.phase}</td>
                                        <td className="text-center">{award.contestId}</td>
=======
                                        <td className="text-center">{award.contest.name}</td>
>>>>>>> 5c143185e4d46f2109797ef2df334d975828827a
=======
                                        <td className="text-center">{award.contest.name}</td>
>>>>>>> 5c143185e4d46f2109797ef2df334d975828827a
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
<<<<<<< HEAD
<<<<<<< HEAD
=======
=======
>>>>>>> 5c143185e4d46f2109797ef2df334d975828827a
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
<<<<<<< HEAD
>>>>>>> 5c143185e4d46f2109797ef2df334d975828827a
=======
>>>>>>> 5c143185e4d46f2109797ef2df334d975828827a
                    />
                </>
            )}
        </div>
    );
};

export default AwardList;
