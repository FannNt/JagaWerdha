"use server";

import * as z from "zod";
import { AuthError } from "next-auth";

import { signIn } from "@/auth";
import { loginScheme } from "@/lib/schemas/auth";

export const login = async (values: z.infer<typeof loginScheme>) => {
    const validatedFields = loginScheme.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Kolom tidak valid!" };
    }

    const { email, password } = validatedFields.data;

    try {
        await signIn("credentials", {
            email,
            password,
            redirectTo: "/", // Redirect to home on success
        });
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return { error: "Kredensial tidak valid!" };
                default:
                    return { error: "Terjadi kesalahan!" };
            }
        }

        throw error;
    }
};
