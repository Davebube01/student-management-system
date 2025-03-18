import { NextResponse } from "next/server";
import { getStudentById, updateStudent, deleteStudent } from "@/lib/students";

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const student = await getStudentById(params.id);

    if (!student) {
      return NextResponse.json({ error: "Student not found" }, { status: 404 });
    }

    return NextResponse.json({ data: student }, { status: 200 });
  } catch (error) {
    console.error("Error fetching student:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();

    // Validate the request body
    if (
      !body.name ||
      !body.registrationNumber ||
      !body.major ||
      !body.dob ||
      body.gpa === undefined
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const updatedStudent = await updateStudent(params.id, {
      name: body.name,
      registrationNumber: body.registrationNumber,
      major: body.major,
      dob: body.dob,
      gpa: parseFloat(body.gpa) || 0,
    });

    if (!updatedStudent) {
      return NextResponse.json(
        { error: "Student not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ data: updatedStudent }, { status: 200 });
  } catch (error) {
    console.error("Error updating student:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const result = await deleteStudent(params.id);

    if (!result) {
      return NextResponse.json(
        { error: "Student not found" },
        { status: 404 }
      );
    }

    // Return a 204 No Content response without a body
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("Error deleting student:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

