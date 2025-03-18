"use client";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import StudentForm from "@/app/components/StudentForm";
import { getStudentById, updateStudent } from "@/lib/students";
import SuccessModal from "@/app/components/SuccessfulModal";
import { useDisclosure, Box, Heading, Spinner, Text } from "@chakra-ui/react";

interface Student {
  id: string;
  name: string;
  registrationNumber: string;
  major: string;
  dob: string;
  gpa: number;
}

export default function EditStudentPage() {
    const { id } = useParams() as { id: string }; // Correct way to extract `id` as a string
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [student, setStudent] = useState<Student | null>(null);

  useEffect(() => {
    const fetchStudent = async () => {
      setIsLoading(true);
      try {
        const studentData = await getStudentById(id); // Use `id` directly
        if (studentData) {
          setStudent(studentData);
        } else {
          setError("Student not found");
        }
      } catch (error) {
        console.error("Error fetching student:", error);
        setError("An unexpected error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    if (id) fetchStudent(); // Ensure `id` is defined before fetching

  }, [id]);

  const handleSubmit = async (updatedStudent: Student) => {
    try {
      setIsLoading(true);
      setError(null);

      const result = await updateStudent(updatedStudent.id, updatedStudent);

      if (result) {
        console.log("Student updated successfully:", result);
        onOpen();
      } else {
        setError("Failed to update student");
      }
    } catch (error) {
      console.error("Error updating student:", error);
      setError("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleModalClose = () => {
    onClose();
    router.push("/students");
  };

  if (isLoading) {
    return (
      <Box p={4}>
        <Spinner size="xl" />
      </Box>
    );
  }

  if (!student) {
    return (
      <Box p={4}>
        <Text fontSize="xl">Student not found</Text>
      </Box>
    );
  }

  return (
    <Box p={4} maxW="800px" mx="auto">
      <Heading as="h1" mb={6}>
        Edit Student
      </Heading>

      {error && (
        <Box bg="red.100" p={3} mb={4} borderRadius="md">
          <Text color="red.600">{error}</Text>
        </Box>
      )}

      <StudentForm initialData={student} onSubmit={handleSubmit} />

      {/* Success Modal */}
      <SuccessModal action="edit" isOpen={isOpen} onClose={handleModalClose} />
    </Box>
  );
}
