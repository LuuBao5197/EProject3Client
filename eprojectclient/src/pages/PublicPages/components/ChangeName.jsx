import React, { useEffect, useState } from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Input, Button, Text, IconButton } from '@chakra-ui/react';
import { EditIcon } from '@chakra-ui/icons';  // Import Edit icon
import { jwtDecode } from 'jwt-decode';
import axios from "axios";

function ChangeName() {
    const [isOpen, setIsOpen] = useState(false);  // To manage the popup visibility
    const [newName, setNewName] = useState('');  // To hold the new name input
    const [error, setError] = useState(null);  // To handle any errors during the API call
    const [user, setUser] = useState({ name: '' }); // Define user state to hold the name
    const [userId, setUserId] = useState(null);  // Define state to hold user id

    // Function to handle input changes
    const handleInputChange = (e) => {
        setNewName(e.target.value);
    };

    // Lấy dữ liệu từ token
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

    const handleSaveChangeName = async () => {
        if (!userId) {
            alert('User ID is not available');
            return;
        }
    
        const formData = new FormData();
        formData.append("Name", newName);  // Append the name to the form data
    
        try {
            const response = await fetch(`http://localhost:5190/api/User/${userId}`, {
                method: 'PUT',
                body: formData, // Send form data here
            });
    
            if (!response.ok) {
                throw new Error('Failed to update name');
            }
    
            alert('Name updated successfully!');
            setIsOpen(false);  // Close the modal after saving
    
            // Reload the page after a successful update
            window.location.reload();  // Refresh the page
        } catch (error) {
            setError(error.message);
            console.error('Error:', error);
            alert('Failed to update name');
        }
    };

    return (
        <div>
            {/* Replace Button with IconButton for the Edit Icon */}
            <IconButton
                icon={<EditIcon />}
                ml={2}
                variant="ghost"
                onClick={() => setIsOpen(true)}  // Open modal on click
                aria-label="Edit Name"
            />

            {/* Name Change Modal */}
            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Change Name</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Input
                            name="name"
                            value={newName}
                            onChange={handleInputChange}
                            placeholder="Enter new name"
                        />
                        {error && <Text color="red.500" fontSize="sm">{error}</Text>}  {/* Show error message */}
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={handleSaveChangeName}>
                            Save
                        </Button>
                        <Button variant="ghost" onClick={() => setIsOpen(false)}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    );
}

export default ChangeName;
