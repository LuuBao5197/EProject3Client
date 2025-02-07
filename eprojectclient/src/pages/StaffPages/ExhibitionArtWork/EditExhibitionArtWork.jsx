import { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import axios from "axios";
import { Box, Image, Text, Grid, Button, Select, Spinner, Alert } from "@chakra-ui/react";
import { useLocation, useParams } from "react-router-dom";

const EditExhibitionArtwork = () => {
    const { ExhibitionArtWorkID } = useParams();
    const [exhibitions, setExhibitions] = useState([]);
    const [artworks, setArtworks] = useState([]);
    const [selectedExhibition, setSelectedExhibition] = useState(null);
    const [createdArtworks, setCreatedArtworks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [originalArtworks, setOriginalArtworks] = useState([]);
    const location = useLocation();
    useEffect(() => {
        const fetchExhibitions = async () => {
            try {
                const res = await axios.get("http://localhost:5190/api/Staff/GetAllExhibition", {
                    params: { status: "Approved" }
                });
                if (Array.isArray(res.data.exhibitions)) {
                    setExhibitions(res.data.exhibitions);
                } else {
                    setError("Exhibitions data is not an array.");
                }
            } catch (err) {
                setError("Failed to load exhibitions.");
            }
        };

        const fetchArtworks = async () => {
            try {
                const res = await axios.get("http://localhost:5190/api/Staff/GetAllArtWork", {
                    params: { status: "available" }
                });
                if (Array.isArray(res.data)) {
                    setArtworks(res.data);
                } else {
                    setError("No data for Artwork.");
                }
            } catch (err) {
                setError("Failed to load artworks.");
            }
        };

        const fetchExhibitionArtwork = async () => {
            try {
          
                const res = await axios.get(`http://localhost:5190/api/Staff/GetAllExhibitionArtworks`, {
                    params: { exhibitionID: ExhibitionArtWorkID }
                });
                console.log(res.data)
                const tempData = new Array();
                if (res.data) {
                    // const { exhibition, artwork } = res.data;
                    setSelectedExhibition(res.data[0].exhibitionId);
                    // setOriginalArtworks(artwork);
                    
                    for (const element of res.data) {
                       
                        tempData.push(element.artwork);
                    }
                    
                }
                console.log(tempData);
                setCreatedArtworks(tempData);
            } catch (err) {
                setError("Failed to load Exhibition Artwork data.");
            }
        };

        fetchExhibitions();
        fetchArtworks();
        fetchExhibitionArtwork();
        setLoading(false);
    }, [ExhibitionArtWorkID, location]);

    const handleUpdateExhibitionArtwork = async() => {
        if (!selectedExhibition) return;
        const data = createdArtworks.map(element => ({
            exhibitionId: selectedExhibition,
            artworkId: element.id
        }));
        try {
            var res = await axios.put(`http://localhost:5190/api/Staff/UpdateExhibitionArtwork/${selectedExhibition}`, data);
            alert("Exhibition Artwork updated successfully!");
        } catch (err) {
            alert(`Error updating Exhibition Artwork, ${err.response.data}`);
        }

       
    };

    const onDragEnd = (result) => {
        const { destination, source } = result;

        if (!destination) return;

        const updatedArtworks = Array.from(artworks);
        const [removed] = updatedArtworks.splice(source.index, 1);
        setArtworks(updatedArtworks);

        if (!createdArtworks.some(item => item.id === removed.id)) {
            setCreatedArtworks(prev => [...prev, removed]);
        }
    };

    const handleRemoveArtwork = (artworkId) => {
        const artworkToRemove = createdArtworks.find(item => item.id === artworkId || item.artworkId === artworkId);
        if (artworkToRemove) {
            setCreatedArtworks(prev => prev.filter(item => item.id !== artworkId));
            // setArtworks(prev => [...prev, artworkToRemove]);
            setArtworks(prev => prev.filter(item => item.id !== artworkId ));

        }
    };

    if (loading) {
        return <Spinner size="xl" />;
    }

    return (
        <Grid templateColumns="1fr 1fr" gap={6} p={5}>
            <Box>
                <Text fontSize="xl" mb={3}>Select Exhibition</Text>
                <Select
                    value={selectedExhibition}
                    onChange={(e) => setSelectedExhibition(e.target.value)}
                >
                    {Array.isArray(exhibitions) && exhibitions.length > 0 ? (
                        exhibitions.map((exhibition) => (
                            <option key={exhibition.id} value={exhibition.id}>
                                {/* {console.log(exhibition)} */}
                                {exhibition.name}
                            </option>
                        ))
                    ) : (
                        <option value="">No exhibitions available</option>
                    )}
                </Select>

                {selectedExhibition && (
                    <>
                        <Text fontSize="xl" mt={5} mb={3}>Available Artworks</Text>
                        <DragDropContext onDragEnd={onDragEnd}>
                            <Droppable droppableId="artworks">
                                {(provided) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                        style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px" }}
                                    >
                                        {artworks.map((artwork, index) => (
                                            <Draggable key={artwork.id} draggableId={artwork.id.toString()} index={index}>
                                                {(provided) => (
                                                    <Box
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        borderWidth={1}
                                                        borderRadius="md"
                                                        overflow="hidden"
                                                        p={2}
                                                        bg="white"
                                                        boxShadow="sm"
                                                    >
                                                        <Image src={artwork.submission.filePath} alt={artwork.submission.name} boxSize="100px" objectFit="cover" />
                                                        <Text fontSize="sm" mt={2}>SubmissionID: {artwork.submission.id}</Text>
                                                        <Text fontSize="sm" mt={2}>Submission Name: {artwork.submission.name}</Text>
                                                        <Text fontSize="sm" mt={2}>Student: {artwork.submission.student.user.name}</Text>
                                                    </Box>
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>

                            <Text fontSize="xl" mt={5} mb={3}>Selected Artworks</Text>
                            <Droppable droppableId="selected-artworks">
                                {(provided) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                        style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px", minHeight: "200px", border: "2px dashed #ddd", padding: "10px" }}
                                    >
                                        {createdArtworks.map((artwork, index) => (
                                            <Draggable key={artwork.id} draggableId={artwork.id.toString()} index={index}>
                                                {(provided) => (
                                                    <Box
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        borderWidth={1}
                                                        borderRadius="md"
                                                        overflow="hidden"
                                                        p={2}
                                                        bg="white"
                                                        boxShadow="sm"
                                                    >
                                                        <Image src={artwork.submission.filePath} alt={artwork.submission.name} boxSize="100px" objectFit="cover" />
                                                        <Text fontSize="sm" mt={2}>SubmissionID: {artwork.submission.id}</Text>
                                                        <Text fontSize="sm" mt={2}>Submission Name: {artwork.submission.name}</Text>
                                                        <Text fontSize="sm" mt={2}>Student: {artwork.submission.student.user.name}</Text>
                                                        <Button
                                                            size="xs"
                                                            colorScheme="red"
                                                            onClick={() => handleRemoveArtwork(artwork.id)}
                                                            mt={2}
                                                        >
                                                            X
                                                        </Button>
                                                    </Box>
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </DragDropContext>

                        <Button
                            mt={4}
                            colorScheme="teal"
                            onClick={handleUpdateExhibitionArtwork}
                        >
                            Update Exhibition Artwork
                        </Button>
                    </>
                )}

                {error && (
                    <Alert status="error" mt={4}>
                        <Text>{error}</Text>
                    </Alert>
                )}
            </Box>
        </Grid>
    );
};

export default EditExhibitionArtwork;
