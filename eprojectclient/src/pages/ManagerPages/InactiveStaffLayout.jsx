import React, { useEffect, useState } from "react";
import $ from "jquery";
import "datatables.net";
import { useNavigate } from "react-router-dom";
import { getAllStaff } from "../../API/getAdminStaff";

const InactiveStaffLayout = () => {
  const [staffList, setStaffList] = useState([]);
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

  const handleDetail = (staff) => {
    navigate(`/admin/Update-Staff-Status/${staff.id}`, { state: { staff } });
  };

  useEffect(() => {
    if (staffList.length > 0) {
      $("#inactiveStaffTable").DataTable();
    }
    return () => {
      if ($.fn.DataTable.isDataTable("#inactiveStaffTable")) {
        $("#inactiveStaffTable").DataTable().destroy();
      }
    };
  }, [staffList]);

  return (
    <div className="container mt-2">
      <h2 className="mb-4 text-center">Inactive Staff List</h2>
      <table id="inactiveStaffTable" className="table table-striped table-bordered">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {staffList
            .filter((staff) => staff.user.status === false)
            .map((staff) => (
              <tr key={staff.id}>
                <td>{staff.id}</td>
                <td>{staff.user?.name || "N/A"}</td>
                <td>{staff.user?.email || "N/A"}</td>
                <td>
                  <button className="btn btn-info" onClick={() => handleDetail(staff)}>Detail</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default InactiveStaffLayout;
