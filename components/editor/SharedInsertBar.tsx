"use client";

import { useLocale } from "@/components/locale/LocaleContext";
import { eventColor, eventLabel } from "@/lib/eventMeta";
import { createEvent, EVENT_INSERT_TYPES } from "@/lib/event-editor-core";
import type { Actor, ScriptEvent } from "@/types/script";

type Props = {
  afterIndex: number;
  actors: Actor[];
  afterEvent?: ScriptEvent;
  onInsert: (afterIndex: number, event: ScriptEvent) => void;
  onClose?: () => void;
  variant?: "panel" | "compact";
};

export function SharedInsertBar({
  afterIndex,
  actors,
  afterEvent,
  onInsert,
  onClose,
  variant = "panel",
}: Props) {
  const { locale } = useLocale();

  return (
    <div className={variant === "panel" ? "flex gap-1 flex-wrap px-3 py-1.5" : "flex gap-1.5"}>
      {EVENT_INSERT_TYPES.map((type) => (
        <button
          key={type}
          onClick={() => {
            onInsert(afterIndex, createEvent(type, actors, afterEvent));
            onClose?.();
          }}
          className={variant === "panel"
            ? "px-2 py-0.5 rounded text-[10px] transition hover:opacity-90"
            : "flex-1 rounded-lg border border-white/10 bg-white/[0.04] py-1.5 text-xs text-white/55 hover:bg-white/[0.08] hover:text-white/80 transition"}
          style={variant === "panel"
            ? {
                background: `${eventColor(type)}22`,
                color: eventColor(type),
                border: `1px solid ${eventColor(type)}44`,
              }
            : undefined}
        >
          + {eventLabel(type, locale)}
        </button>
      ))}
    </div>
  );
}
