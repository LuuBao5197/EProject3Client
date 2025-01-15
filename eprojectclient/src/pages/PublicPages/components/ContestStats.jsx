import React, { useState, useEffect } from 'react';

function ContestStats() {
  const [contestStats, setContestStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Số lượng dữ liệu trên mỗi trang

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
        setContestStats(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>; 
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // Tính toán dữ liệu cho trang hiện tại
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = contestStats.slice(indexOfFirstItem, indexOfLastItem);

  // Tổng số trang
  const totalPages = Math.ceil(contestStats.length / itemsPerPage);

  // Chuyển trang
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <h2 style={{ textAlign: 'center' }}>Contest Submission Stats</h2>
      <table
        border="1"
        style={{
          width: '100%',
          textAlign: 'left',
          borderCollapse: 'collapse',
        }}
      >
        <thead>
          <tr>
            <th>Contest Name</th>
            <th>Total Submissions</th>
            <th>Pending Submissions</th>
            <th>Reviewed Submissions</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((contest, index) => (
            <tr key={index}>
              <td>{contest.contestName}</td>
              <td>{contest.totalSubmissions}</td>
              <td>{contest.pendingSubmissions}</td>
              <td>{contest.reviewedSubmissions}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Phân trang */}
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        {currentPage > 1 && (
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            style={{
              margin: '0 5px',
              padding: '5px 10px',
              backgroundColor: '#007bff',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Previous
          </button>
        )}

        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            style={{
              margin: '0 5px',
              padding: '5px 10px',
              backgroundColor: index + 1 === currentPage ? '#007bff' : '#fff',
              color: index + 1 === currentPage ? '#fff' : '#000',
              border: '1px solid #ddd',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            {index + 1}
          </button>
        ))}

        {currentPage < totalPages && (
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            style={{
              margin: '0 5px',
              padding: '5px 10px',
              backgroundColor: '#007bff',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
}

export default ContestStats;
