import React, { useEffect, useState } from "react";
import { postSubmission } from "../../API/postSubmission";
import { MDBInput, MDBInputGroup, MDBTextArea } from "mdb-react-ui-kit";
import { getStudentIdDemo } from "../../API/getStudentIdDemo";
import { useNavigate, useParams } from "react-router-dom";
import { getOneContestById } from "../../API/getOneContestById";
import { SweetAlert } from "./Notifications/SweetAlert";
import FooterHome from "../PublicPages/components/footer/FooterHome";
import NavbarStudentHome from "./components/navbar/NavbarStudentHome";

<<<<<<< HEAD

=======
>>>>>>> 5c143185e4d46f2109797ef2df334d975828827a
function CreateNewSubmission() {
    const [contest, setContest] = useState("");
    const [description, setDescription] = useState("");
    const submissionDate = new Date().toLocaleString();
    const [file, setFile] = useState(null);
    const [name, setName] = useState(null);
    const [checked, setChecked] = useState(false);
<<<<<<< HEAD
=======
    const [studentId, setStudentId] = useState("");  // State để lưu trữ studentId
>>>>>>> 5c143185e4d46f2109797ef2df334d975828827a

    const { contestId } = useParams();
    const nav = useNavigate();

    useEffect(() => {
<<<<<<< HEAD
=======
        // Lấy contest thông qua API
>>>>>>> 5c143185e4d46f2109797ef2df334d975828827a
        const getContest = async () => {
            try {
                const data = await getOneContestById(contestId);
                setContest(data);
<<<<<<< HEAD
                console.log(data);
                console.log(contestId);

=======
>>>>>>> 5c143185e4d46f2109797ef2df334d975828827a
            } catch (error) {
                console.error('Failed to fetch contests:', error);
            }
        };

<<<<<<< HEAD
        getContest();
        console.log(contestId);

    }, [])
=======
        // Gọi hàm để lấy contest
        getContest();
>>>>>>> 5c143185e4d46f2109797ef2df334d975828827a

        // Lấy studentId
        const fetchStudentId = async () => {
            const id = await getStudentIdDemo();
            setStudentId(id); // Cập nhật studentId vào state
        };

<<<<<<< HEAD
=======
        fetchStudentId();  // Gọi hàm lấy studentId
    }, [contestId]);  // Chạy khi component mount hoặc contestId thay đổi

>>>>>>> 5c143185e4d46f2109797ef2df334d975828827a
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!file) {
<<<<<<< HEAD
            SweetAlert("Please select a file !", "warning");
            return;
        }
        if (file.type != "image/jpeg") {
            SweetAlert("File must be JPEG format! Try again!", 'warning');
            return;
        }
        if (!name || name.trim() == "") {
            SweetAlert("Please enter name submission!", "warning");
            return;
        }
        if (!description || description.trim() == "") {
=======
            SweetAlert("Please select a file!", "warning");
            return;
        }
        if (file.type !== "image/jpeg") {
            SweetAlert("File must be JPEG format! Try again!", 'warning');
            return;
        }
        if (!name || name.trim() === "") {
            SweetAlert("Please enter name submission!", "warning");
            return;
        }
        if (!description || description.trim() === "") {
>>>>>>> 5c143185e4d46f2109797ef2df334d975828827a
            SweetAlert("Please enter description submission!", "warning");
            return;
        }

<<<<<<< HEAD
        const formData = new FormData(
        );
=======
        const formData = new FormData();
>>>>>>> 5c143185e4d46f2109797ef2df334d975828827a
        formData.append("name", name);
        formData.append("description", description);
        formData.append("fileImage", file);
        formData.append("filePath", file.name);

<<<<<<< HEAD
        console.log(file);

        try {
            const response = await postSubmission(getStudentIdDemo(), contestId, formData);
            // Điều hướng kèm dữ liệu phản hồi
=======
        try {
            const response = await postSubmission(studentId, contestId, formData)

>>>>>>> 5c143185e4d46f2109797ef2df334d975828827a
            nav("/mysubmissions", { state: { newSubmission: response } });
        } catch (error) {
            SweetAlert("Failed to create submission:", "error");
        }
    };

    return (
        <div className="container">
<<<<<<< HEAD

            <NavbarStudentHome />

=======
            <NavbarStudentHome />

>>>>>>> 5c143185e4d46f2109797ef2df334d975828827a
            <form onSubmit={handleSubmit}>
                <h1 className="text-center mt-3">Create new submission</h1>
                <MDBInput
                    label="Student ID"
                    id="formTextExample1"
<<<<<<< HEAD
                    type="datetime"
                    value={getStudentIdDemo()}
                    aria-describedby="textExample1"
                    className="mt-3"
=======
                    type="text"  // Thay đổi thành "text" vì studentId là chuỗi, không phải datetime
                    value={studentId}  // Gán giá trị studentId từ state
                    aria-describedby="textExample1"
                    className="mt-3"
                    readOnly
>>>>>>> 5c143185e4d46f2109797ef2df334d975828827a
                />
                <MDBInput
                    label="Time"
                    id="formTextExample1"
                    type="datetime"
                    value={submissionDate}
                    aria-describedby="textExample1"
                    className="mt-3"
<<<<<<< HEAD
=======
                    readOnly
>>>>>>> 5c143185e4d46f2109797ef2df334d975828827a
                />

                <MDBInput
                    label="Contest name"
                    id="formTextExample1"
                    type="text"
                    readOnly
                    className="mt-3"
                    value={contest.name}
                />
                <MDBInput
                    label="Name of submission"
                    id="formTextExample1"
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                    className="mt-3"
<<<<<<< HEAD
                />


                <MDBTextArea className="mt-3"
                    label="Description for submission..." id="textAreaExample" rows="{4}" onChange={(e) => setDescription(e.target.value)} />


                <MDBInputGroup className='mt-3'>
                    <input className='form-control' type='file'
                        name="file"
                        onChange={(e) => setFile(e.target.files[0])}
                        accept="image/jpeg" />
                </MDBInputGroup>


=======
                />

                <MDBTextArea
                    className="mt-3"
                    label="Description for submission..."
                    id="textAreaExample"
                    rows="4"
                    onChange={(e) => setDescription(e.target.value)}
                />

                <MDBInputGroup className="mt-3">
                    <input
                        className="form-control"
                        type="file"
                        name="file"
                        onChange={(e) => setFile(e.target.files[0])}
                        accept="image/jpeg"
                    />
                </MDBInputGroup>

>>>>>>> 5c143185e4d46f2109797ef2df334d975828827a
                {/* Checkbox */}
                <div className="form-check mt-3">
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

                <button type="submit" className="btn btn-primary mt-3" disabled={!checked}>
                    Submit
                </button>
            </form>
            <FooterHome />
        </div>
    );
};

export default CreateNewSubmission;
