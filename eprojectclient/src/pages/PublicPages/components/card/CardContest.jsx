import {
  Box,
  Flex,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import Card from "@/components/card/Card.js";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function CardContest({ contest, ...props }) {
  const [hovered, setHovered] = useState(false); // State để quản lý hover
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const nav = useNavigate();

  // Hàm định dạng ngày
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
        {/* Cột bên trái - Nội dung */}
        <Box
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          position="relative" // Để tooltip xuất hiện đúng vị trí
          width="60%"
        >
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
            <button
              className="btn btn-outline-dark"
              onClick={() => nav(`createsubmission/${contest.id}`)}
            >
              Join
            </button>
          </Text>
          <Text color={textColor} fontSize="120%" textAlign="left" mt="80px">
            Organized By: {contest.organizerName}
          </Text>

          {/* Hiển thị thông tin khi hover */}
          {hovered && (
            <Box
              position="absolute"
              top="100%"
              left="0"
              mt="8px"
              p="10px"
              backgroundColor="white"
              borderRadius="8px"
              border="1px solid #ddd"
              width="220px"
              textAlign="center"
              boxShadow="0 4px 8px rgba(0, 0, 0, 0.1)"
              zIndex="10"
            >
              <Text color="black">Total Reviewed: {contest.reviewedSubmissions}</Text>
              <Text color="black">Total Pending: {contest.pendingSubmissions}</Text>
            </Box>
          )}
        </Box>

        {/* Cột bên phải - Ảnh */}
        <Box w="250px" h="300px">
          <img
            src={contest.thumbnail || "/images/placeholder.png"}
            alt={contest.thumbnail || "Contest Image"}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "8px",
            }}
          />
        </Box>
      </Flex>
    </Card>
  );
}
