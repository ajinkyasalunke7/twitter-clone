import bcrypt from "bcrypt";
import prisma from "@/../libs/prismadb";
import { ApiResponse } from "../../../../helpers/ApiResponse";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const reqBody = await req.json();
        const { email, username, name, password } = reqBody;

        // Check if a user with the same email already exists
        const existingUser = await prisma.user.findUnique({
            where: { email: email },
        });

        if (existingUser) {
            return NextResponse.json(
                new ApiResponse(409, null, "Email already in use"),
                { status: 409 }
            );
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await prisma.user.create({
            data: {
                email,
                username,
                name,
                hashedPassword,
            },
        });

        return NextResponse.json(
            new ApiResponse(200, user, "Account created successfully")
        );
    } catch (error) {
        console.error("Registration error:", error);
        return NextResponse.json(
            new ApiResponse(400, null, "Failed to create account"),
            { status: 400 }
        );
    }
}
