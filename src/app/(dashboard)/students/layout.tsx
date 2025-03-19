"use client"
import LogoutButton from '@/app/components/LogoutButton';
import { SearchBar } from '@/app/components/SearchBar'
import { Button, Link } from '@chakra-ui/react'
import React, { useState, ReactElement } from 'react'

export default function Layout({
    children,
}: {
    children: ReactElement<{ searchTerm: string }>;
}) {
    const [searchTerm, setSearchTerm] = useState('');

    console.log('Layout rendered'); // Debugging

    return (
        <div className='min-h-[100vh] bg-gray-100'>
            <header className="bg-slate-900 text-white p-4 text-center flex justify-between gap-4">
                <Link href='/'>
                    Home
                </Link>
                <LogoutButton />
            </header>
            <SearchBar onSearch={setSearchTerm} />
            <div className="flex justify-between m-8">
                <Button as={Link} href='/students/' bg={"blue.500"} color={"white"}>
                    Students View
                </Button>
                <Button as={Link} href='/students/new' bg={"blue.500"} color={"white"}>
                    Add Student
                </Button>
            </div>
            {React.cloneElement(children, { searchTerm })}
        </div>
    );
}