"use client";

import { useLocale } from "@/components/locale/LocaleContext";

export function LanguageToggle() {
  const { locale, setLocale, t } = useLocale();

  return (
    <div className="fixed right-4 top-4 z-[70] flex items-center gap-1 rounded-full border border-white/10 bg-black/35 p-1 backdrop-blur-md">
      {(["zh", "fr"] as const).map((item) => {
        const active = item === locale;
        return (
          <button
            key={item}
            onClick={() => setLocale(item)}
            className="rounded-full px-3 py-1 text-xs transition"
            style={{
              color: active ? "#0a0c14" : "rgba(255,255,255,0.7)",
              background: active ? "#f1c27d" : "transparent",
            }}
          >
            {t(`lang.${item}`)}
          </button>
        );
      })}
    </div>
  );
}
