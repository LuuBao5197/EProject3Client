import React, { useState, useEffect } from "react";
import { Box, SimpleGrid, Input, Select, VStack, Button, HStack } from "@chakra-ui/react";
import CardContest from "./card/CardContest";

const ContestList = () => {
  const [contests, setContests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  // Fetch data from API
  useEffect(() => {
    const fetchContests = async () => {
      try {
        const response = await fetch("http://localhost:5190/api/Contest");
        if (!response.ok) {
          throw new Error("Failed to fetch contests");
        }
        const data = await response.json();
        setContests(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchContests();
  }, []);

  // Filter and sort contests
  const filteredContests = contests
    .filter((contest) =>
      contest.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((contest) => {
      if (sortOption === "Oncoming") {
        return contest.phase === "Oncoming"; // Lọc theo phase "OnComing"
      }
      if (sortOption === "Upcoming") {
        return contest.phase === "Upcoming"; // Lọc theo phase "UpComing"
      }
      if (sortOption === "Completed") {
        return contest.phase === "Completed"; // Lọc theo phase "Completed"
      }
      return true; // Hiển thị tất cả contests
    });

  // Pagination logic
  const indexOfLastContest = currentPage * itemsPerPage;
  const indexOfFirstContest = indexOfLastContest - itemsPerPage;
  const currentContests = filteredContests.slice(indexOfFirstContest, indexOfLastContest);

  const totalPages = Math.ceil(filteredContests.length / itemsPerPage);

  // Change page
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      {/* Search and Sort */}
      <h2>Contest List</h2>
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
          <option value="Oncoming">Oncoming</option>
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
          {currentContests.map((contest) => (
            <CardContest key={contest.id} contest={contest} />
          ))}
        </SimpleGrid>
      )}

      {/* Pagination */}
      <HStack spacing={4} justify="center" mt="20px">
        {currentPage > 1 && (
          <Button onClick={() => handlePageChange(currentPage - 1)}>Previous</Button>
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
          <Button onClick={() => handlePageChange(currentPage + 1)}>Next</Button>
        )}
      </HStack>
    </Box>
  );
};

export default ContestList;
