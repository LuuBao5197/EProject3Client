import React, { useState } from "react";
import {
  Avatar,
  Box,
  Text,
  useColorModeValue,
  Button,Input,
  useDisclosure,Modal,ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import Card from "@/components/card/Card.js";

export default function Profile(props) {
  const { banner, avatar, name, job, email, password, id } = props;

  const [user, setUser] = useState({
    name: name || "",
    email: email || "",
    password: password || "",
    otp: "",
    newEmail: "", // State to track new email
  });
  const [passwordError, setPasswordError] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [fieldToChange, setFieldToChange] = useState(null);
  const [otpError, setOtpError] = useState(""); // Track OTP error
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false); // OTP modal visibility
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [message, setMessage] = useState(""); // Response messages
  const [isNewEmailModalOpen, setIsNewEmailModalOpen] = useState(false); // Track new email modal visibility

  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = "gray.400";
  const borderColor = useColorModeValue("white", "#111C44");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleChangeClick = (field) => {
    setFieldToChange(field);
    if (field === "email") {
      onOpen();
    } else {
      onOpen();
    }
  };

  const sendOtpToEmail = async () => {
    try {
      const response = await fetch(`http://localhost:5190/api/Auth/forgot-password?email=${encodeURIComponent(email)}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        console.log("OTP sent successfully to email");
        setIsOtpModalOpen(true); // Show OTP modal
        onClose(); // Close OTP request modal
      } else {
        const errorData = await response.json();
        setOtpError("Failed to send OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      setOtpError("There was an error. Please try again.");
    }
  };

  const handleOtpSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setMessage("");

    try {
      const response = await fetch("http://localhost:5190/api/Auth/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp: user.otp }),
      });

      if (response.ok) {
        setMessage("OTP verified successfully.");
        setIsOtpModalOpen(false);
        setIsNewEmailModalOpen(true); // Show modal for new email input
      } else {
        const errorText = await response.text();
        setMessage(errorText || "Failed to verify OTP.");
      }
    } catch (error) {
      setMessage("Failed to verify OTP.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewEmailSubmit = async () => {
    try {
      const response = await fetch(`http://localhost:5190/api/Auth/update-email/${id}`, {
        method: "POST", // or PUT depending on server requirements
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newEmail: user.newEmail }),
      });
  
      if (response.ok) {
        setMessage("Email updated successfully.");
        setUser((prevState) => ({
          ...prevState,
          email: user.newEmail,
        }));
        setIsNewEmailModalOpen(false);
  
        // Reload the page to reflect the changes
        window.location.reload();
      } else {
        const errorText = await response.text();
        setMessage(errorText || "Failed to update email.");
      }
    } catch (error) {
      setMessage("Error updating email.");
    }
  };
  const handleSaveClick = () => {
    // Redirect to the "/public/default" page
    window.location.href = '/public/default';
  };

  const handleSaveChangeName = async () => {
    if (!id) {
      console.error("User ID is missing!");
      return;
    }
  
    // Prepare FormData object to send the data as form-data
    const formData = new FormData();
    formData.append("Name", user.name || "");
    formData.append("Email", user.email || "");
    formData.append("Password", user.password || "");
    formData.append("Imagepath", user.imagepath || "");  // Include image path if needed
  
    // If there's a new file, append it to the FormData object
    if (user.file) {
      formData.append("file", user.file);
    }
  
    try {
      console.log("Updating user with form data:", formData);  // Log the data being sent
  
      const response = await fetch(`http://localhost:5190/api/User/${id}`, {
        method: "PUT",
        headers: {
          // Do not set Content-Type as the browser will automatically set it for FormData
        },
        body: formData,  // Send formData as the request body
      });
  
      if (response.ok) {
        console.log("User updated successfully");
        // Refresh the page after successful update
        window.location.reload();
      } else {
        console.error("Failed to update user");
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  
    onClose(); // Close modal after saving
  };

  const handleSaveChangePass = async () => {
    if (!id) {
      console.error("User ID is missing!");
      return;
    }
  
    // Password change validation
    if (fieldToChange === "password") {
      if (user.newPassword !== user.confirmPassword) {
        setPasswordError("New password and confirm password must match.");
        return;
      }
  
      if (user.newPassword.length < 6) {
        setPasswordError("New password must be at least 6 characters long.");
        return;
      }
  
      // Regex for password strength validation
      const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{6,}$/;
      if (!passwordRegex.test(user.newPassword)) {
        setPasswordError("Password must contain at least one uppercase letter, one number, and one special character.");
        return;
      }
  
      setPasswordError(""); // Reset error message if validation passes
    }
  
    // Prepare the payload for password update
    const updatePasswordData = {
      currentPassword: user.currentPassword,
      newPassword: user.newPassword,
      confirmPassword: user.confirmPassword,
    };
  
    try {
      console.log("Updating password:", updatePasswordData);
  
      const response = await fetch(`http://localhost:5190/api/Auth/update-password/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatePasswordData),
      });
  
      if (response.ok) {
        console.log("Password updated successfully");
        window.location.reload(); // Reload to reflect the password change
      } else {
        const errorData = await response.json();
        console.error("Failed to update password:", errorData);
  
        // Show API error message to user
        if (errorData.errors) {
          setPasswordError(Object.values(errorData.errors).join(" "));
        } else {
          setPasswordError("An unknown error occurred while updating the password.");
        }
      }
    } catch (error) {
      console.error("Error updating password:", error);
      setPasswordError("There was an error with the request. Please try again.");
    }
  
    onClose(); // Close modal after saving
  };
  

  return (
    <Card mb={{ base: "0px", lg: "20px" }} align="center">
      <Box bg={`url(${banner})`} bgSize="cover" borderRadius="16px" h="131px" w="100%" />
      <Avatar
        mx="auto"
        src={avatar}
        h="87px"
        w="87px"
        mt="-43px"
        border="4px solid"
        borderColor={borderColor}
      />
      <Text color={textColorPrimary} fontWeight="bold" fontSize="xl" mt="10px">
        {name}
      </Text>
      <Text color={textColorSecondary} fontSize="sm">
        {job}
      </Text>

      <form onSubmit={(e) => e.preventDefault()}>
        <div className="form-group">
          <label>Name:</label>
          {name}
          <Button onClick={() => handleChangeClick("name")}>Change</Button>
        </div>
        <div className="form-group">
          <label>Email:</label>
          {email}
          <Button onClick={() => handleChangeClick("email")}>Change</Button>
        </div>
        <div className="form-group">
          <label>Password:</label>
          {password}
          <Button onClick={() => handleChangeClick("password")}>Change</Button>
        </div>

        <Button type="button" onClick={handleSaveClick} className="open-modal-btn">
          Save
        </Button>
      </form>


      {/* Name Change Modal */}
      <Modal isOpen={isOpen && fieldToChange === "name"} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Change {fieldToChange}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              name={fieldToChange}
              value={user[fieldToChange] || ""}
              onChange={handleInputChange}
              placeholder="Enter" // Corrected the placeholder
            />        
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSaveChangeName}>
              Save
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Password Change Modal */}
      <Modal isOpen={isOpen && fieldToChange === "password"} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Change Your Password</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              type="password"
              name="currentPassword"
              value={user.currentPassword}
              onChange={handleInputChange}
              placeholder="Current Password"
              mb={3}
            />
            <Input
              type="password"
              name="newPassword"
              value={user.newPassword}
              onChange={handleInputChange}
              placeholder="New Password"
              mb={3}
            />
            <Input
              type="password"
              name="confirmPassword"
              value={user.confirmPassword}
              onChange={handleInputChange}
              placeholder="Confirm New Password"
              mb={3}
            />
            {passwordError && <Text color="red.500" fontSize="sm">{passwordError}</Text>}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={handleSaveChangePass}>
              Save Changes
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* OTP Confirmation Modal */}
      <Modal isOpen={isOpen && fieldToChange === "email"} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Send OTP to Your Email</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Do you want to send an OTP to your current email address ({email}) to confirm the email change?</Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={sendOtpToEmail}>
              Yes, Send OTP
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {/* OTP Modal */}
      <Modal isOpen={isOtpModalOpen} onClose={() => setIsOtpModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Enter OTP to Change Email</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              type="text"
              name="otp"
              value={user.otp}
              onChange={handleInputChange}
              placeholder="Enter OTP"
              mb={3}
            />
            {otpError && <Text color="red.500" fontSize="sm">{otpError}</Text>}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleOtpSubmit}>
              Verify OTP
            </Button>
            <Button variant="ghost" onClick={() => setIsOtpModalOpen(false)}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {/* New Email Input Modal */}
      <Modal isOpen={isNewEmailModalOpen} onClose={() => setIsNewEmailModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Enter New Email</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              type="email"
              name="newEmail"
              value={user.newEmail}
              onChange={handleInputChange}
              placeholder="Enter New Email"
              mb={3}
            />
            {message && <Text color={message.includes("successfully") ? "green.500" : "red.500"} fontSize="sm">{message}</Text>}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleNewEmailSubmit}>
              Save New Email
            </Button>
            <Button variant="ghost" onClick={() => setIsNewEmailModalOpen(false)}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Card>

    
  );
}
