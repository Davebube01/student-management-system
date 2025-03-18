// lib/students.ts

export interface Student {
    id: string;
    name: string;
    registrationNumber: string;
    major: string;
    dob: string;
    gpa: number;
  }
  
  // In-memory array to store students
  let students: Student[] = [
    {
      id: "1",
      name: "John Doe",
      registrationNumber: "202401234",
      major: "Computer Science",
      dob: "2001-05-05",
      gpa: 3.8,
    },
    {
      id: "2",
      name: "Jane Smith",
      registrationNumber: "202401245",
      major: "Mechanical Engineering",
      dob: "2002-05-21",
      gpa: 3.6,
    },
    {
      id: "3",
      name: "Abraham Dave",
      registrationNumber: "202401347",
      major: "Homan Anatomy",
      dob: "2001-08-21",
      gpa: 4,
    },
  ];
  
  // Get all students
  export function getStudents(): Student[] {
    return students;
  }
  
  // Get a student by ID
  export function getStudentById(id: string): Student | undefined {
    return students.find((student) => student.id === id);
  }
  
  // Add a new student
  export function addStudent(newStudent: Student): void {
    students.push(newStudent);
  }
  
  // Delete a student by ID
  export function deleteStudent(id: string): boolean {
    const initialLength = students.length;
    students = students.filter((student) => student.id !== id);
    return students.length !== initialLength; // Return true if a student was deleted
  }
  
  // Update a student by ID
  export function updateStudent(
    id: string,
    updatedData: Partial<Omit<Student, "id">>
  ): Student | null {
    const index = students.findIndex((student) => student.id === id);
  
    if (index === -1) return null; // Student not found
  
    students[index] = {
      ...students[index],
      ...updatedData,
    };
  
    return students[index];
  }