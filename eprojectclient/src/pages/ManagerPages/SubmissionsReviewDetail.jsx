import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../../layout/AdminLayout.module.css';

function SubmissionReviewDetail() {
    const { studentId } = useParams();  // Nhận studentId từ URL
    const [reviews, setReviews] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Gọi API để lấy tất cả bài đánh giá của sinh viên
        axios.get(`http://localhost:5190/api/Manager/GetSubmissionsReviewDetail/${studentId}`)
            .then(response => {
                setReviews(response.data);  // Lưu danh sách bài đánh giá
                setLoading(false);           // Đánh dấu là đã tải xong
            })
            .catch(error => {
                console.error("Có lỗi khi lấy dữ liệu đánh giá bài nộp:", error);
                setLoading(false);           // Đánh dấu là đã tải xong dù có lỗi
            });
    }, [studentId]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!reviews || reviews.length === 0) {
        return <p>Không tìm thấy bài đánh giá cho sinh viên này.</p>;
    }

    return (
        <div className={styles.container}>
            <h1>Chi Tiết Đánh Giá Bài Nộp Của Sinh Viên</h1>

            {/* Thêm một phần tử cha duy nhất để bao quanh các phần tử con */}
            <div className="table-responsive">
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th colSpan="2">Thông Tin Đánh Giá</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reviews.map((review, index) => (
                            <React.Fragment key={index}>
                                <tr>
                                    <td><strong>ID Bài Nộp:</strong></td>
                                    <td>{review.SubmissionId}</td>
                                </tr>
                                <tr>
                                    <td><strong>ID Nhân Viên Đánh Giá:</strong></td>
                                    <td>{review.StaffId}</td>
                                </tr>
                                <tr>
                                    <td><strong>Ngày Đánh Giá:</strong></td>
                                    <td>{review.ReviewDate}</td>
                                </tr>
                                <tr>
                                    <td><strong>Mô Tả Đánh Giá:</strong></td>
                                    <td>{review.ReviewText}</td>
                                </tr>
                                <tr>
                                    <td><strong>Mức Độ Đánh Giá:</strong></td>
                                    <td>{review.RatingId}</td>
                                </tr>
                                <tr>
                                    <td><strong>Mô Tả Bài Nộp:</strong></td>
                                    <td>{review.SubmissionDescription}</td>
                                </tr>
                                <tr>
                                    <td><strong>Trạng Thái Bài Nộp:</strong></td>
                                    <td>{review.SubmissionStatus}</td>
                                </tr>
                                <tr>
                                    <td><strong>Tên Nhân Viên Đánh Giá:</strong></td>
                                    <td>{review.StaffName}</td>
                                </tr>
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default SubmissionReviewDetail;
