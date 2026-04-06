"use client";

import { useLocale } from "@/components/locale/LocaleContext";

export default function AboutPage() {
  const { t } = useLocale();

  return (
    <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <section className="panel rounded-[28px] p-6 sm:p-8">
        <p className="text-sm uppercase tracking-[0.3em] text-stage-gold/80">{t("about.title")}</p>
        <h1 className="mt-2 text-3xl font-semibold text-white">{t("about.title")}</h1>
        <div className="mt-6 space-y-4 text-white/75">
          <p>{t("about.p1")}</p>
          <p>{t("about.p2")}</p>
          <p>{t("about.p3")}</p>
        </div>
      </section>
    </main>
  );
}
