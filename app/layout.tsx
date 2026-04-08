import type { Metadata, Viewport } from "next";
import "./globals.css";
import { CostumeProvider } from "@/components/costumes/CostumeContext";
import { LocaleProvider } from "@/components/locale/LocaleContext";
import { PlayProvider } from "@/components/play/PlayContext";

export const metadata: Metadata = {
  title: "StageCue",
  description: "StageCue, visual rehearsal tool for stage scripts.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className="min-h-screen bg-[#060912]">
        <LocaleProvider>
          <PlayProvider>
            <CostumeProvider>
              {children}
            </CostumeProvider>
          </PlayProvider>
        </LocaleProvider>
      </body>
    </html>
  );
}
