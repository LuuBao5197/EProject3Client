import React, { useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode"; // Correct import for jwt-decode
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
// Chakra imports
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useColorModeValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
// Custom components
import { HSeparator } from "@/components/separator/Separator";
import DefaultAuth from "@/layouts/auth/Default";
// Assets
import illustration from "@/assets/img/auth/auth.png";
import { FcGoogle } from "react-icons/fc";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiEyeCloseLine } from "react-icons/ri";

function SignIn() {
  // Chakra color mode
  const textColor = useColorModeValue("navy.700", "white");
  const textColorSecondary = "gray.400";
  const textColorDetails = useColorModeValue("navy.700", "secondaryGray.600");
  const textColorBrand = useColorModeValue("brand.500", "white");
  const brandStars = useColorModeValue("brand.500", "brand.400");
  const googleBg = useColorModeValue("secondaryGray.300", "whiteAlpha.200");
  const googleText = useColorModeValue("navy.700", "white");
  const googleHover = useColorModeValue(
    { bg: "gray.200" },
    { bg: "whiteAlpha.300" }
  );
  const googleActive = useColorModeValue(
    { bg: "secondaryGray.300" },
    { bg: "whiteAlpha.200" }
  );
  const [show, setShow] = React.useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const navigate = useNavigate(); // Initialize navigate

  const handleClick = () => setShow(!show);

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5190/api/Auth/login", {
        email,
        password,
      });
      console.log("res: ", res);
      localStorage.setItem("inforToken", JSON.stringify(res.data));
      const decodedToken = jwtDecode(res.data.token);
      navigate("/", { state: { user: decodedToken } });

      alert("Login successful");
    } catch (err) {
      console.error(err);
      alert("Login failed. Please check your credentials.");
    }
  }

  // Handle the email submission to send OTP
  const handleEmailSubmit = async (event) => {
    event.preventDefault();  // Ngừng hành động mặc định của form
    setIsLoading(true);
    setMessage('');
  
    try {
      const response = await fetch(`http://localhost:5190/api/Auth/forgot-password?email=${encodeURIComponent(email)}`, {
        method: 'POST',
        headers: {
          accept: '*/*',
        },
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Failed to send OTP');
      }
  
      const textData = await response.text();
      setMessage(textData || 'OTP has been sent to your email.');
      setStep(2); // Proceed to OTP input
    } catch (error) {
      setMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  
// Handle the OTP submission to verify the OTP
const handleOtpSubmit = async (event) => {
  event.preventDefault();
  setIsLoading(true);
  setMessage('');

  try {
    const response = await fetch('http://localhost:5190/api/Auth/verify-otp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        otp, // OTP entered by the user
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || 'Failed to verify OTP');
    }

    const textData = await response.text();
    setMessage(textData || 'OTP verified successfully.');
    setStep(3); // Proceed to password reset form
  } catch (error) {
    setMessage(error.message);
  } finally {
    setIsLoading(false);
  }
};

// Password validation function
const validatePassword = (password) => {
  const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
  return regex.test(password);
};

// Handle the password reset submission
const handlePasswordSubmit = async (event) => {
  event.preventDefault();
  setIsLoading(true);
  setMessage('');

  // Check if passwords match
  if (newPassword !== confirmPassword) {
    setMessage('Passwords do not match.');
    setIsLoading(false);
    return;
  }

  // Validate the password
  if (!validatePassword(newPassword)) {
    setMessage('Password must be at least 6 characters, include 1 capital letter, 1 digit, and 1 special symbol.');
    setIsLoading(false);
    return;
  }

  try {
    const response = await fetch('http://localhost:5190/api/Auth/reset-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        newPassword, // Send the new password
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || 'Failed to reset password');
    }

    const textData = await response.text();
    setMessage(textData || 'Password has been reset successfully.');

    // Close the modal after successful password reset
    setIsModalOpen(false);

  } catch (error) {
    setMessage(error.message);
  } finally {
    setIsLoading(false);
  }
};




  return (
    <DefaultAuth illustrationBackground={illustration} image={illustration}>
      <Flex
        maxW={{ base: "100%", md: "max-content" }}
        w="100%"
        mx={{ base: "auto", lg: "0px" }}
        me="auto"
        h="100%"
        alignItems="start"
        justifyContent="center"
        mb={{ base: "30px", md: "60px" }}
        px={{ base: "25px", md: "0px" }}
        mt={{ base: "40px", md: "14vh" }}
        flexDirection="column"
      >
        <Box me="auto">
          <Heading color={textColor} fontSize="36px" mb="10px">
            Sign In
          </Heading>
          <Text mb="36px" ms="4px" color={textColorSecondary} fontWeight="400" fontSize="md">
            Enter your email and password to sign in!
          </Text>
        </Box>
        <Flex
          zIndex="2"
          direction="column"
          w={{ base: "100%", md: "420px" }}
          maxW="100%"
          background="transparent"
          borderRadius="15px"
          mx={{ base: "auto", lg: "unset" }}
          me="auto"
          mb={{ base: "20px", md: "auto" }}
        >
          <Button
            fontSize="sm"
            me="0px"
            mb="26px"
            py="15px"
            h="50px"
            borderRadius="16px"
            bg={googleBg}
            color={googleText}
            fontWeight="500"
            _hover={googleHover}
            _active={googleActive}
            _focus={googleActive}
          >
            <Icon as={FcGoogle} w="20px" h="20px" me="10px" />
            Sign in with Google
          </Button>
          <Flex align="center" mb="25px">
            <HSeparator />
            <Text color="gray.400" mx="14px">
              or
            </Text>
            <HSeparator />
          </Flex>
          <form onSubmit={handleLogin}>
            <FormControl>
              <FormLabel
                display="flex"
                ms="4px"
                fontSize="sm"
                fontWeight="500"
                color={textColor}
                mb="8px"
              >
                Email<Text color={brandStars}>*</Text>
              </FormLabel>
              <Input
                id="email"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                isRequired={true}
                variant="auth"
                fontSize="sm"
                ms={{ base: "0px", md: "0px" }}
                type="email"
                placeholder="mail@simmmple.com"
                mb="24px"
                fontWeight="500"
                size="lg"
              />
              <FormLabel ms="4px" fontSize="sm" fontWeight="500" color={textColor} display="flex">
                Password<Text color={brandStars}>*</Text>
              </FormLabel>
              <InputGroup size="md">
                <Input
                  id="password"
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                  isRequired={true}
                  fontSize="sm"
                  placeholder="Min. 8 characters"
                  mb="24px"
                  size="lg"
                  type={show ? "text" : "password"}
                  variant="auth"
                />
                <InputRightElement display="flex" alignItems="center" mt="4px">
                  <Icon
                    color={textColorSecondary}
                    _hover={{ cursor: "pointer" }}
                    as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                    onClick={handleClick}
                  />
                </InputRightElement>
              </InputGroup>
              <Flex justifyContent="space-between" align="center" mb="24px">
                <FormControl display="flex" alignItems="center">
                  <Checkbox id="remember-login" colorScheme="brandScheme" me="10px" />
                  <FormLabel
                    htmlFor="remember-login"
                    mb="0"
                    fontWeight="normal"
                    color={textColor}
                    fontSize="sm"
                  >
                    Keep me logged in
                  </FormLabel>
                </FormControl>
                <Button
                  variant="link"
                  color={textColorBrand}
                  fontSize="sm"
                  onClick={() => setIsModalOpen(true)} // Open modal on click
                >
                  Forgot password?
                </Button>
              </Flex>
              <Button
                type="submit"
                fontSize="sm"
                variant="brand"
                fontWeight="500"
                w="100%"
                h="50"
                mb="24px"
              >
                Sign In
              </Button>
            </FormControl>
          </form>
        </Flex>
      </Flex>

      {/* Forgot Password Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
  <ModalOverlay />
  <ModalContent>
    <ModalHeader>Forgot Password</ModalHeader>
    <ModalCloseButton />
    <ModalBody>

    {step === 1 && (

    <form onSubmit={(e) => {handleEmailSubmit(e); }}>
        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </FormControl>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={() => setIsModalOpen(false)}>
            Close
          </Button>
          <Button type="submit" colorScheme="blue">
            Send OTP
          </Button>
        </ModalFooter>
      </form>
      )}

      {step === 2 && (
        <form onSubmit={(e) => {handleOtpSubmit(e); }}>
        <FormControl>
          <FormLabel>OTP</FormLabel>
          <Input
            type="text"
            id="otp"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
        </FormControl>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={() => setIsModalOpen(false)}>
            Close
          </Button>
          <Button type="submit" colorScheme="blue">
            Verify OTP
          </Button>
        </ModalFooter>
      </form>
      )}

      {step === 3 && (
        <form onSubmit={(e) => {handlePasswordSubmit(e); }}>
          <FormControl>
            <FormLabel>New Password:</FormLabel>
            <Input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </FormControl>
          
          <FormControl>
            <FormLabel>Confirm Password:</FormLabel>
            <Input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </FormControl>

          <FormControl>
          <FormLabel>Password Requirements:</FormLabel>
                    {message && (
            <Text color="red.500" mb="4">
              {message}
            </Text>
          )}
          <Text fontSize="sm" color="gray.500">
            - At least 6 characters<br />
            - At least 1 capital letter<br />
            - At least 1 digit<br />
            - At least 1 special symbol (@, $, !, %, *, ?, &)
          </Text>
        </FormControl>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={() => setIsModalOpen(false)}>
              Close
            </Button>
            <Button
              type="submit"
              colorScheme="blue"
              isDisabled={newPassword !== confirmPassword}
            >
              Submit
            </Button>
          </ModalFooter>
        </form>
      )}
    </ModalBody>
  </ModalContent>
</Modal>

    </DefaultAuth>
  );
}

export default SignIn;
