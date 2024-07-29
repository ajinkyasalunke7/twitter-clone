import bcrypt from "bcrypt";
import prisma from "@/../libs/prismadb";
import { ApiResponse } from "../../../../helpers/ApiResponse";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const reqBody = await req.json();
        const { email, username, name, password } = reqBody;

        if (!email || !password || !username || !name) {
            return NextResponse.json(
                new ApiResponse(400, null, "Missing required fields"),
                { status: 400 }
            );
        }
        // Simple validation checks
        if (!email || !email.includes("@") || !email.includes(".")) {
            return NextResponse.json(
                new ApiResponse(400, null, "Invalid email format"),
                { status: 400 }
            );
        }

        if (!username || username.length < 3 || username.length > 30) {
            return NextResponse.json(
                new ApiResponse(
                    400,
                    null,
                    "Username must be between 3 and 30 characters"
                ),
                { status: 400 }
            );
        }

        if (!name || name.length < 3 || name.length > 50) {
            return NextResponse.json(
                new ApiResponse(
                    400,
                    null,
                    "Name must be between 3 and 50 characters"
                ),
                { status: 400 }
            );
        }

        if (!password || password.length < 3) {
            return NextResponse.json(
                new ApiResponse(
                    400,
                    null,
                    "Password must be at least 3 characters long"
                ),
                { status: 400 }
            );
        }

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
