import { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, Text } from "@chakra-ui/react";
import { Card, CardBody } from "@chakra-ui/react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";

export default function EditContestJudges() {
    const { contestID } = useParams();
    const [judges, setJudges] = useState([]);
    const [selectedJudges, setSelectedJudges] = useState([]);
    const location = useLocation();
    const [reload, setReload] = useState(false);
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const userId = jwtDecode(token).Id;
    useEffect(() => {
        if (!contestID) {
            console.error("No Contest ID found in URL");
            return;
        }
        const fetchInfoOfStaff = async (userId) => {
            var result = await axios.get(`http://localhost:5190/api/Staff/GetInfoStaff/${userId}`);
            console.log(result);
            if (!result.data.isReviewer) {
                toast.dark("You do not have permission to access this page. Please contact the administrator if you believe this is a mistake");
                setTimeout(() => {
                    navigate("/staff/");
                }, 1000);

            }
        }
        fetchInfoOfStaff(userId);

        // Fetch available judges
        axios.get("http://localhost:5190/api/Staff/getAllStaff").then((response) => {
            console.log(response.data)
            setJudges(response.data);
        });
        const fetchContestJudge = async (contestID) => {
            var respone = await axios.get(`http://localhost:5190/api/Staff/getDetailContestWithJudge/${contestID}`);
            console.log(respone.data[0]);
            formik.setValues({
                judges: respone.data[0].contestJudge
            })
            setSelectedJudges(respone.data[0].contestJudge)

            setReload(!reload);
        }
        fetchContestJudge(contestID);

        // Fetch selected judges for the contest

    }, [contestID, location, token]);



    const handleSelect = (judge) => {
        if (!selectedJudges.some((j) => j.staff.id == judge.id)) {
            setSelectedJudges((prev) => [...prev, {
                staff: judge
            }]);
            formik.setFieldValue("judges", [...selectedJudges, judge]);
        }
    };

    const handleRemove = (judge) => {
        console.log(judge);
        console.log(selectedJudges)
        const updatedJudges = selectedJudges.filter((j) => j.staffId != judge.staffId || j.staff.id != judge.staff.id);
        setSelectedJudges(updatedJudges);
        formik.setFieldValue("judges", updatedJudges);
    };

    const formik = useFormik({
        initialValues: {
            judges: []
        },
        validationSchema: Yup.object({
            judges: Yup.array().min(1, "You must select at least one judge.")
        }),
        onSubmit: async () => {
            if (selectedJudges.length === 0) {
                formik.setErrors({ judges: "You must select at least one judge." });
                return;
            }
            console.log(selectedJudges);

            const data = selectedJudges.map((judge) => ({
                contestID,
                staffID: judge.staff.id
            }));
            console.log(data);

            try {
                await axios.put("http://localhost:5190/api/Staff/updateManyContestJudges", data);
                alert("Judges updated frsuccessfully!");
            } catch (error) {
                alert("Error updating judges: " + (error.response?.data || error.message));
            }
        }
    });

    return (
        <Card className="card">
            <CardBody className="p-4">
                <h2 className="text-primary">Edit Contest Judges for Contest ID: {contestID}</h2>
                <h3 className="text-success">Current Judges</h3>
                <ul className="list-group mb-3">
                    {selectedJudges.map((judge, index) => (
                        <li key={index} className="list-group-item d-flex justify-content-between">
                            {judge.staff.user.name}
                            <Button colorScheme="red" size="sm" onClick={() => handleRemove(judge)}>
                                Remove
                            </Button>
                        </li>
                    ))}
                </ul>
                <h3 className="text-primary mt-3">Available Judges</h3>
                <div className="row">
                    {judges.map((judge) => (
                        <div className="col-6 mb-2" key={judge.id}>
                            <Button colorScheme="blue" onClick={() => handleSelect(judge)}>
                                {judge.user.name}
                            </Button>
                        </div>
                    ))}
                </div>
                {formik.errors.judges && (
                    <Text color="red.500" className="mb-2">
                        {formik.errors.judges}
                    </Text>
                )}
                <form onSubmit={formik.handleSubmit}>
                    <Button type="submit" className="btn btn-success w-100 mt-3">
                        Update Judges
                    </Button>
                </form>
            </CardBody>
        </Card>
    );
}
