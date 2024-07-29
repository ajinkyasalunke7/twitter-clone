import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../libs/prismadb";
import { ApiResponse } from "../../../../../helpers/ApiResponse";
export async function POST(
    req: NextRequest,
    { params }: { params: { userId: string } }
) {
    try {
        const userId = params.userId;
        if (!userId || typeof userId !== "string") {
            throw new Error("Invalid UserId or Invalid ID");
        }

        const existingUser = await prisma.user.findUnique({
            where: { id: userId },
        });

        const followersCount = await prisma.user.count({
            where: {
                followingIds: {
                    has: userId,
                },
            },
        });

        return NextResponse.json(
            new ApiResponse(200, { ...existingUser, followersCount }, "OK")
        );
    } catch (error: any) {
        console.log(error);
        throw new Error(error);
    }
}
