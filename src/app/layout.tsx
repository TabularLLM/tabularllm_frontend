import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import { Toaster } from "@/components/ui/sonner"
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"]
})

export const metadata: Metadata = {
  title: "TabularLLM",
  description: "LLM for Tabular Data",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${jetbrainsMono.variable} font-[family-name:var(--font-jetbrains-mono)] antialiased`}
      >
        {children}
        <Toaster richColors closeButton/>
      </body>
    </html>
  );
}
