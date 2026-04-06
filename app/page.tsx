"use client";

import Link from "next/link";
import { useLocale } from "@/components/locale/LocaleContext";

export default function HomePage() {
  const { t } = useLocale();

  return (
    <main className="page-shell min-h-screen flex items-center justify-center px-5 py-16 sm:px-6">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/3 h-[420px] w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(241,194,125,0.08),transparent_70%)]" />
        <div className="absolute right-[10%] bottom-[18%] h-[280px] w-[380px] rounded-full bg-[radial-gradient(ellipse,rgba(100,130,255,0.06),transparent_72%)]" />
      </div>

      <div className="glass-panel fade-in-up relative z-10 w-full max-w-5xl rounded-[36px] px-6 py-10 sm:px-10 sm:py-12">
        <div className="mx-auto max-w-3xl text-center">
          <p className="page-kicker">{t("home.tool")}</p>
          <h1 className="display-title mt-4 text-6xl font-light text-white sm:text-7xl">StageCue</h1>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-white/46 sm:text-base">
            {t("home.modeDescription")}
          </p>
        </div>

        <div className="mt-10 grid gap-4 lg:grid-cols-2">
          <Link
            href="/rehearsal/setup"
            className="glass-panel raise-on-hover group rounded-[30px] px-6 py-7 text-left transition"
          >
            <p className="page-kicker mb-3">{t("home.rehearsalMode")}</p>
            <h2 className="display-title text-3xl text-white">{t("home.start")}</h2>
            <p className="mt-4 max-w-md text-sm leading-7 text-white/42">{t("home.rehearsalBlurb")}</p>
            <div className="mt-8 inline-flex items-center gap-2 text-sm text-[#f1c27d]">
              {t("home.enterMode")}
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </Link>

          <Link
            href="/director/setup"
            className="glass-panel raise-on-hover group rounded-[30px] px-6 py-7 text-left transition"
          >
            <p className="page-kicker mb-3">{t("home.directorMode")}</p>
            <h2 className="display-title text-3xl text-white">{t("home.directorEntry")}</h2>
            <p className="mt-4 max-w-md text-sm leading-7 text-white/42">{t("home.directorBlurb")}</p>
            <div className="mt-8 inline-flex items-center gap-2 text-sm text-[#f1c27d]">
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
