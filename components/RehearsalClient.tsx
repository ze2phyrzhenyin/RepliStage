"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "motion/react";
import { BlackoutOverlay } from "@/components/BlackoutOverlay";
import { LanguageToggle } from "@/components/locale/LanguageToggle";
import { useLocale } from "@/components/locale/LocaleContext";
import { PlaybackControls } from "@/components/PlaybackControls";
import { ScriptPanel } from "@/components/ScriptPanel";
import { SpeechBubble } from "@/components/SpeechBubble";
import { DirectorPanel } from "@/components/DirectorPanel";
import { usePlayData } from "@/components/play/PlayContext";
import {
  deriveStageState,
  getActorById,
  getEventDurationMs,
  getVisibleLineText,
  isOwnLine,
} from "@/lib/player";
import {
  findLastPositionEvent,
  hasCustomEvents,
  loadCustomEvents,
  resetCustomEvents,
  saveCustomEvents,
} from "@/lib/customScript";
import { getStageProps } from "@/lib/stage-props";
import { ScriptEvent, PathPoint } from "@/types/script";
import { getLocalizedEventText, getLocalizedPlayTitle, getLocalizedSceneSubtitle, getLocalizedSceneTitle } from "@/lib/sample-text";

const StageCanvas = dynamic(
  () => import("@/components/StageCanvas").then((m) => m.StageCanvas),
  { ssr: false },
);

type Mode = "stage" | "script" | "director";

export function RehearsalClient({
  initialRoleId,
  initialSceneId,
}: {
  initialRoleId: string;
  initialSceneId: string;
}) {
  const router = useRouter();
  const { locale, t } = useLocale();
  const { play } = usePlayData();
  const scene = play.scenes.find((item) => item.id === initialSceneId) ?? play.scenes[0];
  const selectedRoleId = initialRoleId;
  const isObserver = selectedRoleId === "observer";
  const selectedActor = isObserver ? null : getActorById(scene.actors, selectedRoleId);

  const [customEvents, setCustomEvents] = useState<ScriptEvent[]>(() => loadCustomEvents(scene.id, scene.events));
  const [isModified, setIsModified] = useState(() => hasCustomEvents(scene.id));

  const eventsHistoryRef = useRef<ScriptEvent[][]>([loadCustomEvents(scene.id, scene.events)]);
  const eventsHistoryIndexRef = useRef(0);

  function updateEvents(newEvents: ScriptEvent[]) {
    eventsHistoryRef.current = eventsHistoryRef.current.slice(0, eventsHistoryIndexRef.current + 1);
    eventsHistoryRef.current.push(newEvents);
    eventsHistoryIndexRef.current = eventsHistoryRef.current.length - 1;
    setCustomEvents(newEvents);
    saveCustomEvents(scene.id, newEvents);
    setIsModified(true);
  }

  function undoEvents() {
    if (eventsHistoryIndexRef.current <= 0) return;
    eventsHistoryIndexRef.current--;
    const prev = eventsHistoryRef.current[eventsHistoryIndexRef.current];
    setCustomEvents(prev);
    saveCustomEvents(scene.id, prev);
    setIsModified(true);
  }

  function redoEvents() {
    if (eventsHistoryIndexRef.current >= eventsHistoryRef.current.length - 1) return;
    eventsHistoryIndexRef.current++;
    const next = eventsHistoryRef.current[eventsHistoryIndexRef.current];
    setCustomEvents(next);
    saveCustomEvents(scene.id, next);
    setIsModified(true);
  }

  function handleReset() {
    resetCustomEvents(scene.id);
    setCustomEvents(scene.events);
    setIsModified(false);
    setCurrentEventIndex(0);
    setIsPlaying(false);
  }

  function handleUpdateEvent(index: number, updates: Partial<ScriptEvent>) {
    const next = customEvents.map((e, i) => (i === index ? { ...e, ...updates } : e));
    updateEvents(next);
  }

  function handleDeleteEvent(index: number) {
    const next = customEvents.filter((_, i) => i !== index);
    updateEvents(next);
    setCurrentEventIndex((p) => Math.min(p, next.length - 1));
  }

  function handleInsertEvent(afterIndex: number, event: ScriptEvent) {
    const next = [
      ...customEvents.slice(0, afterIndex + 1),
      event,
      ...customEvents.slice(afterIndex + 1),
    ];
    updateEvents(next);
    setCurrentEventIndex(afterIndex + 1);
  }

  const [mode, setMode] = useState<Mode>("stage");
  const [currentEventIndex, setCurrentEventIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [autoplay, setAutoplay] = useState(true);
  const [speed, setSpeed] = useState(1);
  const [showAllLines, setShowAllLines] = useState(false);
  const [revealedLineIds, setRevealedLineIds] = useState<Set<string>>(new Set());
  const [directorSelectedActor, setDirectorSelectedActor] = useState<string | null>(null);
  const [drawingPathFor, setDrawingPathFor] = useState<{ eventIndex: number; actorId: string } | null>(null);
  const timerRef = useRef<number | null>(null);

  const stageState = useMemo(
    () => deriveStageState(scene, currentEventIndex, customEvents),
    [scene, currentEventIndex, customEvents],
  );
  const currentEvent = customEvents[currentEventIndex];
  const currentActor = getActorById(scene.actors, currentEvent?.actorId);

  const effectiveShowAllLines = isObserver ? true : showAllLines;
  const currentLineText = getVisibleLineText(
    currentEvent,
    selectedRoleId,
    effectiveShowAllLines,
    revealedLineIds,
    t("script.hiddenPrompt"),
  );
  const currentActionText =
    currentEvent?.type === "action" || currentEvent?.type === "prop_show" || currentEvent?.type === "prop_hide" || currentEvent?.type === "prop_swap"
      ? getLocalizedEventText(play, scene, currentEvent, locale)
      : null;
  const currentEventIsOwnLine = !isObserver && Boolean(currentEvent && isOwnLine(currentEvent, selectedRoleId));
  const currentLineRevealed = currentEvent ? revealedLineIds.has(currentEvent.id) : false;

  useEffect(() => {
    if (!selectedRoleId) {
      router.replace(`/select-role?scene=${encodeURIComponent(scene.id)}`);
      return;
    }
    if (!isObserver && !scene.actors.some((actor) => actor.id === selectedRoleId)) {
      router.replace(`/select-role?scene=${encodeURIComponent(scene.id)}`);
    }
  }, [isObserver, router, scene.actors, scene.id, selectedRoleId]);

  useEffect(() => {
    const nextEvents = loadCustomEvents(scene.id, scene.events);
    setCustomEvents(nextEvents);
    eventsHistoryRef.current = [nextEvents];
    eventsHistoryIndexRef.current = 0;
    setIsModified(hasCustomEvents(scene.id));
    setCurrentEventIndex(0);
    setIsPlaying(false);
  }, [scene]);

  function handleSceneChange(nextSceneId: string) {
    const nextScene = play.scenes.find((item) => item.id === nextSceneId);
    if (!nextScene) return;

    if (selectedRoleId === "observer") {
      router.push(`/rehearsal?scene=${encodeURIComponent(nextSceneId)}&role=observer`);
      return;
    }

    if (nextScene.actors.some((actor) => actor.id === selectedRoleId)) {
      router.push(`/rehearsal?scene=${encodeURIComponent(nextSceneId)}&role=${encodeURIComponent(selectedRoleId)}`);
      return;
    }

    router.push(`/select-role?scene=${encodeURIComponent(nextSceneId)}`);
  }

  useEffect(() => {
    if (timerRef.current) window.clearTimeout(timerRef.current);
    if (!isPlaying || stageState.sceneEnded || mode === "director") return;

    timerRef.current = window.setTimeout(() => {
      setCurrentEventIndex((prev) => Math.min(prev + 1, customEvents.length - 1));
      if (!autoplay) setIsPlaying(false);
    }, getEventDurationMs(currentEventIndex, speed, customEvents));

    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, [autoplay, currentEventIndex, isPlaying, speed, stageState.sceneEnded, mode, customEvents]);

  useEffect(() => {
    if (currentEventIndex >= customEvents.length - 1) setIsPlaying(false);
  }, [currentEventIndex, customEvents.length]);

  const goNext = useCallback(
    () => setCurrentEventIndex((p) => Math.min(p + 1, customEvents.length - 1)),
    [customEvents.length],
  );
  const goPrev = useCallback(() => setCurrentEventIndex((p) => Math.max(p - 1, 0)), []);
  const handleSeek = useCallback((index: number) => setCurrentEventIndex(index), []);

  const handlePlaybackReset = useCallback(() => {
    setCurrentEventIndex(0);
    setIsPlaying(false);
  }, []);

  const toggleRevealCurrentLine = useCallback(() => {
    if (!currentEvent || currentEvent.type !== "line") return;
    setRevealedLineIds((prev) => {
      const next = new Set(prev);
      next.has(currentEvent.id) ? next.delete(currentEvent.id) : next.add(currentEvent.id);
      return next;
    });
  }, [currentEvent]);

  const handleActorDrop = useCallback(
    (actorId: string, stageX: number, stageY: number) => {
      const idx = findLastPositionEvent(customEvents, actorId, currentEventIndex);
      if (idx >= 0) {
        handleUpdateEvent(idx, { x: stageX, y: stageY });
      } else {
        const newEvent: ScriptEvent = {
          id: `custom_move_${actorId}_${Date.now()}`,
          type: "move",
          actorId,
          x: stageX,
          y: stageY,
          duration: 1.0,
        };
        const next = [
          ...customEvents.slice(0, currentEventIndex + 1),
          newEvent,
          ...customEvents.slice(currentEventIndex + 1),
        ];
        updateEvents(next);
      }
    },
    [customEvents, currentEventIndex],
  );

  const handleMoveEvent = useCallback((from: number, to: number) => {
    const arr = [...customEvents];
    const [item] = arr.splice(from, 1);
    arr.splice(to, 0, item);
    updateEvents(arr);
    setCurrentEventIndex(to);
  }, [customEvents]);

  const handleDrawPath = useCallback((eventIndex: number) => {
    const event = customEvents[eventIndex];
    if (!event?.actorId) return;
    setCurrentEventIndex(eventIndex);
    setDrawingPathFor({ eventIndex, actorId: event.actorId });
  }, [customEvents]);

  const handlePathDrawn = useCallback((path: PathPoint[]) => {
    if (!drawingPathFor) return;
    handleUpdateEvent(drawingPathFor.eventIndex, { path });
    setDrawingPathFor(null);
  }, [drawingPathFor]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        e.target instanceof HTMLSelectElement
      ) return;

      if (mode === "director" && (e.metaKey || e.ctrlKey) && e.key === "z") {
        e.preventDefault();
        if (e.shiftKey) redoEvents(); else undoEvents();
        return;
      }
      if (mode === "director" && (e.metaKey || e.ctrlKey) && e.key === "y") {
        e.preventDefault();
        redoEvents();
        return;
      }
      switch (e.key) {
        case " ": e.preventDefault(); if (mode !== "director") setIsPlaying((p) => !p); break;
        case "ArrowRight": goNext(); break;
        case "ArrowLeft": goPrev(); break;
        case "1": setMode("stage"); break;
        case "2": setMode("script"); break;
        case "3": setMode("director"); break;
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goNext, goPrev, mode]);

  const stageActorPositions = useMemo(() => {
    return Object.fromEntries(
      Object.entries(stageState.actors).map(([id, actor]) => [id, { x: actor.x, y: actor.y, visible: actor.visible }]),
    );
  }, [stageState.actors]);

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-[#060912]">
      <header className="flex items-center justify-between px-3 sm:px-5 h-12 border-b border-white/[0.06] shrink-0 bg-[#06090f]/80 backdrop-blur-sm">
        <button
          onClick={() => router.push("/")}
          className="flex items-center gap-1.5 text-sm font-medium tracking-[0.18em] text-[#f1c27d]/70 hover:text-[#f1c27d] transition group"
          title={t("common.backHome")}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="opacity-0 group-hover:opacity-100 transition -mr-0.5">
            <path d="M8 2L4 6l4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          StageCue
        </button>

        <div className="flex items-center gap-0.5 rounded-lg bg-white/[0.05] p-0.5">
          {([
            { id: "stage", label: t("rehearsal.modeStage") },
            { id: "script", label: t("rehearsal.modeScript") },
            { id: "director", label: t("rehearsal.modeDirector") },
          ] as const).map((item) => (
            <button
              key={item.id}
              onClick={() => setMode(item.id)}
              className="px-2 sm:px-3.5 py-1.5 rounded-md text-[11px] sm:text-xs transition font-medium flex items-center gap-1.5"
              style={{
                background: mode === item.id ? "rgba(255,255,255,0.1)" : "transparent",
                color: mode === item.id ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.35)",
              }}
            >
              {item.label}
              {item.id === "director" && isModified && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#f1c27d]/70" />
              )}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          {play.scenes.length > 1 && (
            <select
              value={scene.id}
              onChange={(e) => handleSceneChange(e.target.value)}
              className="hidden sm:block rounded-lg border border-white/10 bg-white/[0.04] px-2 py-1 text-[11px] text-white/60 outline-none"
            >
              {play.scenes.map((item) => (
                <option key={item.id} value={item.id}>
                  {getLocalizedSceneTitle(play, item, locale)}
                </option>
              ))}
            </select>
          )}
          {isObserver ? (
            <span className="hidden sm:inline text-xs font-medium text-white/40">{t("rehearsal.observer")}</span>
          ) : selectedActor ? (
            <span className="hidden sm:inline text-xs font-medium" style={{ color: selectedActor.color }}>
              {selectedActor.name}
            </span>
          ) : null}
          <button
            onClick={() => router.push(`/select-role?scene=${encodeURIComponent(scene.id)}`)}
            className="text-[11px] text-white/25 hover:text-white/55 transition"
          >
            {t("rehearsal.changeRole")}
          </button>
          <LanguageToggle compact />
        </div>
      </header>

      <div className="flex-1 overflow-hidden min-h-0">
        <AnimatePresence mode="wait">
          {mode === "stage" && (
            <motion.div key="stage" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.18 }} className="flex flex-col sm:flex-row h-full">
              <div className="flex-1 flex flex-col p-3 min-w-0 min-h-0">
                <div className="relative flex-1 min-h-0">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative w-full">
                      <StageCanvas
                        stageState={stageState}
                        actors={scene.actors}
                        stageConfig={scene.stage}
                        selectedRoleId={selectedRoleId}
                        currentEvent={currentEvent}
                      />
                      <BlackoutOverlay visible={stageState.blackoutVisible} />
                      <SpeechBubble
                        actors={scene.actors}
                        event={currentEvent}
                        text={currentLineText}
                        actionText={currentActionText}
                        isOwnLine={currentEventIsOwnLine}
                        revealed={currentLineRevealed}
                        onToggleReveal={toggleRevealCurrentLine}
                      />
                      {stageState.sceneEnded && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 flex items-center justify-center rounded-xl bg-black/60">
                          <div className="text-center">
                            <p className="text-[10px] uppercase tracking-[0.5em] text-[#f1c27d]/50 mb-3">{t("rehearsal.sceneComplete")}</p>
                            <h2 className="text-4xl font-light tracking-widest text-white">{t("rehearsal.sceneComplete")}</h2>
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="h-44 sm:h-auto sm:w-64 xl:w-72 border-t sm:border-t-0 sm:border-l border-white/[0.05] flex flex-col min-h-0 shrink-0">
                <div className="px-4 pt-3 pb-1 shrink-0">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-white/20">{t("rehearsal.panelScript")}</p>
                </div>
                <div className="flex-1 min-h-0">
                  <ScriptPanel
                    play={play}
                    sceneId={scene.id}
                    actors={scene.actors}
                    events={customEvents}
                    currentEventIndex={currentEventIndex}
                    selectedRoleId={selectedRoleId}
                    showAllLines={showAllLines}
                    revealedLineIds={revealedLineIds}
                    onSeek={handleSeek}
                    compact
                  />
                </div>
              </div>
            </motion.div>
          )}

          {mode === "script" && (
            <motion.div key="script" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.18 }} className="flex flex-col sm:flex-row h-full">
              <div className="h-auto sm:w-56 xl:w-64 border-b sm:border-b-0 sm:border-r border-white/[0.05] flex flex-col p-3 gap-3 shrink-0">
                <p className="text-[10px] uppercase tracking-[0.3em] text-white/20">{t("rehearsal.panelStage")}</p>
                <div className="relative">
                  <StageCanvas
                    stageState={stageState}
                    actors={scene.actors}
                    stageConfig={scene.stage}
                    selectedRoleId={selectedRoleId}
                    compact
                    currentEvent={currentEvent}
                  />
                  <BlackoutOverlay visible={stageState.blackoutVisible} />
                </div>
                <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] px-3 py-3">
                  <p className="text-[10px] uppercase tracking-[0.25em] text-white/20 mb-1.5">{t("rehearsal.current")}</p>
                  <p className="text-xs text-white/55 leading-5">
                    {currentEvent?.type === "line" && currentActor ? t("rehearsal.currentLine", { name: currentActor.name })
                      : currentEvent?.type === "action" && currentActor ? t("rehearsal.currentAction", { name: currentActor.name })
                      : currentEvent?.type === "action" ? t("event.action")
                      : currentEvent?.type === "enter" && currentActor ? t("rehearsal.currentEnter", { name: currentActor.name })
                      : currentEvent?.type === "exit" && currentActor ? t("rehearsal.currentExit", { name: currentActor.name })
                      : currentEvent?.type === "move" && currentActor ? t("rehearsal.currentMove", { name: currentActor.name })
                      : currentEvent?.type === "move_path" && currentActor ? t("rehearsal.currentMovePath", { name: currentActor.name })
                      : currentEvent?.type === "prop_show" ? t("event.prop_show")
                      : currentEvent?.type === "prop_hide" ? t("event.prop_hide")
                      : currentEvent?.type === "prop_swap" ? t("event.prop_swap")
                      : currentEvent?.type === "blackout_start" ? t("rehearsal.currentBlackout")
                      : currentEvent?.type === "scene_end" ? t("rehearsal.sceneComplete")
                      : t("rehearsal.currentPause")}
                  </p>
                </div>
                <div className="space-y-1.5 mt-auto">
                  {scene.actors.map((actor) => {
                    const actorState = stageState.actors[actor.id];
                    const speaking = actor.id === stageState.activeActorId;
                    return (
                      <div key={actor.id} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: actor.color, opacity: actorState?.visible ? (speaking ? 1 : 0.45) : 0.15 }} />
                        <span className="text-[11px] truncate" style={{ color: speaking ? actor.color : actorState?.visible ? "rgba(255,255,255,0.45)" : "rgba(255,255,255,0.18)" }}>{actor.name}</span>
                        {actor.id === selectedRoleId && <span className="text-[9px] text-[#f1c27d]/40 ml-auto shrink-0">{t("rehearsal.you")}</span>}
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="flex-1 min-w-0 min-h-0 flex flex-col">
                <div className="px-6 pt-3 pb-1 shrink-0">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-white/20">{getLocalizedPlayTitle(play, locale)} — {getLocalizedSceneTitle(play, scene, locale)}{getLocalizedSceneSubtitle(play, scene, locale) ? ` · ${getLocalizedSceneSubtitle(play, scene, locale)}` : ""}</p>
                </div>
                <div className="flex-1 min-h-0">
                  <ScriptPanel
                    play={play}
                    sceneId={scene.id}
                    actors={scene.actors}
                    events={customEvents}
                    currentEventIndex={currentEventIndex}
                    selectedRoleId={selectedRoleId}
                    showAllLines={showAllLines}
                    revealedLineIds={revealedLineIds}
                    onSeek={handleSeek}
                    compact={false}
                  />
                </div>
              </div>
            </motion.div>
          )}

          {mode === "director" && (
            <motion.div key="director" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.18 }} className="flex flex-col sm:flex-row h-full">
              <div className="flex-1 flex flex-col p-3 min-w-0 min-h-0 gap-2">
                {drawingPathFor ? (
                  <div className="flex items-center justify-between px-3 py-1.5 rounded-lg border shrink-0"
                    style={{ background: "rgba(224,164,248,0.07)", borderColor: "rgba(224,164,248,0.25)" }}>
                    <span className="text-[11px]" style={{ color: "#e0a4f8" }}>
                      {t("rehearsal.pathMode")}
                    </span>
                    <button
                      onClick={() => setDrawingPathFor(null)}
                      className="text-[10px] text-white/40 hover:text-white/70 transition px-2 py-0.5 rounded hover:bg-white/10"
                    >{t("common.cancel")}</button>
                  </div>
                ) : (
                  <div className="flex items-center gap-3 px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.05] shrink-0">
                    <span className="text-[11px] text-white/40">{t("rehearsal.dragHint")}</span>
                    <span className="text-[11px] text-white/25">{t("rehearsal.dragHintDetail")}</span>
                    <span className="ml-auto text-[11px] text-white/20 font-mono">
                      {currentEventIndex + 1} / {customEvents.length}
                    </span>
                  </div>
                )}

                <div className="relative flex-1 min-h-0">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <StageCanvas
                      stageState={stageState}
                      actors={scene.actors}
                      stageConfig={scene.stage}
                      selectedRoleId={selectedRoleId}
                      editMode
                      selectedActorId={directorSelectedActor}
                      onActorDrop={handleActorDrop}
                      currentEvent={currentEvent}
                      drawingPathFor={drawingPathFor?.actorId ?? null}
                      onPathDrawn={handlePathDrawn}
                    />
                  </div>
                </div>
              </div>

              <div className="h-64 sm:h-auto sm:w-72 xl:w-80 border-t sm:border-t-0 sm:border-l border-white/[0.05] min-h-0 overflow-y-auto">
                <DirectorPanel
                  actors={scene.actors}
                  events={customEvents}
                  stageProps={getStageProps(scene.stage)}
                  currentEventIndex={currentEventIndex}
                  onSeek={handleSeek}
                  onUpdateEvent={handleUpdateEvent}
                  onInsertEvent={handleInsertEvent}
                  onDeleteEvent={handleDeleteEvent}
                  onReset={handleReset}
                  isModified={isModified}
                  selectedActorId={directorSelectedActor}
                  onSelectActor={setDirectorSelectedActor}
                  stageActors={stageActorPositions}
                  onDrawPath={handleDrawPath}
                  onMoveEvent={handleMoveEvent}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile-only scene switcher — visible when there are multiple scenes and no room in header */}
      {play.scenes.length > 1 && (
        <div className="sm:hidden shrink-0 flex items-center gap-2 px-4 py-1.5 border-t border-white/[0.04] bg-[#060912]/90">
          <span className="text-[10px] uppercase tracking-[0.28em] text-white/25 shrink-0">{t("rehearsal.scene")}</span>
          <select
            value={scene.id}
            onChange={(e) => handleSceneChange(e.target.value)}
            className="flex-1 rounded-lg border border-white/10 bg-white/[0.04] px-2 py-1 text-[11px] text-white/60 outline-none"
          >
            {play.scenes.map((item) => (
              <option key={item.id} value={item.id}>{getLocalizedSceneTitle(play, item, locale)}</option>
            ))}
          </select>
        </div>
      )}

      <PlaybackControls
        currentEventIndex={currentEventIndex}
        totalEvents={customEvents.length}
        isPlaying={isPlaying}
        autoplay={autoplay}
        speed={speed}
        showAllLines={showAllLines}
        events={customEvents}
        onSeek={handleSeek}
        onTogglePlay={() => setIsPlaying((p) => !p)}
        onPrev={goPrev}
        onNext={goNext}
        onReset={handlePlaybackReset}
        onToggleAutoplay={() => setAutoplay((p) => !p)}
        onSpeedChange={setSpeed}
        onToggleShowAllLines={() => setShowAllLines((p) => !p)}
      />
    </div>
  );
}
