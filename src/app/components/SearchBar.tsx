"use client"
import React from 'react'
import { Input } from '@chakra-ui/react'

interface SearchBarProps {
    onSearch: (term: string) => void;
}

export const SearchBar = ({ onSearch }: SearchBarProps) => {
    return (
        <Input
            placeholder="Search by name, major, or registration number"
            onChange={(e) => onSearch(e.target.value)}
            size="md"
            variant="filled"
            className="w-20"
        />
    );
};