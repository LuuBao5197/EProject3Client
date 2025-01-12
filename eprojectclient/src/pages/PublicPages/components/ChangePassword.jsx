import React, { useEffect, useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Text
} from '@chakra-ui/react';
import { jwtDecode } from 'jwt-decode';
import axios from "axios";

function ChangePasswordModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [userId, setUserId] = useState(null); // Add userId state
  const [errors, setErrors] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [message, setMessage] = useState('');

  const onClose = () => setIsOpen(false);

  // Fetch user data on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("inforToken");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      const decodedToken = jwtDecode(parsedUser.token);

      // Save the user id from the token
      setUserId(decodedToken.Id);

      // Fetch user data using the decoded token's ID
      axios.get(`http://localhost:5190/api/User/${decodedToken.Id}`)
        .then(response => {
          setUser(response.data); // Set the fetched user data
        })
        .catch(() => {
          alert('Failed to fetch user data');
        });
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: '' })); // Reset error for the field
  };

  const handleSaveChangePass = async () => {
    let formValid = true;
    let tempErrors = { currentPassword: '', newPassword: '', confirmPassword: '' };
  
    // Validate current password
    if (!user.currentPassword) {
      tempErrors.currentPassword = 'Current password is required.';
      formValid = false;
    }
  
    // Validate new password
    if (!user.newPassword) {
      tempErrors.newPassword = 'New password is required.';
      formValid = false;
    } else {
      // Regex for password validation (at least 8 chars, 1 uppercase, 1 number, 1 special char)
      const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;
      if (!passwordRegex.test(user.newPassword)) {
        tempErrors.newPassword = 'New password must be at least 8 characters long, include one uppercase letter, one number, and one special character.';
        formValid = false;
      }
    }
  
    // Validate confirm password
    if (!user.confirmPassword) {
      tempErrors.confirmPassword = 'Please confirm your new password.';
      formValid = false;
    }
  
    if (user.newPassword !== user.confirmPassword) {
      tempErrors.confirmPassword = 'New password and confirm password must match.';
      formValid = false;
    }
  
    // Validate that new password is not the same as the current password
    if (user.newPassword === user.currentPassword) {
      tempErrors.newPassword = 'New password cannot be the same as the current password.';
      formValid = false;
    }
  
    if (!formValid) {
      setErrors(tempErrors);
      return;
    }
  
    if (!userId) {
      setMessage('User ID is missing.');
      return;
    }
  
    try {
      const response = await fetch(`http://localhost:5190/api/Auth/update-password/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          currentPassword: user.currentPassword,
          newPassword: user.newPassword,
          confirmPassword: user.confirmPassword,
        }),
      });
  
      if (!response.ok) {
        // Check if the response is not JSON and handle accordingly
        const textResponse = await response.text();  // Get the text response
        setMessage(textResponse || 'Failed to update password');
        return;
      }
  
      const contentType = response.headers.get('Content-Type');
      if (contentType && contentType.includes('application/json')) {
        const successData = await response.json(); // Parse as JSON if it's JSON
        setMessage(successData.message || 'Password has been updated successfully.');
      } else {
        // If it's not JSON, assume it's a plain text message
        const successMessage = await response.text();
        setMessage(successMessage || 'Password has been updated successfully.');
      }
  
      setIsOpen(false); // Close the modal on successful update
    } catch (error) {
      setMessage('An error occurred while updating the password.');
      console.error('Error:', error);
    }
  };
  
  

  return (
    <div>
      {/* Button to open the modal */}
      <Button colorScheme="blue" onClick={() => setIsOpen(true)}>
        Change Password
      </Button>

      {/* Password Change Modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Change Your Password</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              type="password"
              name="currentPassword"
              value={user.currentPassword || ''}  // Ensure controlled input with default value
              onChange={handleInputChange}
              placeholder="Current Password"
              mb={3}
            />
            {errors.currentPassword && <Text color="red.500" fontSize="sm">{errors.currentPassword}</Text>}
            
            <Input
              type="password"
              name="newPassword"
              value={user.newPassword || ''}  // Ensure controlled input with default value
              onChange={handleInputChange}
              placeholder="New Password"
              mb={3}
            />
            {errors.newPassword && <Text color="red.500" fontSize="sm">{errors.newPassword}</Text>}
            
            <Input
              type="password"
              name="confirmPassword"
              value={user.confirmPassword || ''}  // Ensure controlled input with default value
              onChange={handleInputChange}
              placeholder="Confirm New Password"
              mb={3}
            />
            {errors.confirmPassword && <Text color="red.500" fontSize="sm">{errors.confirmPassword}</Text>}
            
            {message && <Text color={message.includes("successfully") ? "green.500" : "red.500"} fontSize="sm">{message}</Text>}
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
    </div>
  );
}

export default ChangePasswordModal;
