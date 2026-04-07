"use client";

import { useLocale } from "@/components/locale/LocaleContext";

type Props = {
  /** compact=true shows ISO codes (ZH / FR) instead of full names */
  compact?: boolean;
  className?: string;
};

export function LanguageToggle({ compact = false, className }: Props) {
  const { locale, setLocale, t } = useLocale();

  return (
    <div
      className={`flex items-center gap-0.5 rounded-full border border-white/10 bg-[#070b14]/60 p-0.5 backdrop-blur-sm ${className ?? ""}`}
    >
      {(["zh", "fr"] as const).map((item) => {
        const active = item === locale;
        const label = compact ? item.toUpperCase() : t(`lang.${item}`);
        return (
          <button
            key={item}
            onClick={() => setLocale(item)}
            className="rounded-full px-2.5 py-1 text-xs font-medium transition"
            style={{
              color: active ? "#0a0c14" : "rgba(255,255,255,0.52)",
              background: active ? "#f1c27d" : "transparent",
              minWidth: compact ? "2rem" : undefined,
            }}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
