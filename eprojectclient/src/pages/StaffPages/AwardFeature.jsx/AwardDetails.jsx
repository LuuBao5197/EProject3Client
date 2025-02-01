import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const AwardDetails = () => {
    const { id } = useParams(); // Lấy ID từ URL
    const [award, setAward] = useState({}); // Thông tin giải thưởng
    const [loading, setLoading] = useState(true); // Trạng thái tải dữ liệu
    const navigate = useNavigate(); // Điều hướng

    // Gọi API để lấy thông tin chi tiết giải thưởng
    useEffect(() => {
        const fetchAwardDetails = async () => {
            try {
                const response = await fetch(`http://localhost:5190/api/Staff/GetDetailAward/${id}`);
                const data = await response.json();
                console.log("data", data);
                setAward(data);
                setLoading(false);
            } catch (error) {
                console.error("Lỗi khi tải dữ liệu:", error);
                setLoading(false);
            }
        };

        fetchAwardDetails();
    }, [id]);

    return (
        <div className="container mt-5">
            {/* Hiển thị spinner khi đang tải */}
            {loading ? (
                <div className="text-center">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) : (
                <>
                    {award ? (
                        <div>
                            <h2 className="text-center mb-4">Award Detail</h2>

                            {/* Thông tin giải thưởng */}
                            <div className="card mb-4">
                                <div className="card-body">
                                    <h5 className="card-title">Info of Award</h5>
                                    <p><strong>Tên:</strong> {award.name}</p>
                                    <p><strong>Giá Trị:</strong> {award.value}</p>
                                    <p><strong>Số Lượng:</strong> {award.awardQuantity}</p>
                                    <p><strong>Cuộc Thi:</strong> {award.contest.name || "Không rõ"}</p>
                                </div>
                            </div>

                            {/* Danh sách sinh viên nhận giải */}
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">List Student received this award</h5>
                                    {award.studentAwards && award.studentAwards.length > 0 ? (
                                        <table className="table table-bordered">
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Student Name</th>
                                                    <th>Email</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {award.studentAwards.map((student, index) => (
                                                    <tr key={student.id

                                                    }>
                                                        <td>{index + 1}</td>
                                                        <td>{student.student.user.name}</td>
                                                        <td>{student.student.user.email}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    ) : (
                                        <p>Nobody have received this Award.</p>
                                    )}
                                </div>
                            </div>

                            {/* Nút quay lại */}
                            <div className="mt-3 text-end">
                                <button
                                    className="btn btn-secondary"
                                    onClick={() => navigate(-1)} // Quay lại trang trước
                                >
                                    Back
                                </button>
                            </div>
                        </div>
                    ) : (
                        <p className="text-center">No find to any awards.</p>
                    )}
                </>
            )}
        </div>
    );
};

export default AwardDetails;
