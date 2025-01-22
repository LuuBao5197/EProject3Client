import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getStudentDetails } from "../../API/getAdminStudent";
import styles from "./AdminStudentDetail.module.css"; // Import file CSS module

const AdminStudentDetail = () => {
  const { id } = useParams(); // Lấy ID từ URL
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Lấy chi tiết sinh viên từ API
  useEffect(() => {
    const fetchStudentDetails = async () => {
      try {
        const data = await getStudentDetails(id);
        setStudent(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchStudentDetails();
  }, [id]);

  if (loading) return <div className={styles.loading}>Loading...</div>;
  if (error) return <div className={styles.error}>Error: {error}</div>;

  if (!student) return <div className={styles.error}>Student not found</div>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Student Details</h1>
      <div className={styles.details}>
        <p>
          <strong>ID:</strong> {student.id}
        </p>
        <p>
          <strong>Name:</strong> {student.user?.name}
        </p>
        <p>
          <strong>Email:</strong> {student.user?.email}
        </p>
        <p>
          <strong>Date of Birth:</strong> {new Date(student.user?.dob).toLocaleDateString()}
        </p>
        <p>
          <strong>Phone:</strong> {student.user?.phone}
        </p>
        <p>
          <strong>Password:</strong> {student.user?.password}
        </p>
        <p>
          <strong>Enrollment Date:</strong> {new Date(student.enrollmentDate).toLocaleDateString()}
        </p>
        <p>
          <strong>Parent Name:</strong> {student.parentName}
        </p>
        <p>
          <strong>Parent Phone:</strong> {student.parentPhoneNumber}
        </p>
        <p>
          <strong>Classes:</strong>
        </p>
        <ul>
          {student.studentClasses?.map((sc) => (
            <li key={sc.classname}>Class Name: {sc.class.name}</li>
          )) || <li>No classes found</li>}
        </ul>
        <p>
          <strong>Submissions:</strong>
        </p>
        <ul>
          {student.submissions?.map((sub) => (
            <li key={sub.id}>
              {sub.title} - Date: {new Date(sub.submissionDate).toLocaleDateString()} - Grade: {sub.grade}
            </li>
          )) || <li>No submissions found</li>}
        </ul>
        <p>
          <strong>Awards:</strong>
        </p>
        <ul>
          {student.studentAwards?.map((award) => (
            <li key={award.id}>
              {award.awardName} - Date: {new Date(award.dateReceived).toLocaleDateString()}
            </li>
          )) || <li>No awards found</li>}
        </ul>
      </div>
    </div>
  );
};

export default AdminStudentDetail;
