import { ScriptEvent } from "@/types/script";
import { canDeleteEvent } from "@/lib/event-editor-core";

const STORAGE_KEY = "replistage_custom_events_v1";
const LEGACY_STORAGE_KEY = "stagecue_custom_events_v1";

function getStorageKey(sceneId: string) {
  return `${STORAGE_KEY}:${sceneId}`;
}

export function loadCustomEvents(sceneId: string, baseEvents: ScriptEvent[]): ScriptEvent[] {
  if (typeof window === "undefined") return baseEvents;
  try {
    const raw =
      localStorage.getItem(getStorageKey(sceneId)) ??
      localStorage.getItem(`${LEGACY_STORAGE_KEY}:${sceneId}`) ??
      localStorage.getItem(STORAGE_KEY) ??
      localStorage.getItem(LEGACY_STORAGE_KEY);
    if (!raw) return baseEvents;
    const parsed = JSON.parse(raw) as ScriptEvent[];
    if (!Array.isArray(parsed) || parsed.length === 0) return baseEvents;
    return parsed;
  } catch {
    return baseEvents;
  }
}

export function saveCustomEvents(sceneId: string, events: ScriptEvent[]): void {
  try {
    localStorage.setItem(getStorageKey(sceneId), JSON.stringify(events));
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(LEGACY_STORAGE_KEY);
  } catch {
    // quota exceeded — ignore
  }
}

export function resetCustomEvents(sceneId: string): void {
  localStorage.removeItem(getStorageKey(sceneId));
  localStorage.removeItem(`${LEGACY_STORAGE_KEY}:${sceneId}`);
  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem(LEGACY_STORAGE_KEY);
}

export function hasCustomEvents(sceneId: string): boolean {
  if (typeof window === "undefined") return false;
  return Boolean(
    localStorage.getItem(getStorageKey(sceneId)) ??
      localStorage.getItem(`${LEGACY_STORAGE_KEY}:${sceneId}`) ??
      localStorage.getItem(STORAGE_KEY) ??
      localStorage.getItem(LEGACY_STORAGE_KEY),
  );
}

/** Find the last enter/move/move_path event for actorId at or before index */
export function findLastPositionEvent(
  events: ScriptEvent[],
  actorId: string,
  upToIndex: number,
): number {
  for (let i = Math.min(upToIndex, events.length - 1); i >= 0; i--) {
    const e = events[i];
    if ((e.type === "move" || e.type === "move_path" || e.type === "enter") && e.actorId === actorId) {
      return i;
    }
  }
  return -1;
}
