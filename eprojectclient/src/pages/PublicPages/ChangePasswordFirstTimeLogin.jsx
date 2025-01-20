import React, { useEffect, useState } from 'react';
import { Box, Button, Input, Text, Heading } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { jwtDecode } from 'jwt-decode';

function ChangePasswordFirstTimeLogin() {
  const [user, setUser] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [userId, setUserId] = useState(null);
  const [errors, setErrors] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const storedUser = localStorage.getItem('inforToken');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      const decodedToken = jwtDecode(parsedUser.token);
      setUserId(decodedToken.Id);
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
  };

  const handleSaveChangePass = async () => {
    let formValid = true;
    let tempErrors = { currentPassword: '', newPassword: '', confirmPassword: '' };

    if (!user.currentPassword) {
      tempErrors.currentPassword = 'Current password is required.';
      formValid = false;
    }

    if (!user.newPassword) {
      tempErrors.newPassword = 'New password is required.';
      formValid = false;
    } else {
      const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;
      if (!passwordRegex.test(user.newPassword)) {
        tempErrors.newPassword = 'New password must be at least 8 characters long, include one uppercase letter, one number, and one special character.';
        formValid = false;
      }
    }

    if (!user.confirmPassword) {
      tempErrors.confirmPassword = 'Please confirm your new password.';
      formValid = false;
    }

    if (user.newPassword !== user.confirmPassword) {
      tempErrors.confirmPassword = 'New password and confirm password must match.';
      formValid = false;
    }

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
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        const textResponse = await response.text();
        setMessage(textResponse || 'Failed to update password');
        return;
      }

      const contentType = response.headers.get('Content-Type');
      if (contentType && contentType.includes('application/json')) {
        const successData = await response.json();
        setMessage(successData.message || 'Password has been updated successfully.');
      } else {
        const successMessage = await response.text();
        setMessage(successMessage || 'Password has been updated successfully.');
      }

      // Navigate to the home page after success
      navigate('/');
    } catch (error) {
      setMessage('An error occurred while updating the password.');
      console.error('Error:', error);
    }
  };

  return (
    <Box maxW="400px" mx="auto" mt={10} p={5} border="1px solid #ccc" borderRadius="md" boxShadow="md">
      <Heading as="h2" size="lg" mb={5} textAlign="center">
        Change Your Password
      </Heading>

      <label>Current Password</label>
      <Input
        type="password"
        name="currentPassword"
        value={user.currentPassword || ''}
        onChange={handleInputChange}
        placeholder="Current Password"
        mb={3}
      />
      {errors.currentPassword && <Text color="red.500" fontSize="sm">{errors.currentPassword}</Text>}

      <label>New Password</label>
      <Input
        type="password"
        name="newPassword"
        value={user.newPassword || ''}
        onChange={handleInputChange}
        placeholder="New Password"
        mb={3}
      />
      {errors.newPassword && <Text color="red.500" fontSize="sm">{errors.newPassword}</Text>}

      <label>Confirm Password</label>
      <Input
        type="password"
        name="confirmPassword"
        value={user.confirmPassword || ''}
        onChange={handleInputChange}
        placeholder="Confirm New Password"
        mb={3}
      />
      {errors.confirmPassword && <Text color="red.500" fontSize="sm">{errors.confirmPassword}</Text>}

      {message && <Text color={message.includes('successfully') ? 'green.500' : 'red.500'} fontSize="sm" mb={3}>{message}</Text>}

      <Button colorScheme="blue" onClick={handleSaveChangePass} width="100%" mb={2}>
        Save Changes
      </Button>
    </Box>
  );
}

export default ChangePasswordFirstTimeLogin;
