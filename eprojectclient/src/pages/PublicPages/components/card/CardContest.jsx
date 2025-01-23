import {
    Box,
    Flex,
    Text,
    useColorModeValue,
  } from "@chakra-ui/react";
  import Card from "@/components/card/Card.js";
  
  export default function CardContest({ contest, ...props }) {
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
            <Text color={textColor} fontSize="120%" textAlign="left" mt="80px">
              Organized By: {contest.organizerName}
            </Text>
          </Box>
  
          {/* Cột bên phải - Hình ảnh */}
          <Box w="250px" h="300px">
            <img
              src={contest.thumbnail || "/images/placeholder.png"}
              alt={contest.thumbnail || "Contest Image"}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "8px", // Tùy chỉnh bo góc
              }}
            />
          </Box>
        </Flex>
      </Card>
    );
  }
  