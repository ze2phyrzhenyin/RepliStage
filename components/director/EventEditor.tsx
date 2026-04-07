"use client";

import { useRef, useState } from "react";
import { useLocale } from "@/components/locale/LocaleContext";
import type { ScriptDefinition, ScriptEvent } from "@/types/script";
import { eventColor, eventLabel } from "@/lib/eventMeta";
import { canDeleteEvent, getEventPreviewText } from "@/lib/event-editor-core";
import { SharedEventForm } from "@/components/editor/SharedEventForm";
import { SharedInsertBar } from "@/components/editor/SharedInsertBar";

type Props = {
  scene: ScriptDefinition;
  currentEventIndex: number;
  selectedEventIndex: number | null;
  onSeek: (i: number) => void;
  onSelect: (i: number | null) => void;
  onUpdate: (index: number, updates: Partial<ScriptEvent>) => void;
  onDelete: (index: number) => void;
  onInsert: (afterIndex: number, event: ScriptEvent) => void;
  onMove: (from: number, to: number) => void;
  onSelectActor: (id: string | null) => void;
  selectedActorId: string | null;
  onDrawPath?: (index: number) => void;
};

export default function EventEditor({
  scene,
  currentEventIndex,
  selectedEventIndex,
  onSeek,
  onSelect,
  onUpdate,
  onDelete,
  onInsert,
  onMove,
  onSelectActor: _onSelectActor,
  selectedActorId: _selectedActorId,
  onDrawPath,
}: Props) {
  const { locale, t } = useLocale();
  const [showInsertAfter, setShowInsertAfter] = useState<number | null>(null);
  const [dragIdx, setDragIdx] = useState<number | null>(null);
  const [dropIdx, setDropIdx] = useState<number | null>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const { events, actors } = scene;

  function getIndexAtPoint(x: number, y: number): number | null {
    const els = document.elementsFromPoint(x, y);
    for (const el of els) {
      const card = (el as HTMLElement).closest("[data-event-index]");
      if (card) return parseInt((card as HTMLElement).dataset.eventIndex ?? "-1");
    }
    return null;
  }

  function startPointerDrag(e: React.PointerEvent, index: number) {
    e.preventDefault();
    e.stopPropagation();
    listRef.current?.setPointerCapture(e.pointerId);
    setDragIdx(index);
  }

  function handleListPointerMove(e: React.PointerEvent) {
    if (dragIdx === null) return;
    const idx = getIndexAtPoint(e.clientX, e.clientY);
    if (idx !== null && idx !== dragIdx) setDropIdx(idx);
  }

  function handleListPointerUp() {
    if (dragIdx !== null && dropIdx !== null && dragIdx !== dropIdx) {
      onMove(dragIdx, dropIdx);
    }
    setDragIdx(null);
    setDropIdx(null);
  }

  return (
    <div className="flex flex-col h-full">
      <div className="px-3 py-2 border-b border-white/[0.04] bg-white/[0.015]">
        <SharedInsertBar afterIndex={-1} actors={actors} onInsert={onInsert} variant="panel" />
      </div>

      <div
        ref={listRef}
        className="flex-1 overflow-y-auto px-2 py-2"
        style={{ touchAction: dragIdx !== null ? "none" : "auto" }}
        onPointerMove={handleListPointerMove}
        onPointerUp={handleListPointerUp}
        onPointerCancel={() => { setDragIdx(null); setDropIdx(null); }}
      >
        {events.map((event, index) => {
          const isActive = index === currentEventIndex;
          const isSelected = index === selectedEventIndex;
          const isDragging = dragIdx === index;
          const isDropTarget = dropIdx === index && dragIdx !== index;
          const draggable = canDeleteEvent(event);
          const actor = actors.find((item) => item.id === event.actorId);
          const color = eventColor(event.type);
          const label = eventLabel(event.type, locale);

          return (
            <div
              key={event.id}
              data-event-index={index}
              style={{ opacity: isDragging ? 0.35 : 1 }}
            >
              {isDropTarget && (
                <div className="h-0.5 mx-3 rounded-full" style={{ background: "#f1c27d88" }} />
              )}

              <div
                className="flex items-center gap-2 rounded-2xl px-3 py-2 cursor-pointer transition group"
                style={{
                  background: isActive
                    ? "rgba(241,194,125,0.08)"
                    : isSelected
                      ? "rgba(255,255,255,0.04)"
                      : "rgba(255,255,255,0.015)",
                  border: isActive
                    ? "1px solid rgba(241,194,125,0.18)"
                    : isSelected
                      ? "1px solid rgba(255,255,255,0.08)"
                      : "1px solid rgba(255,255,255,0.03)",
                }}
                onClick={() => { onSeek(index); onSelect(index); }}
              >
                {draggable && (
                  <span
                    className="shrink-0 text-white/15 group-hover:text-white/35 transition text-[11px] cursor-grab active:cursor-grabbing select-none"
                    style={{ lineHeight: 1, letterSpacing: "-1px" }}
                    onPointerDown={(e) => startPointerDrag(e, index)}
                  >
                    ⠿
                  </span>
                )}

                <span
                  className="text-[9px] px-1.5 py-0.5 rounded-sm shrink-0"
                  style={{ background: `${color}22`, color, border: `1px solid ${color}44` }}
                >
                  {label}
                </span>

                {actor && (
                  <span className="w-2 h-2 rounded-full shrink-0" style={{ background: actor.color }} />
                )}

                <span className="flex-1 text-xs truncate" style={{ color: "rgba(255,255,255,0.55)" }}>
                  {getEventPreviewText(event, actors, locale)}
                </span>

                <span className="text-[9px] text-white/20 shrink-0">{event.duration}s</span>

                <button
                  onClick={(e) => { e.stopPropagation(); setShowInsertAfter(showInsertAfter === index ? null : index); }}
                  className="hidden group-hover:block text-white/20 hover:text-white/60 transition text-[10px] px-1 shrink-0"
                  title={t("editor.insertAfter")}
                >
                  ＋
                </button>
              </div>

              {isSelected && (
                <SharedEventForm
                  event={event}
                  index={index}
                  actors={actors}
                  onUpdate={(updates) => onUpdate(index, updates)}
                  onDelete={() => onDelete(index)}
                  onDrawPath={onDrawPath}
                  variant="panel"
                />
              )}

              {showInsertAfter === index && (
                <div className="bg-white/[0.02] border-y border-white/[0.06]">
                  <SharedInsertBar
                    afterIndex={index}
                    actors={actors}
                    afterEvent={event}
                    onInsert={onInsert}
                    onClose={() => setShowInsertAfter(null)}
                    variant="panel"
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
