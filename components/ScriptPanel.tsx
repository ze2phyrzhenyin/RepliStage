"use client";

import { forwardRef, useEffect, useRef } from "react";
import { useLocale } from "@/components/locale/LocaleContext";
import { Actor, ScriptEvent } from "@/types/script";
import { getActorById } from "@/lib/player";
import { getLocalizedEventText } from "@/lib/sample-text";
import type { Play } from "@/types/script";

type ScriptPanelProps = {
  play: Play;
  sceneId: string;
  actors: Actor[];
  events: ScriptEvent[];
  currentEventIndex: number;
  selectedRoleId: string | null;
  showAllLines: boolean;
  revealedLineIds: Set<string>;
  onSeek: (index: number) => void;
  compact?: boolean;
};

// ─── individual event renderers ─────────────────────────────

type EntryProps = {
  play: Play;
  sceneId: string;
  event: ScriptEvent;
  actors: Actor[];
  index: number;
  isCurrent: boolean;
  isPast: boolean;
  selectedRoleId: string | null;
  showAllLines: boolean;
  revealedLineIds: Set<string>;
  onClick: () => void;
  compact: boolean;
  t: (key: string, vars?: Record<string, string | number>) => string;
};

const ScriptEntry = forwardRef<HTMLDivElement, EntryProps>(function ScriptEntry(
  { play, sceneId, event, actors, isCurrent, isPast, selectedRoleId, showAllLines, revealedLineIds, onClick, compact, t },
  ref,
) {
  const { locale } = useLocale();
  const actor = event.actorId ? getActorById(actors, event.actorId) : null;
  const scene = play.scenes.find((item) => item.id === sceneId);
  const localizedText = scene ? getLocalizedEventText(play, scene, event, locale) : (event.text ?? null);

  // Dividers
  if (event.type === "blackout_start" || event.type === "blackout_end") {
    return (
      <div ref={ref} className="flex items-center gap-2 py-3 px-3 opacity-30">
        <div className="flex-1 h-px bg-white/15" />
        <span className="text-[9px] uppercase tracking-[0.3em] text-white/30">
          {event.type === "blackout_start" ? t("script.blackout") : t("script.lightsUp")}
        </span>
        <div className="flex-1 h-px bg-white/15" />
      </div>
    );
  }

  if (event.type === "scene_end") {
    return (
      <div ref={ref} className="flex items-center gap-3 py-4 px-3">
        <div className="flex-1 h-px bg-[#f1c27d]/15" />
        <span className="text-[10px] uppercase tracking-[0.35em] text-[#f1c27d]/40">{t("script.sceneEnd")}</span>
        <div className="flex-1 h-px bg-[#f1c27d]/15" />
      </div>
    );
  }

  if (event.type === "pause") return null;

  // Move events — small, subdued stage direction
  if (event.type === "move" || event.type === "move_path") {
    return (
      <div
        ref={ref}
        onClick={onClick}
        className="px-3 py-0.5 cursor-pointer"
        style={{ opacity: isPast ? 0.15 : isCurrent ? 0.55 : 0.28 }}
      >
        <span className="text-[10px] text-white/40">
          {actor?.name ?? "—"} {event.type === "move_path" ? t("script.movePath") : t("script.move")}
        </span>
      </div>
    );
  }

  // Enter / exit — tiny, subdued
  if (event.type === "enter" || event.type === "exit") {
    return (
      <div
        ref={ref}
        onClick={onClick}
        className="px-3 py-0.5 cursor-pointer"
        style={{ opacity: isPast ? 0.2 : isCurrent ? 0.6 : 0.35 }}
      >
        <span className="text-[10px] text-white/40">
          {actor?.name ?? "—"} {event.type === "enter" ? t("script.enter") : t("script.exit")}
        </span>
      </div>
    );
  }

  // Action
  if (event.type === "action") {
    return (
      <div
        ref={ref}
        onClick={onClick}
        className="cursor-pointer px-3 py-1 rounded-lg transition-colors hover:bg-white/[0.03]"
        style={{
          opacity: isPast ? 0.3 : 1,
          background: isCurrent ? "rgba(255,255,255,0.04)" : undefined,
        }}
      >
        <span
          className="text-xs italic leading-5"
          style={{ color: isCurrent ? "rgba(255,255,255,0.55)" : "rgba(255,255,255,0.28)" }}
        >
          {actor ? `${actor.name}：` : ""}（{localizedText}）
        </span>
      </div>
    );
  }

  // Line — most prominent
  if (event.type === "line") {
    const isOwnLine = event.actorId === selectedRoleId;
    const lineText =
      showAllLines || !isOwnLine || revealedLineIds.has(event.id)
        ? localizedText
        : t("script.hiddenPrompt");
    const isHidden = isOwnLine && !showAllLines && !revealedLineIds.has(event.id);

    return (
      <div
        ref={ref}
        onClick={onClick}
        className="cursor-pointer rounded-lg px-3 py-2 transition-colors hover:bg-white/[0.04] group"
        style={{
          opacity: isPast ? 0.38 : 1,
          background: isCurrent ? "rgba(255,255,255,0.06)" : undefined,
          borderLeft: isCurrent ? `2px solid ${actor?.color ?? "#f1c27d"}` : "2px solid transparent",
          marginLeft: "-2px",
        }}
      >
        {!compact && (
          <span
            className="text-[10px] font-semibold uppercase tracking-wider mr-2"
            style={{ color: actor?.color ?? "#aaa" }}
          >
            {actor?.name ?? "—"}
          </span>
        )}
        <span
          className={compact ? "text-xs" : "text-sm"}
          style={{
            color: isHidden
              ? "#f1c27d"
              : isCurrent
                ? "rgba(255,255,255,0.92)"
                : "rgba(255,255,255,0.72)",
          }}
        >
          {compact && actor ? (
            <span style={{ color: actor.color }} className="text-[10px] font-medium mr-1.5">
              {actor.shortLabel}
            </span>
          ) : null}
          {isHidden ? t("script.hiddenCompact") : lineText}
        </span>
      </div>
    );
  }

  return null;
});

// ─── main panel ────────────────────────────────────────────

export function ScriptPanel({
  play,
  sceneId,
  actors,
  events,
  currentEventIndex,
  selectedRoleId,
  showAllLines,
  revealedLineIds,
  onSeek,
  compact = false,
}: ScriptPanelProps) {
  const { t } = useLocale();
  const containerRef = useRef<HTMLDivElement>(null);
  const currentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    currentRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [currentEventIndex]);

  return (
    <div
      ref={containerRef}
      className="h-full overflow-y-auto scrollbar-thin py-4 space-y-0"
      style={{ paddingLeft: compact ? "8px" : "12px", paddingRight: compact ? "8px" : "12px" }}
    >
      {events.map((event, index) => (
        <ScriptEntry
          key={event.id}
          ref={index === currentEventIndex ? currentRef : undefined}
          play={play}
          sceneId={sceneId}
          event={event}
          actors={actors}
          index={index}
          isCurrent={index === currentEventIndex}
          isPast={index < currentEventIndex}
          selectedRoleId={selectedRoleId}
          showAllLines={showAllLines}
          revealedLineIds={revealedLineIds}
          onClick={() => onSeek(index)}
          compact={compact}
          t={t}
        />
      ))}
      {/* Bottom padding so last items scroll to center */}
      <div className="h-32" />
    </div>
  );
}
