import { beforeEach, describe, expect, it } from "vitest";
import { act, create } from "react-test-renderer";
import { PlayProvider, usePlayData } from "@/components/play/PlayContext";
import { defaultPlay } from "@/lib/demo-script";
import { installWindowStorageMock } from "@/tests/helpers/storage-mock";

function Harness() {
  const { play, setPlay, resetPlay, exportPlayToText, usingDefaultPlay } = usePlayData();

  return (
    <div>
      <span id="title">{play.title}</span>
      <span id="scene-id">{play.scenes[0].id}</span>
      <span id="using-default">{String(usingDefaultPlay)}</span>
      <button
        onClick={() => setPlay({
          ...play,
          title: "Modified Play",
        })}
      >
        set-play
      </button>
      <button onClick={resetPlay}>reset-play</button>
      <button
        onClick={() => {
          (globalThis as { __lastExportedPlay?: string }).__lastExportedPlay = exportPlayToText();
        }}
      >
        export-play
      </button>
    </div>
  );
}

describe("PlayContext", () => {
  beforeEach(() => {
    const storage = installWindowStorageMock();
    storage.localStorage.clear();
    delete (globalThis as { __lastExportedPlay?: string }).__lastExportedPlay;
  });

  it("loads from legacy unwrapped play storage and rewrites with versioned shape", async () => {
    const legacyPlay = {
      ...defaultPlay,
      title: "Legacy Title",
    };
    window.localStorage.setItem("stagecue_current_play_v1", JSON.stringify(legacyPlay));

    let renderer: ReturnType<typeof create>;
    await act(async () => {
      renderer = create(
        <PlayProvider>
          <Harness />
        </PlayProvider>,
      );
    });

    expect(renderer!.root.findByProps({ id: "title" }).children.join("")).toBe("Legacy Title");
    const persisted = JSON.parse(window.localStorage.getItem("replistage_current_play_v1") ?? "{}");
    expect(persisted.version).toBe(3);
    expect(persisted.play.title).toBe("Legacy Title");
    expect(persisted.source.type).toBe("edited");
  });

  it("resets back to default play and clears storage", async () => {
    let renderer: ReturnType<typeof create>;
    await act(async () => {
      renderer = create(
        <PlayProvider>
          <Harness />
        </PlayProvider>,
      );
    });

    await act(async () => {
      renderer!.root.findAllByType("button")[0].props.onClick();
    });

    expect(renderer!.root.findByProps({ id: "title" }).children.join("")).toBe("Modified Play");
    expect(renderer!.root.findByProps({ id: "using-default" }).children.join("")).toBe("false");

    await act(async () => {
      renderer!.root.findAllByType("button")[1].props.onClick();
    });

    expect(renderer!.root.findByProps({ id: "title" }).children.join("")).toBe(defaultPlay.title);
    expect(renderer!.root.findByProps({ id: "using-default" }).children.join("")).toBe("true");
    expect(window.localStorage.getItem("replistage_current_play_v1")).not.toBeNull();
  });

  it("exports the current play as JSON text", async () => {
    let renderer: ReturnType<typeof create>;
    await act(async () => {
      renderer = create(
        <PlayProvider>
          <Harness />
        </PlayProvider>,
      );
    });

    await act(async () => {
      renderer!.root.findAllByType("button")[2].props.onClick();
    });

    const exported = (globalThis as { __lastExportedPlay?: string }).__lastExportedPlay;
    expect(exported).toContain(defaultPlay.title);
    expect(exported).toContain(defaultPlay.scenes[0].id);
  });

  it("falls back to default play when stored data is invalid", () => {
    window.localStorage.setItem("stagecue_current_play_v1", "{invalid-json");

    const renderer = create(
      <PlayProvider>
        <Harness />
      </PlayProvider>,
    );

    expect(renderer.root.findByProps({ id: "title" }).children.join("")).toBe(defaultPlay.title);
    expect(renderer.root.findByProps({ id: "using-default" }).children.join("")).toBe("true");
  });
});
