import React from "react";
import ExhibitionList from "./components/ExhibitionList"; // Import ExhibitionList
import NavbarHome from "./components/navbar/NavbarHome";
import FooterHome from "./components/footer/FooterHome";
import ContestList from "./components/ContestList";
import StudentAward from "./components/StudentAward";
import ContestStats from "./components/ContestStats";

const HomePage = () => {
  return (
    <div className="container">
      <NavbarHome />
        <ContestStats/>
        <StudentAward/>
        <ExhibitionList />
        <ContestList />
      <FooterHome />
     
    </div>
  );
};

export default HomePage;
