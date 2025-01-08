import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";

const ExhibitionIndex = () => {
    const [exhibitions, setExhibitions] = useState([]);
    const [selectedExhibition, setSelectedExhibition] = useState(null);
    const [pageCount, setPageCount] = useState(0);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const pageSize = 5;
    const navigate = useNavigate();
    useEffect(() => {
        const fetchExhibition = async (page, search = "") => {
            setLoading(true);
            try {
                const respone = await axios.get(`http://localhost:5190/api/Staff/GetAllExhibition`, {
                    params: {
                        page,
                        pageSize,
                        search,
                    }
                });
                console.log("respone", respone);
                setExhibitions(respone.data.exhibitions);
                setPageCount(respone.data.totalPages);
            } catch (error) {
                console.error("Error fetching exhibitions:", error);
                alert("Failed to fetch exhibitions. Please try again.");

            } finally {
                setLoading(false);
            }
        }
        fetchExhibition(currentPage, searchQuery);
    }, [currentPage, searchQuery])



    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa triển lãm này?");
        if (!confirmDelete) return;

        try {
            const respone = await axios.delete(`http://localhost:5190/api/Staff/DeleteExhibition/${id}`);
            
            if (respone.ok){
                toast.success("Exhibition deleted successfully");
                setExhibitions(exhibitions.filter((ex) => ex.id !== id));
            } else {
                toast.error("Exibition deleted failed");
            }

        } catch (error) {
            toast.error("Exibition deleted failed");
        }
       
    }; 
    const handlePageClick = (event) => {
        const selectedPage = event.selected + 1;
        setCurrentPage(selectedPage);
    };

    const handleDetail = (exhibition) => {
        setSelectedExhibition(exhibition);
    };

    return (
        <div className="container mt-4">
            <ToastContainer />
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2>Exhibitions</h2>
                <button className="btn btn-primary" onClick={()=>navigate(`/staff/exhibition/add`)}>Add Exhibition</button>
            </div>
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

                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Start Date</th>
                                <th>End Date</th>
                                <th>Location</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {exhibitions.map((ex) => (
                                <tr key={ex.id}>
                                    <td>{ex.id}</td>
                                    <td>{ex.name}</td>
                                    <td>{ex.startDate}</td>
                                    <td>{ex.endDate}</td>
                                    <td>{ex.location}</td>
                                    <td>
                                        <button className="btn btn-info btn-sm me-2" onClick={() => handleDetail(ex)}>
                                            View
                                        </button>
                                        <button className="btn btn-warning btn-sm me-2" onClick={()=>navigate(`/staff/exhibition/edit/${ex.id}`)}>Edit</button>
                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => handleDelete(ex.id)}
                                        >
                                            Delete
                                        </button>
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
                    {/* Modal for Viewing Details */}
                    {selectedExhibition && (
                        <div
                            className="modal fade show d-block"
                            tabIndex="-1"
                            role="dialog"
                            style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
                        >
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title">Exhibition Details</h5>
                                        <button
                                            type="button"
                                            className="btn-close"
                                            onClick={() => setSelectedExhibition(null)}
                                        ></button>
                                    </div>
                                    <div className="modal-body">
                                        <p><strong>Name:</strong> {selectedExhibition.name}</p>
                                        <p><strong>Start Date:</strong> {selectedExhibition.startDate}</p>
                                        <p><strong>End Date:</strong> {selectedExhibition.endDate}</p>
                                        <p><strong>Location:</strong> {selectedExhibition.location}</p>
                                    </div>
                                    <div className="modal-footer">
                                        <button
                                            type="button"
                                            className="btn btn-secondary"
                                            onClick={() => setSelectedExhibition(null)}
                                        >
                                            Close
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </>
            )}



        </div>
    );
};

export default ExhibitionIndex;
