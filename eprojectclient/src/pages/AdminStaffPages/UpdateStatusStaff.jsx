import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getStaffDetails, updateStaffStatus } from '../../API/getAdminStaff';

const AdminStaffStatus = () => {
  const { id } = useParams(); // Lấy ID từ URL
  const [staff, setStaff] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const data = await getStaffDetails(id); // Gọi API lấy chi tiết Staff
        setStaff(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStaff();
  }, [id]);

  const handleStatusChange = async (newStatus) => {
    try {
      const updatedStaff = await updateStaffStatus(id, newStatus); // Gọi API cập nhật trạng thái
      setStaff(updatedStaff);
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Staff Status</h2>
      {staff && (
        <div>
          <div className="row mb-4">
            <div className="col-md-6">
              <div className="card shadow-sm border-light rounded p-4">
                <p><strong>ID:</strong> <span className="text-muted">{staff.id}</span></p>
                <p><strong>Name:</strong> <span className="text-muted">{staff.user?.name || 'N/A'}</span></p>
                <p><strong>Email:</strong> <span className="text-muted">{staff.user?.email || 'N/A'}</span></p>
                <p><strong>Status:</strong> <span className={staff.user?.status ? "text-danger" : "text-success"}>{staff.user?.status ? 'Inactive' : 'Active'}</span></p>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <div className="card shadow-sm border-light rounded p-4">
                <h5>Change Status</h5>
                <button
                  className="btn btn-success me-2"
                  onClick={() => handleStatusChange(false)}
                  disabled={!staff.user?.status}
                >
                  Activate
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleStatusChange(true)}
                  disabled={staff.user?.status}
                >
                  Deactivate
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminStaffStatus;