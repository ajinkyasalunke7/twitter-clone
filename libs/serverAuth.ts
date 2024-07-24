import { getSession } from "next-auth/react";
import prisma from "./prismadb";
import { NextRequest } from "next/server";
import { NextApiRequest } from "next";

const serverAuth = async (req: NextApiRequest) => {
    console.log("server Auth", req);
    const session = await getSession({ req });
    if (!session) {
        throw new Error("No session found");
    }
    console.log(session);
    if (!session?.user?.email) {
        throw new Error("Not signed in");
    }

    const currentUser = await prisma.user.findUnique({
        where: {
            email: session.user.email,
        },
    });

    if (!currentUser) {
        throw new Error("User not found");
    }

    return { currentUser };
};

export default serverAuth;
