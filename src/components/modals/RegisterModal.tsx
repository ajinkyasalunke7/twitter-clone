"use client";

import { useCallback, useState } from "react";
import useLoginModal from "../../../hooks/useLoginModal";
import Input from "../Input";
import Modal from "../Modal";
import useRegisterModal from "../../../hooks/useRegisterModal";
import axios from "axios";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";

const RegisterModal = () => {
    const loginModel = useLoginModal();
    const registerModel = useRegisterModal();

    const [username, setUsername] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = useCallback(async () => {
        try {
            setIsLoading(true);
            const data = await axios.post(`/api/register`, {
                email,
                password,
                name,
                username: username.toLowerCase(),
            });
            console.log(data);
            toast.success("Account created.");
            signIn("credentials", {
                email,
                password,
            });
            // toast.success("User logged in.");

            registerModel.onClose();
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong.");
        } finally {
            setIsLoading(false);
        }
    }, [registerModel, email, password, name, username]);

    const onToggle = useCallback(() => {
        if (isLoading) return;
        registerModel.onClose();
        loginModel.onOpen();
    }, [isLoading, registerModel, loginModel]);

    const bodyContent = (
        <div className="flex flex-col gap-4 ">
            <Input
                placeholder="Name"
                type="text"
                onChange={(e) => setName(e.target.value)}
                value={name}
                disabled={isLoading}
            />
            <Input
                placeholder="Email"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                disabled={isLoading}
            />
            <Input
                placeholder="Username"
                type="text"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                disabled={isLoading}
            />
            <Input
                placeholder="Password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                disabled={isLoading}
            />
        </div>
    );

    const footerContent = (
        <div className="text-neutral-400 text-center mt-4 ">
            <p>Already have an account?</p>
            <span
                className="text-sky-400 cursor-pointer hover:underline"
                onClick={onToggle}
            >
                Sign In
            </span>
        </div>
    );

    return (
        <Modal
            disabled={isLoading}
            isOpen={registerModel.isOpen}
            title="Create an account"
            actionLabel="Register"
            onClose={registerModel.onClose}
            onSubmit={onSubmit}
            body={bodyContent}
            footer={footerContent}
        />
    );
};

export default RegisterModal;
