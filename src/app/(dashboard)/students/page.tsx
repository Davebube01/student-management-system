import StudentList from "@/app/components/StudentList";
import { getStudents } from "@/lib/students";
import Layout from "./layout";

export default function StudentsPage() {
  const students = getStudents();
  return (
      <StudentList students={students} />
  );
}