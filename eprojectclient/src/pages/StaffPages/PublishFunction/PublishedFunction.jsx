import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Heading, Box, Grid, Text, Spinner, Button } from "@chakra-ui/react";
import "bootstrap/dist/css/bootstrap.min.css";
import DOMPurify from 'dompurify';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const PublishedFunction = () => {
    const [contests, setContests] = useState([]);
    const [exhibitions, setExhibitions] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    

    useEffect(() => {
        const fetchContests = async (page, search = "", status = "Approved", phase = "") => {
            try {
                const response = await axios.get(`http://localhost:5190/api/Staff/GetAllContest`, {
                    params: {
                        status,
                    },
                });
                setContests(response.data.contests);
                // setPageCount(response.data.totalPages);
            } catch (error) {
                console.error("Error fetching contests:", error);
                alert("Failed to fetch contests. Please try again.");
            } finally {

            }
        };
        const fetchExhibition = async (page, search = "", status = "Approved", phase = "") => {
            setLoading(true);
            try {
                const response = await axios.get(`http://localhost:5190/api/Staff/GetAllExhibition`, {
                    params: { status },
                });
                
                setExhibitions(response.data.exhibitions);
            } catch (error) {
                console.error("Error fetching exhibitions:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchContests();
        fetchExhibition();
   
    }, [navigate]);
    const handlePublishedContest =  async(id) => {
        try {
           var respone = await axios.patch(`http://localhost:5190/api/Staff/PublishContest/${id}`,null);
           alert("This contest have published success");
           navigate(0);
           console.log(respone);


        } catch (error) {
            alert("Something occur errors: " + error.response.data)
        }
    } 
    const handlePublishedExhibition = async (id) => {
        try {
           var respone = await axios.patch(`http://localhost:5190/api/Staff/PublishExhibition/${id}`,null)
           toast.info("This contest have published success");
           navigate(0);
           console.log(respone);

        } catch (error) {
            alert("Something occur errors: " + error.response.data)
        }
    } 

    return (
        <Container maxW="container.xl" py={5}>
            <Heading textAlign="center" mb={6}>Competitions & Exhibitions</Heading>
            {loading ? (
                <Spinner size="xl" thickness="4px" />
            ) : (
                <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={6}>
                    {/* Competitions Section */}
                    <Box borderWidth="1px" borderRadius="lg" p={5} boxShadow="lg">
                        <Heading size="md" mb={4}>Available Competitions</Heading>
                        {contests.length > 0 ? (
                            contests.map(contest => (
                                <Box key={contest.id} className="card mb-3 p-3">
                                    <Text fontSize="lg" fontWeight="bold">{contest.name}</Text>
                                    <Text>Name: <p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(contest.description) }}/> </Text>
                                    <Text>Status: {contest.status}</Text>
                                    <Button color={"green.400"} onClick={()=> handlePublishedContest(contest.id)}> Publish</Button>
                                </Box>
                            ))
                        ) : (
                            <Text>No competitions available</Text>
                        )}
                    </Box>

                    {/* Exhibitions Section */}
                    <Box borderWidth="1px" borderRadius="lg" p={5} boxShadow="lg">
                        <Heading size="md" mb={4}>Upcoming Exhibitions</Heading>
                        {exhibitions.length > 0 ? (
                            exhibitions.map(exhibition => (
                                <Box key={exhibition.id} className="card mb-3 p-3">
                                    <Text fontSize="lg" fontWeight="bold">{exhibition.name}</Text>
                                    <Text>Description: <p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(exhibition.description) }}/> </Text>
                                    <Text>StartDate: {exhibition.startDate}</Text>
                                    <Text>EndDate: {exhibition.endDate}</Text>

                                    <Text>Location: {exhibition.location}</Text>
                                    <Button color={"green.400"} onClick={()=> handlePublishedExhibition(exhibition.id)}> Publish</Button>
                                </Box>
                            ))
                        ) : (
                            <Text>No exhibitions available</Text>
                        )}
                    </Box>
                </Grid>
            )}
        </Container>
    );
};

export default PublishedFunction;
