import React from "react";
import ExhibitionList from "./components/ExhibitionList"; // Import ExhibitionList
import NavbarHome from "./components/navbar/NavbarHome";
import FooterHome from "./components/footer/FooterHome";
import ContestList from "./components/ContestList";
import StudentAward from "./components/StudentAward";
import Carousel from "./components/Carousel";


const HomePage = () => {
  return (
    <div className="container-fluid">
      <NavbarHome />
      <Carousel />
      <div className="container mt-3">
        <StudentAward/>
        <ExhibitionList />
        <ContestList />
     </div>
     <FooterHome />
    </div>

  );
};

export default HomePage;
