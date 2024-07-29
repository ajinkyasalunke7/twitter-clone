"use client";

import { useCallback, useState } from "react";
import useLoginModal from "../../../hooks/useLoginModal";
import Input from "../Input";
import Modal from "../Modal";
import useRegisterModal from "../../../hooks/useRegisterModal";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import Joi from "joi";

const LoginModal = () => {
    const loginModel = useLoginModal();
    const registerModel = useRegisterModal();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const schema = Joi.object({
        email: Joi.string()
            .email({ tlds: { allow: false } })
            .required(),
        password: Joi.string().min(3).required(),
    });

    const onSubmit = useCallback(async () => {
        const { error } = schema.validate({ email, password });

        if (error) {
            toast.error(error.details[0].message);
            return;
        }

        try {
            setIsLoading(true);

            await signIn("credentials", { email, password });

            loginModel.onClose();
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }, [loginModel, email, password]);

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
