"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale } from "@/components/locale/LocaleContext";
import { Actor, ScriptEvent } from "@/types/script";
import { getActorById } from "@/lib/player";
import { eventColor, eventLabel as evtLabel } from "@/lib/eventMeta";
import { canDeleteEvent, getEventPreviewText } from "@/lib/event-editor-core";
import { SharedEventForm } from "@/components/editor/SharedEventForm";
import { SharedInsertBar } from "@/components/editor/SharedInsertBar";

type DirectorPanelProps = {
  events: ScriptEvent[];
  actors: Actor[];
  currentEventIndex: number;
  onSeek: (index: number) => void;
  onUpdateEvent: (index: number, updates: Partial<ScriptEvent>) => void;
  onInsertEvent: (afterIndex: number, event: ScriptEvent) => void;
  onDeleteEvent: (index: number) => void;
  onReset: () => void;
  isModified: boolean;
  selectedActorId: string | null;
  onSelectActor: (id: string | null) => void;
  stageActors: Record<string, { x: number; y: number; visible: boolean }>;
  onDrawPath?: (eventIndex: number) => void;
  onMoveEvent: (from: number, to: number) => void;
};

function getEventMeta(event: ScriptEvent, locale: "zh" | "fr") {
  return { label: evtLabel(event.type, locale), color: eventColor(event.type) };
}

function EventCard({
  event,
  index,
  isCurrent,
  isPast,
  actors,
  onSeek,
  onUpdate,
  onDelete,
  onDrawPath,
}: {
  event: ScriptEvent;
  index: number;
  isCurrent: boolean;
  isPast: boolean;
  actors: Actor[];
  onSeek: () => void;
  onUpdate: (updates: Partial<ScriptEvent>) => void;
  onDelete: () => void;
  onDrawPath?: (index: number) => void;
}) {
  const { locale } = useLocale();
  const [expanded, setExpanded] = useState(false);
  const actor = event.actorId ? getActorById(actors, event.actorId) : null;
  const { label, color } = getEventMeta(event, locale);

  useEffect(() => {
    if (isCurrent) setExpanded(true);
  }, [isCurrent]);

  return (
    <div
      className="rounded-xl overflow-hidden transition-all"
      style={{
        border: isCurrent
          ? "1px solid rgba(255,255,255,0.14)"
          : "1px solid rgba(255,255,255,0.05)",
        background: isCurrent ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.02)",
        opacity: isPast ? 0.45 : 1,
      }}
    >
      <div
        className="flex items-center gap-2 px-3 py-2 cursor-pointer"
        onClick={() => { onSeek(); setExpanded((prev) => !prev); }}
      >
        <span
          className="text-[10px] font-semibold uppercase tracking-wide rounded px-1.5 py-0.5"
          style={{ color, background: `${color}18` }}
        >
          {label}
        </span>
          {actor && (
            <span className="text-[11px] font-medium" style={{ color: actor.color }}>
              {actor.name}
            </span>
          )}
        <span className="flex-1 text-[11px] text-white/35 truncate">
          {getEventPreviewText(event, actors, locale)}
        </span>
        <span className="text-[10px] text-white/20 shrink-0">{index + 1}</span>
        <span
          className="text-[11px] text-white/25 ml-1"
          style={{ transform: expanded ? "rotate(180deg)" : "none", display: "inline-block", transition: "transform 0.15s" }}
        >
          ▾
        </span>
      </div>

      {expanded && (
        <SharedEventForm
          event={event}
          index={index}
          actors={actors}
          onUpdate={onUpdate}
          onDelete={onDelete}
          onDrawPath={onDrawPath}
          variant="compact"
        />
      )}
    </div>
  );
}

export function DirectorPanel({
  events,
  actors,
  currentEventIndex,
  onSeek,
  onUpdateEvent,
  onInsertEvent,
  onDeleteEvent,
  onReset,
  isModified,
  selectedActorId,
  onSelectActor,
  stageActors,
  onDrawPath,
  onMoveEvent,
}: DirectorPanelProps) {
  const { t } = useLocale();
  const currentRef = useRef<HTMLDivElement>(null);
  const [dragIdx, setDragIdx] = useState<number | null>(null);
  const [dropIdx, setDropIdx] = useState<number | null>(null);

  useEffect(() => {
    currentRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [currentEventIndex]);

  const windowStart = Math.max(0, currentEventIndex - 6);
  const windowEnd = Math.min(events.length - 1, currentEventIndex + 12);
  const visibleEvents = events.slice(windowStart, windowEnd + 1);

  return (
    <div className="h-full flex flex-col overflow-hidden">
      <div className="px-4 pt-3 pb-2 border-b border-white/[0.06] shrink-0">
        <div className="flex items-center justify-between mb-2">
          <p className="text-[10px] uppercase tracking-[0.3em] text-white/25">{t("director.panel")}</p>
          <div className="flex items-center gap-2">
            {isModified && (
              <span className="text-[10px] text-[#f1c27d]/60 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#f1c27d]/60" />
                {t("director.modified")}
              </span>
            )}
            <button
              onClick={onReset}
              className="text-[11px] text-white/30 hover:text-white/65 transition border border-white/10 hover:border-white/25 rounded px-2.5 py-1"
            >
              {t("director.resetDefault")}
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-1">
          {actors.map((actor) => {
            const state = stageActors[actor.id];
            return (
              <button
                key={actor.id}
                onClick={() => onSelectActor(selectedActorId === actor.id ? null : actor.id)}
                className="flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] transition border"
                style={{
                  borderColor: selectedActorId === actor.id ? actor.color : "rgba(255,255,255,0.08)",
                  background: selectedActorId === actor.id ? `${actor.color}18` : "transparent",
                  color: state?.visible ? actor.color : "rgba(255,255,255,0.22)",
                  opacity: state?.visible ? 1 : 0.5,
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: actor.color }} />
                {actor.shortLabel}
              </button>
            );
          })}
        </div>
      </div>

      {selectedActorId && stageActors[selectedActorId]?.visible && (
        <div className="px-4 py-2 bg-white/[0.03] border-b border-white/[0.06] shrink-0">
          <p className="text-[10px] text-white/40">
            {t("director.position", { name: getActorById(actors, selectedActorId)?.name ?? "" })}
            <span className="text-white/65 ml-1 font-mono">
              ({Math.round(stageActors[selectedActorId].x)}, {Math.round(stageActors[selectedActorId].y)})
            </span>
            <span className="ml-2 text-white/25">{t("director.dragStageHint")}</span>
          </p>
        </div>
      )}

      <div className="flex-1 overflow-y-auto scrollbar-thin px-3 py-2 space-y-1.5 min-h-0">
        {windowStart > 0 && (
          <button
            onClick={() => onSeek(Math.max(0, windowStart - 1))}
            className="w-full text-center text-[10px] text-white/20 py-1 hover:text-white/40"
          >
            {t("director.earlierEvents", { count: windowStart })}
          </button>
        )}

        {visibleEvents.map((event, i) => {
          const index = windowStart + i;
          const isDragging = dragIdx === index;
          const isDropTarget = dropIdx === index && dragIdx !== index;
          const draggable = canDeleteEvent(event);

          return (
            <div
              ref={index === currentEventIndex ? currentRef : undefined}
              key={event.id}
              draggable={draggable}
              onDragStart={(e) => { e.stopPropagation(); setDragIdx(index); }}
              onDragOver={(e) => { e.preventDefault(); setDropIdx(index); }}
              onDrop={(e) => {
                e.preventDefault();
                if (dragIdx !== null && dragIdx !== index) onMoveEvent(dragIdx, index);
                setDragIdx(null);
                setDropIdx(null);
              }}
              onDragEnd={() => { setDragIdx(null); setDropIdx(null); }}
              style={{ opacity: isDragging ? 0.35 : 1 }}
            >
              {isDropTarget && (
                <div className="h-0.5 rounded-full mb-1" style={{ background: "#f1c27d66" }} />
              )}
              <EventCard
                event={event}
                index={index}
                isCurrent={index === currentEventIndex}
                isPast={index < currentEventIndex}
                actors={actors}
                onSeek={() => onSeek(index)}
                onUpdate={(updates) => onUpdateEvent(index, updates)}
                onDelete={() => onDeleteEvent(index)}
                onDrawPath={onDrawPath}
              />
            </div>
          );
        })}

        {windowEnd < events.length - 1 && (
          <button
            onClick={() => onSeek(Math.min(events.length - 1, windowEnd + 1))}
            className="w-full text-center text-[10px] text-white/20 py-1 hover:text-white/40"
          >
            {t("director.laterEvents", { count: events.length - 1 - windowEnd })}
          </button>
        )}
      </div>

      <div className="shrink-0 border-t border-white/[0.06] px-3 py-3 space-y-2">
        <p className="text-[10px] text-white/25 mb-1">{t("director.insertAfterCurrent")}</p>
        <SharedInsertBar
          afterIndex={currentEventIndex}
          actors={actors}
          afterEvent={events[currentEventIndex]}
          onInsert={onInsertEvent}
          variant="compact"
        />
      </div>
    </div>
  );
}
