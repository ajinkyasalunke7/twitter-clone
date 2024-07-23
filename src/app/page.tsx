"use client";
import Button from "@/components/Button";
import Header from "@/components/Header";
import useLoginModal from "../../hooks/useLoginModal";

export default function Home() {
    const loginModel = useLoginModal();
    return (
        <>
            <Header showBackArrow={false} label="Home" />
        </>
    );
}
