import React from "react";
import Sidebar from "./SideBar";
import Header from "./Header";

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Sidebar />
      <div className="main-content">
        <Header />
        <div className="content">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
