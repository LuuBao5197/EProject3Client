import React, { useState, useEffect } from 'react';
import './HomePage.css'; // File CSS cho giao diện
import CardHome from './components/CardHome';


const HomePage = () => {
  const [contests, setContests] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('ongoing');

  // Lấy dữ liệu giả lập từ API (hoặc hardcode)
  useEffect(() => {
    // Fake API data
    const fetchData = async () => {
      const data = [
        { id: 1, title: 'Toán', startTime: '12h46 20/8/2029', endTime: '12h46 20/8/2029', image: 'image1.jpg' },
        { id: 2, title: 'Lịch sử', startTime: '08h31 20/8/2030', endTime: '08h31 20/8/2030', image: 'image2.jpg' },
        { id: 3, title: 'Vật lý', startTime: '10h00 15/9/2028', endTime: '12h00 15/9/2028', image: 'image3.jpg' },
      ];
      setContests(data);
    };

    fetchData();
  }, []);

  // Lọc dữ liệu theo tên hoặc trạng thái
  const filteredContests = contests.filter((contest) =>
    contest.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <header className="header">
        <input
          type="text"
          className="search-bar"
          placeholder="Tìm kiếm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="filter-dropdown"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="ongoing">Cuộc thi đang diễn ra</option>
          <option value="ended">Cuộc thi đã kết thúc</option>
        </select>
      </header>

      <div className="cards">
        <CardHome/>
        {filteredContests.map((contest) => (
          <div className="card" key={contest.id}>
            <img src={contest.image} alt={contest.title} className="card-image" />
            <div className="card-content">
              <h3>{contest.title}</h3>
              <p>Bắt đầu: {contest.startTime}</p>
              <p>Kết thúc: {contest.endTime}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
