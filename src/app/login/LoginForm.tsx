"use client"

import { useActionState } from "react"
import { login } from "./actions"
import { useFormStatus } from "react-dom"
import { Button, Input, Text } from "@chakra-ui/react"

export function LoginForm () {
    const [state, loginAction] = useActionState(login, undefined)

    return(
        <>
        <div className="flex justify-center mt-32 w-[500px] mx-auto">
        <form action={loginAction} className="w-[100%]">
            <Text fontSize="4xl" fontWeight="bold" textAlign="center" >Login</Text> 
                <div className="my-4">
                    <Input type="email" id="email" placeholder="Email" name="email" className="p-2 borderl"/>
                </div>
                {state?.errors?.email && (
                <p className="text-red-500">{state.errors.email}</p>
                )}
                <div className="my-4">
                    <Input type="password" id="password" placeholder="Password" name="password" className="p-2 border"/>
                </div>
                {state?.errors?.password && (
                <p className="text-red-500">{state.errors.password}</p>
                )}
                <SubmitButton/>
                <p>email: test@gmail.com</p>
                <p>password: 123456789</p>
            </form>
        </div>

        
        </>
    )
}

function SubmitButton () {
    const {pending} = useFormStatus()

    return(
        <Button bg={"blue.500"} color={"white"} disabled={pending} type="submit" width="100%">
            Login
        </Button>
    )
}