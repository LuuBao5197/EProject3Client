import {
  Box,
  Flex,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import Card from "@/components/card/Card.js";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { checkIfSubmitted } from './../../../../API/getMySubmissions'; // API to check if the student has already submitted
import { jwtDecode } from "jwt-decode"; // Correct import for jwt-decode
import { getStudentIdDemo } from "../../../../API/getStudentIdDemo";

export default function CardContest({ contest, ...props }) {

  const [hovered, setHovered] = useState(false); // State để quản lý hover
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const nav = useNavigate();

  // Hàm định dạng ngày

  // Chakra Color Mode
  const [hovered, setHovered] = useState(false); // State to manage hover effect
  const [showJoinButton, setShowJoinButton] = useState(false); // State to manage the visibility of the Join button
  const [status, setStatus] = useState(''); // State to manage contest status
  const [hasSubmitted, setHasSubmitted] = useState(false); // State to manage if the student has submitted or not
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const nav = useNavigate();


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
=======
  useEffect(() => {
    const currentDate = new Date();
    const startDate = new Date(contest.startDate);
    const endDate = new Date(contest.endDate);

    // Adjust the time to make the comparison accurate
    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(23, 59, 59, 999);

    // Determine the status of the contest
    if (currentDate < startDate) {
      setStatus('Upcoming');
      setShowJoinButton(false);
    } else if (currentDate >= startDate && currentDate <= endDate) {
      setStatus('Ongoing');
      setShowJoinButton(true);
    } else {
      setStatus('Completed');
      setShowJoinButton(false);
    }

    const fetchStudentIdAndCheckSubmission = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        const decodedToken = jwtDecode(token);
        if (decodedToken.role === "Student") {
          // Lấy studentId
          const studentId = await getStudentIdDemo();

          // Kiểm tra nếu thí sinh đã nộp bài
          if (studentId) {
            const response = await checkIfSubmitted(studentId, contest.id);
            setHasSubmitted(!response); // Nếu đã nộp bài, setHasSubmitted sẽ là true
          }
        }
      }
    };

    fetchStudentIdAndCheckSubmission();
  }, [contest.startDate, contest.endDate, contest.id]);
  
  const handleJoinClick = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      nav("/auth/sign-in");
    } else {
      nav(`createsubmission/${contest.id}`);
    }
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
          {showJoinButton && !hasSubmitted ? (
            <Text color={textColor} fontSize="130%" textAlign="left" mt="12px">
              <button className="btn btn-outline-dark" onClick={handleJoinClick}>Join</button>
            </Text>
          ) : (
            <Text color={textColor} fontSize="130%" textAlign="left" mt="12px">
              {hasSubmitted ? "You have already submitted for this contest." : `Status: ${status}`}
            </Text>
          )}
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
>>>>>>> 5073714eace82098424356f130295e8cd347c380
    </Card>
  );
}
