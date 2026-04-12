"use client";

import Link from "next/link";
import { useLocale } from "@/components/locale/LocaleContext";
import { LanguageToggle } from "@/components/locale/LanguageToggle";

export default function HomePage() {
  const { t } = useLocale();

  return (
    <main className="page-shell min-h-screen flex items-center justify-center px-5 py-16 sm:px-6">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/3 h-[420px] w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(241,194,125,0.08),transparent_70%)]" />
        <div className="absolute right-[10%] bottom-[18%] h-[280px] w-[380px] rounded-full bg-[radial-gradient(ellipse,rgba(100,130,255,0.06),transparent_72%)]" />
      </div>

      <div className="glass-panel fade-in-up relative z-10 w-full max-w-4xl rounded-[40px] px-6 py-9 sm:px-10 sm:py-10">
        <div className="flex justify-end mb-4">
          <LanguageToggle />
        </div>
        <div className="mx-auto max-w-2xl text-center">
          <p className="page-kicker">{t("home.tool")}</p>
          <h1 className="display-title mt-4 text-6xl font-light text-white sm:text-7xl">RepliStage</h1>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-white/40">
            {t("home.modeDescription")}
          </p>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          <Link
            href="/rehearsal/setup"
            className="raise-on-hover group rounded-[32px] border border-white/[0.08] bg-[linear-gradient(180deg,rgba(241,194,125,0.1),rgba(255,255,255,0.025))] px-6 py-7 text-left transition"
          >
            <p className="text-[10px] uppercase tracking-[0.32em] text-[#f1c27d]/62">{t("home.rehearsalMode")}</p>
            <h2 className="display-title mt-3 text-3xl text-white">{t("home.start")}</h2>
            <p className="mt-3 max-w-md text-sm leading-7 text-white/38">{t("home.rehearsalBlurb")}</p>
            <div className="mt-7 inline-flex items-center gap-2 text-sm text-[#f1c27d]">
              {t("home.enterMode")}
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </Link>

          <Link
            href="/director/setup"
            className="raise-on-hover group rounded-[32px] border border-white/[0.08] bg-[linear-gradient(180deg,rgba(126,166,255,0.09),rgba(255,255,255,0.025))] px-6 py-7 text-left transition"
          >
            <p className="text-[10px] uppercase tracking-[0.32em] text-[#9ab6ff]/62">{t("home.directorMode")}</p>
            <h2 className="display-title mt-3 text-3xl text-white">{t("home.directorEntry")}</h2>
            <p className="mt-3 max-w-md text-sm leading-7 text-white/38">{t("home.directorBlurb")}</p>
            <div className="mt-7 inline-flex items-center gap-2 text-sm text-[#9ab6ff]">
              {t("home.enterMode")}
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </Link>
        </div>
      </div>
    </main>
  );
}
