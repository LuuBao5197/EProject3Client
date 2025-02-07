import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

const Carousel = () => {
  const carouselStyle = {
    width: "100vw", // Chiều rộng toàn màn hình
    height: "80vh", // Chiều cao chiếm 80% màn hình
  };

  const imageStyle = {
    width: "100%",
    height: "100%",
    objectFit: "cover", // Giữ tỉ lệ ảnh đẹp, không bị méo
  };

  return (
    <div style={carouselStyle}>
      <div id="heroCarousel" className="carousel slide" data-bs-ride="carousel">
        {/* Indicators */}
        <div className="carousel-indicators">
          <button type="button" data-bs-target="#heroCarousel" data-bs-slide-to="0" className="active"></button>
          <button type="button" data-bs-target="#heroCarousel" data-bs-slide-to="1"></button>
          <button type="button" data-bs-target="#heroCarousel" data-bs-slide-to="2"></button>
        </div>

        {/* Carousel Items */}
        <div className="carousel-inner" style={{ height: "100%" }}>
          <div className="carousel-item active">
            <img src="/images/banner1.png" alt="Slide 1" style={imageStyle} />
            <div className="carousel-caption">
              <h2>Welcome to our website</h2>
              <p>Experience great learning services today!</p>
            </div>
          </div>
          <div className="carousel-item">
            <img src="/images/banner2.png" alt="Slide 2" style={imageStyle} />
            <div className="carousel-caption">
              <h2>Quality events</h2>
              <p>Experience events to hone your skills</p>
            </div>
          </div>
          <div className="carousel-item">
            <img src="/images/banner3.png" alt="Slide 3" style={imageStyle} />
            <div className="carousel-caption">
              <h2>Special study promotions</h2>
              <p>Don't miss out on attractive offers</p>
            </div>
          </div>
        </div>

        {/* Left and right controls */}
        <button className="carousel-control-prev" type="button" data-bs-target="#heroCarousel" data-bs-slide="prev">
          <span className="carousel-control-prev-icon"></span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#heroCarousel" data-bs-slide="next">
          <span className="carousel-control-next-icon"></span>
        </button>
      </div>
    </div>
  );
};

export default Carousel;
