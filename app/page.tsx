"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import CostumeBar from "@/components/costumes/CostumeBar";
import { useLocale } from "@/components/locale/LocaleContext";
import { usePlayData } from "@/components/play/PlayContext";

function HomePageContent() {
  const { play, playSource, currentSampleId, sampleLibrary, loadSamplePlay } = usePlayData();
  const { locale, t } = useLocale();
  const searchParams = useSearchParams();
  const selectedSceneId = searchParams.get("scene");
  const scene = play.scenes.find((item) => item.id === selectedSceneId) ?? play.scenes[0];
  const sourceLabel =
    playSource.type === "sample"
      ? t("home.playSourceSample")
      : playSource.type === "imported"
        ? t("home.playSourceImported")
        : t("home.playSourceEdited");

  return (
    <main className="page-shell min-h-screen flex flex-col items-center justify-center px-5 py-16 sm:px-6">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-[radial-gradient(ellipse,rgba(241,194,125,0.07),transparent_70%)]" />
        <div className="absolute left-1/4 bottom-1/3 w-[400px] h-[300px] rounded-full bg-[radial-gradient(ellipse,rgba(100,130,255,0.05),transparent_70%)]" />
      </div>

      <div className="glass-panel fade-in-up relative z-10 w-full max-w-4xl rounded-[34px] px-6 py-10 text-center sm:px-10 sm:py-12">
        <div className="space-y-10">
          <div className="space-y-4">
            <p className="page-kicker">
              {t("home.tool")}
            </p>
            <h1 className="display-title text-6xl font-light text-white sm:text-7xl">
              StageCue
            </h1>
            <p className="mx-auto max-w-xl text-white/42 text-sm tracking-[0.08em]">
              {play.title} · {scene.title} · {scene.subtitle}
            </p>
          </div>

          <p className="fade-in-soft text-white/58 text-base leading-8 max-w-xl mx-auto">
            {t("home.description")}
          </p>

          <div className="flex flex-col items-center gap-4">
            <Link
              href={`/select-role?scene=${encodeURIComponent(scene.id)}`}
              className="raise-on-hover inline-flex items-center gap-3 rounded-full bg-[#f1c27d] px-8 py-3.5 text-sm font-medium text-[#0a0c14] transition hover:bg-[#f5d090] active:scale-[0.99]"
            >
              {t("home.start")}
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
            <p className="text-white/25 text-xs">
              {t("home.meta", { actors: scene.actors.length, events: scene.events.length })}
            </p>
          </div>

          <div className="grid gap-4 text-left lg:grid-cols-[1.2fr_0.8fr]">
            <div className="glass-panel rounded-[26px] px-5 py-5">
              <p className="page-kicker mb-3">{t("home.currentPlay")}</p>
              <h2 className="display-title text-2xl text-white">{play.title}</h2>
              <p className="mt-2 text-sm text-white/42">{sourceLabel}</p>
              <div className="mt-4 flex flex-wrap gap-2 text-xs text-white/40">
                <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1">{t("home.sceneCount", { count: play.scenes.length })}</span>
                <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1">{t("home.meta", { actors: scene.actors.length, events: scene.events.length })}</span>
              </div>
              <Link
                href="/director"
                className="mt-5 inline-flex items-center gap-2 text-xs text-white/38 transition hover:text-[#f1c27d]"
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.2" />
                  <path d="M4 6h4M6 4v4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
                {t("home.openDirector")}
              </Link>
            </div>

            <div className="glass-panel rounded-[26px] px-5 py-5">
              <p className="page-kicker mb-3">{t("home.sampleLibrary")}</p>
              <div className="space-y-2">
                {sampleLibrary.map((sample) => {
                  const active = currentSampleId === sample.id && playSource.type === "sample";
                  return (
                    <button
                      key={sample.id}
                      onClick={() => loadSamplePlay(sample.id)}
                      className="w-full rounded-2xl border px-4 py-3 text-left transition"
                      style={{
                        borderColor: active ? "rgba(241,194,125,0.24)" : "rgba(255,255,255,0.08)",
                        background: active ? "rgba(241,194,125,0.08)" : "rgba(255,255,255,0.025)",
                      }}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium text-white/82">{sample.title}</p>
                          <p className="mt-1 text-xs text-white/40">
                            {sample.description[locale]}
                          </p>
                        </div>
                        <span className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[10px] uppercase tracking-[0.22em] text-white/36">
                          {sample.localeTag}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {play.scenes.length > 1 && (
            <div className="mx-auto flex max-w-2xl flex-wrap justify-center gap-2 rounded-full border border-white/[0.06] bg-white/[0.025] px-3 py-2">
              {play.scenes.map((item) => {
                const active = item.id === scene.id;
                return (
                  <Link
                    key={item.id}
                    href={`/?scene=${encodeURIComponent(item.id)}`}
                    className="raise-on-hover rounded-full px-3 py-1 text-xs transition"
                    style={{
                      color: active ? "#f1c27d" : "rgba(255,255,255,0.45)",
                      background: active ? "rgba(241,194,125,0.12)" : "rgba(255,255,255,0.03)",
                      border: `1px solid ${active ? "rgba(241,194,125,0.3)" : "rgba(255,255,255,0.08)"}`,
                    }}
                  >
                    {item.title}
                  </Link>
                );
              })}
            </div>
          )}

          <div className="flex flex-wrap justify-center gap-2 pt-2">
            {scene.actors.map((actor) => (
              <Link
                key={actor.id}
                href={`/rehearsal?scene=${encodeURIComponent(scene.id)}&role=${encodeURIComponent(actor.id)}`}
                className="raise-on-hover inline-flex items-center gap-1.5 rounded-full border border-white/8 bg-white/[0.03] px-3 py-1 text-xs text-white/40 hover:border-white/20 hover:text-white/70 hover:bg-white/[0.06] transition"
                style={{ borderColor: `${actor.color}20` }}
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: actor.color }} />
                {actor.name}
              </Link>
            ))}
            <Link
              href={`/rehearsal?scene=${encodeURIComponent(scene.id)}&role=observer`}
              className="raise-on-hover inline-flex items-center gap-1.5 rounded-full border border-white/8 bg-white/[0.03] px-3 py-1 text-xs text-white/30 hover:border-white/20 hover:text-white/55 hover:bg-white/[0.06] transition"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-white/25" />
              {t("home.observer")}
            </Link>
          </div>

          <div className="glass-panel rounded-[28px] px-5 py-5 text-left">
            <p className="page-kicker mb-3 text-center">{t("home.costumes")}</p>
            <CostumeBar actors={scene.actors} />
          </div>

          <div className="pt-2 border-t border-white/[0.06]">
            <Link
              href="/director"
              className="inline-flex items-center gap-2 text-xs text-white/34 hover:text-[#f1c27d] transition"
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.2" />
                <path d="M4 6h4M6 4v4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
              {t("home.director")}
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function HomePage() {
  return (
    <Suspense fallback={<main className="min-h-screen bg-[#060912]" />}>
      <HomePageContent />
    </Suspense>
  );
}
