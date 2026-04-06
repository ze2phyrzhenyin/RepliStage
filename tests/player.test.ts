import { describe, expect, it } from "vitest";
import {
  deriveStageState,
  getEventDurationMs,
  getVisibleLineText,
  isOwnLine,
} from "@/lib/player";
import type { ScriptDefinition, ScriptEvent } from "@/types/script";

function makeScene(events: ScriptEvent[]): ScriptDefinition {
  return {
    id: "scene-1",
    title: "第一场",
    subtitle: "",
    setting: "测试场景",
    actors: [
      { id: "belle_mere", name: "继母", color: "#ff8899", shortLabel: "继母" },
      { id: "girl", name: "女孩", color: "#88bbff", shortLabel: "女孩" },
      { id: "roi", name: "国王", color: "#ffd166", shortLabel: "国王" },
      { id: "garde_1", name: "守卫一", color: "#9ad1ff", shortLabel: "卫一" },
      { id: "garde_2", name: "守卫二", color: "#9ad1ff", shortLabel: "卫二" },
    ],
    stage: {
      width: 920,
      height: 520,
      doorX: 160,
      doorY: 98,
      chairX: 460,
      chairY: 348,
    },
    events,
  };
}

describe("player", () => {
  it("derives actor state across enter, move_path and exit", () => {
    const scene = makeScene([
      { id: "e1", type: "enter", actorId: "girl", x: 280, y: 260, fromSide: "left", duration: 1 },
      { id: "e2", type: "move_path", actorId: "girl", path: [{ x: 300, y: 270 }, { x: 430, y: 290 }], duration: 1.5 },
      { id: "e3", type: "exit", actorId: "girl", toSide: "right", duration: 1 },
      { id: "e4", type: "scene_end", duration: 1 },
    ]);

    const afterMove = deriveStageState(scene, 1, scene.events);
    expect(afterMove.actors.girl.visible).toBe(true);
    expect(afterMove.actors.girl.x).toBe(430);
    expect(afterMove.actors.girl.y).toBe(290);
    expect(afterMove.actors.girl.facing).toBe("right");

    const afterExit = deriveStageState(scene, 2, scene.events);
    expect(afterExit.actors.girl.exiting).toBe(true);
    expect(afterExit.actors.girl.animationState).toBe("exit");
    expect(afterExit.actors.girl.x).toBe(scene.stage.width + 90);
    expect(afterExit.activeActorId).toBe("girl");
  });

  it("marks scene end and clears active text", () => {
    const scene = makeScene([
      { id: "e1", type: "enter", actorId: "belle_mere", x: 280, y: 260, fromSide: "left", duration: 1 },
      { id: "e2", type: "line", actorId: "belle_mere", text: "准备好了。", duration: 2 },
      { id: "e3", type: "scene_end", duration: 1 },
    ]);

    const state = deriveStageState(scene, 2, scene.events);
    expect(state.sceneEnded).toBe(true);
    expect(state.currentLineText).toBeNull();
    expect(state.activeActorId).toBeNull();
  });

  it("hides own line unless fully revealed", () => {
    const event: ScriptEvent = {
      id: "line-1",
      type: "line",
      actorId: "belle_mere",
      text: "这是我的台词。",
      duration: 2,
    };

    expect(isOwnLine(event, "belle_mere")).toBe(true);
    expect(getVisibleLineText(event, "belle_mere", false, new Set())).toBe("轮到你了");
    expect(getVisibleLineText(event, "belle_mere", true, new Set())).toBe("这是我的台词。");
    expect(getVisibleLineText(event, "belle_mere", false, new Set(["line-1"]))).toBe("这是我的台词。");
  });

  it("computes event duration using playback speed", () => {
    const events: ScriptEvent[] = [
      { id: "e1", type: "pause", duration: 2 },
    ];

    expect(getEventDurationMs(0, 1, events)).toBe(2000);
    expect(getEventDurationMs(0, 2, events)).toBe(1000);
  });

  it("tracks blackout and pause correctly", () => {
    const scene = makeScene([
      { id: "e1", type: "blackout_start", duration: 1 },
      { id: "e2", type: "blackout_end", duration: 1 },
      { id: "e3", type: "pause", duration: 1.5 },
    ]);

    expect(deriveStageState(scene, 0, scene.events).blackoutVisible).toBe(true);
    const afterPause = deriveStageState(scene, 2, scene.events);
    expect(afterPause.blackoutVisible).toBe(false);
    expect(afterPause.activeActorId).toBeNull();
    expect(afterPause.currentActionText).toBeNull();
    expect(afterPause.currentLineText).toBeNull();
  });

  it("updates facing based on move direction", () => {
    const scene = makeScene([
      { id: "e1", type: "enter", actorId: "girl", x: 400, y: 260, fromSide: "left", duration: 1 },
      { id: "e2", type: "move", actorId: "girl", x: 320, y: 260, duration: 1 },
    ]);

    const state = deriveStageState(scene, 1, scene.events);
    expect(state.actors.girl.facing).toBe("left");
  });

  it("infers belle_mere pose changes from line and action text", () => {
    const scene = makeScene([
      { id: "e1", type: "enter", actorId: "belle_mere", x: 300, y: 320, fromSide: "left", duration: 1 },
      { id: "e2", type: "line", actorId: "belle_mere", text: "缓缓坐在椅子上", duration: 2 },
      { id: "e3", type: "action", actorId: "belle_mere", text: "从椅子上站起来", duration: 2 },
    ]);

    const sitting = deriveStageState(scene, 1, scene.events);
    expect(sitting.actors.belle_mere.pose).toBe("sit");

    const standing = deriveStageState(scene, 2, scene.events);
    expect(standing.actors.belle_mere.pose).toBe("stand");
  });
});
