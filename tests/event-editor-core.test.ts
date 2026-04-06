import { describe, expect, it } from "vitest";
import {
  EVENT_INSERT_TYPES,
  SIDE_LABELS,
  canDeleteEvent,
  createEvent,
  getEventPreviewText,
  getMoveTypePatch,
} from "@/lib/event-editor-core";
import type { Actor, ScriptEvent } from "@/types/script";

const actors: Actor[] = [
  { id: "belle_mere", name: "继母", color: "#ff8899", shortLabel: "继母" },
  { id: "girl", name: "女孩", color: "#88bbff", shortLabel: "女孩" },
];

describe("event-editor-core", () => {
  it("exposes supported insert types and side labels", () => {
    expect(EVENT_INSERT_TYPES).toEqual(["line", "action", "enter", "exit", "move", "pause"]);
    expect(SIDE_LABELS.top).toBe("上");
  });

  it("creates events with sensible defaults", () => {
    const line = createEvent("line", actors, {
      id: "prev",
      type: "line",
      actorId: "girl",
      text: "上一句",
      duration: 1,
    });
    const enter = createEvent("enter", actors);
    const pause = createEvent("pause", actors);

    expect(line.type).toBe("line");
    expect(line.actorId).toBe("girl");
    expect(line.duration).toBe(3);
    expect(enter).toMatchObject({
      type: "enter",
      actorId: "belle_mere",
      x: 460,
      y: 300,
      fromSide: "left",
    });
    expect(pause).toMatchObject({
      type: "pause",
      duration: 1,
    });
  });

  it("switches move events between point and path mode", () => {
    const move: ScriptEvent = {
      id: "m1",
      type: "move",
      actorId: "girl",
      x: 500,
      y: 320,
      duration: 1,
    };

    expect(getMoveTypePatch(move, "move_path")).toEqual({
      type: "move_path",
      x: undefined,
      y: undefined,
      path: [],
    });

    const movePath: ScriptEvent = {
      id: "m2",
      type: "move_path",
      actorId: "girl",
      path: [{ x: 1, y: 2 }],
      duration: 1,
    };

    expect(getMoveTypePatch(movePath, "move")).toEqual({
      type: "move",
      path: undefined,
      x: 460,
      y: 300,
    });
  });

  it("knows which events are deletable and how to summarize them", () => {
    expect(canDeleteEvent({ id: "a", type: "scene_end", duration: 1 })).toBe(false);
    expect(canDeleteEvent({ id: "b", type: "line", duration: 1, actorId: "girl", text: "你好" })).toBe(true);

    expect(getEventPreviewText({ id: "c", type: "line", duration: 1, actorId: "girl", text: "一段很短的台词" }, actors)).toBe("一段很短的台词");
    expect(getEventPreviewText({ id: "d", type: "move", duration: 1, actorId: "girl", x: 100, y: 200 }, actors)).toBe("→ (100, 200)");
    expect(getEventPreviewText({ id: "e", type: "move_path", duration: 1, actorId: "girl", path: [] }, actors)).toBe("未绘制路径");
  });
});
