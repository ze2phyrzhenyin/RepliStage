"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { useLocale } from "@/components/locale/LocaleContext";

export function LanguageToggle() {
  const { locale, setLocale, t } = useLocale();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const isDirectorPage = pathname.startsWith("/director");
  const isRehearsalPage = pathname.startsWith("/rehearsal");
  const currentLabel = t(`lang.${locale}`);
  const floatingStyle = isDirectorPage
    ? {
        bottom: "calc(env(safe-area-inset-bottom, 0px) + 1rem)",
        top: "auto",
      }
    : {
        top: isRehearsalPage
          ? "calc(env(safe-area-inset-top, 0px) + 3.75rem)"
          : "calc(env(safe-area-inset-top, 0px) + 1rem)",
        bottom: "auto",
      };

  return (
    <div
      className="fixed right-3 z-[70] sm:right-4"
      style={floatingStyle}
    >
      <div className="hidden items-center gap-1 rounded-full border border-white/10 bg-[#070b14]/72 p-1 shadow-[0_14px_40px_rgba(0,0,0,0.22)] backdrop-blur-xl sm:flex">
        <span className="px-2 text-[10px] uppercase tracking-[0.24em] text-white/28">
          Lang
        </span>
        {(["zh", "fr"] as const).map((item) => {
          const active = item === locale;
          return (
            <button
              key={item}
              onClick={() => setLocale(item)}
              className="rounded-full px-3 py-1.5 text-xs font-medium transition"
              style={{
                color: active ? "#0a0c14" : "rgba(255,255,255,0.74)",
                background: active ? "#f1c27d" : "transparent",
              }}
            >
              {t(`lang.${item}`)}
            </button>
          );
        })}
      </div>

      <div className="relative sm:hidden">
        <button
          onClick={() => setOpen((value) => !value)}
          className="flex items-center gap-2 rounded-full border border-white/10 bg-[#070b14]/76 px-3 py-2 text-xs text-white/78 shadow-[0_12px_32px_rgba(0,0,0,0.24)] backdrop-blur-xl transition hover:border-white/20"
          aria-expanded={open}
          aria-label="Toggle language"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-[#f1c27d]">
            <path d="M7 12.2A5.2 5.2 0 1 0 7 1.8a5.2 5.2 0 0 0 0 10.4Z" stroke="currentColor" strokeWidth="1.2" />
            <path d="M1.8 7h10.4M7 1.8c1.4 1.4 2.2 3.2 2.2 5.2s-.8 3.8-2.2 5.2C5.6 10.8 4.8 9 4.8 7s.8-3.8 2.2-5.2Z" stroke="currentColor" strokeWidth="1.2" />
          </svg>
          <span>{currentLabel}</span>
        </button>

        {open && (
          <div
            className="absolute right-0 min-w-[148px] rounded-2xl border border-white/10 bg-[#070b14]/92 p-1.5 shadow-[0_16px_42px_rgba(0,0,0,0.28)] backdrop-blur-xl"
            style={isDirectorPage ? { bottom: "calc(100% + 0.5rem)" } : { top: "calc(100% + 0.5rem)" }}
          >
            {(["zh", "fr"] as const).map((item) => {
              const active = item === locale;
              return (
                <button
                  key={item}
                  onClick={() => {
                    setLocale(item);
                    setOpen(false);
                  }}
                  className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm transition"
                  style={{
                    color: active ? "#fff4dd" : "rgba(255,255,255,0.72)",
                    background: active ? "rgba(241,194,125,0.16)" : "transparent",
                  }}
                >
                  <span>{t(`lang.${item}`)}</span>
                  <span
                    className="text-[10px] uppercase tracking-[0.22em]"
                    style={{ color: active ? "#f1c27d" : "rgba(255,255,255,0.28)" }}
                  >
                    {item}
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
