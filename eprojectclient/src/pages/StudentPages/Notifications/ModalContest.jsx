import React, { useEffect, useState } from 'react';
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from 'mdb-react-ui-kit';
import { getOneContestById } from '../../../API/getOneContestById';
import { convertTime } from './ConvertFormatTime';

export default function ModalContest({ showModal, toggleModal, idContest }) {
  const [selectedContest, setSelectedContest] = useState('');

  const getOneContest = async () => {
    if (idContest) {
      try {
        const data = await getOneContestById(idContest);
        setSelectedContest(data);
        console.log(data);
      } catch (error) {
        console.error('Failed to fetch:', error);
      }
    }
  };

  // Fetch submission details when the modal opens or idSub changes
  useEffect(() => {
    if (showModal && idContest) {
      getOneContest();
    }
  }, [showModal, idContest]);

  return (
    <MDBModal open={showModal} onClose={toggleModal} tabIndex="-1">
      <MDBModalDialog scrollable>
        <MDBModalContent>
          <MDBModalHeader>
            <MDBModalTitle>Contest Detail</MDBModalTitle>
            <MDBBtn
              className="btn-close"
              color="none"
              onClick={toggleModal}
            ></MDBBtn>
          </MDBModalHeader>
          <MDBModalBody>
            {/* <p>Thông tin chi tiết</p> */}
            {selectedContest && (
              <>
                <p>Contest name: <strong>{selectedContest.name}</strong> </p>
                <p>Start Date: <strong>{convertTime(selectedContest.startDate)}</strong> </p>
                <p>End Date: <strong>{convertTime(selectedContest.endDate)}</strong> </p>
                <p>Create by: <strong>{selectedContest.organizer.user.name}</strong> </p>
                <p>Create at: <strong>{convertTime(selectedContest.createdAt)}</strong> </p>
                <p>Conditions: <strong className='text-danger'>{selectedContest.participationCriteria}</strong> </p>
                <p>Description: <strong>{selectedContest.description}</strong> </p>

              </>
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
