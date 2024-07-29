"use client";
import { BsBellFill, BsHouseFill } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import SidebarLogo from "./SidebarLogo";
import SidebarItem from "./SidebarItem";
import { BiLogOut } from "react-icons/bi";
import SidebarTweetButton from "./SidebarTweetButton";
import useCurrentUser from "../../../hooks/useCurrentUser";
import { signOut } from "next-auth/react";

function Sidebar() {
    const { data: currentUser } = useCurrentUser();
    console.log("Client side data:", currentUser);
    const items = [
        {
            label: "Home",
            href: "/",
            icon: BsHouseFill,
        },
        {
            label: "Notifications",
            href: "/notifications",
            icon: BsBellFill,
        },
        {
            label: "Profile",
            href: "/user/123",
            icon: FaUser,
        },
    ];
    return (
        <div className="col-span-1 h-full pr-4 md:pr-6">
            <div className="flex flex-col items-end">
                <div className="space-y-2 lg:w-[230px]">
                    <SidebarLogo />
                    {items.map((item) => (
                        <SidebarItem
                            key={item.href}
                            label={item.label}
                            href={item.href}
                            icon={item.icon}
                        />
                    ))}
                    {currentUser?.success === true && (
                        <SidebarItem
                            onClick={() => {
                                signOut();
                            }}
                            icon={BiLogOut}
                            label="Logout"
                            href={`/logout`}
                        />
                    )}
                    <SidebarTweetButton />
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
