import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GetStudentDetails } from "../../API/getAdminStudent";

const AdminStudentDetail = () => {
  const { id } = useParams();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudentDetails = async () => {
      try {
        const data = await GetStudentDetails(id);
        setStudent(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchStudentDetails();
  }, [id]);

  if (loading) return <div className="alert alert-info text-center">Loading...</div>;
  if (error) return <div className="alert alert-danger text-center">Error: {error}</div>;

  if (!student) return <div className="alert alert-warning text-center">Student not found</div>;
  const imageUrl = `http://localhost:5190${student.user.imagepath}`;

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Student Details</h1>
      <div className="card shadow-lg">
        <div className="card-body">
          <div className="row">
            <div className="col-md-6 mb-4">
              {student.user?.imagepath ? (
                <img src={imageUrl} alt="Student" className="img-fluid rounded shadow-sm" style={{ width: '200px', height: '250px', objectFit: 'cover' }} />
              ) : (
                <div className="alert alert-warning">No image available</div>
              )}


              <p><strong>ID:</strong> {student.id || 'N/A'}</p>
              <p><strong>Name:</strong> {student.user?.name || 'N/A'}</p>

            </div>
            <div className="col-md-6 mb-4">
              <p><strong>Email:</strong> {student.user?.email || 'N/A'}</p>
              <p><strong>Date of Birth:</strong> {student.user?.dob ? new Date(student.user.dob).toLocaleDateString() : 'N/A'}</p>
              <p><strong>Phone:</strong> {student.user?.phone || 'N/A'}</p>
              <p><strong>Password:</strong> {student.user?.password || 'N/A'}</p>
              <p><strong>Enrollment Date:</strong> {student.enrollmentDate ? new Date(student.enrollmentDate).toLocaleDateString() : 'N/A'}</p>
              <p><strong>Parent Name:</strong> {student.parentName || 'N/A'}</p>
              <p><strong>Parent Phone:</strong> {student.parentPhoneNumber || 'N/A'}</p>
              <p><strong>Address:</strong> {student.user?.address || 'N/A'}</p>
            </div>
          </div>

          <div className="mt-4">
            <h5>Classes</h5>
            <ul className="list-group">
              {student.studentClasses?.length > 0 ? (
                student.studentClasses.map((sc, index) => (
                  <li key={sc.classId || index} className="list-group-item">
                    {sc.class?.name || 'N/A'}
                  </li>
                ))
              ) : (
                <li className="list-group-item">No classes found</li>
              )}
            </ul>
          </div>

          <div className="mt-4">
            <h5>Submissions</h5>
            <ul className="list-group">
              {student.submissions?.length > 0 ? (
                student.submissions.map((sub, index) => (
                  <li key={sub.id || index} className="list-group-item">
                    {sub.title} - Date: {new Date(sub.submissionDate).toLocaleDateString()} - Grade: {sub.grade}
                  </li>
                ))
              ) : (
                <li className="list-group-item">No submissions found</li>
              )}
            </ul>
          </div>

          <div className="mt-4">
            <h5>Awards</h5>
            <ul className="list-group">
              {student.studentAwards?.length > 0 ? (
                student.studentAwards.map((award, index) => (
                  <li key={award.id || index} className="list-group-item">
                    {award.awardName} - Date: {new Date(award.dateReceived).toLocaleDateString()}
                  </li>
                ))
              ) : (
                <li className="list-group-item">No awards found</li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminStudentDetail;
