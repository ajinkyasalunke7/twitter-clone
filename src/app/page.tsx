"use client";

import Header from "@/components/Header";
import useLoginModal from "../../hooks/useLoginModal";
import { useSession } from "next-auth/react";

export default function Home() {
    const loginModel = useLoginModal();
    const { data: session, status } = useSession();
    console.log(session, status);
    return (
        <>
            <Header showBackArrow={false} label="Home" />
        </>
    );
}
