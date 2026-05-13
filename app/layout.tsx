import { AuthProvider } from "@/src/providers/auth.provider";
import { SWRProvider } from "@/src/providers/swr.provider";
import type { Metadata } from "next";
import { Geist } from "next/font/google";
import type { ReactNode } from "react";
import { Toaster } from "sonner";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "UpTask",
  description: "Project management made simple",
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" className={`${geistSans.variable} h-full antialiased`}>
      <body className="min-h-full">
        <SWRProvider>
          <AuthProvider>
            {children}
            <Toaster id="notifications" richColors position="top-right" />
            <Toaster id="loader" richColors position="top-right" />
          </AuthProvider>
        </SWRProvider>
      </body>
    </html>
  );
}
