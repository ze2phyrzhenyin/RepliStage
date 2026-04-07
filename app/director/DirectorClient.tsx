"use client";

import { useState, useEffect, useMemo, useRef, type ChangeEvent } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useLocale } from "@/components/locale/LocaleContext";
import { usePlayData } from "@/components/play/PlayContext";
import type { Play, ScriptDefinition, ScriptEvent, Actor, StageConfig, PathPoint, StageProp, StagePropKind } from "@/types/script";
import { deriveStageState } from "@/lib/player";
import { createDefaultStageProp, getStageProps, removeStageProp, STAGE_PROP_KINDS, syncStageLegacyFields, upsertStageProp } from "@/lib/stage-props";
import SceneList from "@/components/director/SceneList";
import { LanguageToggle } from "@/components/locale/LanguageToggle";
import EventEditor from "@/components/director/EventEditor";
import ActorManager from "@/components/director/ActorManager";
import { eventLabel } from "@/lib/eventMeta";
import { formatPlayImportError, parsePlay, summarizePlay } from "@/lib/play-schema";

const StageCanvas = dynamic(
  () => import("@/components/StageCanvas").then((m) => m.StageCanvas),
  { ssr: false },
);

type Tab = "events" | "actors";
type ImportPreview = {
  fileName: string;
  play: Play;
};

function isErrorMessage(message: string) {
  return /échec|error|failed|失败|错误/i.test(message);
}

export default function DirectorClient({ initialSceneId = "" }: { initialSceneId?: string }) {
  const { locale, t } = useLocale();
  const {
    play: loadedPlay,
    setPlay: persistPlay,
    resetPlay,
    playSource,
  } = usePlayData();
  const [play, setPlayRaw] = useState<Play>(() => JSON.parse(JSON.stringify(loadedPlay)));
  const [activeSceneId, setActiveSceneId] = useState<string>(initialSceneId || loadedPlay.scenes[0].id);
  const [currentEventIndex, setCurrentEventIndex] = useState(0);
  const [saveMsg, setSaveMsg] = useState<string | null>(null);
  const [tab, setTab] = useState<Tab>("events");
  const [selectedEventIndex, setSelectedEventIndex] = useState<number | null>(null);
  const [selectedActorId, setSelectedActorId] = useState<string | null>(null);
  const [drawingPathFor, setDrawingPathFor] = useState<{ eventIndex: number; actorId: string } | null>(null);
  const [importPreview, setImportPreview] = useState<ImportPreview | null>(null);
  const [importErrors, setImportErrors] = useState<string[]>([]);
  const [showUtilityMenu, setShowUtilityMenu] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const historyRef = useRef<Play[]>([JSON.parse(JSON.stringify(loadedPlay))]);
  const historyIndexRef = useRef(0);
  const hasUnsavedChanges = useMemo(
    () => JSON.stringify(play) !== JSON.stringify(loadedPlay),
    [play, loadedPlay],
  );

  useEffect(() => {
    const nextPlay = JSON.parse(JSON.stringify(loadedPlay)) as Play;
    setPlayRaw(nextPlay);
    setActiveSceneId(nextPlay.scenes.some((scene) => scene.id === initialSceneId) ? initialSceneId : nextPlay.scenes[0].id);
    setCurrentEventIndex(0);
    setSelectedEventIndex(null);
    setSelectedActorId(null);
    historyRef.current = [JSON.parse(JSON.stringify(nextPlay))];
    historyIndexRef.current = 0;
  }, [initialSceneId, loadedPlay]);

  function setPlay(updater: Play | ((prev: Play) => Play)) {
    setPlayRaw((prev) => {
      const next = typeof updater === "function" ? updater(prev) : updater;
      historyRef.current = historyRef.current.slice(0, historyIndexRef.current + 1);
      historyRef.current.push(JSON.parse(JSON.stringify(next)));
      historyIndexRef.current = historyRef.current.length - 1;
      return next;
    });
  }

  function undo() {
    if (historyIndexRef.current <= 0) return;
    historyIndexRef.current--;
    setPlayRaw(JSON.parse(JSON.stringify(historyRef.current[historyIndexRef.current])));
  }

  function redo() {
    if (historyIndexRef.current >= historyRef.current.length - 1) return;
    historyIndexRef.current++;
    setPlayRaw(JSON.parse(JSON.stringify(historyRef.current[historyIndexRef.current])));
  }

  const canUndo = historyIndexRef.current > 0;
  const canRedo = historyIndexRef.current < historyRef.current.length - 1;

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if ((e.metaKey || e.ctrlKey) && e.key === "z") {
        e.preventDefault();
        if (e.shiftKey) redo(); else undo();
      }
      if ((e.metaKey || e.ctrlKey) && e.key === "y") {
        e.preventDefault();
        redo();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const scene = play.scenes.find((item) => item.id === activeSceneId) ?? play.scenes[0];
  const sceneProps = getStageProps(scene.stage);
  const stageState = deriveStageState(scene, currentEventIndex, scene.events);

  function updateScene(id: string, updater: (scene: ScriptDefinition) => ScriptDefinition) {
    setPlay((prev) => ({
      ...prev,
      scenes: prev.scenes.map((sceneItem) => (sceneItem.id === id ? updater(sceneItem) : sceneItem)),
    }));
  }

  function addScene() {
    const id = `scene-${Date.now()}`;
    const inheritedActors = JSON.parse(JSON.stringify(scene.actors)) as Actor[];
    const inheritedStage = syncStageLegacyFields({ ...scene.stage });
    const newScene: ScriptDefinition = {
      id,
      title: t("director.newSceneTitle", { count: play.scenes.length + 1 }),
      subtitle: "",
      setting: "",
      actors: inheritedActors,
      stage: inheritedStage,
      events: [
        { id: `${id}_e1`, type: "blackout_start", duration: 1.2 },
        { id: `${id}_e2`, type: "blackout_end", duration: 0.6 },
        { id: `${id}_e3`, type: "scene_end", duration: 0.8 },
      ],
    };
    setPlay((prev) => ({ ...prev, scenes: [...prev.scenes, newScene] }));
    setActiveSceneId(id);
    setCurrentEventIndex(0);
  }

  function duplicateScene(id: string) {
    const src = play.scenes.find((item) => item.id === id);
    if (!src) return;
    const newId = `scene-${Date.now()}`;
    const dup: ScriptDefinition = {
      ...JSON.parse(JSON.stringify(src)),
      id: newId,
      title: `${src.title} (${t("director.sceneCopySuffix")})`,
    };
    setPlay((prev) => {
      const idx = prev.scenes.findIndex((item) => item.id === id);
      const next = [...prev.scenes];
      next.splice(idx + 1, 0, dup);
      return { ...prev, scenes: next };
    });
    setActiveSceneId(newId);
  }

  function deleteScene(id: string) {
    if (play.scenes.length <= 1) return;
    const remaining = play.scenes.filter((item) => item.id !== id);
    setPlay((prev) => ({ ...prev, scenes: remaining }));
    if (activeSceneId === id) setActiveSceneId(remaining[0].id);
  }

  function updateEvents(events: ScriptEvent[]) {
    updateScene(scene.id, (current) => ({ ...current, events }));
    setCurrentEventIndex((index) => Math.min(index, events.length - 1));
  }

  function updateEvent(index: number, updates: Partial<ScriptEvent>) {
    updateEvents(scene.events.map((event, i) => (i === index ? { ...event, ...updates } : event)));
  }

  function deleteEvent(index: number) {
    const next = scene.events.filter((_, i) => i !== index);
    updateEvents(next);
    if (selectedEventIndex !== null && selectedEventIndex >= next.length) {
      setSelectedEventIndex(next.length - 1);
    }
  }

  function insertEvent(afterIndex: number, event: ScriptEvent) {
    const next = [
      ...scene.events.slice(0, afterIndex + 1),
      event,
      ...scene.events.slice(afterIndex + 1),
    ];
    updateEvents(next);
    setSelectedEventIndex(afterIndex + 1);
  }

  function moveEvent(from: number, to: number) {
    const arr = [...scene.events];
    const [item] = arr.splice(from, 1);
    arr.splice(to, 0, item);
    updateEvents(arr);
    setSelectedEventIndex(to);
  }

  function updateActors(actors: Actor[]) {
    updateScene(scene.id, (current) => ({ ...current, actors }));
  }

  function updateStageConfig(updates: Partial<StageConfig>) {
    updateScene(scene.id, (current) => ({ ...current, stage: syncStageLegacyFields({ ...current.stage, ...updates }) }));
  }

  function updateStageProp(propId: string, x: number, y: number) {
    updateScene(scene.id, (current) => ({
      ...current,
      stage: upsertStageProp(current.stage, {
        ...(getStageProps(current.stage).find((prop) => prop.id === propId) as StageProp),
        x,
        y,
      }),
    }));
  }

  function handlePropDrop(propId: string, x: number, y: number) {
    updateStageProp(propId, x, y);
  }

  function handleRemoveProp(propId: string) {
    updateScene(scene.id, (current) => ({
      ...current,
      stage: removeStageProp(current.stage, propId),
    }));
  }

  function handleDuplicateProp(propId: string) {
    const source = sceneProps.find((prop) => prop.id === propId);
    if (!source) return;
    const duplicate = createDefaultStageProp(source.kind);
    updateScene(scene.id, (current) => ({
      ...current,
      stage: upsertStageProp(current.stage, {
        ...duplicate,
        x: source.x + 18,
        y: source.y + 18,
        label: source.label,
      }),
    }));
  }

  function handleAddProp(kind: StagePropKind) {
    updateScene(scene.id, (current) => ({
      ...current,
      stage: upsertStageProp(current.stage, createDefaultStageProp(kind)),
    }));
  }

  function handleActorDrop(actorId: string, x: number, y: number) {
    const idx = [...scene.events]
      .slice(0, currentEventIndex + 1)
      .reduceRight<number>((found, event, i) => {
        if (found >= 0) return found;
        if ((event.type === "enter" || event.type === "move") && event.actorId === actorId) return i;
        return -1;
      }, -1);
    if (idx >= 0) updateEvent(idx, { x, y });
  }

  function handleDrawPath(eventIndex: number) {
    const event = scene.events[eventIndex];
    if (!event?.actorId) return;
    setCurrentEventIndex(eventIndex);
    setDrawingPathFor({ eventIndex, actorId: event.actorId });
  }

  function handlePathDrawn(path: PathPoint[]) {
    if (!drawingPathFor) return;
    updateEvent(drawingPathFor.eventIndex, { path });
    setDrawingPathFor(null);
  }

  function handleSaveToBrowser() {
    try {
      persistPlay(play, playSource.type === "sample" ? playSource : playSource.type === "imported" ? { type: "imported" } : undefined);
      setSaveMsg(t("director.saved"));
    } catch {
      setSaveMsg(t("director.saveFailed"));
    } finally {
      setTimeout(() => setSaveMsg(null), 4000);
    }
  }

  function handleExportJson() {
    setShowUtilityMenu(false);
    setSaveMsg(null);
    try {
      const blob = new Blob([JSON.stringify(play, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = `${play.id || "stagecue-play"}.json`;
      anchor.click();
      URL.revokeObjectURL(url);
      setSaveMsg(t("director.exported"));
    } catch {
      setSaveMsg(t("director.exportFailed"));
    } finally {
      setTimeout(() => setSaveMsg(null), 4000);
    }
  }

  async function handleImportFile(event: ChangeEvent<HTMLInputElement>) {
    setShowUtilityMenu(false);
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      const imported = parsePlay(JSON.parse(text));
      const cloned = JSON.parse(JSON.stringify(imported)) as Play;
      setImportPreview({ fileName: file.name, play: cloned });
      setImportErrors([]);
      setSaveMsg(t("director.importParsed"));
    } catch (error) {
      setImportPreview(null);
      setImportErrors(formatPlayImportError(error, locale));
      setSaveMsg(t("director.importFailed"));
    } finally {
      event.target.value = "";
      setTimeout(() => setSaveMsg(null), 5000);
    }
  }

  function applyImportedPlay() {
    if (!importPreview) return;
    const cloned = JSON.parse(JSON.stringify(importPreview.play)) as Play;
    setPlayRaw(cloned);
    setActiveSceneId(cloned.scenes[0].id);
    setCurrentEventIndex(0);
    setSelectedEventIndex(null);
    setSelectedActorId(null);
    historyRef.current = [JSON.parse(JSON.stringify(cloned))];
    historyIndexRef.current = 0;
    persistPlay(cloned, { type: "imported" });
    setImportPreview(null);
    setImportErrors([]);
    setSaveMsg(t("director.importApplied"));
    setTimeout(() => setSaveMsg(null), 4000);
  }

  function handleClearBrowserStorage() {
    setShowUtilityMenu(false);
    if (typeof window === "undefined") return;

    const confirmed = window.confirm(t("director.clearConfirm"));
    if (!confirmed) return;

    try {
      localStorage.removeItem("stagecue_current_play_v1");
      localStorage.removeItem("stagecue_costumes_v1");

      for (const key of Object.keys(localStorage)) {
        if (key.startsWith("stagecue_custom_events_v1")) {
          localStorage.removeItem(key);
        }
      }

      setImportPreview(null);
      setImportErrors([]);
      resetPlay();
      setSaveMsg(t("director.cleared"));

      window.setTimeout(() => {
        window.location.reload();
      }, 300);
    } catch {
      setSaveMsg(t("director.clearFailed"));
      setTimeout(() => setSaveMsg(null), 4000);
    }
  }

  const currentEvent = scene.events[currentEventIndex];
  const actionButtonClassName =
    "inline-flex items-center justify-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-medium transition disabled:opacity-50";
  const toolIconButtonClassName =
    "flex h-8 w-8 items-center justify-center rounded-xl text-white/38 hover:bg-white/5 hover:text-white/78 transition disabled:cursor-not-allowed disabled:opacity-20";

  return (
      <div className="h-screen flex flex-col overflow-hidden" style={{ background: "#080612", color: "rgba(255,255,255,0.85)" }}>
        <header
          className="shrink-0 px-3 py-3 sm:px-4"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.07)", background: "#06040f" }}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="application/json,.json"
            className="hidden"
            onChange={handleImportFile}
          />

          <div className="flex flex-col gap-3">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <Link
                    href="/"
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[11px] text-white/44 transition hover:border-white/20 hover:text-white/72"
                  >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M8 2L4 6l4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {t("director.home")}
                  </Link>
                  <span className="text-[10px] uppercase tracking-[0.38em] text-[#f1c27d]/52">
                    {t("director.title")}
                  </span>
                </div>
                <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:items-end sm:gap-3">
                  <input
                    value={play.title}
                    onChange={(e) => setPlay((current) => ({ ...current, title: e.target.value }))}
                    className="min-w-0 border-b border-white/10 bg-transparent px-1 pb-1 text-base font-medium text-white/78 outline-none transition hover:border-white/20 focus:border-[#f1c27d]/45 sm:w-[260px]"
                    placeholder={t("director.playTitlePlaceholder")}
                  />
                  <div className="flex items-center gap-2">
                    <button
                      onClick={undo}
                      disabled={!canUndo}
                      title={`${t("director.undo")} ⌘Z`}
                      className={toolIconButtonClassName}
                    >
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M2.5 5.5a4.5 4.5 0 1 1 0 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                        <path d="M2.5 2.5v3h3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                    <button
                      onClick={redo}
                      disabled={!canRedo}
                      title={`${t("director.redo")} ⌘⇧Z`}
                      className={toolIconButtonClassName}
                    >
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M11.5 5.5a4.5 4.5 0 1 0 0 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                        <path d="M11.5 2.5v3h-3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                    {saveMsg && (
                      <span
                        className="rounded-full px-2.5 py-1 text-[11px]"
                        style={{
                          background: isErrorMessage(saveMsg) ? "rgba(240,100,80,0.15)" : "rgba(100,200,100,0.15)",
                          color: isErrorMessage(saveMsg) ? "#f08c78" : "#7fd1b9",
                          border: "1px solid currentColor",
                        }}
                      >
                        {saveMsg}
                      </span>
                    )}
                    <span className="hidden rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[11px] text-white/42 lg:inline-flex">
                      {playSource.type === "sample"
                        ? t("director.sourceSample")
                        : playSource.type === "imported"
                          ? t("director.sourceImported")
                          : t("director.sourceBrowser")}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <LanguageToggle compact />
              <div className="relative md:hidden">
                <button
                  onClick={() => setShowUtilityMenu((value) => !value)}
                  className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-white/62 transition hover:border-white/20 hover:text-white/84"
                  aria-expanded={showUtilityMenu}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M3 5h10M3 8h10M3 11h10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                  </svg>
                </button>

                {showUtilityMenu && (
                  <div className="absolute right-0 top-full z-20 mt-2 w-52 rounded-2xl border border-white/10 bg-[#0b1019]/96 p-2 shadow-[0_18px_44px_rgba(0,0,0,0.34)] backdrop-blur-xl">
                    <button
                      onClick={handleClearBrowserStorage}
                      className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-sm text-[#f5b0a4] transition hover:bg-[#f08c78]/10"
                    >
                      <span>{t("director.clearStorage")}</span>
                      <span className="text-[10px] uppercase tracking-[0.24em] text-[#f08c78]">reset</span>
                    </button>
                  </div>
                )}
              </div>
              </div>
            </div>

            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <div className="grid grid-cols-3 gap-2 md:flex md:flex-wrap">
                <button
                  onClick={handleSaveToBrowser}
                  className={actionButtonClassName}
                  style={{ background: "#f1c27d", color: "#0a0c14" }}
                >
                  {t("director.save")}
                </button>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className={actionButtonClassName}
                  style={{ background: "#7ea6ff", color: "#0a0c14" }}
                >
                  {t("director.import")}
                </button>
                <button
                  onClick={handleExportJson}
                  className={actionButtonClassName}
                  style={{ background: "#7fd1b9", color: "#0a0c14" }}
                >
                  {t("director.export")}
                </button>
              </div>

              <div className="hidden items-center gap-2 md:flex">
                <Link
                  href="/director/setup"
                  className="inline-flex items-center justify-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition"
                  style={{ borderColor: "rgba(184,164,240,0.28)", color: "rgba(255,255,255,0.72)", background: "rgba(184,164,240,0.08)" }}
                >
                  {t("director.loadSample")}
                </Link>
                <button
                  onClick={handleClearBrowserStorage}
                  className="inline-flex items-center justify-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition"
                  style={{ borderColor: "rgba(240,140,120,0.28)", color: "#f5b0a4", background: "rgba(240,140,120,0.08)" }}
                >
                  {t("director.clearStorage")}
                </button>
              </div>
            </div>
          </div>
        </header>

        {(importPreview || importErrors.length > 0) && (
          <div className="shrink-0 border-b border-white/[0.07] bg-white/[0.03] px-4 py-3">
            {importPreview && (
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.3em] text-[#7fd1b9]/70">{t("director.importPreview")}</p>
                    <p className="mt-1 text-sm text-white/75">
                      {importPreview.fileName} · {importPreview.play.title}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setImportPreview(null)}
                      className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/45 transition hover:text-white/75 hover:border-white/20"
                    >
                      {t("common.cancel")}
                    </button>
                    <button
                      onClick={applyImportedPlay}
                      className="rounded-full px-3 py-1 text-xs font-medium text-[#0a0c14]"
                      style={{ background: "#7fd1b9" }}
                    >
                      {t("director.applyImport")}
                    </button>
                  </div>
                </div>

                <div className="grid gap-2 md:grid-cols-4">
                  {(() => {
                    const summary = summarizePlay(importPreview.play);
                    return (
                      <>
                        <div className="rounded-xl border border-white/8 bg-white/[0.02] px-3 py-2">
                          <p className="text-[10px] text-white/25">{t("director.playId")}</p>
                          <p className="mt-1 text-sm text-white/70">{summary.playId}</p>
                        </div>
                        <div className="rounded-xl border border-white/8 bg-white/[0.02] px-3 py-2">
                          <p className="text-[10px] text-white/25">{t("director.sceneCount")}</p>
                          <p className="mt-1 text-sm text-white/70">{summary.sceneCount}</p>
                        </div>
                        <div className="rounded-xl border border-white/8 bg-white/[0.02] px-3 py-2">
                          <p className="text-[10px] text-white/25">{t("director.actorCount")}</p>
                          <p className="mt-1 text-sm text-white/70">{summary.totalActors}</p>
                        </div>
                        <div className="rounded-xl border border-white/8 bg-white/[0.02] px-3 py-2">
                          <p className="text-[10px] text-white/25">{t("director.eventCount")}</p>
                          <p className="mt-1 text-sm text-white/70">{summary.totalEvents}</p>
                        </div>
                      </>
                    );
                  })()}
                </div>

                <div className="rounded-xl border border-white/8 bg-white/[0.02] px-3 py-3">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-white/25 mb-2">{t("director.sceneStructure")}</p>
                  <div className="space-y-2">
                    {summarizePlay(importPreview.play).scenes.map((item) => (
                      <div key={item.id} className="flex items-center gap-3 text-xs text-white/60">
                        <span className="min-w-0 flex-1 truncate">{item.title}{item.subtitle ? ` · ${item.subtitle}` : ""}</span>
                        <span className="text-white/30">{t("common.rolesMeta", { count: item.actors })}</span>
                        <span className="text-white/30">{t("common.eventsMeta", { count: item.events })}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {importErrors.length > 0 && (
              <div className="rounded-xl border border-[#f08c78]/30 bg-[#f08c78]/10 px-3 py-3">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm text-[#f08c78]">{t("director.importErrorTitle")}</p>
                  <button
                    onClick={() => setImportErrors([])}
                    className="text-xs text-white/40 transition hover:text-white/70"
                  >
                    {t("director.collapse")}
                  </button>
                </div>
                <div className="mt-2 space-y-1">
                  {importErrors.map((item, index) => (
                    <p key={`${item}-${index}`} className="text-xs text-white/70">
                      {index + 1}. {item}
                    </p>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        <div className="shrink-0 border-b border-white/[0.06] bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.015))] px-4 py-2.5">
          <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] uppercase tracking-[0.3em] text-white/28">{t("director.status")}</span>
              <span
                className="rounded-full border px-2.5 py-1 text-[11px]"
                style={{
                  borderColor: hasUnsavedChanges ? "rgba(241,194,125,0.28)" : "rgba(127,209,185,0.28)",
                  color: hasUnsavedChanges ? "#f1c27d" : "#7fd1b9",
                  background: hasUnsavedChanges ? "rgba(241,194,125,0.08)" : "rgba(127,209,185,0.08)",
                }}
              >
                {hasUnsavedChanges ? t("common.unsaved") : t("common.saved")}
              </span>
              <span className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[11px] text-white/58">
                {playSource.type === "sample"
                  ? t("director.sourceSample")
                  : playSource.type === "imported"
                    ? t("director.sourceImported")
                    : t("director.sourceBrowser")}
              </span>
              <span className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[11px] text-white/58">
                {t("director.activeScene")}: {scene.title || t("common.untitled")}
              </span>
            </div>
            <p className="text-[11px] text-white/42">
              {hasUnsavedChanges ? t("director.statusUnsaved") : t("director.statusSaved")} · {t("director.hint")}
            </p>
          </div>
        </div>

        <div className="flex flex-1 min-h-0 overflow-x-auto">
          <SceneList
            play={play}
            activeSceneId={activeSceneId}
            onSelect={(id) => { setActiveSceneId(id); setCurrentEventIndex(0); setSelectedEventIndex(null); }}
            onAdd={addScene}
            onDuplicate={duplicateScene}
            onDelete={deleteScene}
          />

          <div
            className="flex flex-col shrink-0"
            style={{ minWidth: 320, width: 480, borderRight: "1px solid rgba(255,255,255,0.07)", background: "linear-gradient(180deg, #05040d 0%, #080813 100%)" }}
          >
            <div className="border-b border-white/[0.06] px-3 py-2">
              <p className="mb-2 text-[10px] uppercase tracking-[0.28em] text-white/24">{t("director.manageScene")}</p>
              <div className="flex items-center gap-2">
              <input
                value={scene.title}
                onChange={(e) => updateScene(scene.id, (current) => ({ ...current, title: e.target.value }))}
                className="bg-transparent text-sm font-medium text-white/70 outline-none border-b border-transparent hover:border-white/20 focus:border-white/40 px-1 w-28 transition"
              />
              <input
                value={scene.subtitle}
                onChange={(e) => updateScene(scene.id, (current) => ({ ...current, subtitle: e.target.value }))}
                className="flex-1 bg-transparent text-xs text-white/35 outline-none border-b border-transparent hover:border-white/15 focus:border-white/25 px-1 transition"
                placeholder={t("director.subtitlePlaceholder")}
              />
              </div>
            </div>

            {drawingPathFor && (
              <div
                className="flex items-center justify-between px-3 py-1.5"
                style={{ background: "rgba(224,164,248,0.07)", borderBottom: "1px solid rgba(224,164,248,0.2)" }}
              >
                <span className="text-[11px]" style={{ color: "#e0a4f8" }}>
                  {t("director.pathMode")}
                </span>
                <button
                  onClick={() => setDrawingPathFor(null)}
                  className="text-[10px] text-white/40 hover:text-white/70 transition px-2 py-0.5 rounded hover:bg-white/10"
                >
                  {t("common.cancel")}
                </button>
              </div>
            )}

            <div className="px-3 pt-2 pb-1">
              <p className="text-[10px] uppercase tracking-[0.28em] text-white/24">{t("director.stagePanel")}</p>
            </div>

            <div className="px-3 py-2 flex-shrink-0">
              <StageCanvas
                stageState={stageState}
                actors={scene.actors}
                stageConfig={scene.stage}
                selectedRoleId={null}
                editMode
                selectedActorId={selectedActorId}
                onActorDrop={handleActorDrop}
                onPropDrop={handlePropDrop}
                drawingPathFor={drawingPathFor?.actorId ?? null}
                onPathDrawn={handlePathDrawn}
                currentEvent={scene.events[currentEventIndex] ?? null}
              />
            </div>

            <div className="flex items-center gap-2 px-3 py-1.5" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
              <button
                onClick={() => setCurrentEventIndex(Math.max(0, currentEventIndex - 1))}
                className="text-white/35 hover:text-white/70 transition text-lg leading-none px-2 py-0.5 rounded-xl hover:bg-white/5"
              >‹</button>
              <div className="flex-1 text-center">
                <span className="text-[10px] text-white/30">{currentEventIndex + 1} / {scene.events.length}</span>
                {currentEvent && (
                  <span className="ml-2 text-[10px]" style={{ color: "rgba(255,255,255,0.25)" }}>
                    {currentEvent.type === "line"
                      ? `"${(currentEvent.text ?? "").slice(0, 20)}…"`
                      : eventLabel(currentEvent.type, locale)}
                  </span>
                )}
              </div>
              <button
                onClick={() => setCurrentEventIndex(Math.min(scene.events.length - 1, currentEventIndex + 1))}
                className="text-white/35 hover:text-white/70 transition text-lg leading-none px-2 py-0.5 rounded-xl hover:bg-white/5"
              >›</button>
            </div>

            <div
              className="flex flex-wrap gap-x-4 gap-y-1 px-3 py-2 text-[10px] text-white/30"
              style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
            >
              <div className="w-full flex flex-col gap-2">
                <span className="uppercase tracking-[0.22em] text-white/22">{t("director.stageProps")}</span>
                <div className="flex flex-wrap gap-1.5">
                  {STAGE_PROP_KINDS.map((kind) => (
                    <button
                      key={kind}
                      type="button"
                      onClick={() => handleAddProp(kind)}
                      className="rounded-full border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[10px] text-white/50 transition hover:bg-white/[0.08] hover:text-white/80"
                    >
                      + {t(`stage.${kind}` as never)}
                    </button>
                  ))}
                </div>
              </div>

              {sceneProps.map((prop) => (
                <div key={prop.id} className="w-full rounded-xl border border-white/[0.06] bg-white/[0.03] px-3 py-2.5">
                  <div className="mb-2 flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-[11px] text-white/62">{t(`stage.${prop.kind}` as never)}</span>
                      <span className="text-[10px] text-white/28">{prop.id}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleDuplicateProp(prop.id)}
                      className="rounded-full border border-white/10 px-2 py-0.5 text-[10px] text-white/40 transition hover:text-white/75 hover:bg-white/[0.06]"
                    >
                      {t("director.duplicateProp")}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleRemoveProp(prop.id)}
                      className="rounded-full border border-white/10 px-2 py-0.5 text-[10px] text-white/40 transition hover:text-white/75 hover:bg-white/[0.06]"
                    >
                      {t("director.removeProp")}
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <label className="flex items-center gap-1">
                      <span>{prop.kind === "door" ? t("director.doorX") : prop.kind === "chair" ? t("director.chairX") : "X"}</span>
                      <input
                        type="number"
                        value={prop.x}
                        onChange={(e) => updateStageProp(prop.id, +e.target.value, prop.y)}
                        className="w-16 bg-white/5 rounded px-1.5 py-0.5 text-white/60 outline-none"
                      />
                    </label>
                    <label className="flex items-center gap-1">
                      <span>{prop.kind === "door" ? t("director.doorY") : prop.kind === "chair" ? t("director.chairY") : "Y"}</span>
                      <input
                        type="number"
                        value={prop.y}
                        onChange={(e) => updateStageProp(prop.id, prop.x, +e.target.value)}
                        className="w-16 bg-white/5 rounded px-1.5 py-0.5 text-white/60 outline-none"
                      />
                    </label>
                  </div>
                </div>
              ))}
            </div>

            <div className="px-3 pb-3 flex-1">
              <textarea
                value={scene.setting}
                onChange={(e) => updateScene(scene.id, (current) => ({ ...current, setting: e.target.value }))}
                rows={2}
                placeholder={t("director.sceneSettingPlaceholder")}
                className="w-full bg-white/[0.03] rounded px-2 py-1.5 text-[11px] text-white/40 outline-none resize-none border border-white/[0.06]"
              />
            </div>
          </div>

          <div className="flex flex-col flex-1 min-w-0 min-h-0 bg-[linear-gradient(180deg,#06050f_0%,#090913_100%)]">
            <div className="border-b border-white/[0.07] px-4 py-2">
              <p className="text-[10px] uppercase tracking-[0.28em] text-white/24">{t("director.eventTimeline")}</p>
              <div className="mt-2 flex">
              {(["events", "actors"] as Tab[]).map((item) => (
                <button
                  key={item}
                  onClick={() => setTab(item)}
                  className="px-5 py-2.5 text-xs font-medium transition"
                  style={{
                    color: tab === item ? "#f1c27d" : "rgba(255,255,255,0.3)",
                    borderBottom: tab === item ? "2px solid #f1c27d" : "2px solid transparent",
                  }}
                >
                  {item === "events"
                    ? t("director.eventList", { count: scene.events.length })
                    : t("director.actorManager", { count: scene.actors.length })}
                </button>
              ))}
              </div>
            </div>

            <div className="flex-1 overflow-y-auto">
              {tab === "events" && (
                <EventEditor
                  scene={scene}
                  currentEventIndex={currentEventIndex}
                  selectedEventIndex={selectedEventIndex}
                  onSeek={(i) => { setCurrentEventIndex(i); setSelectedEventIndex(i); }}
                  onSelect={setSelectedEventIndex}
                  onUpdate={updateEvent}
                  onDelete={deleteEvent}
                  onInsert={insertEvent}
                  onMove={moveEvent}
                  onSelectActor={setSelectedActorId}
                  selectedActorId={selectedActorId}
                  onDrawPath={handleDrawPath}
                />
              )}
              {tab === "actors" && (
                <ActorManager actors={scene.actors} onChange={updateActors} />
              )}
            </div>
          </div>
        </div>
      </div>
  );
}
