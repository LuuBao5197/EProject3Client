// src/ContestStats.js
import React, { useState, useEffect } from 'react';

function ContestStats() {
  const [contestStats, setContestStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch data từ API khi component mount
    fetch('http://localhost:5190/api/Contest/GetContestSubmissionStats')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setContestStats(data); // Lưu dữ liệu vào state
        setLoading(false); // Đổi trạng thái loading khi dữ liệu đã được tải
      })
      .catch((error) => {
        setError(error); // Xử lý lỗi
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Hiển thị khi đang tải dữ liệu
  }

  if (error) {
    return <div>Error: {error.message}</div>; // Hiển thị lỗi nếu có
  }

  return (
    <div>
      <h2 style={{ textAlign: 'center' }}>Contest Submission Stats</h2>
      <table  border="1" style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Contest Name</th>
            <th>Total Submissions</th>
            <th>Pending Submissions</th>
            <th>Reviewed Submissions</th>
          </tr>
        </thead>
        <tbody>
          {contestStats.map((contest, index) => (
            <tr key={index}>
              <td>{contest.contestName}</td>
              <td>{contest.totalSubmissions}</td>
              <td>{contest.pendingSubmissions}</td>
              <td>{contest.reviewedSubmissions}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


export default ContestStats;
