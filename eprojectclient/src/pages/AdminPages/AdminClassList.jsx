import React, { useEffect, useState } from 'react';
import { getAllClasses } from '../../API/GetClass';
import { Link } from 'react-router-dom'; // Thêm thư viện Link nếu sử dụng React Router

const Adminlayout = () => {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const data = await getAllClasses();
        setClasses(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchClasses();
  }, []);

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-danger">Error: {error}</p>;

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Class List</h2>
      <div className="row">
        {classes.map((classItem) => (
          <div key={classItem.id} className="col-md-4 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{classItem.name}</h5>
                <p className="card-text"><strong>Total Students:</strong> {classItem.totalStudent}</p>
                <p className="card-text"><strong>Year:</strong> {classItem.year}</p>
                <Link to={`/admin/Class-Detail/${classItem.id}`} className="btn btn-primary">
                  Detail
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Adminlayout;
