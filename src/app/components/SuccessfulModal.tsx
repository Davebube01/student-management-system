"use client";

import React from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";

interface SuccessModalProps {
  action: string; // Define the type for the `action` prop
  isOpen: boolean; // Whether the modal is open
  onClose: () => void; // Function to close the modal
}

function SuccessModal({ action, isOpen, onClose }: SuccessModalProps) {
  const router = useRouter();

  const OverlayOne = () => (
    <ModalOverlay
      bg="blackAlpha.300"
      backdropFilter="blur(10px) hue-rotate(90deg)"
    />
  );

  // Function to handle the "OK" button click
  const handleOkClick = () => {
    onClose(); // Close the modal
    router.push("/students"); // Redirect to /students
  };

  return (
    <Modal isCentered isOpen={isOpen} onClose={onClose}>
      <OverlayOne />
      <ModalContent>
        {/* Conditionally render the modal content based on the `action` prop */}
        {action === "edit" ? (
          <>
            <ModalHeader>Edit Successful</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text>The student's information has been updated successfully.</Text>
            </ModalBody>
          </>
        ) : (
          <>
            <ModalHeader>Action Successful</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text>The action was completed successfully.</Text>
            </ModalBody>
          </>
        )}
        <ModalFooter>
          <Button colorScheme="blue" onClick={handleOkClick}>
            OK
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default SuccessModal;