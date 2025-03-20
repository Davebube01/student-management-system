"use client"
import Link from "next/link"
import { Avatar, HStack, Icon } from "@chakra-ui/react"
import { ViewIcon, EditIcon } from "@chakra-ui/icons"
import { useState } from 'react'
import { SearchBar } from './SearchBar'

interface IStudent {
    id: string;
    name: string;
    registrationNumber: string;
    major: string;
    avatar?: string; // Optional avatar URL
}

interface IStudentListProps {
    students: IStudent[];
}

// Color palette for avatar backgrounds
const colorPalette = ["red", "blue", "green", "yellow", "purple", "orange"]
const pickPalette = (name: string) => {
  const index = name.charCodeAt(0) % colorPalette.length
  return colorPalette[index]
}

export default function StudentList({ students }: IStudentListProps) {
    const [searchTerm, setSearchTerm] = useState('');
    
    // Filter students based on search term
    const filteredStudents = searchTerm
        ? students.filter((student) => {
              const lowerCaseSearchTerm = searchTerm.toLowerCase();
              return (
                  student.name.toLowerCase().includes(lowerCaseSearchTerm) ||
                  student.major.toLowerCase().includes(lowerCaseSearchTerm) ||
                  student.registrationNumber.toLowerCase().includes(lowerCaseSearchTerm)
              );
          })
        : students;

    return (
        <div>
            <div className="mb-4 px-6 lg:px-20">
                <SearchBar onSearch={setSearchTerm} />
            </div>
            <div className="relative overflow-x-auto lg:px-20">
                {/* Student Table */}
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-400 dark:text-gray-200 uppercase">
                        <tr>
                            <th scope="col" className="px-6 py-3 rounded-s-lg w-1/2">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3 w-1/6">
                                Reg Number
                            </th>
                            <th scope="col" className="px-6 py-3 w-1/4">
                                Major
                            </th>
                            <th scope="col" className="px-6 py-3 rounded-e-lg w-1/12">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredStudents.map((student) => (
                            <tr key={student.id} className="bg-white dark:bg-gray-800">
                                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                    <HStack spacing={3} align="center">
                                        <Avatar 
                                            name={student.name} 
                                            src={student.avatar || undefined}
                                            bg={`${pickPalette(student.name)}.500`}
                                            size="sm"
                                        />
                                        <span>{student.name}</span>
                                    </HStack>
                                </td>
                                <td className="px-6 py-4">
                                    {student.registrationNumber}
                                </td>
                                <td className="px-6 py-4">
                                    {student.major}
                                </td>
                                <td className="px-6 py-4">
                                    <HStack spacing={3}>
                                        <Link href={`/students/${student.id}`} className="text-blue-600 hover:text-blue-800 flex items-center">
                                            <Icon as={ViewIcon} mr={1} boxSize={4} />
                                            <span>View</span>
                                        </Link>
                                        <Link href={`/students/${student.id}/edit`} className="text-blue-600 hover:text-blue-800 flex items-center">
                                            <Icon as={EditIcon} mr={1} boxSize={4} />
                                            <span>Edit</span>
                                        </Link>
                                    </HStack>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* No Results Message */}
                {filteredStudents.length === 0 && searchTerm && (
                    <div className="text-center py-4 text-gray-500">
                        No students found.
                    </div>
                )}
            </div>
        </div>
    )
}