// Import necessary libraries
import React from 'react';
import styles from './TeacherLayout.module.css'; // Import your CSS Module

const TeacherLayout = ({ children }) => {
  return (
    <div className={styles.teacherLayout}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <h2>Teacher Panel</h2>
        <nav>
          <ul>
            <li><a href="/students">Quản lý sinh viên</a></li>
            <li><a href="/competitions">Quản lý cuộc thi</a></li>
            <li><a href="/records">Quản lý hồ sơ học tập</a></li>
            <li><a href="/awards">Quản lý giải thưởng</a></li>
            <li><a href="/exhibitions">Quản lý triển lãm</a></li>
            <li><a href="/designs">Quản lý thiết kế</a></li>
          </ul>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className={styles.mainContent}>
        {/* Top Menu */}
        <header className={styles.topMenu}>
          <div className={styles.menuItems}>
            <button>Thông báo</button>
            <button>Tài khoản</button>
            <button>Đăng xuất</button>
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

export default TeacherLayout;
