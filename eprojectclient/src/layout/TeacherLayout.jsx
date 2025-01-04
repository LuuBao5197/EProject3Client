import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './TeacherLayout.module.css'; // Import your CSS Module

const TeacherLayout = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);
  const [isTopbarCollapsed, setIsTopbarCollapsed] = useState(true);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const toggleTopbar = () => {
    setIsTopbarCollapsed(!isTopbarCollapsed);
  };

  return (
    <div className={`container-fluid ${styles.teacherLayout} ${isDarkMode ? styles.darkMode : styles.lightMode}`}>
      <div className="row">
        {/* Sidebar for tablet and larger screens */}
        <aside className={`d-none d-md-block col-md-3 col-lg-2 ${styles.sidebar}`}>
          <h2>Teacher Management</h2>
          <nav>
            <ul>
              <li><Link to="/students">Quản lý sinh viên</Link></li>
              <li><Link to="/staff/contest/add">Quản lý cuộc thi</Link></li>
              <li><Link to="/records">Quản lý hồ sơ học tập</Link></li>
              <li><Link to="/awards">Quản lý giải thưởng</Link></li>
              <li><Link to="/exhibitions">Quản lý triển lãm</Link></li>
              <li><Link to="/designs">Quản lý thiết kế</Link></li>
            </ul>
          </nav>
        </aside>

        {/* Navbar for small screens (Topbar) */}
        <nav className={`navbar navbar-expand-md navbar-light bg-light d-md-none ${styles.navbar} mt-2`}>
          <button
            className="navbar-toggler"
            type="button"
            onClick={toggleTopbar}
            aria-controls="topbarMenu"
            aria-expanded={!isTopbarCollapsed}
            aria-label="Toggle topbar"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className={`collapse navbar-collapse ${isTopbarCollapsed ? '' : 'show'}`} id="topbarMenu">
            <ul className="navbar-nav me-auto"> {/* Aligning the menu to the left */}
              <li className="nav-item"><Link className="nav-link" to="/students">Quản lý sinh viên</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/staff/contest/add">Quản lý cuộc thi</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/records">Quản lý hồ sơ học tập</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/awards">Quản lý giải thưởng</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/exhibitions">Quản lý triển lãm</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/designs">Quản lý thiết kế</Link></li>
            </ul>
            <ul className="navbar-nav ms-auto"> {/* Aligning the buttons to the right */}
              <li className="nav-item">
                <button className="nav-link btn" onClick={toggleTheme}>
                  {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                </button>
              </li>
              <li className="nav-item">
                <button className="nav-link btn">Account</button>
              </li>
              <li className="nav-item">
                <button className="nav-link btn">Notification</button>
              </li>
              <li className="nav-item">
                <button className="nav-link btn text-danger">Log out</button>
              </li>
            </ul>
          </div>
        </nav>


        {/* Main Content Area */}
        <main className="col">
          {/* Top Menu */}
          <header className={`row ${styles.topMenu} py-2 px-3 align-items-center d-none d-md-flex`}>
            <div className="col d-flex justify-content-end gap-3">
              <button className="btn btn-primary">Notification</button>
              <button className="btn btn-secondary">Account</button>
              <button className="btn btn-danger">Log Out</button>
              <button className="btn btn-dark" onClick={toggleTheme}>
                {isDarkMode ? 'Light Mode' : 'Dark Mode'}
              </button>
            </div>
          </header>

          {/* Dynamic Content */}
          <section className={`row ${styles.contentArea} py-3 px-4 w-75 mx-auto`}>
            {children}
          </section>
        </main>
      </div>
    </div>
  );
};

export default TeacherLayout;
