import React from "react";
import ExhibitionList from "./components/ExhibitionList"; // Import ExhibitionList
import NavbarHome from "./components/navbar/NavbarHome";
import FooterHome from "./components/footer/FooterHome";
import ContestList from "./components/ContestList";
import StudentAward from "./components/StudentAward";


const HomePage = () => {
  return (
    <div className="container">
      <NavbarHome />
        <StudentAward/>
        <ExhibitionList />
        <ContestList />
      <FooterHome />
     
    </div>
  );
};

export default HomePage;
