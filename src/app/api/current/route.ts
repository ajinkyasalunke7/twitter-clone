import { ApiResponse } from "../../../../helpers/ApiResponse";
import serverAuth from "../../../../libs/serverAuth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const { currentUser }: any = await serverAuth(req);
        console.log("currentUser-get", currentUser);
        if (currentUser === undefined) {
            return NextResponse.json(
                new ApiResponse(401, null, "Unauthorized")
            );
        } else {
            return NextResponse.json(
                new ApiResponse(200, currentUser, "User fetched.")
            );
        }
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            new ApiResponse(400, error, "An error occurred")
        );
    }
}
