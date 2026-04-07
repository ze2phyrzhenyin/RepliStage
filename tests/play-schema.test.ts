import { describe, expect, it } from "vitest";
import { formatPlayImportError, parsePlay } from "@/lib/play-schema";
import type { Play } from "@/types/script";

function makeValidPlay(): Play {
  return {
    id: "cendrillon",
    title: "Cendrillon",
    scenes: [
      {
        id: "scene-1",
        title: "第一场",
        subtitle: "开场",
        setting: "客厅",
        actors: [
          { id: "mother", name: "继母", color: "#ff8899", shortLabel: "继母" },
          { id: "girl", name: "女孩", color: "#88bbff", shortLabel: "女孩" },
        ],
        stage: {
          width: 920,
          height: 520,
          doorX: 160,
          doorY: 98,
          chairX: 460,
          chairY: 348,
        },
        events: [
          { id: "e1", type: "blackout_start", duration: 1 },
          { id: "e2", type: "blackout_end", duration: 1 },
          { id: "e3", type: "enter", actorId: "mother", x: 320, y: 280, fromSide: "left", duration: 1 },
          { id: "e4", type: "line", actorId: "mother", text: "你好。", duration: 2 },
          { id: "e5", type: "scene_end", duration: 1 },
        ],
      },
    ],
  };
}

describe("play-schema", () => {
  it("parses a valid play", () => {
    const play = makeValidPlay();
    expect(parsePlay(play)).toEqual(play);
  });

  it("rejects events that reference unknown actors with readable errors", () => {
    const play = makeValidPlay();
    play.scenes[0].events[3] = {
      id: "e4",
      type: "line",
      actorId: "ghost",
      text: "我不存在。",
      duration: 2,
    };

    try {
      parsePlay(play);
      throw new Error("expected parsePlay to throw");
    } catch (error) {
      const messages = formatPlayImportError(error);
      expect(messages[0]).toContain("场次 1");
      expect(messages[0]).toContain("事件 4");
      expect(messages[0]).toContain("actorId");
      expect(messages[0]).toContain("ghost");
    }
  });

  it("rejects move_path events without path nodes", () => {
    const play = makeValidPlay();
    play.scenes[0].events[3] = {
      id: "e4",
      type: "move_path",
      actorId: "mother",
      path: [],
      duration: 2,
    };

    expect(() => parsePlay(play)).toThrow(/move_path/);
  });

  it("rejects scenes without scene_end", () => {
    const play = makeValidPlay();
    play.scenes[0].events = play.scenes[0].events.filter((event) => event.type !== "scene_end");

    expect(() => parsePlay(play)).toThrow(/scene_end/);
  });

  it("rejects duplicate role ids inside a scene", () => {
    const play = makeValidPlay();
    play.scenes[0].actors.push({
      id: "mother",
      name: "重复角色",
      color: "#000000",
      shortLabel: "重复",
    });

    try {
      parsePlay(play);
      throw new Error("expected parsePlay to throw");
    } catch (error) {
      expect(formatPlayImportError(error).join("\n")).toContain('角色 ID "mother" 重复');
    }
  });

  it("rejects duplicate scene ids across the play", () => {
    const play = makeValidPlay();
    play.scenes.push({
      ...play.scenes[0],
      title: "第二场",
    });

    try {
      parsePlay(play);
      throw new Error("expected parsePlay to throw");
    } catch (error) {
      expect(formatPlayImportError(error).join("\n")).toContain('场次 ID "scene-1" 重复');
    }
  });

  it("parses stage props without legacy door fields", () => {
    const play = makeValidPlay();
    play.scenes[0].stage = {
      width: 920,
      height: 520,
      props: [
        { id: "door", kind: "door", x: 180, y: 110, locked: true, layerOrder: 1 },
        { id: "chair", kind: "chair", x: 470, y: 350, layerOrder: 2 },
      ],
    };

    expect(parsePlay(play)).toEqual(play);
  });

  it("rejects duplicate prop kinds in a scene", () => {
    const play = makeValidPlay();
    play.scenes[0].stage.props = [
      { id: "door-a", kind: "door", x: 160, y: 98 },
      { id: "door-b", kind: "door", x: 220, y: 98 },
    ];

    expect(parsePlay(play)).toEqual(play);
  });

  it("allows scenes without an explicit door prop", () => {
    const play = makeValidPlay();
    play.scenes[0].stage = {
      width: 920,
      height: 520,
      props: [{ id: "chair", kind: "chair", x: 460, y: 348 }],
    };

    expect(parsePlay(play)).toEqual(play);
  });

  it("rejects duplicate prop ids in a scene", () => {
    const play = makeValidPlay();
    play.scenes[0].stage.props = [
      { id: "prop-1", kind: "door", x: 160, y: 98 },
      { id: "prop-1", kind: "chair", x: 460, y: 348 },
    ];

    expect(() => parsePlay(play)).toThrow(/道具 ID/);
  });

  it("rejects prop events that point to missing props", () => {
    const play = makeValidPlay();
    play.scenes[0].stage.props = [{ id: "chair-a", kind: "chair", x: 460, y: 348 }];
    play.scenes[0].events[3] = {
      id: "e4",
      type: "prop_show",
      propId: "missing-prop",
      propKind: "shoe",
      text: "鞋子掉了下来。",
      duration: 1,
    };

    expect(() => parsePlay(play)).toThrow(/不存在道具 ID/);
  });

  it("rejects prop_swap events without nextPropKind", () => {
    const play = makeValidPlay();
    play.scenes[0].stage.props = [{ id: "plate-a", kind: "porcelain_plate", x: 460, y: 348 }];
    play.scenes[0].events[3] = {
      id: "e4",
      type: "prop_swap",
      propId: "plate-a",
      propKind: "porcelain_plate",
      text: "盘子被摔碎。",
      duration: 1,
    };

    expect(() => parsePlay(play)).toThrow(/nextPropKind/);
  });
});
