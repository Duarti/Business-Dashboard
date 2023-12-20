import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SWRProvider } from "./(app)/providers/swr-provider";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Business Dashboard",
  description: "This is a business dashboard application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <html lang="en">
        <SWRProvider>
          <body className={inter.className + " min-h-[100vh]"}>
            <Toaster />
            {children}
          </body>
        </SWRProvider>
      </html>
    </>
  );
}
