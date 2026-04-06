"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import CostumeBar from "@/components/costumes/CostumeBar";
import { useLocale } from "@/components/locale/LocaleContext";
import { usePlayData } from "@/components/play/PlayContext";

function HomePageContent() {
  const { play } = usePlayData();
  const { t } = useLocale();
  const searchParams = useSearchParams();
  const selectedSceneId = searchParams.get("scene");
  const scene = play.scenes.find((item) => item.id === selectedSceneId) ?? play.scenes[0];

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-[radial-gradient(ellipse,rgba(241,194,125,0.07),transparent_70%)]" />
        <div className="absolute left-1/4 bottom-1/3 w-[400px] h-[300px] rounded-full bg-[radial-gradient(ellipse,rgba(100,130,255,0.05),transparent_70%)]" />
      </div>

      <div className="relative z-10 max-w-2xl w-full text-center space-y-10">
        <div className="space-y-3">
          <p className="text-xs uppercase tracking-[0.5em] text-[#f1c27d]/50">
            {t("home.tool")}
          </p>
          <h1 className="text-7xl font-light tracking-[0.15em] text-white">
            StageCue
          </h1>
          <p className="text-white/40 text-sm tracking-wide">
            {play.title} · {scene.title} · {scene.subtitle}
          </p>
        </div>

        <p className="text-white/55 text-base leading-8 max-w-md mx-auto">
          {t("home.description")}
        </p>

        <div className="flex flex-col items-center gap-4">
          <Link
            href={`/select-role?scene=${encodeURIComponent(scene.id)}`}
            className="inline-flex items-center gap-3 rounded-full bg-[#f1c27d] px-8 py-3.5 text-sm font-medium text-[#0a0c14] transition hover:bg-[#f5d090] hover:scale-[1.02] active:scale-[0.99]"
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

        {play.scenes.length > 1 && (
          <div className="flex flex-wrap justify-center gap-2">
            {play.scenes.map((item) => {
              const active = item.id === scene.id;
              return (
                <Link
                  key={item.id}
                  href={`/?scene=${encodeURIComponent(item.id)}`}
                  className="rounded-full px-3 py-1 text-xs transition"
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
              className="inline-flex items-center gap-1.5 rounded-full border border-white/8 bg-white/[0.03] px-3 py-1 text-xs text-white/40 hover:border-white/20 hover:text-white/70 hover:bg-white/[0.06] transition"
              style={{ borderColor: `${actor.color}20` }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: actor.color }} />
              {actor.name}
            </Link>
          ))}
          <Link
            href={`/rehearsal?scene=${encodeURIComponent(scene.id)}&role=observer`}
            className="inline-flex items-center gap-1.5 rounded-full border border-white/8 bg-white/[0.03] px-3 py-1 text-xs text-white/30 hover:border-white/20 hover:text-white/55 hover:bg-white/[0.06] transition"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-white/25" />
            {t("home.observer")}
          </Link>
        </div>

        <div className="pt-2">
          <p className="text-[10px] uppercase tracking-widest text-white/20 mb-3">{t("home.costumes")}</p>
          <CostumeBar actors={scene.actors} />
        </div>

        <div className="pt-4 border-t border-white/[0.06]">
          <Link
            href="/director"
            className="inline-flex items-center gap-2 text-xs text-white/30 hover:text-[#f1c27d] transition"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.2" />
              <path d="M4 6h4M6 4v4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
            {t("home.director")}
          </Link>
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
