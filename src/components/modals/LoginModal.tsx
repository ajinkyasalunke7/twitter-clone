"use client";

import { useCallback, useState } from "react";
import useLoginModal from "../../../hooks/useLoginModal";
import Input from "../Input";
import Modal from "../Modal";

const LoginModal = () => {
    const loginModel = useLoginModal();
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

    return (
        <Modal
            disabled={isLoading}
            isOpen={loginModel.isOpen}
            title="Login"
            actionLabel="Sign In"
            onClose={loginModel.onClose}
            onSubmit={onSubmit}
            body={bodyContent}
        />
    );
};

export default LoginModal;
