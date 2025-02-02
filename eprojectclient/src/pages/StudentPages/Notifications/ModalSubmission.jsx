import React, { useEffect, useState } from "react";
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from "mdb-react-ui-kit";
import { getOneSubmissionById } from "../../../API/getOneSubmissionById";
import { getStudentIdDemo } from "../../../API/getStudentIdDemo";
import Rating from "react-rating";
import { convertTime } from "./ConvertFormatTime";

export default function ModalSubmission({ showModal, toggleModal, idSub }) {
  const [mySubmission, setMySubmission] = useState(null);
  const [studentId, setStudentId] = useState(null);

  const getSub = async (studentId) => {
    if (idSub && studentId) {
      try {
        const data = await getOneSubmissionById(studentId, idSub);
        setMySubmission(data);
        // console.log(data);
      } catch (error) {
        console.error("Failed to fetch:", error);
      }
    }
  };

  const fetchStudentId = async () => {
    try {
      const student = await getStudentIdDemo();
      setStudentId(student);
    } catch (error) {
      console.error("Failed to fetch studentId:", error);
    }
  };

  // Fetch studentId when the component mounts and fetch submission after that
  useEffect(() => {
    if (showModal) {
      fetchStudentId();
    }
  }, [showModal]);

  useEffect(() => {
    if (showModal && idSub && studentId) {
      getSub(studentId);
    }
  }, [showModal, idSub, studentId]);

  return (
    <MDBModal open={showModal} onClose={toggleModal} tabIndex="-1">
      <MDBModalDialog scrollable>
        <MDBModalContent>
          <MDBModalHeader>
            <MDBModalTitle>Information Detail</MDBModalTitle>
            <MDBBtn
              className="btn-close"
              color="none"
              onClick={toggleModal}
            ></MDBBtn>
          </MDBModalHeader>
          <MDBModalBody className="text-center">
            {mySubmission ? (
              <>
                <p>
                  Contest name: <strong>{mySubmission.contest?.name}</strong>
                </p>
                <p>
                  Start date:{" "}
                  <strong>{convertTime(mySubmission.contest?.startDate)}</strong>
                </p>
                <p>
                  End date:{" "}
                  <strong>{convertTime(mySubmission.contest?.endDate)}</strong>
                </p>
                <p>
                  Organizer:{" "}
                  <strong>
                    {mySubmission.contest?.organizer?.user?.name}
                  </strong>
                </p>
                <p>
                  Submission name: <strong>{mySubmission.name}</strong>
                </p>
                <p>
                  Description: <strong>{mySubmission.description}</strong>
                </p>
                <p>
                  File:
                  <img
                    width={150}
                    src={mySubmission.filePath}
                    className="img-thumbnail d-block mx-auto"
                    alt="Submission file"
                  />
                </p>
                <p>
                  Vote:
                  <Rating
                    initialRating={mySubmission.submissionReviews?.ratingLevel ?? 0}
                    emptySymbol="fa fa-star-o fa-2x"
                    fullSymbol="fa fa-star fa-2x"
                    readonly
                  />
                </p>

                <p>
                  Comment:
                  {mySubmission.submissionReviews?.reviewText ? (
                    <strong>{mySubmission.submissionReviews.reviewText}</strong>
                  ) : (
                    <span className="text-danger fw-bold">No comment</span>
                  )}
                </p>
              </>
            ) : (
              <p>Loading...</p>
            )}
          </MDBModalBody>
          <MDBModalFooter>
            <MDBBtn color="secondary" onClick={toggleModal}>
              Close
            </MDBBtn>
          </MDBModalFooter>
        </MDBModalContent>
      </MDBModalDialog>
    </MDBModal>
  );
}
