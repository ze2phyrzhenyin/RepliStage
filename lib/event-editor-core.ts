import type { Actor, ScriptEvent } from "@/types/script";
import type { Locale } from "@/lib/i18n";
import { getSideLabel, translate } from "@/lib/i18n";

export const EVENT_INSERT_TYPES: Array<ScriptEvent["type"]> = [
  "line",
  "action",
  "enter",
  "exit",
  "move",
  "pause",
];

export const UNDELETABLE_EVENT_TYPES = new Set<ScriptEvent["type"]>([
  "blackout_start",
  "blackout_end",
  "scene_end",
]);

const DEFAULT_STAGE_X = 460;
const DEFAULT_STAGE_Y = 300;

export const SIDE_LABELS = {
  left: "左",
  right: "右",
  top: "上",
  bottom: "下",
} as const;

function genId(prefix: string) {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
}

export function canDeleteEvent(event: ScriptEvent) {
  return !UNDELETABLE_EVENT_TYPES.has(event.type);
}

export function createEvent(
  type: ScriptEvent["type"],
  actors: Actor[],
  afterEvent?: ScriptEvent,
): ScriptEvent {
  const firstActor = actors[0]?.id;
  const base = { id: genId(type), type, duration: 2.0 };

  switch (type) {
    case "line":
      return { ...base, actorId: afterEvent?.actorId ?? firstActor, text: "", duration: 3.0 };
    case "action":
      return { ...base, actorId: afterEvent?.actorId, text: "", duration: 2.0 };
    case "enter":
      return { ...base, actorId: firstActor, x: DEFAULT_STAGE_X, y: DEFAULT_STAGE_Y, fromSide: "left", duration: 1.0 };
    case "exit":
      return { ...base, actorId: afterEvent?.actorId ?? firstActor, toSide: "right", duration: 0.9 };
    case "move":
      return { ...base, actorId: afterEvent?.actorId ?? firstActor, x: DEFAULT_STAGE_X, y: DEFAULT_STAGE_Y, duration: 0.8 };
    case "move_path":
      return { ...base, actorId: afterEvent?.actorId ?? firstActor, path: [], duration: 2.0 };
    case "pause":
      return { ...base, duration: 1.0 };
    default:
      return base as ScriptEvent;
  }
}

export function getMoveTypePatch(event: ScriptEvent, nextType: "move" | "move_path"): Partial<ScriptEvent> {
  if (nextType === "move_path") {
    return {
      type: "move_path",
      x: undefined,
      y: undefined,
      path: event.path ?? [],
    };
  }

  return {
    type: "move",
    path: undefined,
    x: event.x ?? DEFAULT_STAGE_X,
    y: event.y ?? DEFAULT_STAGE_Y,
  };
}

export function getEventPreviewText(event: ScriptEvent, actors: Actor[], locale: Locale = "zh") {
  const actor = actors.find((item) => item.id === event.actorId);

  if (event.type === "line" || event.type === "action") {
    const text = event.text?.trim();
    if (text) return text.slice(0, 60) + (text.length > 60 ? "…" : "");
  }

  if (event.type === "move" || event.type === "enter") {
    return `→ (${event.x ?? "?"}, ${event.y ?? "?"})`;
  }

  if (event.type === "move_path") {
    return event.path && event.path.length > 0
      ? translate(locale, "editor.pathReady", { count: event.path.length })
      : (locale === "zh" ? "未绘制路径" : translate(locale, "editor.pathEmpty"));
  }

  return actor?.name ?? "";
}

export function getSideOptionLabel(locale: Locale, side: "left" | "right" | "top" | "bottom") {
  return getSideLabel(locale, side);
}
