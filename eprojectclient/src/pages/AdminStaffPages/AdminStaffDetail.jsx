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
    <div>
      <h2>Staff Details</h2>
      {staff && (
        <div>
          <p><strong>ID:</strong> {staff.id}</p>
          <p><strong>Name:</strong> {staff.user.name}</p>
          <p><strong>Email:</strong> {staff.user.email}</p>
          <p><strong>Phone:</strong> {staff.user.phone}</p>
          <p><strong>Role:</strong> {staff.user.role}</p>
          <p><strong>Join Date:</strong> {new Date(staff.joinDate).toLocaleDateString()}</p>
          <p><strong>Status:</strong> {staff.user.status ? 'Active' : 'Inactive'}</p>

          {/* Hiển thị thông tin về các lớp */}
          <h3>Classes</h3>
          {staff.classes && staff.classes.length > 0 ? (
            <ul>
              {staff.classes.map((classItem) => (
                <li key={classItem.id}>
                  <p><strong>Class Name:</strong> {classItem.name}</p>
                  <p><strong>Year:</strong> {classItem.year}</p>
                  <p><strong>Total Students:</strong> {classItem.totalStudent}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No classes assigned.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminStaffDetail;
