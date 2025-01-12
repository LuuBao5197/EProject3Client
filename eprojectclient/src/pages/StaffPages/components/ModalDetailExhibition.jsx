import React, { memo } from "react";

const Modal = memo(({ exhibition, onClose }) => {
  if (!exhibition) return null; // Không render modal nếu không có exhibition được chọn

  return (
    <div
      className="modal fade show d-block"
      tabIndex="-1"
      role="dialog"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    >
      <div className="modal-dialog">
        <div className="modal-content text-primary">
          <div className="modal-header">
            <h5 className="modal-title">Exhibition Details</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <p><strong>Name:</strong> {exhibition.name}</p>
            <p><strong>Start Date:</strong> {exhibition.startDate}</p>
            <p><strong>End Date:</strong> {exhibition.endDate}</p>
            <p><strong>Location:</strong> {exhibition.location}</p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});

export default Modal;