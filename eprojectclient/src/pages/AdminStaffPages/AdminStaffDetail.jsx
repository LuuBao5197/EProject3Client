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

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Staff Details</h2>
      {staff && (
        <div>
          <div className="row mb-4">
            <div className="row mb-5">
              {/* Thông tin nhân viên */}
              <div className="col-md-6">
                <div className="card shadow-sm border-light rounded p-4">
                  <h5 className="card-title mb-3">Personal Information</h5>
                  <p><strong>ID:</strong> <span className="text-muted">{staff.id}</span></p>
                  <p><strong>Name:</strong> <span className="text-muted">{staff.user?.name}</span></p>
                  <p><strong>Email:</strong> <span className="text-muted">{staff.user?.email}</span></p>
                  <p><strong>Phone:</strong> <span className="text-muted">{staff.user?.phone}</span></p>
                  <p><strong>Role:</strong> <span className="text-muted">{staff.user?.role}</span></p>
                </div>
              </div>

              {/* Thông tin tham gia và trạng thái */}
              <div className="col-md-6">
                <div className="card shadow-sm border-light rounded p-4">
                  <h5 className="card-title  mb-3">Work Information</h5>
                  <p><strong>Join Date:</strong> <span className="text-muted">{new Date(staff.joinDate).toLocaleDateString()}</span></p>
                  <p><strong>Status:</strong> <span className={staff.user?.status ? "text-success" : "text-danger"}>{staff.user?.status ? 'Inactive' : 'Active'}</span></p>
                </div>
              </div>
            </div>

          </div>

          {/* Hiển thị thông tin về các lớp */}
          <h3 className="mb-3">Classes</h3>
          <div className="row">
            {staff.classes.map((classItem, index) => (
              <div className="col-md-4" key={classItem.id || index}>
                <div className="card mb-3 shadow-sm">
                  <div className="card-body">
                    <h5 className="card-title">{classItem.name}</h5>
                    <p><strong>Year:</strong> {classItem.year}</p>
                    <p><strong>Total Students:</strong> {classItem.totalStudent}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Hiển thị thông tin về các môn học */}
          <h3 className="mb-3">Subjects</h3>
          <ul className="list-group mb-3">
            {staff.staffSubjects.map((subject, index) => (
              <li className="list-group-item" key={subject.id || index}>
                <p><strong>Subject Name:</strong> {subject.subject?.name}</p>
              </li>
            ))}
          </ul>

          {/* Hiển thị thông tin về các bằng cấp */}
          <h3 className="mb-3">Qualifications</h3>
          <ul className="list-group">
            {staff.staffQualifications.map((qualification, index) => (
              <li className="list-group-item" key={qualification.id || index}>
                <p><strong>Qualification:</strong> {qualification.qualification?.name}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AdminStaffDetail;
