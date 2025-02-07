import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getClassById } from '../../API/GetClass';

const AdminClassDetail = () => {
  const { id } = useParams();
  const [classDetail, setClassDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClassDetail = async () => {
      
      try {
        const data = await getClassById(id);
        setClassDetail(data);
        console.log(data);
        
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchClassDetail();
  }, [id]);

  if (loading) return <div className="text-center mt-5"><div className="spinner-border" role="status"></div></div>;
  if (error) return <div className="alert alert-danger mt-5">Error: {error}</div>;

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Class Detail</h2>
      {classDetail ? (
        <div>
          {/* Class Information Card */}
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title">Class Information</h5>
              <p><strong>Class Name:</strong> {classDetail.name}</p>
              <p><strong>Total Students:</strong> {classDetail.totalStudent}</p>
              <p><strong>Year:</strong> {classDetail.year}</p>
            </div>
          </div>

          {/* Students List */}
          <h3>Students List</h3>
          {classDetail.students && classDetail.students.length > 0 ? (
            <table className="table table-striped mt-3">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {classDetail.students.map((student, index) => (
                  <tr key={student.id}>
                    <th scope="row">{index + 1}</th>
                    <td>{student.name}</td>
                    <td>{student.email}</td>
                    <td>
                      <Link to={`/admin/Student-Detail/${student.id}`} className="btn btn-info btn-sm">
                        Detail
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-warning">No students in this class.</p>
          )}
        </div>
      ) : (
        <p className="text-danger">No class details found.</p>
      )}
    </div>
  );
};

export default AdminClassDetail;
