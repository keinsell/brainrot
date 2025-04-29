"use client";

import { Form } from "../form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import useSession from "../../lib/use-session";
import { useEffect } from "react";

export default function AuthPage() {
    const { session, isLoading } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading && session.isLoggedIn) {
            router.replace("/user");
        }
    }, [isLoading, session.isLoggedIn, router]);

    return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-3rem)] p-8">
            <div className="w-full max-w-md bg-[var(--card-bg)] p-8 rounded-lg shadow-md border border-[var(--border)]">
                <h1 className="text-2xl font-semibold mb-6 text-center">
                    <span className="text-[var(--foreground)]">Login to </span>
                    <span className="text-[var(--primary)]">ReScript</span>
                </h1>
                <div className="w-full">
                    <Form />
                </div>
                <div className="mt-4 text-center">
                    <Link href="/" className="text-[var(--secondary)] hover:text-[var(--secondary-hover)] hover:underline">
                        Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
}
