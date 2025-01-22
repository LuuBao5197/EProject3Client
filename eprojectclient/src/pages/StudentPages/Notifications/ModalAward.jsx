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
import { getStudentIdDemo } from '../../../API//getStudentIdDemo';
import { getAwardReceived } from '../../../API/getAwardReceived';

export default function ModalAward({ showModal, toggleModal, awardId }) {
  const [awards, setAwards] = useState([]); // Danh sách tất cả các giải thưởng
  const [selectedAward, setSelectedAward] = useState(null); // Giải thưởng được chọn

  // Lấy dữ liệu từ API
  useEffect(() => {
    const fetchAwardReceived = async () => {
      try {
        const data = await getAwardReceived(getStudentIdDemo());
        setAwards(data); // Cập nhật danh sách giải thưởng
        console.log('Fetched Awards:', data);
      } catch (error) {
        console.error('Failed to fetch awards:', error);
      }
    };

    if (showModal) {
      fetchAwardReceived();
    }
  }, [showModal]);

  // Lọc giải thưởng theo `awardId`
  useEffect(() => {
    if (awardId && awards.length > 0) {
      const award = awards.find(a => a.awardId === awardId); // Tìm giải thưởng khớp với `awardId`
      setSelectedAward(award || null); // Nếu không tìm thấy, đặt null
      console.log('Selected Award:', award);
    }
  }, [awardId, awards]);

  return (
    <MDBModal open={showModal} onClose={toggleModal} tabIndex="-1">
      <MDBModalDialog scrollable>
        <MDBModalContent>
          <MDBModalHeader>
            <MDBModalTitle>Award Detail</MDBModalTitle>
            <MDBBtn
              className="btn-close"
              color="none"
              onClick={toggleModal}
            ></MDBBtn>
          </MDBModalHeader>
          <MDBModalBody>
            {selectedAward ? (
              <>
                <p>Award name: <strong>{selectedAward.award.name}</strong></p>
                <p>Contest: <strong>{selectedAward.award.contest.name}</strong></p>
                <p>Description: <strong>{selectedAward.award.contest.description}</strong></p>
                <p>Value: <strong className='text-danger'>{selectedAward.award.value} $</strong></p>
                <p>Create by: <strong>{selectedAward.award.contest.organizer.user.name}</strong></p>
              </>
            ) : (
              <p>No award selected.</p>
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
