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
  Text,
  UnorderedList,
  ListItem
} from '@chakra-ui/react';
import { jwtDecode } from 'jwt-decode';


function ChangePasswordModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [userId, setUserId] = useState(null);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');

  const onClose = () => setIsOpen(false);

  // Fetch user data on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("inforToken");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      const decodedToken = jwtDecode(parsedUser.token);
      setUserId(decodedToken.Id);
    }
  }, []);

  const passwordRequirements = [
    { text: "At least 8 characters", check: (pw) => pw.length >= 8 },
    { text: "At least 1 uppercase letter", check: (pw) => /[A-Z]/.test(pw) },
    { text: "At least 1 number", check: (pw) => /[0-9]/.test(pw) },
    { text: "At least 1 special character", check: (pw) => /[!@#$%^&*(),.?":{}|<>]/.test(pw) },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
  };

  const handleSaveChangePass = async () => {
    let formValid = true;
    let tempErrors = {};

    // Validate current password
    if (!user.currentPassword) {
      tempErrors.currentPassword = 'Current password cannot be empty.';
      formValid = false;
    }

    // Validate new password
    if (!user.newPassword) {
      tempErrors.newPassword = 'New password cannot be empty.';
      formValid = false;
    } else if (!passwordRequirements.every(req => req.check(user.newPassword))) {
      tempErrors.newPassword = 'New password does not meet all requirements.';
      formValid = false;
    }

    // Validate confirm password
    if (!user.confirmPassword) {
      tempErrors.confirmPassword = 'Please confirm your password.';
      formValid = false;
    } else if (user.newPassword !== user.confirmPassword) {
      tempErrors.confirmPassword = 'Password confirmation does not match.';
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
      setMessage('Error: User ID not found.');
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
        const textResponse = await response.text();
        setMessage(textResponse || 'Error updating password.');
        return;
      }

      setMessage('Password updated successfully.');
      setIsOpen(false);
    } catch (error) {
      setMessage('An error occurred while updating the password.');
    }
  };

  return (
    <div>
      <Button colorScheme="blue" onClick={() => setIsOpen(true)}>
        Change Password
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Change Password</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <label>Current Password</label>
            <Input
              type="password"
              name="currentPassword"
              value={user.currentPassword}
              onChange={handleInputChange}
              placeholder="Enter current password"
              mb={3}
            />
            {errors.currentPassword && <Text color="red.500" fontSize="sm">{errors.currentPassword}</Text>}

            <label>New Password</label>
            <Input
              type="password"
              name="newPassword"
              value={user.newPassword}
              onChange={handleInputChange}
              placeholder="Enter new password"
              mb={3}
            />
            {errors.newPassword && <Text color="red.500" fontSize="sm">{errors.newPassword}</Text>}

            

            <label>Confirm Password</label>
            <Input
              type="password"
              name="confirmPassword"
              value={user.confirmPassword}
              onChange={handleInputChange}
              placeholder="Confirm new password"
              mb={3}
            />
            {errors.confirmPassword && <Text color="red.500" fontSize="sm">{errors.confirmPassword}</Text>}

            <UnorderedList>
              {passwordRequirements.map((req, index) => (
                <ListItem key={index} color={req.check(user.newPassword) ? "green.500" : "red.500"}>
                  {req.check(user.newPassword) ? "✅" : "❌"} {req.text}
                </ListItem>
              ))}
            </UnorderedList>
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
