import type { Metadata } from "next";
import "./globals.css";
import { jost } from "./ui/fonts";
import { QueryProvider } from "./lib/react-query/QueryProvider";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
    title: "Leo's Grill",
    description: "Restaurant",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {


    return (
        <html lang="en">
            <body
            style={jost.style}
                className={`dark:bg-dark_2 antialiased dark`}
            >
                <QueryProvider>
                    {children}
                    <Toaster />
                </QueryProvider>
            </body>
        </html>
    );
}
