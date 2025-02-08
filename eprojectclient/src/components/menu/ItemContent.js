import React from "react";
import { Flex, Text, useColorModeValue } from "@chakra-ui/react";

export function ItemContent({ info, description, organized, status }) {
  const textColor = useColorModeValue("navy.700", "white");

  // You can conditionally style the status to reflect its color (for example, "Canceled" might be red)
  const statusColor = status === "Canceled" ? "red.500" : "green.500"; // Change color based on status

  return (
    <Flex direction="column" p={4} borderRadius="10px" bg="white" boxShadow="sm">
      <Flex align="center" justify="space-between" mb={2}>
        <Text fontSize="lg" fontWeight="bold" color={textColor}>
          {info} {/* This will display the meeting time */}
        </Text>
      </Flex>
      <Text fontSize="sm" color={textColor} mb={2}>
        <strong>Description:</strong> {description}
      </Text>
      <Text fontSize="sm" color={textColor} mb={2}>
        <strong>Organized by:</strong> {organized}
      </Text>
      <Text fontSize="sm" color={statusColor}>
        <strong>Status:</strong> {status} {/* Display status */}
      </Text>
    </Flex>
  );
}
