import {
  Box,
  Flex,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import Card from "@/components/card/Card.js";
import { useState } from "react";

export default function CardContest({ contest, ...props }) {
  const [hovered, setHovered] = useState(false); // State to manage hover effect

  // Chakra Color Mode
  const textColor = useColorModeValue("secondaryGray.900", "white");

  // Helper function to format dates
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", options); // Format: DD/MM/YYYY
  };

  return (
    <Card align="center" direction="column" w="100%" {...props}>
      <Flex
        align="flex-start"
        w="100%"
        px="15px"
        py="10px"
        justifyContent="space-between"
      >
        {/* Left column - Text content */}
        <Box>
          <Text
            color={textColor}
            fontSize="200%"
            fontWeight="700"
            lineHeight="100%"
          >
            {contest.name}
          </Text>
          <Text color={textColor} fontSize="130%" textAlign="left" mt="4px">
            Start Date: {formatDate(contest.startDate)}
          </Text>
          <Text color={textColor} fontSize="130%" textAlign="left" mt="4px">
            End Date: {formatDate(contest.endDate)}
          </Text>
          <Text color={textColor} fontSize="130%" textAlign="left" mt="12px">
            Deadline: {formatDate(contest.submissionDeadline)}
          </Text>
          <Text color={textColor} fontSize="120%" textAlign="left" mt="80px">
            Organized By: {contest.organizerName}
          </Text>

          {/* Total Submissions Box */}
          <Box
            onMouseEnter={() => setHovered(true)} // Trigger hover effect
            onMouseLeave={() => setHovered(false)} // Reset hover effect
            style={{
              position: "relative",
              padding: "10px",
              backgroundColor: "#007bff",
              color: "#000", // Set text color to black
              borderRadius: "8px",
              cursor: "pointer",
              textAlign: "center",
              marginTop: "12px",
            }}
          >
            <Text fontSize="120%" fontWeight="600" color="white">
              Total Submissions: {contest.totalSubmissions}
            </Text>
            {hovered && (
              <Box
                style={{
                  position: "absolute",
                  top: "50px", // Position it above the box
                  left: "50%",
                  transform: "translateX(-50%)",
                  padding: "10px",
                  backgroundColor: "#f1f1f1",
                  borderRadius: "8px",
                  border: "1px solid #ddd",
                  width: "200px",
                  textAlign: "center",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                }}
              >
                <Text color="#000">Total Reviewed: {contest.reviewedSubmissions}</Text>
                <Text color="#000">Total Pending: {contest.pendingSubmissions}</Text>
              </Box>
            )}
          </Box>
        </Box>

        {/* Right column - Image */}
        <Box w="250px" h="300px">
          <img
            src={contest.thumbnail || "/images/placeholder.png"}
            alt={contest.thumbnail || "Contest Image"}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "8px", // Customize corner radius
            }}
          />
        </Box>
      </Flex>
    </Card>
  );
}
