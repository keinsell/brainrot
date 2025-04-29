import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Form } from "./form";
import { ClientNavigationBar } from "../lib/ui/ClientNavigationBar";
import { ThemeProvider } from "@/lib/ui/ThemeProvider";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Fucking Web Application",
	description:
		"Web application which doesn't give a fuck about estabilished industry standard.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<ThemeProvider>
					<ClientNavigationBar />
					{children}
				</ThemeProvider>
			</body>
		</html>
	);
}
