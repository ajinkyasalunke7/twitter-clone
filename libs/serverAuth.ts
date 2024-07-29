import { getServerSession } from "next-auth";
import prisma from "./prismadb";
import { NextRequest, NextResponse } from "next/server";
import { ApiResponse } from "../helpers/ApiResponse";

const serverAuth = async (req: NextRequest) => {
    try {
        const session = await getServerSession(req);
        console.log("session", session);

        if (session === null) {
            throw new Error("No session found");
            // return NextResponse.json(
            //     new ApiResponse(404, null, "No session found ")
            // );
        }
        if (!session?.user?.email) {
            throw new Error("Not signed in");
            // return NextResponse.json(
            //     new ApiResponse(405, null, "Not signed in")
            // );
        }

        const currentUser = await prisma.user.findUnique({
            where: {
                email: session.user.email,
            },
        });

        if (!currentUser) {
            throw new Error("User not found");
            // return NextResponse.json(
            //     new ApiResponse(404, null, "User not found")
            // );
        }

        return { currentUser };
    } catch (error: any) {
        if (
            error.message === "Not signed in" ||
            error.message === "User not found"
        ) {
            throw error;
        }

        return NextResponse.json(
            new ApiResponse(
                500,
                null,
                error.message || "An unexpected error occurred"
            )
        );
    }
};

export default serverAuth;
