import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
} from '@chakra-ui/react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import ReactPaginate from 'react-paginate';
import { useForm } from 'react-hook-form';

const ListSubmission = () => {
  const [selectedRating, setSelectedRating] = useState(null);
  const [ratingLevel, setRatingLevel] = useState([]);
  const [contests, setContests] = useState([]);
  const [selectedContest, setSelectedContest] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [submissionDetails, setSubmissionDetails] = useState(null);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewText, setReviewText] = useState('');
  const [pageCount, setPageCount] = useState(0);
  const [rating, setRating] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const pageSize = 5;

  const [content, setContent] = useState("");
  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    setContent(data);
    console.log("Current Content:", data);
  };
  //React-Hook
  const { control, handleSubmit, reset, watch } = useForm({
    defaultValues: {
      ratingLevel: "",
    },
  });
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
    const fetchContests = async (page, search = "") => {
      try {
        const response = await axios.get(`http://localhost:5190/api/Staff/GetAllContest`, {
          params: {
            page,
            pageSize,
            search,
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
    fetchContests(currentPage);
    fetchRatingLevel();
  }, [currentPage]);


  const fetchSubmissionByContest = async (id, page, search = "") => {
    try {
      const response = await axios.get(`http://localhost:5190/api/Staff/GetSubmissionByContest/${id}`, {
        params: {
          page,
          pageSize,
          search,
        },
      });
      console.log(response)
      setSubmissions(response.data.submissions);
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
    fetchSubmissionByContest(contest.id, currentPage);

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
  };

  const handleCloseReviewModal = () => {
    setShowReviewModal(false);
    setReviewText('');
    setRating(0);
  };

  const handleSubmitReview = async () => {
    if (!reviewText || !rating) {
      alert('Please provide a review and a rating.');
      return;
    }
    try {
      await axios.post(`/api/submissions/${submissionDetails.id}/reviews`, {
        reviewText,
        rating,
      });
      alert('Review submitted successfully!');
      handleCloseReviewModal();
    } catch (error) {
      console.error('Error submitting review:', error);
      alert('Failed to submit review.');
    }
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
            <Box>
              <Heading size="md">Submissions</Heading>
              {loading ? (
                <Spinner size="xl" />
              ) : submissions.length > 0 ? (
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Description</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {submissions.map((submission) => (
                      <tr key={submission.id}>
                        <td>{submission.id}</td>
                        <td>{submission.name}</td>
                        <td>{submission.description}</td>
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
          )}
        </VStack>


        {/* Modal for submission details */}
        {submissionDetails && (
          <Modal show={showModal} onHide={handleCloseModal} centered>
            <Modal.Header closeButton>
              <Modal.Title>Submission Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Text><strong>ID:</strong> {submissionDetails.id}</Text>
              <Text><strong>Name:</strong> {submissionDetails.name}</Text>
              <Text><strong>Description:</strong> {submissionDetails.description}</Text>
              <Text><strong>Submission Date:</strong> {submissionDetails.submissionDate}</Text>
              <Text><strong>Status:</strong> {submissionDetails.status || 'N/A'}</Text>
              <Divider my={2} />
              <Text><strong>File Path:</strong> {submissionDetails.filePath}</Text>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModal}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        )}

        {/* Modal for reviewing submissions */}
        {submissionDetails && (
          <Modal show={showReviewModal} onHide={handleCloseReviewModal} centered>
            <Modal.Header closeButton>
              <Modal.Title>Review Submission</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group className="mb-3" controlId="reviewText">
                  <Form.Label>Review Text</Form.Label>
                  {/* <CKEditor
                    editor={ClassicEditor}
                    data={reviewText}
                    onChange={(event, editor) => {
                      const data = editor.getData();
                      setReviewText(data);
                    }}
                  /> */}

                  <CKEditor
                    editor={ClassicEditor}
                    data="<p>Type something here...</p>"
                    onChange={(event, editor) => {
                      const data = editor.getData();
                      setContent(data);
                    }}
                  />
                  <h2>Output:</h2>
                  <div style={{ border: '1px solid #ddd', padding: '10px', marginTop: '10px' }}>
                    <div dangerouslySetInnerHTML={{ __html: content }} />
                  </div>
                  <div style={{ marginTop: "20px", padding: "10px", border: "1px solid #ccc" }}>
                    <h3>Preview:</h3>
                    <div dangerouslySetInnerHTML={{ __html: content }} />
                  </div>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="rating">
                  <Form.Label>Rating</Form.Label>

                  <Select
                    id="rating-level"
                    placeholder="Select rating level"
                    value={selectedRating}
                  // onChange={handleSelectChange}
                  >
                    {ratingLevel.length > 0 ? (
                      ratingLevel.map((level) => (
                        <option key={level.id} value={level.id}>
                          {level.name}
                        </option>
                      ))
                    ) : (
                      <option value="" disabled>
                        No rating levels available
                      </option>
                    )}
                  </Select>

                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseReviewModal}>
                Cancel
              </Button>
              <Button variant="primary" onClick={handleSubmitReview}>
                Submit Review
              </Button>
            </Modal.Footer>
          </Modal>
        )}
      </Container>
    </ChakraProvider>
  );
};

export default ListSubmission;
