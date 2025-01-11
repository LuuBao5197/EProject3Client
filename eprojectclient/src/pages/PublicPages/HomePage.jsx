import React, { useState, useEffect } from "react";
import CardHome from "./components/card/CardHome";
import { Box, SimpleGrid, Input, Select, VStack, Button, HStack } from "@chakra-ui/react";
import FooterHome from "./components/footer/FooterHome";
import NavbarHome from "./components/navbar/NavbarHome";

const HomePage = () => {
  const [exhibitions, setExhibitions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("all"); // 'ongoing', 'upcoming', 'all'
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4; // Số exhibitions trên mỗi trang

  // Fetch data from API
  useEffect(() => {
    const fetchExhibitions = async () => {
      try {
        const response = await fetch("http://localhost:5190/api/Exhibition");
        if (!response.ok) {
          throw new Error("Failed to fetch exhibitions");
        }
        const data = await response.json();
        setExhibitions(data); // Assuming `data` is an array of exhibitions
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchExhibitions();
  }, []);

  // Lọc và sắp xếp danh sách exhibitions
  const filteredExhibitions = exhibitions
    .filter((exhibition) =>
      exhibition.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((exhibition) => {
      if (sortOption === "ongoing") {
        const now = new Date();
        const startDate = new Date(exhibition.startDate);
        const endDate = new Date(exhibition.endDate);
        return now >= startDate && now <= endDate; // Đang tổ chức
      }
      if (sortOption === "upcoming") {
        const now = new Date();
        const startDate = new Date(exhibition.startDate);
        return startDate > now; // Sắp tổ chức
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
    <div className="container">
      <NavbarHome/>
      <header>
        <h1>Exhibition List</h1>
        <VStack align="start" spacing={4} mb={6}>
          {/* Ô tìm kiếm */}
          <Input
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1); // Reset page khi tìm kiếm thay đổi
            }}
          />

          {/* Dropdown chọn kiểu sắp xếp */}
          <Select
            placeholder="Sort exhibitions"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="all">All</option>
            <option value="ongoing">Ongoing</option>
            <option value="upcoming">Upcoming</option>
          </Select>
        </VStack>
      </header>

      <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
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
      <FooterHome/>
    </div>
  );
};

export default HomePage;
