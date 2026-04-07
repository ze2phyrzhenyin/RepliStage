"use client";

import { useMemo, useRef, useState, type ChangeEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLocale } from "@/components/locale/LocaleContext";
import { usePlayData } from "@/components/play/PlayContext";
import { formatPlayImportError, parsePlay, summarizePlay } from "@/lib/play-schema";
import { LanguageToggle } from "@/components/locale/LanguageToggle";
import type { Play } from "@/types/script";

type SetupMode = "rehearsal" | "director";
type SourceMode = "sample" | "import";

export function ModeSetupScreen({ mode }: { mode: SetupMode }) {
  const router = useRouter();
  const { locale, t } = useLocale();
  const {
    play,
    playSource,
    sampleLibrary,
    loadSamplePlay,
    importPlayFromText,
  } = usePlayData();
  const [selectedSceneId, setSelectedSceneId] = useState(play.scenes[0]?.id ?? "");
  const [importErrors, setImportErrors] = useState<string[]>([]);
  const [importPreview, setImportPreview] = useState<{ fileName: string; play: Play } | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [sourceMode, setSourceMode] = useState<SourceMode>(playSource.type === "imported" ? "import" : "sample");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const currentScene = play.scenes.find((scene) => scene.id === selectedSceneId) ?? play.scenes[0];
  const playSummary = useMemo(() => summarizePlay(play), [play]);
  const title = mode === "rehearsal" ? t("setup.rehearsalTitle") : t("setup.directorTitle");
  const description = mode === "rehearsal" ? t("setup.rehearsalDescription") : t("setup.directorDescription");
  const stepThreeLabel = mode === "rehearsal" ? t("setup.continueToRoles") : t("setup.continueToDirector");
  const sourceLabel =
    playSource.type === "sample"
      ? t("home.playSourceSample")
      : playSource.type === "imported"
        ? t("home.playSourceImported")
        : t("home.playSourceEdited");

  function openImportPicker() {
    fileInputRef.current?.click();
  }

  function handleSelectSample(sampleId: string) {
    setSourceMode("sample");
    loadSamplePlay(sampleId);
    const nextSample = sampleLibrary.find((sample) => sample.id === sampleId);
    setSelectedSceneId(nextSample?.play.scenes[0]?.id ?? "");
    setImportPreview(null);
    setImportErrors([]);
  }

  async function handleImportFile(event: ChangeEvent<HTMLInputElement>) {
    setSourceMode("import");
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      const parsed = parsePlay(JSON.parse(text));
      setImportPreview({ fileName: file.name, play: parsed });
      setImportErrors([]);
      setStatus(t("director.importParsed"));
    } catch (error) {
      setImportPreview(null);
      setImportErrors(formatPlayImportError(error, locale));
      setStatus(t("director.importFailed"));
    } finally {
      event.target.value = "";
    }
  }

  function applyImportedPlay() {
    if (!importPreview) return;
    const nextPlay = importPlayFromText(JSON.stringify(importPreview.play));
    setSourceMode("import");
    setSelectedSceneId(nextPlay.scenes[0]?.id ?? "");
    setImportPreview(null);
    setImportErrors([]);
    setStatus(t("director.importApplied"));
  }

  function goNext() {
    if (!currentScene) return;
    if (mode === "rehearsal") {
      router.push(`/select-role?scene=${encodeURIComponent(currentScene.id)}`);
      return;
    }
    router.push(`/director?scene=${encodeURIComponent(currentScene.id)}`);
  }

  return (
    <main className="page-shell min-h-screen px-5 py-12 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <div className="glass-panel rounded-[32px] px-6 py-7 sm:px-8">
          <input
            ref={fileInputRef}
            type="file"
            accept="application/json,.json"
            className="hidden"
            onChange={handleImportFile}
          />

          <div className="mb-8">
            <div className="flex items-center justify-between gap-3 mb-4">
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-xs text-white/34 hover:text-white/70 transition"
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M8 2L4 6l4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {t("setup.backHome")}
              </Link>
              <LanguageToggle />
            </div>
            <p className="page-kicker mb-2">{t("setup.kicker")}</p>
            <h1 className="display-title text-4xl font-light text-white">{title}</h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-white/42">{description}</p>
          </div>

          <div className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="space-y-4">
              <section className="glass-panel rounded-[28px] px-5 py-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="page-kicker mb-2">{t("setup.sourceMode")}</p>
                    <h2 className="display-title text-2xl text-white">{play.title}</h2>
                    <p className="mt-2 text-sm text-white/42">{sourceLabel}</p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setSourceMode("sample")}
                      className="rounded-full border px-3 py-1.5 text-xs transition"
                      style={{
                        borderColor: sourceMode === "sample" ? "rgba(241,194,125,0.28)" : "rgba(255,255,255,0.1)",
                        background: sourceMode === "sample" ? "rgba(241,194,125,0.12)" : "rgba(255,255,255,0.04)",
                        color: sourceMode === "sample" ? "#f1c27d" : "rgba(255,255,255,0.62)",
                      }}
                    >
                      {t("setup.samplePlays")}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setSourceMode("import");
                        openImportPicker();
                      }}
                      className="rounded-full border px-3 py-1.5 text-xs transition"
                      style={{
                        borderColor: sourceMode === "import" ? "rgba(126,166,255,0.28)" : "rgba(255,255,255,0.1)",
                        background: sourceMode === "import" ? "rgba(126,166,255,0.12)" : "rgba(255,255,255,0.04)",
                        color: sourceMode === "import" ? "#9ab6ff" : "rgba(255,255,255,0.62)",
                      }}
                    >
                      {t("setup.importJson")}
                    </button>
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap gap-2 text-xs text-white/40">
                  <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1">{t("home.sceneCount", { count: playSummary.sceneCount })}</span>
                  <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1">{t("home.totalMeta", { actors: playSummary.totalActors, events: playSummary.totalEvents })}</span>
                </div>
                {sourceMode === "sample" ? (
                  <>
                    <p className="mt-5 text-sm text-white/38">{t("setup.sampleDescription")}</p>
                    <div className="mt-4 space-y-2">
                      {sampleLibrary.map((sample) => {
                        const active = playSource.type === "sample" && playSource.sampleId === sample.id;
                        return (
                          <button
                            key={sample.id}
                            type="button"
                            onClick={() => handleSelectSample(sample.id)}
                            className="w-full rounded-2xl border px-4 py-3 text-left transition"
                            style={{
                              borderColor: active ? "rgba(241,194,125,0.24)" : "rgba(255,255,255,0.08)",
                              background: active ? "rgba(241,194,125,0.08)" : "rgba(255,255,255,0.025)",
                            }}
                          >
                            <div className="flex items-start justify-between gap-3">
                              <div className="min-w-0">
                                <p className="truncate text-sm font-medium text-white/82">{sample.title}</p>
                                <p className="mt-1 text-xs text-white/40">{sample.description[locale]}</p>
                              </div>
                              <span className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[10px] text-white/36">
                                {t("home.sceneCount", { count: sample.play.scenes.length })}
                              </span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </>
                ) : (
                  <div className="mt-5 rounded-2xl border border-[#9ab6ff]/18 bg-[#9ab6ff]/[0.06] px-4 py-4">
                    <p className="text-sm text-white/72">{t("setup.importPrompt")}</p>
                    <div className="mt-4 flex flex-wrap items-center gap-3">
                      <button
                        type="button"
                        onClick={openImportPicker}
                        className="rounded-full bg-[#9ab6ff] px-4 py-2 text-xs font-medium text-[#08111f] transition hover:bg-[#b3c7ff]"
                      >
                        {t("setup.importJson")}
                      </button>
                      <span className="text-xs text-white/38">{t("setup.importHint")}</span>
                    </div>
                  </div>
                )}
              </section>

              {(importPreview || importErrors.length > 0 || status) && (
                <section className="glass-panel rounded-[28px] px-5 py-5">
                  <p className="page-kicker mb-3">{t("setup.importStatus")}</p>
                  {status && <p className="mb-3 text-sm text-white/56">{status}</p>}
                  {importPreview && (
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm font-medium text-white/78">{importPreview.fileName}</p>
                        <p className="mt-1 text-xs text-white/38">
                          {importPreview.play.title} · {t("home.sceneCount", { count: importPreview.play.scenes.length })}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={applyImportedPlay}
                        className="rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-2 text-xs text-white/70 transition hover:bg-white/[0.08] hover:text-white"
                      >
                        {t("director.applyImport")}
                      </button>
                    </div>
                  )}
                  {importErrors.length > 0 && (
                    <div className="space-y-1 text-sm text-[#f0a6a6]">
                      {importErrors.map((error) => (
                        <p key={error}>{error}</p>
                      ))}
                    </div>
                  )}
                </section>
              )}
            </div>

            <section className="glass-panel sticky top-6 rounded-[28px] px-5 py-5 self-start">
              <p className="page-kicker mb-3">{t("setup.sceneSelection")}</p>
              <div className="space-y-2">
                {play.scenes.map((scene) => {
                  const active = scene.id === currentScene?.id;
                  return (
                    <button
                      key={scene.id}
                      type="button"
                      onClick={() => setSelectedSceneId(scene.id)}
                      className="w-full rounded-2xl border px-4 py-3 text-left transition"
                      style={{
                        borderColor: active ? "rgba(241,194,125,0.24)" : "rgba(255,255,255,0.08)",
                        background: active ? "rgba(241,194,125,0.08)" : "rgba(255,255,255,0.025)",
                      }}
                    >
                      <p className="text-sm font-medium text-white/82">{scene.title}</p>
                      <p className="mt-1 text-xs text-white/38">{scene.subtitle}</p>
                      <p className="mt-2 text-[11px] text-white/32">
                        {t("setup.sceneMeta", { actors: scene.actors.length, events: scene.events.length })}
                      </p>
                    </button>
                  );
                })}
              </div>

              {currentScene && (
                <div className="mt-5 rounded-2xl border border-white/[0.06] bg-white/[0.03] px-4 py-4">
                  <p className="text-xs uppercase tracking-[0.22em] text-white/24">{t("role.setting")}</p>
                  <p className="mt-3 text-sm leading-7 text-white/46">{currentScene.setting}</p>
                </div>
              )}

              <button
                type="button"
                onClick={goNext}
                disabled={!currentScene}
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#f1c27d] px-5 py-3 text-sm font-medium text-[#0a0c14] transition hover:bg-[#f5d090] disabled:opacity-50"
              >
                {stepThreeLabel}
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
