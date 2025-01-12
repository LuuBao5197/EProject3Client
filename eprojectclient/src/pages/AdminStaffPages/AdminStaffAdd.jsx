import React, { useState } from "react";
import axios from "axios";

const CreateStaffForm = () => {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        name: "",
        email: "",
        phone: "",
        dob: "",
        joinDate: "",
        classIds: [],
        staffSubjectIds: [],
        staffQualificationIds: [],
    });

    const [classId, setClassId] = useState("");
    const [staffSubjectId, setStaffSubjectId] = useState("");
    const [staffQualificationId, setStaffQualificationId] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleAddClass = () => {
        if (classId) {
            setFormData({
                ...formData,
                classIds: [...formData.classIds, classId],
            });
            setClassId("");
        }
    };

    const handleAddStaffSubject = () => {
        if (staffSubjectId) {
            setFormData({
                ...formData,
                staffSubjectIds: [...formData.staffSubjectIds, staffSubjectId],
            });
            setStaffSubjectId("");
        }
    };

    const handleAddStaffQualification = () => {
        if (staffQualificationId) {
            setFormData({
                ...formData,
                staffQualificationIds: [
                    ...formData.staffQualificationIds,
                    staffQualificationId,
                ],
            });
            setStaffQualificationId("");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("/staff", formData);
            alert(response.data.message);
        } catch (error) {
            alert(
                error.response?.data?.message || "Error creating staff. Please try again."
            );
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Create Staff</h2>
            <div>
                <label>Username:</label>
                <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Password:</label>
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Name:</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Email:</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Phone:</label>
                <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Date of Birth:</label>
                <input
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Join Date:</label>
                <input
                    type="date"
                    name="joinDate"
                    value={formData.joinDate}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Class IDs:</label>
                <input
                    type="text"
                    value={classId}
                    onChange={(e) => setClassId(e.target.value)}
                />
                <button type="button" onClick={handleAddClass}>
                    Add Class
                </button>
                <ul>
                    {formData.classIds.map((id, index) => (
                        <li key={index}>{id}</li>
                    ))}
                </ul>
            </div>
            <div>
                <label>Staff Subject IDs:</label>
                <input
                    type="text"
                    value={staffSubjectId}
                    onChange={(e) => setStaffSubjectId(e.target.value)}
                />
                <button type="button" onClick={handleAddStaffSubject}>
                    Add Subject
                </button>
                <ul>
                    {formData.staffSubjectIds.map((id, index) => (
                        <li key={index}>{id}</li>
                    ))}
                </ul>
            </div>
            <div>
                <label>Staff Qualification IDs:</label>
                <input
                    type="text"
                    value={staffQualificationId}
                    onChange={(e) => setStaffQualificationId(e.target.value)}
                />
                <button type="button" onClick={handleAddStaffQualification}>
                    Add Qualification
                </button>
                <ul>
                    {formData.staffQualificationIds.map((id, index) => (
                        <li key={index}>{id}</li>
                    ))}
                </ul>
            </div>
            <button type="submit">Create Staff</button>
        </form>
    );
};

export default CreateStaffForm;
