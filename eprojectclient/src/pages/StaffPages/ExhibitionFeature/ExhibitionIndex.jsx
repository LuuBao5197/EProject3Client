import React, { useEffect, useState, useCallback } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { Icon } from "@chakra-ui/react";
import { MdDeleteOutline, MdEdit, MdInfoOutline, MdSend } from "react-icons/md";
import Modal from "../components/ModalDetailExhibition";
import { jwtDecode } from "jwt-decode";


const ExhibitionIndex = () => {
  const [exhibitions, setExhibitions] = useState([]);
  const [selectedExhibition, setSelectedExhibition] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const pageSize = 5;
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const userId = jwtDecode(token).Id;
  const [currentStaff, setCurrentStaff] = useState({});

  const fetchExhibition = async (page, search = "") => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:5190/api/Staff/GetAllExhibition`, {
        params: { page, pageSize, search },
      });
      setExhibitions(response.data.exhibitions);
      setPageCount(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching exhibitions:", error);
      alert("Failed to fetch exhibitions. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    
    fetchExhibition(currentPage, searchQuery);
    const fetchInfoOfStaff = async () => {

      var result = await axios.get(`http://localhost:5190/api/Staff/GetInfoStaff/${userId}`);
      // console.log(result);
      // setStaffId(result.data.id);
      setCurrentStaff(result.data);
    }
    fetchInfoOfStaff();
  }, [currentPage, searchQuery, token]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa triển lãm này?");
    if (!confirmDelete) return;

    try {
      const response = await axios.delete(`http://localhost:5190/api/Staff/DeleteExhibition/${id}`);
      if (response.status === 200) {
        toast.success("Exhibition deleted successfully");
        setExhibitions(exhibitions.filter((ex) => ex.id !== id));
      } else {
        toast.error("Exhibition delete failed");
      }
    } catch (error) {
      toast.error("Exhibition delete failed");
    }
  };

  const handlePageClick = (event) => {
    const selectedPage = event.selected + 1;
    setCurrentPage(selectedPage);
  };

  const handleDetail = useCallback((exhibition) => {
    setSelectedExhibition(exhibition);
  }, []);

  const closeModal = useCallback(() => {
    setSelectedExhibition(null);
  }, []);

  const sendExhibitionForReview = async (id) => {
    try {
      const result = await axios.patch(`http://localhost:5190/api/Staff/SendExhibitionForReview/${id}`);
      //    console.log(result);
      toast.info("Send exhibition to approve succesffully");
      await fetchExhibition(currentPage, searchQuery);

    } catch (error) {
      alert("Something error occurs");
    }
  }

  return (
    <div className="container mt-4">
      <ToastContainer />
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Exhibitions</h2>
        {currentStaff.isReviewer &&
          <button className="btn btn-primary" onClick={() => navigate(`/staff/exhibition/add`)}>
            Add Exhibition
          </button>
        }
      </div>
      {/* Ô tìm kiếm */}
      <div className="input-group mb-3">
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
                <th className="text-center">#</th>
                <th className="text-center">Name</th>
                <th className="text-center">Start Date</th>
                <th className="text-center">End Date</th>
                <th className="text-center">Location</th>
                <th className="text-center">Status</th>
                <th className="text-center">Phase</th>


                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {exhibitions.map((ex) => (
                <tr key={ex.id}>
                  <td className="text-center">{ex.id}</td>
                  <td className="text-center">{ex.name}</td>
                  <td className="text-center">{ex.startDate}</td>
                  <td className="text-center">{ex.endDate}</td>
                  <td className="text-center">{ex.location}</td>
                  <td className="text-center">{ex.status}</td>

                  <td className="text-center">{ex.phase}</td>
                  <td className="text-center">
                    <button className="btn btn-info btn-sm me-2" onClick={() => handleDetail(ex)}>
                      <Icon as={MdInfoOutline} width="20px" height="20px" />
                    </button>
                    {currentStaff.isReviewer && <>
                      <button
                        className="btn btn-warning btn-sm me-2"
                        onClick={() => navigate(`/staff/exhibition/edit/${ex.id}`)}
                      >
                        <Icon as={MdEdit} width="20px" height="20px" />
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(ex.id)}
                      >
                        <Icon as={MdDeleteOutline} width="20px" height="20px" />
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => sendExhibitionForReview(ex.id)}
                      >
                        <Icon as={MdSend} width="20px" height="20px" />
                      </button>

                    </>}
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
          <Modal exhibition={selectedExhibition} onClose={closeModal} />
        </>
      )}
    </div>
  );
};

export default ExhibitionIndex;
