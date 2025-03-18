// components/StudentForm.tsx
"use client";

import { useState } from "react";
import { Button, FormControl, FormLabel, Input, VStack, Text } from "@chakra-ui/react";

interface Student {
  id: string;
  name: string;
  registrationNumber: string;
  major: string;
  dob: string;
  gpa: number; // gpa is a number
}

interface StudentFormProps {
  initialData?: Student;
  onSubmit: (student: Student) => void;
}

export default function StudentForm({ initialData, onSubmit }: StudentFormProps) {
  const [formData, setFormData] = useState<Student>(
    initialData || {
      id: "",
      name: "",
      registrationNumber: "",
      major: "",
      dob: "",
      gpa: 0, // Default value is a number
    }
  );

  const [errors, setErrors] = useState<Partial<Student>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Convert GPA value correctly, handling empty string cases
    const parsedValue = name === "gpa" ? (value === "" ? "" : parseFloat(value)) : value;

    setFormData({ ...formData, [name]: parsedValue });
  };

  const validateForm = () => {
    const newErrors: Partial<Student> = {};

    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.registrationNumber) newErrors.registrationNumber = "Registration Number is required";
    if (!formData.major) newErrors.major = "Major is required";
    if (!formData.dob) newErrors.dob = "Date of Birth is required";

    // GPA validation
     

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({}); // Clear errors before validation

    if (validateForm()) {
      const studentData = { ...formData, id: formData.id || `ID-${Date.now()}` };
      onSubmit(studentData);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <VStack spacing={4}>
        <FormControl isInvalid={!!errors.name}>
          <FormLabel>Name:</FormLabel>
          <Input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
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
          <Input
            type="text"
            name="major"
            value={formData.major}
            onChange={handleChange}
            required
          />
          {errors.major && <Text color="red.500">{errors.major}</Text>}
        </FormControl>

        <FormControl isInvalid={!!errors.dob}>
          <FormLabel>Date of Birth:</FormLabel>
          <Input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            required
          />
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
            value={formData.gpa}
            onChange={handleChange}
            required
          />
          {errors.gpa && <Text color="red.500">{errors.gpa}</Text>}
        </FormControl>

        <Button type="submit" colorScheme="blue">
          Submit
        </Button>
      </VStack>
    </form>
  );
}
