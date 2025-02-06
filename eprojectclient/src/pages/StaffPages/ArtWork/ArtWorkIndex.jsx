import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";

const ArtworkIndex = () => {
    const [awards, setAwards] = useState([]);
    const [artwork, setArtwork] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:5190/api/Staff/GetSubmissionOfStudentAwards")
            .then((response) => setAwards(response.data))
            .catch((error) => console.error("Error fetching data:", error));
        
        const fetchArtWorks = async () => {
           
            try {
                var respone = await axios.get(`http://localhost:5190/api/Staff/GetAllArtWork`);
                console.log(respone.data);
            } catch (error) {
                console.log(error)
            }
        }
        fetchArtWorks();
    }, []);

    const handleCreateArtWork = (awards) => {


        const postArtWorks = async (data) => {
            try {
                await axios.post("http://localhost:5190/api/Staff/CreateManyArtWork", data);
                toast.info("Create Art Work successfully");
            } catch (error) {
                console.log(error)
                toast.error(`${error.response.data}`);
            }
        }
        console.log(awards);
        const data = [];
        for (const element of awards) {
            data.push({"submissionId": element.submissionId})
        }
        console.log(data);
        postArtWorks(data);


    }
    return (
        <div className="container mt-4">
            <h2 className="mb-3">Student Award Submissions</h2>
            <Table variant="striped" colorScheme="teal">
                <Thead>
                    <Tr>
                        <Th>Contest Name</Th>
                        <Th>Awards</Th>
                        <Th>Action</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {awards.map((contest) => (
                        <Tr key={contest.ContestId}>
                            <Td>{contest.contestName}</Td>
                            <Td>
                                {contest.awards.map((award) => (
                                    <div key={award.awardId}>
                                        {award.studentName} - {award.awardName} - Submission ID: {award.submissionId}
                                    </div>
                                ))}
                            </Td>
                            <Td>
                                <Button variant="primary" onClick={() => handleCreateArtWork(contest.awards)}>Create Artwork</Button>
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
            <h2 className="mb-3 mt-3">List Submission Has been Received Award (ArtWork) </h2>

        </div>
    );
};

export default ArtworkIndex;
