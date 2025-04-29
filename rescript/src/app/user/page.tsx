"use client";

import useSession from "../../lib/use-session";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ProtectedClient() {
    return (
        <main className="p-10 space-y-5">
            <h1 className="text-2xl font-semibold">User Profile</h1>
            <Content />
            <p>
                <Link
                    href="/"
                    className="text-[var(--secondary)] hover:text-[var(--secondary-hover)] hover:underline"
                >
                    ← Back to Home
                </Link>
            </p>
        </main>
    );
}

function Content() {
    const { session, isLoading, increment } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading && !session.isLoggedIn) {
            router.replace("/auth");
        }
    }, [isLoading, session.isLoggedIn, router]);

    if (isLoading) {
        return <p className="text-lg">Loading...</p>;
    }

    return (
        <div className="max-w-xl space-y-6">
            <div className="card">
                <h2 className="text-xl font-semibold mb-4">
                    Hello <span className="text-[var(--primary)]">{session.username}!</span>
                </h2>

                <div className="mb-6">
                    <p className="mb-2">
                        This page is protected and can only be accessed if you are logged in.
                    </p>
                    <p>
                        If you try to access this page while logged out, you will be redirected to the login page.
                    </p>
                </div>

                <div className="border-t border-[var(--border)] pt-4">
                    <h3 className="text-lg font-medium mb-2">Your Counter</h3>
                    <div className="flex items-center gap-4">
                        <p className="text-2xl font-bold">{session.counter}</p>
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
                            className="btn btn-primary"
                        >
                            Increment Counter
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}