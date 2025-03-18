"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import StudentForm from "@/app/components/StudentForm";
import { addStudent, getStudents } from "@/lib/students"; // Import getAllStudents to fetch existing students
import SuccessModal from "@/app/components/SuccessfulModal";
import { useDisclosure, Box, Heading, Spinner, Text } from "@chakra-ui/react";
import AddStudentForm from "@/app/components/StudentAddForm";

interface Student {
  id: string;
  name: string;
  registrationNumber: string;
  major: string;
  dob: string;
  gpa: number;
}

export default function AddNewStudentPage() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Function to generate the next available ID
  const getNextId = async (): Promise<string> => {
    try {
      const students = await getStudents(); // Fetch the existing student list
      const nextId = students.length > 0 
        ? `ID-${Math.max(...students.map((s: Student) => parseInt(s.id.split('-')[1]))) + 1}`
        : "ID-1";
      return nextId;
    } catch (error) {
      console.error("Error fetching students for ID generation:", error);
      throw new Error("Failed to generate ID");
    }
  };

  const handleSubmit = async (newStudent: Omit<Student, "id">) => {
    try {
      setIsLoading(true);
      setError(null);

      const newId = await getNextId(); // Generate the next ID
      const studentWithId: Student = { ...newStudent, id: newId }; // Add ID to student data

      const result = await addStudent(studentWithId);

    
      console.log("Student added successfully:", result);
      onOpen();
    } catch (error) {
      console.error("Error adding student:", error);
      setError("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleModalClose = () => {
    onClose();
    router.push("/students");
  };

  return (
    <Box p={4} maxW="800px" mx="auto">
      <Heading as="h1" mb={6}>
        Add New Student
      </Heading>

      {error && (
        <Box bg="red.100" p={3} mb={4} borderRadius="md">
          <Text color="red.600">{error}</Text>
        </Box>
      )}

      {isLoading && (
        <Box p={4}>
          <Spinner size="xl" />
        </Box>
      )}

      <AddStudentForm
        initialData={{
          name: "",
          registrationNumber: "",
          major: "",
          dob: "",
          gpa: 0,
        }}
        getNextId={getNextId}  // Pass the ID generator to StudentForm
        onSubmit={handleSubmit}
      />

      {/* Success Modal */}
      <SuccessModal action="add" isOpen={isOpen} onClose={handleModalClose} />
    </Box>
  );
}
