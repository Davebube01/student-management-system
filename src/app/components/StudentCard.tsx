"use client"
import { Avatar, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, useToast } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Student {
  id: string;
  name: string;
  registrationNumber: string;
  major: string;
  dob: string;
  gpa: number;
  avatar?: string;
}

interface StudentCardProps {
  student: Student;
}

// Color palette for avatar backgrounds
const colorPalette = ["red", "blue", "green", "yellow", "purple", "orange"];
const pickPalette = (name: string) => {
  const index = name.charCodeAt(0) % colorPalette.length;
  return colorPalette[index];
};

export default function StudentCard({ student }: StudentCardProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const toast = useToast();

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/students/${student.id}`, {
        method: "DELETE",
      });

      if (response.status === 204) {
        // Successfully deleted
        toast({
          title: "Student deleted.",
          description: `${student.name} has been deleted.`,
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        router.push("/students"); // Redirect to the students page
      } else {
        // Handle errors
        const data = await response.json();
        toast({
          title: "Error deleting student.",
          description: data.error || "An error occurred.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Error deleting student:", error);
      toast({
        title: "Error deleting student.",
        description: "An unexpected error occurred.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      onClose(); // Close the modal
    }
  };

  return (
    <div className="flex flex-col md:flex-row rounded-lg shadow-lg overflow-hidden bg-white">
      <div className="bg-slate-100 w-full md:w-[45%] flex flex-col items-center justify-center p-10">
        <Avatar
          name={student.name}
          src={student.avatar}
          bg={`${pickPalette(student.name)}.500`}
          size="2xl"
          className="mb-6"
        />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">{student.name}</h2>
        <p className="text-gray-600 font-medium">{student.major}</p>
        <p className="mt-2 bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
          GPA: {student.gpa.toFixed(2)}
        </p>
      </div>

      <div className="p-6 md:p-10 text-gray-600 w-full md:w-[55%]">
        <h3 className="text-xl font-bold text-gray-800 mb-6 pb-2 border-b border-gray-200">Student Details</h3>

        <div className="space-y-5">
          <div>
            <p className="font-bold text-gray-700">Registration Number:</p>
            <p className="mt-1">{student.registrationNumber}</p>
          </div>
          <div>
            <p className="font-bold text-gray-700">Major:</p>
            <p className="mt-1">{student.major}</p>
          </div>
          <div>
            <p className="font-bold text-gray-700">Date of Birth:</p>
            <p className="mt-1">{student.dob}</p>
          </div>
          <div>
            <p className="font-bold text-gray-700">GPA:</p>
            <p className="mt-1">{student.gpa.toFixed(2)}</p>
          </div>
        </div>

        <div className="mt-8 flex gap-4">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md transition-colors duration-200 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            <Link href={`/students/${student.id}/edit`}>Edit Profile</Link>
          </button>
          <button
            onClick={onOpen}
            className="bg-red-50 hover:bg-red-100 text-red-600 font-medium py-2 px-6 rounded-md transition-colors duration-200 flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Delete Profile
          </button>
        </div>
      </div>

      {/* Confirmation Modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete Student</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Are you sure you want to delete <strong>{student.name}</strong>? This action cannot be undone.
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="red" onClick={handleDelete} ml={3}>
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}