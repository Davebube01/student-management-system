"use server"
import {SignJWT, jwtVerify} from "jose"
import { cookies } from "next/headers"

const secretKey = process.env.SESSION_SECRET
const encodedKey = new TextEncoder().encode(secretKey)

// session expires after 7 days
export async function createSession(userId:string) {
    const expiresAt = new Date(Date.now() + 1 * 60 * 60 * 1000)
    const session = await encrypt({userId, expiresAt});

    (await cookies()).set("session", session, {
        httpOnly: true,
        secure: true,
        expires: expiresAt

    })
}

export async function deleteSession() {
    (await cookies()).delete("session");
}

type sessionPayload = {
    userId: string;
    expiresAt: Date;
}

export async function encrypt(payload: sessionPayload) {
    return new SignJWT(payload)
        .setProtectedHeader({alg: "HS256"})
        .setIssuedAt()
        .setExpirationTime("7d")
        .sign(encodedKey)
}


export async function decrypt(session: string | undefined = "") {
    try{
        const {payload} = await jwtVerify(session, encodedKey, {
            algorithms: ["HS256"],
        })
        return payload
    } catch (error) {
        console.log("Failed to verify session")
    }
}