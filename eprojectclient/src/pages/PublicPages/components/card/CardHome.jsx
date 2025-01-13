import {
  Box,
  Flex,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import Card from "@/components/card/Card.js";

export default function CardHome({ exhibition, ...props }) {
  // Chakra Color Mode
  const textColor = useColorModeValue("secondaryGray.900", "white");

  // Helper function to format dates
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", options); // Format: DD/MM/YYYY
  };

  if (!exhibition) {
    return (
      <Card align="center" direction="column" w="100%" {...props}>
        <Text color={textColor} fontSize="lg" fontWeight="500">
          No exhibition data available.
        </Text>
      </Card>
    );
  }

  return (
    <Card align="center" direction="column" w="100%" {...props}>
      <Flex align="flex-start" w="100%" px="15px" py="10px" justifyContent="space-between">
        {/* Left Column - Text content */}
        <Box>
          <Text color={textColor} fontSize="200%" fontWeight="700" lineHeight="100%">
            {exhibition.name || "Untitled Exhibition"}
          </Text>
          <Text color={textColor} fontSize="130%" textAlign="left" mt="12px">
            Location: {exhibition.location || "Not Provided"}
          </Text>
          <Text color={textColor} fontSize="130%" textAlign="left" mt="4px">
            Start Date: {exhibition.startDate ? formatDate(exhibition.startDate) : "Not Available"}
          </Text>
          <Text color={textColor} fontSize="130%" textAlign="left" mt="4px">
            End Date: {exhibition.endDate ? formatDate(exhibition.endDate) : "Not Available"}
          </Text>
          <Text color={textColor} fontSize="120%" textAlign="left" mt="80px">
            Organized By: {exhibition.organizerName  || "Unknown"}
          </Text>
        </Box>

        {/* Right Column - Image */}
        <Box w="250px" h="300px">
          <img
            src={exhibition.image || "/images/placeholder.png"}
            alt={exhibition.name || "Exhibition Image"}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "8px", // Custom border radius
            }}
          />
        </Box>
      </Flex>
    </Card>
  );
}
