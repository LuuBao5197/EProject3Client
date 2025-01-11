import React from "react";
import "./Card.css"; // Đường dẫn tới file CSS

const CardHome = () => {
  return (
    <div className="card-container">
      <div className="card-left">
        <div className="banner">
          <p>THAM GIA NGAY</p>
          <h1>THI TRỰC TUYẾN</h1>
          <h2>MYALOHA.VN</h2>
          <button className="search-button">Tìm kiếm cuộc thi bạn tham gia</button>
        </div>
      </div>
      <div className="card-right">
        <h3>Toán</h3>
        <ul>
          <li><span>Bắt đầu:</span> 12h46 20/8/2029</li>
          <li><span>Kết thúc:</span> 12h46 20/8/2029</li>
        </ul>
      </div>
    </div>
  );
};

export default CardHome;
