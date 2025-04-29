"use client";

import useSession from "../lib/use-session";
import { defaultSession } from "../lib/lib";
import { useRouter } from "next/navigation";

export function Form() {
    const { session, isLoading, increment } = useSession();

    if (isLoading) {
        return <p className="text-lg">Loading...</p>;
    }

    if (session.isLoggedIn) {
        return (
            <div className="space-y-4 card">
                <p className="text-lg">
                    Logged in as: <strong className="text-[var(--primary)]">{session.username}</strong>
                </p>
                <div className="flex items-center gap-2">
                    <span>Counter:</span>
                    <button
                        onClick={() => {
                            increment(null, {
                                optimisticData: {
                                    ...session,
                                    counter: session.counter + 1,
                                },
                                revalidate: false,
                            });
                        }}
                        className="px-3 py-1 bg-[var(--card-bg)] border border-[var(--border)] rounded-md hover:bg-[var(--secondary)] hover:text-white transition-colors"
                    >
                        {session.counter}
                    </button>
                </div>
                <LogoutButton />
            </div>
        );
    }

    return <LoginForm />;
}

function LoginForm() {
    const { login } = useSession();
    const router = useRouter();

    return (
        <form
            onSubmit={function (event) {
                event.preventDefault();
                const formData = new FormData(event.currentTarget);
                const username = formData.get("username") as string;
                login(username, {
                    optimisticData: {
                        isLoggedIn: true,
                        username,
                        counter: 0,
                    },
                }).then(() => {
                    router.push("/user");
                });
            }}
            method="POST"
            className="space-y-4 card"
        >
            <label className="block">
                <span className="block text-sm font-medium mb-1">Username</span>
                <input
                    type="text"
                    name="username"
                    placeholder="Enter your username"
                    defaultValue="Alison"
                    required
                    autoComplete="off"
                    data-1p-ignore
                    className="w-full px-3 py-2 border border-[var(--input-border)] bg-[var(--input-bg)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
                />
            </label>
            <div>
                <button
                    type="submit"
                    className="btn btn-primary w-full"
                >
                    Login
                </button>
            </div>
        </form>
    );
}

function LogoutButton() {
    const { logout } = useSession();

    return (
        <div>
            <button
                onClick={(event) => {
                    event.preventDefault();
                    logout(null, {
                        optimisticData: defaultSession,
                    });
                }}
                className="text-[var(--danger)] hover:text-[var(--danger-hover)] hover:underline"
            >
                Logout
            </button>
        </div>
    );
}