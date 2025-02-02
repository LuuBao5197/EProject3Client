import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getStaffDetails } from '../../API/getAdminStaff';

const AdminStaffDetail = () => {
  const { id } = useParams(); // Lấy ID từ URL
  const [staff, setStaff] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const data = await getStaffDetails(id); // Gọi API lấy chi tiết Staff
        setStaff(data);
        console.log(data); // Kiểm tra dữ liệu trả về từ API
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStaff();
  }, [id]);

  if (loading) return <div className="alert alert-info text-center">Loading...</div>;
  if (error) return <div className="alert alert-danger text-center">Error: {error}</div>;

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Staff Details</h1>
      <div className="card shadow-lg">
        <div className="card-body">
          <div className="row">
            <div className="col-md-6 mb-4">
              {staff.user?.imagepath ? (
                <img
                  src={`http://localhost:5190${staff.user.imagepath}`}
                  alt="Staff"
                  className="img-fluid rounded shadow-sm"
                  style={{ width: '200px', height: '200px', objectFit: 'cover' }}
                />
              ) : (
                <div className="alert alert-warning">No image available</div>
              )}
              <p><strong>ID:</strong> {staff.id || 'N/A'}</p>
              <p><strong>Name:</strong> {staff.user?.name || 'N/A'}</p>
              <p><strong>Email:</strong> {staff.user?.email || 'N/A'}</p>
              <p><strong>Phone:</strong> {staff.user?.phone || 'N/A'}</p>
              <p><strong>Role:</strong> {staff.user?.role || 'N/A'}</p>
              <p><strong>Address:</strong> {staff.user?.address || 'N/A'}</p>
            </div>
            <div className="col-md-6 mb-4">
              <p><strong>Join Date:</strong> {staff.joinDate ? new Date(staff.joinDate).toLocaleDateString() : 'N/A'}</p>
              <p><strong>Status:</strong> <span className={staff.user?.status ? "text-success" : "text-danger"}>{staff.user?.status ? 'Inactive' : 'Active'}</span></p>
            </div>
          </div>

          {/* Hiển thị thông tin về các lớp */}
          <div className="mt-4">
            <h5>Classes</h5>
            <ul className="list-group">
              {staff.classes?.length > 0 ? (
                staff.classes.map((classItem, index) => (
                  <li key={classItem.id || index} className="list-group-item">
                    {classItem.name} - Year: {classItem.year} - Total Students: {classItem.totalStudent}
                  </li>
                ))
              ) : (
                <li className="list-group-item">No classes found</li>
              )}
            </ul>
          </div>

          {/* Hiển thị thông tin về các môn học */}
          <div className="mt-4">
            <h5>Subjects</h5>
            <ul className="list-group">
              {staff.staffSubjects?.length > 0 ? (
                staff.staffSubjects.map((subject, index) => (
                  <li key={subject.id || index} className="list-group-item">
                    {subject.subject?.name || 'N/A'}
                  </li>
                ))
              ) : (
                <li className="list-group-item">No subjects found</li>
              )}
            </ul>
          </div>

          {/* Hiển thị thông tin về các bằng cấp */}
          <div className="mt-4">
            <h5>Qualifications</h5>
            <ul className="list-group">
              {staff.staffQualifications?.length > 0 ? (
                staff.staffQualifications.map((qualification, index) => (
                  <li key={qualification.id || index} className="list-group-item">
                    {qualification.qualification?.name || 'N/A'}
                  </li>
                ))
              ) : (
                <li className="list-group-item">No qualifications found</li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminStaffDetail;
