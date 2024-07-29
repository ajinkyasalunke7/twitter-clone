import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import bcrypt from "bcrypt";
import prisma from "@/../libs/prismadb";

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",
            credentials: {
                email: {
                    label: "Email",
                    type: "text",
                    placeholder: "user-email@gmail.com",
                },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials: any): Promise<any> {
                try {
                    if (!credentials?.email || !credentials?.password) {
                        throw new Error("Invalid credentials");
                    }
                    const user = await prisma.user.findUnique({
                        where: { email: credentials.email },
                    });
                    console.log("user-", user);

                    if (!user || !user.hashedPassword) {
                        throw new Error("Invalid credentials");
                    }

                    const isCorrectPassword = await bcrypt.compare(
                        credentials.password,
                        user.hashedPassword
                    );

                    // if (!isCorrectPassword) {
                    //     throw new Error("Wrong password");
                    // }
                    if (isCorrectPassword) {
                        return {
                            id: user.id,
                            name: user.name,
                            email: user?.email,
                            username: user?.username,
                        };
                    }
                } catch (error: any) {
                    throw new Error(error);
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }: any) {
            if (user) {
                token.id = user.id;
                token.name = user.name;
                token.phone = user.phone;
                token.email = user?.email;
            }
            return token;
        },
        async session({ token, session }: any) {
            if (token) {
                session.user.id = token.id;
                session.user.name = token.name;
                session.user.phone = token.phone;
                session.user.email = token?.email;
            }

            return session;
        },
    },

    debug: process.env.NODE_ENV === "development",
    session: {
        strategy: "jwt",
    },
    // jwt: {
    //     secret: process.env.NEXTAUTH_JWT_SECRET,
    // },
    secret: process.env.NEXTAUTH_SECRET,
};
