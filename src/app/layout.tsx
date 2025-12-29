import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const fontSans = Inter({
    variable: "--font-sans",
    subsets: ["latin"],
});

const fontMono = Inter({
    variable: "--font-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Simple Crud",
    description: "A Simple Crud",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${fontSans.variable} ${fontMono.variable} antialiased`}
            >
                <main>{children}</main>
            </body>
        </html>
    );
}
