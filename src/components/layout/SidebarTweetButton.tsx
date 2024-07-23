"use client";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { FaFeather } from "react-icons/fa";
import useLoginModal from "../../../hooks/useLoginModal";

export default function SidebarTweetButton() {
    const loginModal = useLoginModal();
    const onClick = useCallback(() => {
        console.log("first");
        loginModal.onOpen();
    }, [loginModal]);

    return (
        <div onClick={onClick}>
            <div className="mt-6 lg:hidden rounded-full h-14 w-14 p-4 flex items-center justify-center bg-sky-500 hover:bg-opacity-80 transition cursor-pointer">
                <FaFeather size={24} color="white" />
            </div>
            <div className="mt-6 hidden lg:block px-4  py-2 rounded-full bg-sky-500 hover:bg-opacity-70 cursor-pointer transition">
                <p className="hidden lg:block text-center font-semibold text-white text-[18px]">
                    Tweet
                </p>
            </div>
        </div>
    );
}
