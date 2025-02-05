import React, { useState, useRef, useEffect } from "react";
import { updateMySubmission } from "../../API/updateMySubmission";
import { MDBInput, MDBTextArea, MDBInputGroup, MDBSpinner } from "mdb-react-ui-kit";
import { getOneSubmissionById } from "../../API/getOneSubmissionById";
import { useNavigate, useParams } from "react-router-dom";
import { getStudentIdDemo } from "../../API/getStudentIdDemo";
import NavbarHome from "../PublicPages/components/navbar/NavbarHome";
import FooterHome from "../PublicPages/components/footer/FooterHome";
import { PinturaEditor } from '@pqina/react-pintura';
import { getEditorDefaults } from '@pqina/pintura';
import '@pqina/pintura/pintura.css';
import NavbarStudentHome from "./components/navbar/NavbarStudentHome";

function UpdateMySubmission() {
    const [nameUpdate, setNameUpdate] = useState("");
    const [descriptionUpdate, setDescriptionUpdate] = useState("");
    const [filePathUpdate, setFilePathUpdate] = useState("");
    const [editedFile, setEditedFile] = useState(null);
    const [mySub, setMySub] = useState(null);
    const { id } = useParams();
    const nav = useNavigate();
    const fileInputRef = useRef(null);

    useEffect(() => {
        const getStudentId = async () => {
            const studentId = await getStudentIdDemo();
            if (studentId) {
                const getOneSubmission = async () => {
                    try {
                        const data = await getOneSubmissionById(studentId, id);
                        setMySub(data);
                        setFilePathUpdate(data.filePath);
                    } catch (error) {
                        console.error("Failed to fetch submission:", error);
                    }
                };

                getOneSubmission();
            } else {
                console.warn("No student ID available.");
            }
        };

        getStudentId();
    }, [id]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        const formUpdate = new FormData();
        const file = fileInputRef.current?.files[0];
<<<<<<< HEAD
    
=======
        
>>>>>>> 5c143185e4d46f2109797ef2df334d975828827a
        formUpdate.append("name", nameUpdate || mySub.name);
        formUpdate.append("description", descriptionUpdate || mySub.description);
    
        if (editedFile) {
            formUpdate.append("filePath", editedFile.name);
            formUpdate.append("fileImage", editedFile);
        } else if (file) {
            formUpdate.append("filePath", file.name);
            formUpdate.append("fileImage", file);
        } else {
            // Trong trường hợp không có thay đổi, vẫn thêm tập tin hiện tại vào form
            const response = await fetch(filePathUpdate);
            const blob = await response.blob();
            const currentFile = new File([blob], filePathUpdate.split('/').pop());
            formUpdate.append("filePath", currentFile.name);
            formUpdate.append("fileImage", currentFile);
        }
<<<<<<< HEAD
    
        formUpdate.append("studentId", getStudentIdDemo());
    
        console.log([...formUpdate.entries()]); // Kiểm tra nội dung của FormData
    
        try {
            await updateMySubmission(id, formUpdate);
            nav("/mySubmissions");
        } catch (e) {
            console.error(e);
=======

        const studentId = await getStudentIdDemo(); // Lấy studentId
        if (studentId) {
            formUpdate.append("studentId", studentId);
            console.log([...formUpdate.entries()]); // Kiểm tra nội dung của FormData

            try {
                await updateMySubmission(id, formUpdate);
                nav("/mySubmissions");
            } catch (e) {
                console.error(e);
            }
>>>>>>> 5c143185e4d46f2109797ef2df334d975828827a
        }
    };
    

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setFilePathUpdate(event.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSaveChanges = (output) => {
        console.log(output);
        setEditedFile(output.dest);
        setFilePathUpdate(URL.createObjectURL(output.dest));
    };

    if (!mySub) {
        return (
            <div className="d-flex align-items-center">
                <strong>Loading...</strong>
                <MDBSpinner className="ms-auto" role="status" />
            </div>
        );
    }

    return (
        <div className="container mt-5">
            <NavbarStudentHome />
            <form onSubmit={handleUpdate} style={{ textAlign: "center" }}>
                <h1 className="text-center text-primary mb-4 mt-3">Update Submission</h1>

                <div className="row">
                    <div className="col-6">
                        <div className="mb-3">
                            <MDBInput
                                label="Update Time"
                                id="formTextExample1"
                                type="text"
                                value={new Date().toLocaleString()}
                                disabled
                            />
                        </div>

                        <div className="mb-3">
                            <MDBInput
                                label="Name"
                                id="formTextExample2"
                                type="text"
                                onChange={(e) => setNameUpdate(e.target.value)}
                                value={nameUpdate || mySub.name}
                            />
                        </div>

                        <div className="mb-3">
                            <MDBTextArea
                                label="Description"
                                id="formTextExample3"
                                rows="5"
                                value={descriptionUpdate || mySub.description}
                                onChange={(e) => setDescriptionUpdate(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="col-6">
                        {filePathUpdate && (
                            <div style={{ height: '300px', border: '1px solid' }} className="img-thumbnail">
                                <PinturaEditor
                                    {...getEditorDefaults()}
                                    src={filePathUpdate}
                                    onProcess={handleSaveChanges}
                                />
                            </div>
                        )}
                    </div>

                    <MDBInputGroup className="mb-3 mt-3">
                        <input
                            className="form-control"
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            ref={fileInputRef}
                        />
                    </MDBInputGroup>
                </div>

                <button type="submit" className="btn btn-primary w-100">
                    Update
                </button>
            </form>

            <FooterHome />
        </div>
    );
}

export default UpdateMySubmission;
