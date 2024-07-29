"use client";

import Header from "@/components/Header";
import useLoginModal from "../../hooks/useLoginModal";
import { useSession } from "next-auth/react";

export default function Home() {
    const loginModel = useLoginModal();
    const { data: session, status } = useSession();

    return (
        <>
            <Header showBackArrow={false} label="Home" />
            <p className={`text-white`}>{JSON.stringify(session)}</p>
        </>
    );
}
