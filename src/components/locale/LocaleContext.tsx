"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { Locale } from "@/lib/i18n";
import { translate } from "@/lib/i18n";

const LOCALE_STORAGE_KEY = "replistage_locale_v1";
const LEGACY_LOCALE_STORAGE_KEY = "stagecue_locale_v1";

type LocaleContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string, vars?: Record<string, string | number>) => string;
};

const LocaleContext = createContext<LocaleContextValue>({
  locale: "zh",
  setLocale: () => {},
  t: (key) => key,
});

function detectInitialLocale(): Locale {
  if (typeof window === "undefined") return "zh";

  const stored =
    window.localStorage.getItem(LOCALE_STORAGE_KEY) ??
    window.localStorage.getItem(LEGACY_LOCALE_STORAGE_KEY);
  if (stored === "zh" || stored === "fr") return stored;

  return window.navigator.language.toLowerCase().startsWith("fr") ? "fr" : "zh";
}

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => detectInitialLocale());

  useEffect(() => {
    try {
      window.localStorage.setItem(LOCALE_STORAGE_KEY, locale);
    } catch {}
    document.documentElement.lang = locale === "fr" ? "fr" : "zh-CN";
  }, [locale]);

  const value = useMemo<LocaleContextValue>(() => ({
    locale,
    setLocale(nextLocale) {
      setLocaleState(nextLocale);
    },
    t(key, vars) {
      return translate(locale, key, vars);
    },
  }), [locale]);

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  return useContext(LocaleContext);
}
