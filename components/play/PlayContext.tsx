"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { Play, PlaySource } from "@/types/script";
import { defaultPlay } from "@/lib/demo-script";
import { parsePlay } from "@/lib/play-schema";
import {
  clonePlay,
  defaultPlayFromSamples,
  defaultSampleId,
  getSamplePlay,
  inferSampleSource,
  samplePlays,
  type SamplePlayDescriptor,
} from "@/lib/sample-plays";

const PLAY_STORAGE_KEY = "stagecue_current_play_v1";
const PLAY_STORAGE_VERSION = 3;

type PersistedPlayState = {
  version: number;
  play: Play;
  source?: PlaySource;
};

type PlayContextValue = {
  play: Play;
  setPlay: (play: Play, source?: PlaySource) => void;
  resetPlay: () => void;
  loadSamplePlay: (sampleId: string) => void;
  importPlayFromText: (text: string) => Play;
  exportPlayToText: () => string;
  usingDefaultPlay: boolean;
  playSource: PlaySource;
  currentSampleId: string | null;
  sampleLibrary: SamplePlayDescriptor[];
};

const PlayContext = createContext<PlayContextValue>({
  play: defaultPlay,
  setPlay: () => {},
  resetPlay: () => {},
  loadSamplePlay: () => {},
  importPlayFromText: () => defaultPlay,
  exportPlayToText: () => JSON.stringify(defaultPlay, null, 2),
  usingDefaultPlay: true,
  playSource: { type: "sample", sampleId: defaultSampleId },
  currentSampleId: defaultSampleId,
  sampleLibrary: samplePlays,
});

function inferSourceForPlay(play: Play): PlaySource {
  const matchedSampleId = inferSampleSource(play);
  if (matchedSampleId) {
    return { type: "sample", sampleId: matchedSampleId };
  }
  return { type: "edited" };
}

function migrateStoredPlay(raw: unknown): { play: Play; source: PlaySource } {
  if (!raw || typeof raw !== "object") {
    const play = parsePlay(raw);
    return { play, source: inferSourceForPlay(play) };
  }

  const maybeWrapped = raw as Partial<PersistedPlayState>;
  if (typeof maybeWrapped.version === "number" && "play" in maybeWrapped) {
    const play = parsePlay(maybeWrapped.play);
    return {
      play,
      source: maybeWrapped.source ?? inferSourceForPlay(play),
    };
  }

  const play = parsePlay(raw);
  return { play, source: inferSourceForPlay(play) };
}

function loadStoredPlay() {
  if (typeof window === "undefined") {
    return {
      play: defaultPlayFromSamples(),
      source: { type: "sample", sampleId: defaultSampleId } satisfies PlaySource,
    };
  }
  try {
    const raw = localStorage.getItem(PLAY_STORAGE_KEY);
    if (!raw) {
      return {
        play: defaultPlayFromSamples(),
        source: { type: "sample", sampleId: defaultSampleId } satisfies PlaySource,
      };
    }
    const parsed = migrateStoredPlay(JSON.parse(raw));
    // If stored source is a sample, always use the current sample data
    // so that updates to bundled samples (e.g. translated actor names) are reflected immediately.
    if (parsed.source.type === "sample") {
      const fresh = getSamplePlay(parsed.source.sampleId);
      if (fresh) {
        return { play: clonePlay(fresh.play), source: parsed.source };
      }
    }
    return {
      play: clonePlay(parsed.play),
      source: parsed.source,
    };
  } catch {
    try {
      localStorage.removeItem(PLAY_STORAGE_KEY);
    } catch {
      // ignore storage errors
    }
    return {
      play: defaultPlayFromSamples(),
      source: { type: "sample", sampleId: defaultSampleId } satisfies PlaySource,
    };
  }
}

export function PlayProvider({ children }: { children: React.ReactNode }) {
  const [{ play, source }, setState] = useState(() => loadStoredPlay());

  useEffect(() => {
    try {
      const persisted: PersistedPlayState = {
        version: PLAY_STORAGE_VERSION,
        play,
        source,
      };
      localStorage.setItem(PLAY_STORAGE_KEY, JSON.stringify(persisted));
    } catch {
      // ignore storage errors
    }
  }, [play, source]);

  const value = useMemo<PlayContextValue>(() => ({
    play,
    setPlay(nextPlay, sourceOverride) {
      const parsedPlay = clonePlay(parsePlay(nextPlay));
      setState((prev) => ({
        play: parsedPlay,
        source: sourceOverride ?? (prev.source.type === "sample" ? { type: "edited" } : prev.source),
      }));
    },
    resetPlay() {
      setState({
        play: defaultPlayFromSamples(),
        source: { type: "sample", sampleId: defaultSampleId },
      });
      try {
        localStorage.removeItem(PLAY_STORAGE_KEY);
      } catch {
        // ignore storage errors
      }
    },
    loadSamplePlay(sampleId) {
      const sample = getSamplePlay(sampleId);
      if (!sample) return;
      setState({
        play: clonePlay(sample.play),
        source: { type: "sample", sampleId: sample.id },
      });
    },
    importPlayFromText(text) {
      const parsed = parsePlay(JSON.parse(text));
      const nextPlay = clonePlay(parsed);
      setState({
        play: nextPlay,
        source: { type: "imported" },
      });
      return nextPlay;
    },
    exportPlayToText() {
      return JSON.stringify(play, null, 2);
    },
    usingDefaultPlay: source.type === "sample" && source.sampleId === defaultSampleId,
    playSource: source,
    currentSampleId: source.type === "sample" ? source.sampleId : null,
    sampleLibrary: samplePlays,
  }), [play, source]);

  return (
    <PlayContext.Provider value={value}>
      {children}
    </PlayContext.Provider>
  );
}

export function usePlayData() {
  return useContext(PlayContext);
}
