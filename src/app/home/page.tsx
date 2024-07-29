"use client";

import { useSession } from "next-auth/react";

const Page = () => {
    const { data: session, status } = useSession();

    if (status === "loading") {
        return <p className="text-white">Loading...</p>;
    }

    if (session) {
        return <p className="text-white">Signed in as {session.user?.email}</p>;
    }

    return <div className="text-white">Not signed in</div>;
};

export default Page;
