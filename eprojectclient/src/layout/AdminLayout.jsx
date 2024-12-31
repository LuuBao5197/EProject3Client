// Import necessary libraries
import React from 'react';
import styles from './AdminLayout.module.css'; // Import your CSS Module

const AdminLayout = ({ children }) => {
  return (
    <div className={styles.adminLayout}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <h2>Manager Panel</h2>
        <nav>
          <ul>
            <li><a href="/students"><i className="fas fa-user-graduate"></i> Student Management</a></li>
            <li><a href="/competitions"><i className="fas fa-trophy"></i> Competition Management</a></li>
            <li><a href="/records"><i className="fas fa-file-alt"></i> Academic Records Management</a></li>
            <li><a href="/awards"><i className="fas fa-medal"></i> Award Management</a></li>
            <li><a href="/exhibitions"><i className="fas fa-paint-brush"></i> Exhibition Management</a></li>
            <li><a href="/designs"><i className="fas fa-drafting-compass"></i> Design Management</a></li>
          </ul>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className={styles.mainContent}>
        {/* Top Menu */}
        <header className={styles.topMenu}>
          <div className={styles.menuItems}>
            <button><i className="fas fa-bell"></i> Notifications</button>
            <button><i className="fas fa-user"></i> Account</button>
            <button><i className="fas fa-sign-out-alt"></i> Logout</button>
          </div>
        </header>

        {/* Dynamic Content */}
        <section className={styles.contentArea}>
          {children}
        </section>
      </main>
    </div>
  );
};

export default AdminLayout;
