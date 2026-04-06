"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useLocale } from "@/components/locale/LocaleContext";
import { RoleCard } from "@/components/RoleCard";
import CostumeBar from "@/components/costumes/CostumeBar";
import { usePlayData } from "@/components/play/PlayContext";

function SelectRolePageContent() {
  const { play } = usePlayData();
  const { t } = useLocale();
  const searchParams = useSearchParams();
  const selectedSceneId = searchParams.get("scene");
  const scene = play.scenes.find((item) => item.id === selectedSceneId) ?? play.scenes[0];

  return (
    <main className="page-shell min-h-screen px-5 py-12 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <div className="glass-panel fade-in-up mb-8 rounded-[30px] px-6 py-7 sm:px-8">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <Link
                href={`/?scene=${encodeURIComponent(scene.id)}`}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-xs text-white/34 hover:text-white/70 transition mb-4"
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M8 2L4 6l4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {t("role.back")}
              </Link>
              <p className="page-kicker mb-2">
                {scene.title}
              </p>
              <h1 className="display-title text-4xl font-light text-white">{t("role.title")}</h1>
              <p className="mt-3 max-w-lg text-sm leading-7 text-white/42">
                {t("role.description")}
              </p>
            </div>
          </div>

          {play.scenes.length > 1 && (
            <div className="mb-6 flex flex-wrap gap-2 rounded-full border border-white/[0.06] bg-white/[0.025] px-3 py-2">
              {play.scenes.map((item) => {
                const active = item.id === scene.id;
                return (
                  <Link
                    key={item.id}
                    href={`/select-role?scene=${encodeURIComponent(item.id)}`}
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

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {scene.actors.map((actor) => (
              <RoleCard key={actor.id} actor={actor} sceneId={scene.id} />
            ))}
            <Link
              href={`/rehearsal?scene=${encodeURIComponent(scene.id)}&role=observer`}
              className="glass-panel raise-on-hover flex flex-col gap-2 rounded-2xl px-5 py-4 transition"
            >
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-white/25" />
                <span className="text-sm font-medium text-white/55">{t("role.observerTitle")}</span>
              </div>
              <p className="text-xs text-white/30 leading-5">{t("role.observerDescription")}</p>
            </Link>
          </div>

          <div className="glass-panel mt-8 rounded-[26px] px-6 py-5">
            <p className="page-kicker mb-4">{t("role.costumes")}</p>
            <CostumeBar actors={scene.actors} />
          </div>

          <div className="glass-panel mt-4 rounded-[26px] px-6 py-5">
            <p className="page-kicker mb-3">{t("role.setting")}</p>
            <p className="text-sm text-white/50 leading-7">{scene.setting}</p>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function SelectRolePage() {
  return (
    <Suspense fallback={<main className="min-h-screen bg-[#060912]" />}>
      <SelectRolePageContent />
    </Suspense>
  );
}
