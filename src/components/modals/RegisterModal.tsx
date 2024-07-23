"use client";

import { useCallback, useState } from "react";
import useLoginModal from "../../../hooks/useLoginModal";
import Input from "../Input";
import Modal from "../Modal";
import useRegisterModal from "../../../hooks/useRegisterModal";

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
            registerModel.onClose();
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }, [loginModel]);

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

    return (
        <Modal
            disabled={isLoading}
            isOpen={registerModel.isOpen}
            title="Create an account"
            actionLabel="Register"
            onClose={registerModel.onClose}
            onSubmit={onSubmit}
            body={bodyContent}
        />
    );
};

export default RegisterModal;