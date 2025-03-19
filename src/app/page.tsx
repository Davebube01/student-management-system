import { Button, Text } from "@chakra-ui/react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="w-[80%] mx-auto text-center items-center pt-32" >
      <Text fontSize="4xl" fontWeight="bold">
        Welcome to the Student Management System
      </Text>
      <div className="mt-8">
      <Button colorScheme="brand" >
        <Link href="/login">
        Get Started
        </Link>

        
      </Button>
      </div>
    </div>
  );
}