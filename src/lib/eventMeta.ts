import type { ScriptEvent } from "@/types/script";
import type { Locale } from "@/lib/i18n";
import { getEventLabel } from "@/lib/i18n";

export const EVENT_COLORS: Record<ScriptEvent["type"], string> = {
  line:          "#f1c27d",
  action:        "#9dd5ff",
  enter:         "#7fd1b9",
  exit:          "#f08c78",
  move:          "#b8a4f0",
  move_path:     "#e0a4f8",
  prop_show:     "#7fd1b9",
  prop_hide:     "#f0a578",
  prop_swap:     "#ffd36f",
  pause:         "#555555",
  blackout_start:"#444444",
  blackout_end:  "#444444",
  scene_end:     "#f1c27d88",
};

export function eventColor(type: ScriptEvent["type"]) {
  return EVENT_COLORS[type] ?? "#888888";
}

export function eventLabel(type: ScriptEvent["type"], locale: Locale = "zh") {
  return getEventLabel(locale, type);
}
