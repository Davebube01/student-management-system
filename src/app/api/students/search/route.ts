import { NextResponse } from 'next/server';
import { getStudents } from '@/lib/students'; // Assume this function fetches all students

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    // Extract query parameters
    const name = searchParams.get('name') || '';
    const major = searchParams.get('major') || '';
    const gpa = parseFloat(searchParams.get('gpa') || '0');

    // Fetch all students (or from your database)
    const students = await getStudents();

    // Filter students based on query parameters
    const filteredStudents = students.filter((student) => {
      const matchesName = student.name.toLowerCase().includes(name.toLowerCase());
      const matchesMajor = student.major.toLowerCase().includes(major.toLowerCase());
      const matchesGPA = gpa === 0 || student.gpa >= gpa; // Filter by GPA if provided

      return matchesName && matchesMajor && matchesGPA;
    });

    // Return filtered students
    return NextResponse.json({ data: filteredStudents }, { status: 200 });
  } catch (error) {
    console.error('Error searching students:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}