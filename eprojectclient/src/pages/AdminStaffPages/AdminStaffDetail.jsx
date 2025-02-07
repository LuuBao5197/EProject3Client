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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  const imageUrl = `http://localhost:5190${staff.user.imagepath}`;
  return (
    <div className="container mt-5">
      <h2 className="mb-4">Staff Details</h2>
      {staff && (
        <div>
          <div className="row mb-4">
            <div className="col-md-6">
              {/* Thông tin nhân viên */}
              <div className="card shadow-sm border-light rounded p-4">
                {staff.user?.imagepath ? (
                  <img src={imageUrl} alt="Student" className="img-fluid rounded shadow-sm" style={{ width: '200px', height: '250px', objectFit: 'cover' }} />
                ) : (
                  <div className="alert alert-warning">No image available</div>
                )}
                <p><strong>ID:</strong> <span className="text-muted">{staff.id}</span></p>
                <p><strong>Name:</strong> <span className="text-muted">{staff.user?.name || 'N/A'}</span></p>


              </div>
            </div>

            <div className="col-md-6">
              {/* Thông tin tham gia và trạng thái */}
              <div className="card shadow-sm border-light rounded p-4">
                <p><strong>Email:</strong> <span className="text-muted">{staff.user?.email || 'N/A'}</span></p>
                <p><strong>PassWord:</strong> <span className="text-muted">{staff.user?.password || 'N/A'}</span></p>
                <p><strong>Dob:</strong> <span className="text-muted">{staff.user?.dob ? new Date(staff.user.dob).toLocaleDateString() : 'N/A'}</span></p>
                <p><strong>isReviewer:</strong> <span className={staff.isReviewer ? "text-success" : "text-danger"}>{staff.isReviewer ? 'True' : 'False'}</span></p>
                <p><strong>Phone:</strong> <span className="text-muted">{staff.user?.phone || 'N/A'}</span></p>
                <p><strong>Address:</strong> <span className="text-muted">{staff.user?.address || 'N/A'}</span></p>
                <p><strong>Role:</strong> <span className="text-muted">{staff.user?.role || 'N/A'}</span></p>

                <p><strong>Join Date:</strong> <span className="text-muted">{staff.joinDate ? new Date(staff.joinDate).toLocaleDateString() : 'N/A'}</span></p>
                <p><strong>Status:</strong> <span className={staff.user?.status ? "text-success" : "text-danger"}>{staff.user?.status ? 'Active' : 'Inactive'}</span></p>
              </div>
            </div>
          </div>

          {/* Hiển thị thông tin về các lớp */}
          <h3 className="mb-3">Classes</h3>
          <div className="row">
            {staff.classes && staff.classes.length > 0 ? (
              staff.classes.map((classItem, index) => (
                <div className="col-md-4" key={classItem.id || index}>
                  <div className="card mb-3 shadow-sm">
                    <div className="card-body">
                      <h5 className="card-title">{classItem.name}</h5>
                      <p><strong>Year:</strong> {classItem.year}</p>
                      <p><strong>Total Students:</strong> {classItem.totalStudent}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="alert alert-warning">No classes found</div>
            )}
          </div>

          {/* Hiển thị thông tin về các môn học */}
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

          {/* Hiển thị thông tin về các bằng cấp */}
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

export default AdminStaffDetail;
