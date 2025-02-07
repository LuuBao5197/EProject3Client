import { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import axios from "axios";
import { Box, Image, Text, Grid, Button, Select, Spinner, Alert } from "@chakra-ui/react";

const CreateExhibitionArtwork = () => {
  const [exhibitions, setExhibitions] = useState([]);
  const [artworks, setArtworks] = useState([]);
  const [selectedExhibition, setSelectedExhibition] = useState(null);
  const [createdArtworks, setCreatedArtworks] = useState([]); // Lưu artworks đã kéo thả
  const [isCreated, setIsCreated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchExhibitions = async () => {
      try {
        const res = await axios.get("http://localhost:5190/api/Staff/GetAllExhibition", {
          params: { status: "Approved" }
        });
        if (Array.isArray(res.data.exhibitions)) {
          setExhibitions(res.data.exhibitions);
        } else {
          setExhibitions([]);
          setError("Exhibitions data is not an array.");
        }
      } catch (err) {
        setError("Failed to load exhibitions.");
      }
    };

    const fetchArtworks = async () => {
      try {
        const res = await axios.get("http://localhost:5190/api/Staff/GetAllArtWork", {
            params: {status : "available"}
        });
        if (Array.isArray(res.data)) {
          setArtworks(res.data);
        } else {
          setArtworks([]);
          setError("No data for Artwork.");
        }
      } catch (err) {
        setError("Failed to load artworks.");
      }
    };

    fetchExhibitions();
    fetchArtworks();
    setLoading(false);
  }, []);

  const handleCreateExhibitionArtwork = () => {
    if (!selectedExhibition) return;
    // Tạo Exhibition Artwork với các artworks đã được chọn
    const data = new Array();
    for (const element of createdArtworks) {
        data.push({
            exhibitionId: selectedExhibition,
            artworkId: element.id
        })
    }
    axios.post("http://localhost:5190/api/Staff/AddMultipleExhibitionArtworks",data)
    .then(() => {
      alert("ExhibitionArtwork created successfully!");
      setIsCreated(true);
    })
    .catch(() => {
      alert("Error creating ExhibitionArtwork");
    });
  };

  const onDragEnd = (result) => {
    const { destination, source } = result;

    if (!destination) return; // Nếu không thả trong vùng hợp lệ

    const updatedArtworks = Array.from(artworks);
    const [removed] = updatedArtworks.splice(source.index, 1); // Xóa artwork khỏi `artworks`
    setArtworks(updatedArtworks); // Cập nhật lại `artworks`

    // Nếu artwork chưa được thêm vào `createdArtworks`, thì thêm vào
    if (!createdArtworks.some(item => item.id === removed.id)) {
      setCreatedArtworks(prev => [...prev, removed]);
    }
  };

  const handleRemoveArtwork = (artworkId) => {
    // Tìm artwork trong createdArtworks
    const artworkToRemove = createdArtworks.find(item => item.id === artworkId);
    
    if (artworkToRemove) {
      // Xóa artwork khỏi `createdArtworks`
      setCreatedArtworks(prev => prev.filter(item => item.id !== artworkId));

      // Thêm lại artwork vào `artworks`
      setArtworks(prev => [...prev, artworkToRemove]);
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
          placeholder="Select Exhibition"
          onChange={(e) => setSelectedExhibition(e.target.value)}
        >
          {Array.isArray(exhibitions) && exhibitions.length > 0 ? (
            exhibitions.map((exhibition) => (
              <option key={exhibition.id} value={exhibition.id}>
                {exhibition.name}
              </option>
            ))
          ) : (
            <option value="">No exhibitions available</option>
          )}
        </Select>

        {selectedExhibition && !isCreated && (
          <>
            <Text fontSize="xl" mt={5} mb={3}>Available Artworks</Text>
            {/* Wrap toàn bộ vùng thả trong DragDropContext */}
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

              {/* Vùng thả kết quả đã chọn */}
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
              onClick={handleCreateExhibitionArtwork}
            >
              Create Exhibition Artwork
            </Button>
          </>
        )}

        {isCreated && (
          <Text color="green.500" mt={4}>Exhibition Artwork successfully created!</Text>
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

export default CreateExhibitionArtwork;
