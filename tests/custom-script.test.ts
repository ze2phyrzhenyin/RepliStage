import { beforeEach, describe, expect, it } from "vitest";
import {
  findLastPositionEvent,
  hasCustomEvents,
  loadCustomEvents,
  resetCustomEvents,
  saveCustomEvents,
} from "@/lib/customScript";
import type { ScriptEvent } from "@/types/script";
import { installWindowStorageMock } from "./helpers/storage-mock";

const baseEvents: ScriptEvent[] = [
  { id: "e1", type: "enter", actorId: "girl", x: 100, y: 120, fromSide: "left", duration: 1 },
  { id: "e2", type: "move", actorId: "girl", x: 160, y: 180, duration: 1 },
  { id: "e3", type: "line", actorId: "girl", text: "bonjour", duration: 1.5 },
];

describe("customScript", () => {
  beforeEach(() => {
    const storage = installWindowStorageMock();
    storage.localStorage.clear();
  });

  it("stores and loads custom events per scene id", () => {
    const sceneAEvents: ScriptEvent[] = [
      { id: "a1", type: "pause", duration: 1 },
    ];

    saveCustomEvents("scene-a", sceneAEvents);

    expect(hasCustomEvents("scene-a")).toBe(true);
    expect(hasCustomEvents("scene-b")).toBe(false);
    expect(loadCustomEvents("scene-a", baseEvents)).toEqual(sceneAEvents);
    expect(loadCustomEvents("scene-b", baseEvents)).toEqual(baseEvents);
  });

  it("falls back to legacy storage key and migrates on next save", () => {
    const legacyEvents: ScriptEvent[] = [
      { id: "legacy", type: "pause", duration: 2 },
    ];

    window.localStorage.setItem("stagecue_custom_events_v1", JSON.stringify(legacyEvents));

    expect(loadCustomEvents("scene-a", baseEvents)).toEqual(legacyEvents);
    expect(hasCustomEvents("scene-a")).toBe(true);

    saveCustomEvents("scene-a", legacyEvents);
    expect(window.localStorage.getItem("stagecue_custom_events_v1")).toBeNull();
    expect(window.localStorage.getItem("replistage_custom_events_v1:scene-a")).not.toBeNull();
  });

  it("resets only the targeted scene storage key", () => {
    saveCustomEvents("scene-a", [{ id: "a1", type: "pause", duration: 1 }]);
    saveCustomEvents("scene-b", [{ id: "b1", type: "pause", duration: 1 }]);

    resetCustomEvents("scene-a");

    expect(hasCustomEvents("scene-a")).toBe(false);
    expect(hasCustomEvents("scene-b")).toBe(true);
  });

  it("finds the latest position event before an index", () => {
    expect(findLastPositionEvent(baseEvents, "girl", 2)).toBe(1);
    expect(findLastPositionEvent(baseEvents, "girl", 0)).toBe(0);
    expect(findLastPositionEvent(baseEvents, "ghost", 2)).toBe(-1);
  });
});
