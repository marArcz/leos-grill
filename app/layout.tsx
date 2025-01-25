import type { Metadata } from "next";
import "./globals.css";
import { StyledEngineProvider } from "@mui/material";
import { jost } from "./ui/fonts";
import theme from "./lib/theme";
import { ThemeProvider } from '@mui/material/styles'
import { QueryProvider } from "./lib/react-query/QueryProvider";

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
                </QueryProvider>
            </body>
        </html>
    );
}
