// Chakra imports
import {
  Flex,
  useColorModeValue,
  Text,
} from "@chakra-ui/react";
import Card from "@/components/card/Card.js";
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ExhibitionIncoming(props) {
  const { ...rest } = props;
  const [exhibitions, setExhibitions] = useState([]);
  const now = new Date(); // Define current time

  const incomingExhibitions = exhibitions.filter(
    (exhibition) =>
      new Date(exhibition.startDate) > now // Only include future exhibitions
  );

  useEffect(() => {
    // Fetch exhibition data
    axios
      .get("http://localhost:5190/api/Exhibition") // Replace with your API URL
      .then((response) => {
        setExhibitions(response.data); // Save the list of exhibitions
      })
      .catch((error) => {
        console.error("Error fetching exhibition data:", error);
      });
  }, []);

  // Chakra Color Mode
  const textColor = useColorModeValue("secondaryGray.900", "white");

  return (
    <Card align="center" direction="column" w="100%" {...rest}>
      <Flex
        align="flex-start"
        direction="column"
        w="100%"
        px="15px"
        py="10px"
        gap="20px"
      >
        {/* Header Section */}
        <Text
          color={textColor}
          fontSize="xl"
          fontWeight="700"
          lineHeight="100%"
          textAlign="left"
        >
          Incoming Exhibitions
        </Text>

        {/* Carousel Section */}
        <div
          id="carouselIncomingExhibitions"
          className="carousel slide"
          data-bs-ride="carousel"
          style={{ width: "100%" }}
        >
          {/* Carousel Indicators */}
          <div
            className="carousel-indicators"
            style={{
              position: "absolute", 
              bottom: "-20px",
              display: "flex",
              justifyContent: "center",
              gap: "10px",
            }}
          >
            {incomingExhibitions.map((_, index) => (
              <button
                key={index}
                type="button"
                data-bs-target="#carouselIncomingExhibitions"
                data-bs-slide-to={index}
                className={index === 0 ? "active" : ""}
                aria-current={index === 0 ? "true" : "false"}
                aria-label={`Slide ${index + 1}`}
                style={{
                  width: "12px",
                  height: "12px",
                  borderRadius: "50%",
                  backgroundColor: index === 0 ? "black" : "#ccc",
                  border: "none",
                  transition: "background-color 0.3s ease",
                }}
              ></button>
            ))}
          </div>

          {/* Carousel Items */}
          <div className="carousel-inner">
            {incomingExhibitions.map((exhibition, index) => (
              <div
                key={exhibition.id}
                className={`carousel-item ${index === 0 ? "active" : ""}`}
                style={{
                  width: "100%",
                  textAlign: "center",
                  padding: "10px",
                  backgroundColor: useColorModeValue(
                    "secondaryGray.100",
                    "secondaryGray.700"
                  ),
                  borderRadius: "12px",
                }}
              >
                <h5 style={{ color: textColor, marginBottom: "10px" }}>
                  {exhibition.name}
                </h5>
                <p>Location: {exhibition.location}</p>
                <p>Organized By: {exhibition.organizedBy}</p>
                <p>
                  Start Date:{" "}
                  {new Date(exhibition.startDate).toLocaleDateString()}
                </p>
                <p>
                  End Date:{" "}
                  {new Date(exhibition.endDate).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>

          {/* Carousel Controls */}
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselIncomingExhibitions"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
              style={{
                backgroundColor: "black",
                borderRadius: "50%",
                width: "25px",
                height: "25px",
              }}
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselIncomingExhibitions"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
              style={{
                backgroundColor: "black",
                borderRadius: "50%",
                width: "25px",
                height: "25px",
              }}
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </Flex>
    </Card>
  );
}
