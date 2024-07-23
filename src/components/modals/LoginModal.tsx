"use client";

import { useCallback, useState } from "react";
import useLoginModal from "../../../hooks/useLoginModal";
import Input from "../Input";
import Modal from "../Modal";
import useRegisterModal from "../../../hooks/useRegisterModal";

const LoginModal = () => {
    const loginModel = useLoginModal();
    const registerModel = useRegisterModal();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = useCallback(async () => {
        try {
            setTimeout(() => {
                setIsLoading(true);
                alert("Logged In");
                loginModel.onClose();
            }, 3000);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }, [loginModel]);

    const onToggle = useCallback(() => {
        if (isLoading) {
            return;
        }
        loginModel.onClose();
        registerModel.onOpen();
    }, [isLoading, registerModel, loginModel]);

    const bodyContent = (
        <div className="flex flex-col gap-4 ">
            <Input
                placeholder="Email"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
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
            <p>Don't have an account?</p>
            <span
                className="text-sky-400 cursor-pointer hover:underline"
                onClick={onToggle}
            >
                Sign Up
            </span>
        </div>
    );

    return (
        <Modal
            disabled={isLoading}
            isOpen={loginModel.isOpen}
            title="Login"
            actionLabel="Sign In"
            onClose={loginModel.onClose}
            onSubmit={onSubmit}
            body={bodyContent}
            footer={footerContent}
        />
    );
};

export default LoginModal;
