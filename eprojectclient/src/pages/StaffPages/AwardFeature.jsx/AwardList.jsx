import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Dùng để điều hướng
import axios from "axios";
import ReactPaginate from "react-paginate";
import "bootstrap/dist/css/bootstrap.min.css";

const AwardList = () => {

    const [awards, setAwards] = useState([]); // Lưu danh sách giải thưởng
    const [loading, setLoading] = useState(true); // Trạng thái tải dữ liệu
    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const pageSize = 5;
    const navigate = useNavigate(); // Dùng để điều hướng

    // Lấy danh sách giải thưởng từ API
    useEffect(() => {
        const fetchAwards = async (page, search = "") => {
            try {
                const response = await axios.get(`http://localhost:5190/api/Staff/GetAllAward`, {
                    params: {
                        page,
                        pageSize,
                        search,
                    }
                }); // Đổi URL phù hợp với API của bạn
               
                setAwards(response.data.awards);
                setPageCount(response.data.totalPages);
                setLoading(false);
            } catch (error) {
                console.error("Lỗi khi tải dữ liệu:", error);
                setLoading(false);
            }
        };

        fetchAwards(currentPage, searchQuery);
    }, [currentPage, searchQuery]);
    const handlePageClick = (event) => {
        const selectedPage = event.selected + 1;
        setCurrentPage(selectedPage);
    };
    // Xóa giải thưởng
    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa giải thưởng này?");
        if (!confirmDelete) return;

        try {
            const response = await fetch(`https://api.example.com/awards/${id}`, {
                method: "DELETE",
            });

            if (response.ok) {
                setAwards(awards.filter((award) => award.id !== id));
                alert("Xóa thành công!");
            } else {
                alert("Có lỗi xảy ra khi xóa.");
            }
        } catch (error) {
            console.error("Lỗi khi xóa dữ liệu:", error);
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center">Danh Sách Giải Thưởng</h2>


            {/* Nút thêm mới */}
            <div className="text-end mb-3">
                <button
                    className="btn btn-primary"
                    onClick={() => navigate("/staff/award/add")}
                >
                    Thêm Giải Thưởng
                </button>
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

            {/* Hiển thị spinner khi đang tải */}
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
                                <th>#</th>
                                <th>Tên Giải Thưởng</th>
                                <th>Giá Trị</th>
                                <th>Số Lượng</th>
                                <th>Cuộc Thi</th>
                                <th>Hành Động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {awards.length > 0 ? (
                                awards.map((award, index) => (
                                    <tr key={award.id}>
                                        <td>{index + 1}</td>
                                        <td>{award.name}</td>
                                        <td>{award.value}</td>
                                        <td>{award.awardQuantity}</td>
                                        <td>{award.contestId}</td>
                                        <td>
                                            <div className="d-flex justify-content-around">
                                                {/* Nút xem chi tiết */}
                                                <button
                                                    className="btn btn-info btn-sm"
                                                    onClick={() => navigate(`/staff/award/${award.id}`)}
                                                >
                                                    Chi Tiết
                                                </button>

                                                {/* Nút sửa */}
                                                <button
                                                    className="btn btn-warning btn-sm"
                                                    onClick={() => navigate(`/staff/award/edit/${award.id}`)}
                                                >
                                                    Sửa
                                                </button>

                                                {/* Nút xóa */}
                                                <button
                                                    className="btn btn-danger btn-sm"
                                                    onClick={() => handleDelete(award.id)}
                                                >
                                                    Xóa
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="text-center">
                                        Không có giải thưởng nào.
                                    </td>
                                </tr>
                            )}
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

export default AwardList;
