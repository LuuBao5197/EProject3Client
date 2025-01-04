import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

const ContestList = () => {
  const [contests, setContests] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchContests = async (page) => {
    setLoading(true);
    try {
      await axios.get(`http://localhost:5190/api/Staff/GetAllContest?page=${page}`).then(respone => setContests(respone.data.data));
      console.log(contests);
    //   setTotalPages(response.data.totalPages);
    //   setCurrentPage(page);
    } catch (error) {
      console.error("Error fetching contests:", error);
      alert("Failed to fetch contests. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContests(currentPage);
  }, [currentPage]);

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      fetchContests(page);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Contest List</h2>
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
                </tr>
              ))}
            </tbody>
          </table>
          <div className="d-flex justify-content-between">
            <button
              className="btn btn-secondary"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span>Page {currentPage} of {totalPages}</span>
            <button
              className="btn btn-secondary"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ContestList;
