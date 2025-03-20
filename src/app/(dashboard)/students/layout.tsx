"use client"
import LogoutButton from '@/app/components/LogoutButton';
import { Button, Link } from '@chakra-ui/react'
import React from 'react'

export default function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className='min-h-[100vh] bg-gray-100'>
            <header className="bg-slate-900 text-white p-4 text-center flex justify-between gap-4">
                <Link href='/'>
                    Home
                </Link>
                <LogoutButton />
            </header>
            <div className="flex justify-between m-8">
                <Button as={Link} href='/students/' bg={"blue.500"} color={"white"}>
                    Students View
                </Button>
                <Button as={Link} href='/students/new' bg={"blue.500"} color={"white"}>
                    Add Student
                </Button>
            </div>
            {children}
        </div>
    );
}