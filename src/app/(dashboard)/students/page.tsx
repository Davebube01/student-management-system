import StudentList from "@/app/components/StudentList";
import { getStudents } from "@/lib/students";

export default function StudentsPage() {
    const students = getStudents();
    return <StudentList students={students} />;
}