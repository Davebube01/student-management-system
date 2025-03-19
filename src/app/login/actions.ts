"use server"

import { createSession, deleteSession } from "@/lib/session"
import { error } from "console"
import { redirect } from "next/navigation"

import {z} from "zod"

const testUser = {
    id: "1",
    email: "test@gmail.com",
    password: "123456789",
}

const loginSchema = z.object({
    email: z.string().email({ message: "Invalid email address"}).trim(),
    password: z
        .string()
        .min(8, {message: "Password must be at least 8 characters"})
        .trim(),
});

export async function login(prevState:any, formData: FormData) {
    const result = loginSchema.safeParse(Object.fromEntries(formData))

    if (!result.success) {
        return {
            errors: result.error.flatten().fieldErrors,
        }
    }

    const {email, password} = result.data
    
    if (email != testUser.email || password != testUser.password) {
        return {
            errors: {
                email: ["invalid email or password"],
            }
        }
    }

    // create session
    await createSession(testUser.id);
    redirect("/students")
}

export async function logout() {
    await deleteSession()
    redirect("/login")
}