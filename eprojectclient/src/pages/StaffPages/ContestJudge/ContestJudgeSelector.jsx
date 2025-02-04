import { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, Text } from "@chakra-ui/react";
import { Card, CardBody } from "@chakra-ui/react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";

export default function ContestJudgeSelector() {
  const { contestID } = useParams();
  const [judges, setJudges] = useState([]);
  const [selectedJudges, setSelectedJudges] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const userId = jwtDecode(token).Id;

  useEffect(() => {
    if (!contestID) {
      console.error("No Contest ID found in URL");
      navigate(-1);
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

    // Fetch available judges from API
    axios.get("http://localhost:5190/api/Staff/getAllStaff").then((response) => {
      console.log(response.data);
      setJudges(response.data);
    });
  }, [contestID]);

  const handleSelect = (judge) => {
    if (!selectedJudges.some((j) => j.id === judge.id)) {
      setSelectedJudges((prev) => [...prev, judge]);
      formik.setFieldValue("judges", [...selectedJudges, judge]); // Update Formik values
    }
  };

  const handleRemove = (judge) => {
    const updatedJudges = selectedJudges.filter((j) => j.id !== judge.id);
    setSelectedJudges(updatedJudges);
    formik.setFieldValue("judges", updatedJudges); // Update Formik values
  };

  const formik = useFormik({
    initialValues: {
      judges: []
    },
    validationSchema: Yup.object({
      judges: Yup.array().min(1, "You must select at least one judge.") // ✅ Sửa lại min(1)
    }),
    onSubmit: async () => {
      if (selectedJudges.length === 0) {
        formik.setErrors({ judges: "You must select at least one judge." });
        return;
      }

      const data = selectedJudges.map((judge) => ({
        contestID,
        staffID: judge.id
      }));

      try {
        await axios.post("http://localhost:5190/api/Staff/insertContestJudge", data);
        alert("Judges added successfully!");
      } catch (error) {
        alert("Error adding judges: " + (error.response?.data || error.message));
      }
    }
  });

  return (
    <Card className="card">
      <CardBody className="p-4">
        <h2 className="text-primary">Select Contest Judges for Contest ID: {contestID}</h2>
        <div className="row">
          {judges.map((judge) => (
            <div className="col-6 mb-2" key={judge.id}>
              <Button colorScheme="blue" onClick={() => handleSelect(judge)}>
                {judge.user.name}
              </Button>
            </div>
          ))}
        </div>
        <h3 className="text-danger mt-3">Selected Judges</h3>
        {formik.errors.judges && (
          <Text color="red.500" className="mb-2">
            {formik.errors.judges}
          </Text>
        )}
        <ul className="list-group">
          {selectedJudges.map((judge) => (
            <li key={judge.id} className="list-group-item d-flex justify-content-between">
              {judge.user.name}
              <Button colorScheme="red" size="sm" onClick={() => handleRemove(judge)}>
                Remove
              </Button>
            </li>
          ))}
        </ul>
        <form onSubmit={formik.handleSubmit}>
          <Button type="submit" className="btn btn-success w-100 mt-3">
            Submit Judges
          </Button>
        </form>
      </CardBody>
    </Card>
  );
}
