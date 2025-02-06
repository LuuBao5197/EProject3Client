import React, { useEffect, useState } from "react";
import $ from "jquery";
import "datatables.net";
import { useNavigate } from "react-router-dom";
import { getAllStaff ,sendEmailToManager} from "../../API/getAdminStaff";


const AdminStaffLayout = () => {
  const [staffList, setStaffList] = useState([]);
  const [loading, setLoading] = useState(null);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchStaff();
  }, []);

  const fetchStaff = async () => {
    try {
      const data = await getAllStaff();
      setStaffList(data);
    } catch (error) {
      console.error("Failed to fetch staff:", error.message);
    }
  };

  const handleDetail = (id) => {
    navigate(`/admin/Staff-Detail/${id}`);
  };

  const handleEdit = (id) => {
    navigate(`/admin/Update-Staff/${id}`);
  };

  const handleSendEmail = async (staff) => {
    try {
      const request = {
        StaffName: staff.user?.name,
        Username: staff.username,
        Email: staff.user?.email,
      };
      await sendEmailToManager(request);
      setMessage(`Email đã được gửi đến quản lý cho nhân viên ${staff.user?.name}.`);
    } catch (error) {
      console.error("Failed to send email:", error);
      setMessage("Có lỗi khi gửi email.");
    }
  };

  useEffect(() => {
    if (staffList.length > 0) {
      $("#staffTable").DataTable();
    }
    return () => {
      if ($.fn.DataTable.isDataTable("#staffTable")) {
        $("#staffTable").DataTable().destroy();
      }
    };
  }, [staffList]);

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center mt-auto" style={{ paddingTop: "60px", paddingBottom: "1px" }}>
        Staff List
      </h2>
      {message && <div className="alert alert-success">{message}</div>}
      <table id="staffTable" className="table table-striped table-bordered">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {staffList.map((staff) => (
            <tr key={staff.id}>
              <td>{staff.id}</td>
              <td>{staff.user?.name || "N/A"}</td>
              <td>{staff.user?.email || "N/A"}</td>
              <td>
                <button className="btn btn-warning mr-2" onClick={() => handleEdit(staff.id)}>Edit</button>
                <button className="btn btn-info mr-2" onClick={() => handleDetail(staff.id)}>Detail</button>
                <button className="btn btn-primary" onClick={() => handleSendEmail(staff)}>Send Email</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminStaffLayout;
