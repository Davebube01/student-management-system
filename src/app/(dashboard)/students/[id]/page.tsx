import StudentCard from '@/app/components/StudentCard'
import { getStudentById } from '@/lib/students'
import React from 'react'

export default function StudentDetailsPAge( {params} : {params: {id: string}}) {
    const student = getStudentById(params.id)

    if (!student) {
        return <p>Student not found</p>
    }
  return (
    <>
      <StudentCard student={student}/>
    </>
  )
}
