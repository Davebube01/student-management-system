"use client";

import { useState } from "react";
import { Button, FormControl, FormLabel, Input, VStack, Text } from "@chakra-ui/react";

interface Student {
    id: string;
    name: string;
    registrationNumber: string;
    major: string;
    dob: string;
    gpa: number;
  }
  
  interface StudentFormProps {
    initialData?: Omit<Student, "id">; // Exclude `id` since it's auto-generated
    getNextId: () => Promise<string>;  // New function to fetch the next ID
    onSubmit: (student: Student) => void;
  }
  
  export default function AddStudentForm({ initialData, getNextId, onSubmit }: StudentFormProps) {
    const [formData, setFormData] = useState<Omit<Student, "id">>({
      name: initialData?.name || "",
      registrationNumber: initialData?.registrationNumber || "",
      major: initialData?.major || "",
      dob: initialData?.dob || "",
      gpa: initialData?.gpa || 0,
    });
  
    const [errors, setErrors] = useState<Partial<Student>>({});
    const [loading, setLoading] = useState<boolean>(false);
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      const parsedValue = name === "gpa" ? (value === "" ? "" : parseFloat(value)) : value;
      setFormData({ ...formData, [name]: parsedValue });
    };
  
    const validateForm = () => {
      const newErrors: Partial<Student> = {};
  
      if (!formData.name) newErrors.name = "Name is required";
      if (!formData.registrationNumber) newErrors.registrationNumber = "Registration Number is required";
      if (!formData.major) newErrors.major = "Major is required";
      if (!formData.dob) newErrors.dob = "Date of Birth is required";
  
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setErrors({});
  
      if (validateForm()) {
        try {
          setLoading(true);
          const newId = await getNextId(); // Fetch the next ID dynamically
          const studentData: Student = { ...formData, id: newId };
          onSubmit(studentData);
        } catch (error) {
          console.error("Error fetching next ID:", error);
        } finally {
          setLoading(false);
        }
      }
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <FormControl isInvalid={!!errors.name}>
            <FormLabel>Name:</FormLabel>
            <Input type="text" name="name" value={formData.name} onChange={handleChange} required />
            {errors.name && <Text color="red.500">{errors.name}</Text>}
          </FormControl>
  
          <FormControl isInvalid={!!errors.registrationNumber}>
            <FormLabel>Registration Number:</FormLabel>
            <Input
              type="text"
              name="registrationNumber"
              value={formData.registrationNumber}
              onChange={handleChange}
              required
            />
            {errors.registrationNumber && <Text color="red.500">{errors.registrationNumber}</Text>}
          </FormControl>
  
          <FormControl isInvalid={!!errors.major}>
            <FormLabel>Major:</FormLabel>
            <Input type="text" name="major" value={formData.major} onChange={handleChange} required />
            {errors.major && <Text color="red.500">{errors.major}</Text>}
          </FormControl>
  
          <FormControl isInvalid={!!errors.dob}>
            <FormLabel>Date of Birth:</FormLabel>
            <Input type="date" name="dob" value={formData.dob} onChange={handleChange} required />
            {errors.dob && <Text color="red.500">{errors.dob}</Text>}
          </FormControl>
  
          <FormControl isInvalid={!!errors.gpa}>
            <FormLabel>GPA:</FormLabel>
            <Input
              type="number"
              step="0.1"
              min="0"
              max="5"
              name="gpa"
              value={formData.gpa.toString()}
              onChange={handleChange}
              required
            />
            {errors.gpa && <Text color="red.500">{errors.gpa}</Text>}
          </FormControl>
  
          <Button type="submit" colorScheme="blue" isLoading={loading}>
            Submit
          </Button>
        </VStack>
      </form>
    );
  }
  