import React, { useState, useEffect } from "react";
import { Flex, Text, Box } from "@chakra-ui/react";  // Removed unnecessary imports
import { ItemContent } from "../../components/menu/ItemContent"; // Import the ItemContent component
import axios from "axios";

const NotificationMenu = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch data from the API
    axios
      .get("http://localhost:5190/api/Manager/GetAllRequest")
      .then((response) => {
        setRequests(response.data); // Set the fetched data
        setLoading(false); // Update loading state
      })
      .catch((err) => {
        setError("Error fetching data!");
        setLoading(false); // Update loading state
      });
  }, []); // Empty dependency array means this will run once after the component mounts

  if (loading) {
    return <Text>Loading...</Text>; // Show loading message while fetching data
  }

  if (error) {
    return <Text>{error}</Text>; // Show error message if API call fails
  }

  return (
    <Box p="20px" borderRadius="20px" bg="white" boxShadow="sm" minW="400px" maxW="600px">
      <Flex w="100%" mb="20px">
        <Text fontSize="md" fontWeight="600">
          Notifications
        </Text>
        <Text fontSize="sm" fontWeight="500" ms="auto" cursor="pointer">
          Mark all read
        </Text>
      </Flex>

      <Flex flexDirection="column">
        {requests.map((request) => (
          <Box
            key={request.id}
            _hover={{ bg: "gray.100" }}
            borderRadius="8px"
            mb="10px"
            p="10px"
            bg="gray.50"
            boxShadow="sm"
          >
            <ItemContent
              info={`Meeting Time: ${new Date(request.meetingTime).toLocaleString()}`} // Convert meetingTime to readable format
              description={request.description} // Description of the request
              organized={request.organized} // Who organized the request
              status={request.status} // Status of the request
            />
          </Box>
        ))}
      </Flex>
    </Box>
  );
};

export default NotificationMenu;
