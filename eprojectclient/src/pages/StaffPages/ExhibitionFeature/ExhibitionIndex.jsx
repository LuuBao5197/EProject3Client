// ExhibitionIndex.js
import React, { useEffect, useState, useCallback } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { Box, Flex, Icon, Select } from "@chakra-ui/react";
import { MdInfoOutline } from "react-icons/md";
import Modal from "../components/ModalDetailExhibition";
import { jwtDecode } from "jwt-decode";

const ExhibitionIndex = () => {
  const [exhibitions, setExhibitions] = useState([]);
  const [selectedExhibition, setSelectedExhibition] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState(""); // Trạng thái lọc
  const [phaseFilter, setPhaseFilter] = useState(""); // Giai đoạn lọc
  const pageSize = 5;
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const userId = jwtDecode(token).Id;
  const [currentStaff, setCurrentStaff] = useState({});
  const handleStatusChange = (e) => {
    setStatusFilter(e.target.value);
    console.log("Selected Status:", e.target.value);
  };

  const handlePhaseChange = (e) => {
    setPhaseFilter(e.target.value);
    console.log("Selected Phase:", e.target.value);
  };

  const fetchExhibition = async (page, search = "", status = "", phase = "") => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:5190/api/Staff/GetAllExhibition`, {
        params: { page, pageSize, search, status, phase },
      });
      setExhibitions(response.data.exhibitions);
      setPageCount(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching exhibitions:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExhibition(currentPage, searchQuery, statusFilter, phaseFilter);
    const fetchInfoOfStaff = async () => {
      const result = await axios.get(`http://localhost:5190/api/Staff/GetInfoStaff/${userId}`);
      setCurrentStaff(result.data);
    };
    fetchInfoOfStaff();
  }, [currentPage, searchQuery, statusFilter, phaseFilter, token]);

  const handlePageClick = (event) => {
    const selectedPage = event.selected + 1;
    setCurrentPage(selectedPage);
  };

  const handleDetail = (exhibition) => {
    setSelectedExhibition(exhibition);
  };

  const closeModal = () => {
    setSelectedExhibition(null);
  };

  const handleUpdate = (id) => {
    navigate(`/staff/exhibition/edit/${id}`);
    closeModal();
  };

  const handleDelete = (id) => {
    setExhibitions(exhibitions.filter((ex) => ex.id !== id));
    closeModal();
  };

  const handleSend = (id) => {
    fetchExhibition(currentPage, searchQuery, statusFilter, phaseFilter);
    closeModal();
  };

  return (
    <div className="container mt-4">
      <ToastContainer />
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Exhibitions</h2>
        {currentStaff.isReviewer &&
          <button className="btn btn-primary" onClick={() => navigate(`/staff/exhibition/add`)}>Add Exhibition</button>
        }
      </div>
      {/* Ô tìm kiếm */}
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by exhibition name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Các bộ lọc */}
      <Flex
        gap={4}
        direction={{ base: "column", md: "row" }}
        alignItems="center"
        justifyContent="space-between"
        bg="gray.50"
        p={4}
        rounded="md"
        boxShadow="sm"
      >
        {/* Dropdown lọc Status */}
        <Box>
          <Select
            placeholder="Select Status"
            value={statusFilter}
            onChange={handleStatusChange}
            bg="white"
            border="1px solid"
            borderColor="gray.300"
            _hover={{ borderColor: "gray.400" }}
            _focus={{ borderColor: "blue.500", boxShadow: "0 0 0 1px blue.500" }}
          >
            <option value="Draft">Draft</option>
            <option value="Pending"> Pending</option>
            <option value="Reject">Reject</option>
            <option value="Approved">Approved</option>
            <option value="Published">Published</option>
            <option value="Canceled">Canceled</option>

          </Select>
        </Box>

        {/* Dropdown lọc Phase */}
        <Box>
          <Select
            placeholder="Select Phase"
            value={phaseFilter}
            onChange={handlePhaseChange}
            bg="white"
            border="1px solid"
            borderColor="gray.300"
            _hover={{ borderColor: "gray.400" }}
            _focus={{ borderColor: "green.500", boxShadow: "0 0 0 1px green.500" }}
          >
            <option value="Upcoming">Upcoming</option>
            <option value="Ongoing">Ongoing</option>
            <option value="Completed">Completed</option>
          </Select>
        </Box>

      </Flex>

      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <>
          <table className="table table-striped">
            <thead>
              <tr>
                <th className="text-center">#</th>
                <th className="text-center">Name</th>
                {/* <th className="text-center">Start Date</th>
                <th className="text-center">End Date</th> */}
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
                  {/* <td className="text-center">{ex.startDate}</td>
                  <td className="text-center">{ex.endDate}</td> */}
                  <td className="text-center">{ex.location}</td>
                  <td className="text-center">{ex.status}</td>
                  <td className="text-center">{ex.phase}</td>
                  <td className="text-center">
                    <button className="btn btn-info btn-sm me-2" onClick={() => handleDetail(ex)}>
                      <Icon as={MdInfoOutline} width="20px" height="20px" />
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
          {selectedExhibition && (
            <Modal
              exhibition={selectedExhibition}
              onClose={closeModal}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
              onSend={handleSend}
              staffCurrent={currentStaff}
            />
          )}
        </>
      )}
    </div>
  );
};

export default ExhibitionIndex;
