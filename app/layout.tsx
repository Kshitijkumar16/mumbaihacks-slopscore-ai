// global imports
import type { Metadata } from "next";

// locap imports
import "./globals.css";
import { mona, pixel } from "@/providers/fonts";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Slopscore.ai  |  Practice build",
  description: "bla bla bla",
};

export default function LandingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="hide-scrollbar">
      <body
        className={cn(
          `${mona.variable} ${pixel.variable} mx-auto max-w-[1920px] bg-black selection:bg-arancia selection:text-white`
        )}
      >
        {children}
        {/* <Toaster expand /> */}
      </body>
    </html>
  );
}
