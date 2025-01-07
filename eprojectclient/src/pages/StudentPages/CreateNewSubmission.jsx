import React, { useEffect, useState } from "react";
import { getContest } from "../../API/getContest";
import { postSubmission } from "../../API/postSubmission";
import { getStudent } from "../../API/getStudent";

const SubmissionForm = ({ onSubmit }) => {
    const [selectedContest, setSelectedContest] = useState("");
    const [selectedStd, setSelectedStd] = useState("");
    const [description, setDescription] = useState("");
    const [file, setFile] = useState(null);
    const [name, setName] = useState(null);
    const [checked, setChecked] = useState(false);
    const [contests, setContests] = useState([]);
    const [students, setStudents] = useState([]);

    useEffect(() => {
        const fetchContests = async () => {
            try {
                const data = await getContest();
                setContests(data);
                //console.log(data);

            } catch (error) {
                console.error('Failed to fetch contests:', error);

            }
        };
        const fetchStudents = async () => {
            try {
                const data = await getStudent();
                setStudents(data);
                //console.log(data);

            } catch (error) {
                console.error('Failed to fetch STDs:', error);

            }
        };

        fetchContests();
        fetchStudents();
    }, []);


    const handleSubmit = (e) => {
        e.preventDefault();

        if (!selectedContest || !file || !selectedStd) {
            alert("Vui lòng chọn contest,Student và upload file!");
            return;
        }


        const formData = new FormData();
        formData.append("studentId", selectedStd);
        formData.append("ContestId", selectedContest.value);  // Nếu selectedContest là thẻ <select> 
        formData.append("name", name);
        formData.append("description", description);
        formData.append("filePath", file);
        
        try {
            postSubmission(formData);
        }
        catch (e) {
            console.log(e);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label>Chọn sinh viên</label>
                <select
                    id="studentSelect"
                    className="form-control"
                    value={selectedStd}
                    onChange={(e) => setSelectedStd(e.target.value)}
                >
                    <option value="">-- Chọn Student --</option>
                    {students.map((s) => (
                        <option key={s.id} value={s.id}>
                            {s.id}
                        </option>
                    ))}
                </select>
            </div>
            {/* Contest Select */}
            <div className="form-group">
                <label htmlFor="contestSelect">Contest</label>
                <select
                    id="contestSelect"
                    className="form-control"
                    value={selectedContest}
                    onChange={(e) => setSelectedContest(e.target.value)}
                >
                    <option value="">-- Chọn Contest --</option>
                    {contests.map((contest) => (
                        <option key={contest.id} value={contest.id}>
                            {contest.name}
                        </option>
                    ))}
                </select>
            </div>

            {/* Date Display */}
            <div className="form-group">
                <label htmlFor="submissionDate">Date</label>
                <input
                    type="text"
                    id="submissionDate"
                    className="form-control"
                    value={new Date().toLocaleString()} // Hiển thị thời gian hiện tại
                    disabled
                />
            </div>

            <div className="form-group">
                <label htmlFor="description">Name</label>
                <input
                    type="text"
                    className="form-control"
                    onChange={(e) => setName(e.target.value)}
                ></input>
            </div>


            {/* Description */}
            <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                    id="description"
                    className="form-control"
                    rows="3"
                    onChange={(e) => setDescription(e.target.value)}
                ></textarea>
            </div>

            {/* File Upload */}
            <div className="form-group">
                <label htmlFor="fileUpload">Upload File</label>
                <input
                    type="text"
                    id="fileUpload"
                    className="form-control-file"
                    onChange={(e) => setFile(e.target.value)}
                />
            </div>

            {/* Checkbox */}
            <div className="form-check">
                <input
                    type="checkbox"
                    className="form-check-input"
                    id="agreementCheck"
                    checked={checked}
                    onChange={(e) => setChecked(e.target.checked)}
                />
                <label className="form-check-label" htmlFor="agreementCheck">
                    I agree to the terms and conditions
                </label>
            </div>

            {/* Submit Button */}
            <button type="submit" className="btn btn-primary" disabled={!checked}>
                Submit
            </button>
        </form>
    );
};

export default SubmissionForm;
