import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as Yup from 'yup';
import { Container, Table, Button, Modal, Form } from 'react-bootstrap';
import {
  Box,
  ChakraProvider,
  Heading,
  Text,
  VStack,
  Spinner,
  Divider,
  Select,
  Image,
} from '@chakra-ui/react';

import ReactPaginate from 'react-paginate';
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useFormik } from 'formik';
import ContestDetail from '../ContestFeature/ContestDetail';
import { jwtDecode } from 'jwt-decode';
const ListSubmission = () => {
  const [staffCurrent, setStaffCurrent] = useState({});

  // const [selectedRating, setSelectedRating] = useState(null);
  const [ratingLevel, setRatingLevel] = useState([]);
  const [contests, setContests] = useState([]);
  const [selectedContest, setSelectedContest] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [submissionsNotReview, setSubmissionsNotReview] = useState([])
  const [submissionsHasReview, setSubmissionsHasReview] = useState([])
  const [showModal, setShowModal] = useState(false);
  const [submissionDetails, setSubmissionDetails] = useState(null);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewText, setReviewText] = useState('');
  const [pageCount, setPageCount] = useState(0);
  const [rating, setRating] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const pageSize = 20;
  //config quill tool
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }], // Tiêu đề
      ["bold", "italic", "underline", "strike"], // In đậm, nghiêng, gạch chân, gạch ngang
      [{ list: "ordered" }, { list: "bullet" }], // Danh sách có thứ tự/không thứ tự
      [{ indent: "-1" }, { indent: "+1" }], // Thụt lề
      [{ align: [] }], // Căn chỉnh
      ["link", "image"], // Thêm liên kết, hình ảnh
      ["clean"], // Xóa định dạng
    ],
  };



  // Inside your component
  const formik = useFormik({
    initialValues: {
      submissionId: submissionDetails?.id || '', // Set from submission details
      staffId: 1,
      reviewText: '',
      ratingId: "",
      reviewDate: '',
    },
    validationSchema: Yup.object({
      reviewText: Yup.string().required('Review text is required'),
      ratingId: Yup.number().required('Rating is required'),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        console.log("value", values);
        const response = await axios.post(`http://localhost:5190/api/Staff/AddSubmissionReview`, values);
        alert('Review submitted successfully!');
        resetForm(); // Reset form after successful submission
        handleCloseReviewModal(); // Close modal
      } catch (error) {
        console.error('Error submitting review:', error);
        alert('Failed to submit review.');
      }
    },
  });

  const token = localStorage.getItem('token');
  const userId = jwtDecode(token).Id;
  useEffect(() => {
    const fetchRatingLevel = async () => {
      try {
        const response = await axios.get(`http://localhost:5190/api/Staff/GetRatingLevel`);
        setRatingLevel(response.data);
        // console.log(response);

        // setPageCount(response.data.totalPages);
      } catch (error) {
        console.error("Error fetching contests:", error);
        alert("Failed to fetch contests. Please try again.");
      } finally {

      }
    }

    // Fetch contests data
    const fetchContests = async (page, search = "", status = "Published") => {
      try {
        const response = await axios.get(`http://localhost:5190/api/Staff/GetAllContest`, {
          params: {
            page,
            pageSize,
            search,
            status

          },
        });
        console.log(response);
        setContests(response.data.contests);
        setPageCount(response.data.totalPages);
        // setPageCount(response.data.totalPages);
      } catch (error) {
        console.error("Error fetching contests:", error);
        alert("Failed to fetch contests. Please try again.");
      } finally {

      }
    };

    const fetchInfoOfStaff = async () => {

      var result = await axios.get(`http://localhost:5190/api/Staff/GetInfoStaff/${userId}`);
      console.log(result);
      setStaffCurrent(result.data);
    }
    fetchInfoOfStaff();
    fetchContests(currentPage);
    fetchRatingLevel();
  }, [currentPage, token]);


  const fetchSubmissionNonReviewByContest = async (id, page, search = "", staffId = "-1") => {
    try {
      const response = await axios.get(`http://localhost:5190/api/Staff/GetSubmissionNotReviewByContest/${id}`, {
        params: {
          page,
          pageSize,
          search,
          staffId
        },
      });
      console.log(response)
      setSubmissionsNotReview(response.data.submissions);
      // setSubmissions(response.data.submissions);
    } catch (error) {
      console.error('Error fetching submissions:', error);
    }
  }
  const fetchSubmissionHasReviewByContest = async (id, page, search = "", staffId = "-1") => {
    try {
      const response = await axios.get(`http://localhost:5190/api/Staff/GetSubmissionHasReviewByContest/${id}`, {
        params: {
          page,
          pageSize,
          search,
          staffId
        },
      });
      console.log(response)
      setSubmissionsHasReview(response.data.submissions);
    } catch (error) {
      console.error('Error fetching submissions:', error);
    }
  }


  const handlePageClick = (event) => {
    const selectedPage = event.selected + 1;
    setCurrentPage(selectedPage);
  };
  const handleContestClick = async (contest) => {
    setSelectedContest(contest);
    console.log("contest", contest);
    fetchSubmissionNonReviewByContest(contest.id, currentPage, "", staffCurrent.id);
    fetchSubmissionHasReviewByContest(contest.id, currentPage, "", staffCurrent.id);
  };

  const handleSubmissionClick = (submission) => {
    setSubmissionDetails(submission);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSubmissionDetails(null);
  };

  const handleReviewClick = (submission) => {
    setSubmissionDetails(submission);
    setShowReviewModal(true);
    // console.log(submission);
    formik.setValues(
      {
        submissionId: submission.submissionId,
        staffId: staffCurrent.id,
        reviewText: "",
        ratingId: "",
        reviewDate: new Date()
      });

  };

  const handleCloseReviewModal = () => {
    setShowReviewModal(false);
    setReviewText('');
    setRating(0);
  };

  return (
    <ChakraProvider>
      <Container>
        <Heading as="h1" my={4} textAlign="center">
          Contest Submissions
        </Heading>

        <VStack spacing={4} align="stretch">
          <Box>
            <Heading size="md">Contests</Heading>
            {contests.length > 0 ? (
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {contests.map((contest) => (
                    <tr key={contest.id}>
                      <td>{contest.id}</td>
                      <td>{contest.name}</td>
                      <td>
                        <Button
                          variant="primary"
                          onClick={() => handleContestClick(contest)}
                        >
                          View Submissions
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : (
              <Text>No contests available.</Text>
            )}
          </Box>
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
          {selectedContest && (
            <>
              <Box>
                <Heading size="md">Submissions haven't been reviewed</Heading>
                {loading ? (
                  <Spinner size="xl" />
                ) : submissionsNotReview.length > 0 ? (
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {submissionsNotReview.map((submission) => (
                        <tr key={submission.id}>
                          <td>{submission.submissionId}</td>
                          <td>{submission.submissionName}</td>
                          <td>{submission.submissionDescription}</td>
                          <td>
                            <Button
                              variant="secondary"
                              onClick={() => handleSubmissionClick(submission)}
                            >
                              View Details
                            </Button>
                            <Button
                              variant="success"
                              className="ms-2"
                              onClick={() => handleReviewClick(submission)}
                            >
                              Review
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                ) : (
                  <Text>No submissions available for this contest.</Text>
                )}
              </Box>

              <Box>
                <Heading size="md">Submissions have been reviewed</Heading>
                {loading ? (
                  <Spinner size="xl" />
                ) : submissionsHasReview.length > 0 ? (
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {submissionsHasReview.map((submission) => (
                        <tr key={submission.submissionId}>
                          <td>{submission.submissionId}</td>
                          <td>{submission.submissionName}</td>
                          <td>{submission.submissionDescription}</td>
                          <td>
                            <Button
                              variant="secondary"
                              onClick={() => handleSubmissionClick(submission)}
                            >
                              View Details
                            </Button>
                            <Button
                              variant="success"
                              className="ms-2"
                              onClick={() => handleReviewClick(submission)}
                            >
                              Review
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                ) : (
                  <Text>No submissions had been review by you for this contest.</Text>
                )}
              </Box>
            </>





          )}
        </VStack>


        {/* Modal for submission details */}
        {submissionDetails && (
          <Modal show={showModal} onHide={handleCloseModal} centered >
            <Modal.Header closeButton>
              <Modal.Title>Submission Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Text><strong>ID:</strong> {submissionDetails.submissionId}</Text>
              <Text><strong>Name:</strong> {submissionDetails.submissionName}</Text>
              <Text><strong>Description:</strong> {submissionDetails.submissionDescription}</Text>
              {console.log(submissionDetails)}
              <Divider my={2} />
              <Image src={submissionDetails.thumbnail} alt={submissionDetails.thumbnail} width={300} maxWidth={500} />
              <h3 className='text-center mx-auto'>List Review </h3>
              {submissionDetails.reviews.length > 0 && submissionDetails.reviews.map((sub, index) => (
                <div className='row'>
                  <div className="col-md-3">
                    Teacher {index + 1}
                  </div>
                  <div className='col-md-6'>
                    {sub.reviewText}
                  </div>
                  <div className="col-md-3">
                    {sub.ratingLevel.name}
                  </div>
                </div>
              ))}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModal}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        )}

        {/* Modal for reviewing submissions */}
        <Modal show={showReviewModal} onHide={handleCloseReviewModal} centered>
          <Modal.Header closeButton>
            <Modal.Title>Review Submission</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={formik.handleSubmit}>
              {/* Review Text */}
              <Form.Group className="mb-3" controlId="reviewText">
                <Form.Label>Review Text</Form.Label>
                <ReactQuill
                  theme="snow"
                  value={formik.values.reviewText}
                  modules={modules}
                  onChange={(value) => formik.setFieldValue('reviewText', value)}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.reviewText && formik.errors.reviewText && (
                  <div className="text-danger">{formik.errors.reviewText}</div>
                )}
              </Form.Group>

              {/* Rating */}
              <Form.Group className="mb-3" controlId="rating">
                <Form.Label>Rating</Form.Label>
                <Select
                  id="rating"
                  placeholder="Select rating level"
                  value={formik.values.ratingId}
                  onChange={(e) => formik.setFieldValue('ratingId', Number(e.target.value))}
                  onBlur={formik.handleBlur}
                >
                  {ratingLevel.map((level) => (
                    <option key={level.id} value={level.id}>
                      {level.name}
                    </option>
                  ))}
                </Select>
                {formik.touched.ratingId && formik.errors.ratingId && (
                  <div className="text-danger">{formik.errors.ratingId}</div>
                )}
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseReviewModal}>
              Cancel
            </Button>
            <Button variant="primary" type="submit" onClick={formik.handleSubmit}>
              Submit Review
            </Button>
          </Modal.Footer>
        </Modal>

      </Container>
    </ChakraProvider>
  );
};

export default ListSubmission;
