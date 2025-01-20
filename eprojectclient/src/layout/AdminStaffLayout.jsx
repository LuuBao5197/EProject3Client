import React, { useState } from 'react';
import styles from './AdminLayout.module.css';
import { Link } from 'react-router-dom';

const AdminStaffLayout = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
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
      <div className={`row ${styles.sidebardiv}`}>
        {/* Sidebar for tablet and larger screens */}
        <aside className={`d-none d-md-block col-md-3 col-lg-2 ${styles.sidebar} ${isSidebarCollapsed ? styles.collapsed : ''}`}>
          <button className={styles.collapseButton} onClick={toggleSidebar}>
            {isSidebarCollapsed ? 'Expand' : 'Collapse'}
          </button>
          <h2>Manager Panel</h2>
          <nav>
            <ul>
              <li><Link to="/admin/studentlist">Student List</Link></li>
              <li><Link to="/admin/stafflayout">Staff List</Link></li>
              <li><Link to="/admin/adminlayout">Class List</Link></li>
              <li><Link to="/attendance">Attendance</Link></li>
              <li><Link to="/reports">Reports</Link></li>
              <li><Link to="/settings">Settings</Link></li>
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
            <ul className="navbar-nav me-auto">
              <li className="nav-item"><Link className="nav-link" to="/adminstudent/adminstudentlist">Student List</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/staff">Staff List</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/attendance">Attendance</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/reports">Reports</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/settings">Settings</Link></li>
            </ul>
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <button className="nav-link btn" onClick={toggleTheme}>
                  {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                </button>
              </li>
              <li className="nav-item"><button className="nav-link btn">Profile</button></li>
              <li className="nav-item"><button className="nav-link btn">Notifications</button></li>
              <li className="nav-item"><button className="nav-link btn text-danger">Log out</button></li>
            </ul>
          </div>
        </nav>

        {/* Main Content Area */}
        <main className="col">
          {/* Top Menu */}
          <header className={`row ${styles.topMenu} py-2 px-3 align-items-center d-none d-md-flex`}>
            <div className="col d-flex justify-content-end gap-3">
              <button className="btn btn-primary">Notifications</button>
              <button className="btn btn-secondary">Profile</button>
              <button className="btn btn-danger">Log Out</button>
              <button className="btn btn-dark" onClick={toggleTheme}>
                {isDarkMode ? 'Light Mode' : 'Dark Mode'}
              </button>
            </div>
          </header>

          {/* Dynamic Content */}
          <section className={`row ${styles.contentArea} py-3 px-4 mx-auto`}>
            {children}
          </section>
        </main>
      </div>
    </div>
  );
};

export default AdminStaffLayout;
