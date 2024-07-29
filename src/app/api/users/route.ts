import { NextRequest, NextResponse } from "next/server";
import { ApiResponse } from "../../../../helpers/ApiResponse";
import prisma from "../../../../libs/prismadb";
export async function POST(req: NextRequest) {
    try {
        const users = await prisma.user.findMany({
            orderBy: {
                createdAt: "desc",
            },
        });

        return NextResponse.json(new ApiResponse(200, users, "OK"));
    } catch (error: any) {
        console.log(error);
        throw new Error(error);
    }
}
