"use client";

import Link from "next/link";
import useSession from "../use-session";

export function ClientNavigationBar() {
    const { session, isLoading, logout } = useSession();

    return (
        <nav className="p-2 h-12 flex border-b border-[var(--border)] justify-between items-center text-sm">
            <Link href="/">
                <span className="text-xl ml-2 align-middle font-semibold">
                    <span className="text-[var(--foreground)]">Fcking </span>
                    <span className="text-[var(--primary)]">ReScript</span>
                </span>
            </Link>
            <div className="flex w-2/3 justify-end items-center">
                {isLoading ? (
                    <span>Loading...</span>
                ) : session.isLoggedIn ? (
                    <div className="flex items-center gap-4">
                        <span>Welcome, {session.username}</span>
                        <Link href="/user">
                            <button className="px-4 py-1 rounded-md bg-[var(--secondary)] text-white hover:bg-[var(--secondary-hover)] transition-colors">
                                Profile
                            </button>
                        </Link>
                        <button
                            onClick={() => logout(null, { optimisticData: { isLoggedIn: false, username: "", counter: 0 } })}
                            className="px-4 py-1 rounded-md bg-[var(--danger)] text-white hover:bg-[var(--danger-hover)] transition-colors"
                        >
                            Logout
                        </button>
                    </div>
                ) : (
                    <Link href="/auth">
                        <button className="px-4 py-1 rounded-md bg-[var(--primary)] text-white hover:bg-[var(--primary-hover)] transition-colors">
                            Login
                        </button>
                    </Link>
                )}
            </div>
        </nav>
    );
} 