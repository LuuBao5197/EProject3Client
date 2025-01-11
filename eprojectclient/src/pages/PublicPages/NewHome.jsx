import {
    Box,
    SimpleGrid,
    useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import ExhibitionIncoming from "./components/ExhibitionIncoming";
import ExhibitionCurrent from "./components/ExhibitionCurrent";
  
  export default function NewHome() {
    // Chakra Color Mode
    const brandColor = useColorModeValue("brand.500", "white");
    const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
    return (
      <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
        <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap='20px' mb='20px'>
          <ExhibitionCurrent/>
          <ExhibitionIncoming/>
        </SimpleGrid>
      </Box>
    );
  }
  