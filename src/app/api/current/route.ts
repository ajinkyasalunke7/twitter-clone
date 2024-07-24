import { ApiResponse } from "../../../../helpers/ApiResponse";
import serverAuth from "../../../../libs/serverAuth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        console.log("/current route", req);
        const { currentUser } = await serverAuth(req);
        console.log("currentUser", currentUser);
        return NextResponse.json(
            new ApiResponse(200, "currentUser", "User fetched.")
        );
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            new ApiResponse(400, error, "An error occurred")
        );
    }
}
