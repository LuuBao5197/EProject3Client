import {
    Box,
    Flex,
    Text,
    useColorModeValue,
  } from "@chakra-ui/react";
  import Card from "@/components/card/Card.js";
import { useNavigate } from "react-router-dom";


  
  export default function CardContest({ contest, ...props }) {
    // Chakra Color Mode
    const textColor = useColorModeValue("secondaryGray.900", "white");
    const nav =useNavigate();

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
          {/* Cột bên trái - Phần nội dung chữ */}
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
            <Text color={textColor} fontSize="130%" textAlign="left" mt="12px">
              <button className="btn btn-outline-dark" onClick={()=>nav(`createsubmission/${contest.id}`)}>Join</button>
            </Text>
            <Text color={textColor} fontSize="120%" textAlign="left" mt="80px">
              Organized By: {contest.organizerName}
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
        </Flex>

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
      </Card>
  );
}
