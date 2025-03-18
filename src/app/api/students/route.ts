import { NextResponse } from "next/server";
import { getStudents, addStudent, Student } from "@/lib/students";

// to get all students
export async function GET() {
    try {
        const students = getStudents();
        return NextResponse.json(students, { status: 200 });
    } catch (error) {
        console.error('Error fetching students:', error);
        return NextResponse.json(
            { error: 'Failed to fetch students' },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        const student: Omit<Student, 'id'> = await request.json();
        const students = getStudents();
        const newStudent: Student = {
            id: (students.length + 1).toString(), // Ensure `id` is a string
                    ...student,
        };
        addStudent(newStudent);
        return NextResponse.json(newStudent, {status: 201});
    } catch (error) {
        console.error('Error adding students:', error);
        return NextResponse.json(
            { error: 'Failed to add students' },
            { status: 500 }
        );
    }
}
