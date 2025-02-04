// ModalDetailExhibition.js
import React from 'react';
import { Icon } from "@chakra-ui/react";
import { MdEdit, MdDeleteOutline, MdSend } from "react-icons/md";
import { toast } from 'react-toastify';
import axios from 'axios';

const ModalDetailExhibition = ({ exhibition, onClose, onUpdate, onDelete, onSend }) => {
  const handleDelete = async () => {
    const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa triển lãm này?");
    if (!confirmDelete) return;

    try {
      const response = await axios.delete(`http://localhost:5190/api/Staff/DeleteExhibition/${exhibition.id}`);
      if (response.status === 200) {
        toast.success("Exhibition deleted successfully");
        onDelete(exhibition.id);
      } else {
        toast.error("Exhibition delete failed");
      }
    } catch (error) {
      toast.error("Exhibition delete failed");
    }
  };

  const handleSend = async () => {
    try {
      const result = await axios.patch(`http://localhost:5190/api/Staff/SendExhibitionForReview/${exhibition.id}`);
      toast.info("Send exhibition to approve successfully");
      onSend(exhibition.id);
    } catch (error) {
      toast.error("Something error occurs");
    }
  };

  const handleEdit = () => {
    onUpdate(exhibition.id);
  };

  return (
    <div className="modal fade show" style={{ display: "block" }} tabIndex="-1" role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{exhibition.name}</h5>
            <button type="button" className="close" onClick={onClose}>
              <span>&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <p><strong>Start Date:</strong> {exhibition.startDate}</p>
            <p><strong>End Date:</strong> {exhibition.endDate}</p>
            <p><strong>Location:</strong> {exhibition.location}</p>
            <p><strong>Status:</strong> {exhibition.status}</p>
            <p><strong>Phase:</strong> {exhibition.phase}</p>
          </div>
          <div className="modal-footer">
            <button className="btn btn-info" onClick={handleEdit}>
              <Icon as={MdEdit} width="20px" height="20px" />
              Edit
            </button>
            <button className="btn btn-danger" onClick={handleDelete}>
              <Icon as={MdDeleteOutline} width="20px" height="20px" />
              Delete
            </button>
            <button className="btn btn-danger" onClick={handleSend}>
              <Icon as={MdSend} width="20px" height="20px" />
              Send for Review
            </button>
            <button className="btn btn-secondary" onClick={onClose}>Close</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalDetailExhibition;
