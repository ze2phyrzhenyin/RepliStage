import type { Metadata } from "next";
import "./globals.css";
import { CostumeProvider } from "@/components/costumes/CostumeContext";
import { LanguageToggle } from "@/components/locale/LanguageToggle";
import { LocaleProvider } from "@/components/locale/LocaleContext";
import { PlayProvider } from "@/components/play/PlayContext";

export const metadata: Metadata = {
  title: "StageCue",
  description: "StageCue, visual rehearsal tool for stage scripts.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body className="min-h-screen bg-[#060912]">
        <LocaleProvider>
          <PlayProvider>
            <CostumeProvider>
              <LanguageToggle />
              {children}
            </CostumeProvider>
          </PlayProvider>
        </LocaleProvider>
      </body>
    </html>
  );
}
