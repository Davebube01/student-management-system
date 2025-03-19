"use client"
import React, { useState, useEffect } from 'react';
import { Input } from '@chakra-ui/react';

interface SearchBarProps {
    onSearch: (term: string) => void;
}

export const SearchBar = ({ onSearch }: SearchBarProps) => {
    const [searchTerm, setSearchTerm] = useState('');

    // Debounce the search term
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            onSearch(searchTerm);
        }, 100);

        return () => clearTimeout(delayDebounceFn);
    }, [searchTerm]);

    return (
        <Input
            placeholder="Search by name, major, or registration number"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            size="md"
            variant="filled"
        />
    );
};