import React, { useState, useEffect } from "react";
import { Box, SimpleGrid, Input, Select, VStack, Button, HStack } from "@chakra-ui/react";
import CardHome from "./card/CardHome";

const ExhibitionList = () => {
  const [exhibitions, setExhibitions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("all"); // 'ongoing', 'upcoming', 'completed', 'all'
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  // Fetch data from API
  useEffect(() => {
    const fetchExhibitions = async () => {
      try {
        const response = await fetch("http://localhost:5190/api/Exhibition");
        if (!response.ok) {
          throw new Error("Failed to fetch exhibitions");
        }
        const data = await response.json();
        setExhibitions(data); // Ensure `data` contains `phase` field
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchExhibitions();
  }, []);

  // Lọc exhibitions
  const filteredExhibitions = exhibitions
    .filter((exhibition) =>
      exhibition.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((exhibition) => {
      if (sortOption === "Oncoming") {
        return exhibition.phase === "Oncoming"; // Đang tổ chức
      }
      if (sortOption === "Upcoming") {
        return exhibition.phase === "Upcoming"; // Sắp tổ chức
      }
      if (sortOption === "Completed") {
        return exhibition.phase === "Completed"; // Đã hoàn thành
      }
      return true; // Mặc định: tất cả
    });

  // Xử lý phân trang
  const indexOfLastExhibition = currentPage * itemsPerPage;
  const indexOfFirstExhibition = indexOfLastExhibition - itemsPerPage;
  const currentExhibitions = filteredExhibitions.slice(indexOfFirstExhibition, indexOfLastExhibition);

  const totalPages = Math.ceil(filteredExhibitions.length / itemsPerPage);

  // Chuyển trang
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      {/* Tìm kiếm và sắp xếp */}
      <h2>Exhibition List</h2>
      <HStack spacing={4} mb={6}>
        <Input
          width={650}
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
        />
        <Select
          width={300}
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="all">All</option>
          <option value="Ongoing">Ongoing</option>
          <option value="Upcoming">Upcoming</option>
          <option value="Completed">Completed</option>
        </Select>
      </HStack>

      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap="20px" mb="20px">
          {currentExhibitions.map((exhibition) => (
            <CardHome key={exhibition.id} exhibition={exhibition} />
          ))}
        </SimpleGrid>
      )}

      {/* Phân trang */}
      <HStack spacing={4} justify="center" mt="20px">
        {currentPage > 1 && (
          <Button onClick={() => handlePageChange(currentPage - 1)}>
            Previous
          </Button>
        )}
        {[...Array(totalPages)].map((_, index) => (
          <Button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            variant={index + 1 === currentPage ? "solid" : "outline"}
          >
            {index + 1}
          </Button>
        ))}
        {currentPage < totalPages && (
          <Button onClick={() => handlePageChange(currentPage + 1)}>
            Next
          </Button>
        )}
      </HStack>
    </Box>
  );
};

export default ExhibitionList;
