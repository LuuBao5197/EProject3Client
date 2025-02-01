import React, { useEffect, useState } from 'react';
import axios from 'axios';

function TopStudentAwards() {
  const [data, setData] = useState([]); // Chứa danh sách dữ liệu từ API
  const [loading, setLoading] = useState(true); // Trạng thái tải dữ liệu
  const [error, setError] = useState(null); // Trạng thái lỗi

  // Gọi API khi component được render
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5190/api/Award/GetStudentsWithAwards');
        const allData = response.data || []; // Lấy toàn bộ dữ liệu từ API

        setData(allData); // Gán toàn bộ dữ liệu vào state
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError('Lỗi khi tải dữ liệu!');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Hiển thị trạng thái đang tải
  if (loading) return;

  // Hiển thị thông báo lỗi nếu xảy ra lỗi
  if (error) return <div>{error}</div>;

  // Hiển thị thông báo nếu không có dữ liệu
  if (!Array.isArray(data) || data.length === 0) {
    return;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ textAlign: 'center' }}>Student Award</h1>
      <table border="1" style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#f2f2f2' }}>
            <th>#</th>
            <th>Student Name</th>
            <th>Awards</th>
            <th>Contest Name</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.studentName}</td>
              <td>{item.awardName}</td>
              <td>{item.contestName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TopStudentAwards;
