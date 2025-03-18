// dashboard/students/layout.tsx
"use client"
import { SearchBar } from '@/app/components/SearchBar'
import { Link } from '@chakra-ui/react'
import React, { useState, ReactElement } from 'react'

export default function Layout({
    children,
}: {
    children: ReactElement<{ searchTerm: string }>;
}) {
    const [searchTerm, setSearchTerm] = useState('');

    console.log('Layout rendered'); // Check how many times this logs

    return (
        <div className='min-h-[100vh] bg-gray-100'>
            <header className="bg-slate-900 text-white p-4 text-center flex justify-between gap-4">
                <Link href='/'>
                    Home
                </Link>
                <SearchBar onSearch={setSearchTerm} />
                <button>
                    <Link href='/students/new'>
                        Add Student
                    </Link>
                </button>
            </header>
            {React.cloneElement(children, { searchTerm })}
        </div>
    );
}