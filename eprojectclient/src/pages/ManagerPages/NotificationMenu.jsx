import React, { useState, useEffect } from "react";
import { Flex, Text, Box, Icon, keyframes } from "@chakra-ui/react";  // Add Icon and keyframes from Chakra UI
import { ItemContent } from "../../components/menu/ItemContent"; // Import the ItemContent component
import { FiBell } from "react-icons/fi"; // Import Bell icon from react-icons
import axios from "axios";

// Define keyframes for the "blink" animation
const blink = keyframes`
  0% { opacity: 1; }
  50% { opacity: 0.3; }
  100% { opacity: 1; }
`;

const NotificationMenu = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newNotification, setNewNotification] = useState(false); // State to track new notifications

  useEffect(() => {
    // Fetch data from the API
    axios
      .get("http://localhost:5190/api/Manager/GetAllRequest")
      .then((response) => {
        setRequests(response.data); // Set the fetched data
        setLoading(false); // Update loading state
        
        // Check if there's a new notification
        const latestRequest = response.data[0]; // Assuming the first request is the most recent one
        const isNewNotification = latestRequest.status === "New"; // Replace with your own condition for "new" notifications
        setNewNotification(isNewNotification);
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
      <Flex w="100%" mb="20px" justify="space-between">
        <Text fontSize="md" fontWeight="600">
          Notifications
        </Text>
        <Flex align="center">
          {/* Bell Icon with animation */}
          <Icon
            as={FiBell}
            w={6}
            h={6}
            color={newNotification ? "orange.400" : "gray.600"}
            animation={newNotification ? `${blink} 1s infinite` : "none"} // Apply blinking animation if there's a new notification
            cursor="pointer"
          />
          <Text fontSize="sm" fontWeight="500" ms="10px" cursor="pointer">
            Mark all read
          </Text>
        </Flex>
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
