import React, { useState, useEffect } from "react";
import {
  Avatar,
  Box,
  Text,
  useColorModeValue,
  Button,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ChangeName from "./ChangeName";
import ChangePassword from './ChangePassword';
export default function Profile(props) {
  const { banner, avatar, name, job, id, phone, email, password } = props;
  const [avatarSrc, setAvatarSrc] = useState(avatar); // Store avatar image path
  const [isUploading, setIsUploading] = useState(false); // Track upload state
  const toast = useToast();
  const navigate = useNavigate()
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = "gray.400";
  const borderColor = useColorModeValue("white", "#111C44");

  // Sync avatar prop with avatarSrc state
  useEffect(() => {
    setAvatarSrc(avatar);
  }, [avatar]);

  const handleAvatarClick = () => {
    document.getElementById("avatar-upload").click();
  };

  const updateUserProfile = async (file) => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("name", name);
    formData.append("email", "");
    formData.append("password", "");

    setIsUploading(true);

    try {
      const response = await axios.put(
        `http://localhost:5190/api/User/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        const updatedAvatarPath = response.data.data.imagepath;
        setAvatarSrc(updatedAvatarPath); // Update avatarSrc with the new image path
        toast({
          title: "Profile updated",
          description: "Your avatar has been updated successfully.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast({
        title: "Update failed",
        description: error.response?.data?.message || "Failed to update profile.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      updateUserProfile(file);
    }
  };

    const handleSave = () => {
      navigate("/");
    };

  return (
    <Card mb={{ base: "0px", lg: "20px"}} align="center">
      <Box
        bg={`url(${banner})`}
        bgSize="cover"
        borderRadius="16px"
        h="131px"
        w="100%"
      />
      <Avatar
        mx="auto"
        src={avatarSrc} // Use avatarSrc as the source
        h="200px"
        w="200px"
        mt="-43px"
        border="4px solid"
        borderColor={borderColor}
        cursor="pointer"
        onClick={handleAvatarClick}
        _hover={{ opacity: 0.8 }}
      />
      <input
        id="avatar-upload"
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />

      <Text color={textColorPrimary} fontWeight="bold" fontSize="50px" mt="10px">
        {name}
      </Text>
      <Text color={textColorSecondary} fontSize="30px">
        {job}
      </Text>
      <Text color={textColorPrimary} fontSize="30px">
        Phone: {phone}
      </Text>
      <Text color={textColorPrimary} fontSize="30px">
        Email: {email}
      </Text>
      <ChangeName/>
      <ChangePassword/>
      <Button
        mt="10px"
        fontSize="30px"
        onClick={handleSave}
      >
        {isUploading ? "Uploading..." : "Save"}
      </Button>
    </Card>
  );
}
