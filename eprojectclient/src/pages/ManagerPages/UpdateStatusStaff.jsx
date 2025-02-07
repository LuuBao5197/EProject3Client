import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getStaffDetails} from '../../API/getAdminStaff';

const AdminStaffStatus = () => {
  const { id } = useParams(); // Lấy ID từ URL
  const [staff, setStaff] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const data = await getStaffDetails(id); // Gọi API lấy chi tiết nhân viên
        setStaff(data);
        console.log("Data trả về:", data); // Debug API response
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
      const response = await fetch(`http://localhost:5190/api/AdminStaff/${id}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }), // JSON body phải đúng format
      });

      if (!response.ok) {
        const errorText = await response.text(); // Nhận thông báo lỗi từ API
        throw new Error(errorText || "Failed to update status");
      }

      const updatedData = await response.json();
      setStaff((prev) => ({
        ...prev,
        user: {
          ...prev.user,
          status: newStatus, // Cập nhật trạng thái trên UI
        },
      }));
    } catch (err) {
      setError(err.message);
      console.error("Error updating status:", err.message);
    }
  };


  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const imageUrl = staff?.user?.imagepath ? `http://localhost:5190${staff.user.imagepath}` : null;

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Staff Status & Details</h2>
      {staff && (
        <div>
          <div className="row mb-4">
            <div className="col-md-6">
              <div className="card shadow-sm border-light rounded p-4">
                {imageUrl ? (
                  <img src={imageUrl} alt="Staff" className="img-fluid rounded shadow-sm" style={{ width: '200px', height: '250px', objectFit: 'cover' }} />
                ) : (
                  <div className="alert alert-warning">No image available</div>
                )}
                <p><strong>ID:</strong> <span className="text-muted">{staff.id}</span></p>
                <p><strong>Name:</strong> <span className="text-muted">{staff.user?.name || 'N/A'}</span></p>
              </div>
            </div>

            <div className="col-md-6">
              <div className="card shadow-sm border-light rounded p-4">
                <p><strong>Email:</strong> <span className="text-muted">{staff.user?.email || 'N/A'}</span></p>
                
                <p><strong>Dob:</strong> <span className="text-muted">{staff.user?.dob ? new Date(staff.user.dob).toLocaleDateString() : 'N/A'}</span></p>
                                <p><strong>Phone:</strong> <span className="text-muted">{staff.user?.phone || 'N/A'}</span></p>
                <p><strong>Address:</strong> <span className="text-muted">{staff.user?.address || 'N/A'}</span></p>
                <p><strong>Role:</strong> <span className="text-muted">{staff.user?.role || 'N/A'}</span></p>
                <p><strong>Join Date:</strong> <span className="text-muted">{staff.joinDate ? new Date(staff.joinDate).toLocaleDateString() : 'N/A'}</span></p>
                <p><strong>Status:</strong> <span className={staff.user?.status ? "text-success" : "text-danger"}>{staff.user?.status ? 'Active' : 'Inactive'}</span></p>
              </div>
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-md-6">
              <div className="card shadow-sm border-light rounded p-4">
                <h5>Change Status</h5>
                <button
                  className="btn btn-success me-2"
                  onClick={() => handleStatusChange(true)}
                  disabled={staff.user?.status} // Disable nếu đã Active
                >
                  Activate
                </button>
                
                
              </div>
            </div>
          </div>



          {/* Subjects Section */}
          <h3 className="mb-3">Subjects</h3>
          <ul className="list-group mb-3">
            {staff.staffSubjects && staff.staffSubjects.length > 0 ? (
              staff.staffSubjects.map((subject, index) => (
                <li className="list-group-item" key={subject.id || index}>
                  <p><strong>Subject Name:</strong> {subject.subject?.name || 'N/A'}</p>
                </li>
              ))
            ) : (
              <li className="list-group-item">No subjects found</li>
            )}
          </ul>

          {/* Qualifications Section */}
          <h3 className="mb-3">Qualifications</h3>
          <ul className="list-group">
            {staff.staffQualifications && staff.staffQualifications.length > 0 ? (
              staff.staffQualifications.map((qualification, index) => (
                <li className="list-group-item" key={qualification.id || index}>
                  <p><strong>Qualification:</strong> {qualification.qualification?.name || 'N/A'}</p>
                </li>
              ))
            ) : (
              <li className="list-group-item">No qualifications found</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AdminStaffStatus;
