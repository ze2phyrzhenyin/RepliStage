"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { Play } from "@/types/script";
import { defaultPlay } from "@/lib/demo-script";
import { parsePlay } from "@/lib/play-schema";

const PLAY_STORAGE_KEY = "stagecue_current_play_v1";
const PLAY_STORAGE_VERSION = 2;

type PersistedPlayState = {
  version: number;
  play: Play;
};

type PlayContextValue = {
  play: Play;
  setPlay: (play: Play) => void;
  resetPlay: () => void;
  importPlayFromText: (text: string) => Play;
  exportPlayToText: () => string;
  usingDefaultPlay: boolean;
};

const PlayContext = createContext<PlayContextValue>({
  play: defaultPlay,
  setPlay: () => {},
  resetPlay: () => {},
  importPlayFromText: () => defaultPlay,
  exportPlayToText: () => JSON.stringify(defaultPlay, null, 2),
  usingDefaultPlay: true,
});

function clonePlay(play: Play): Play {
  return JSON.parse(JSON.stringify(play)) as Play;
}

function migrateStoredPlay(raw: unknown): Play {
  if (!raw || typeof raw !== "object") {
    return parsePlay(raw);
  }

  const maybeWrapped = raw as Partial<PersistedPlayState>;
  if (typeof maybeWrapped.version === "number" && "play" in maybeWrapped) {
    return parsePlay(maybeWrapped.play);
  }

  return parsePlay(raw);
}

function loadStoredPlay(): Play {
  if (typeof window === "undefined") return clonePlay(defaultPlay);
  try {
    const raw = localStorage.getItem(PLAY_STORAGE_KEY);
    if (!raw) return clonePlay(defaultPlay);
    const parsed = migrateStoredPlay(JSON.parse(raw));
    return clonePlay(parsed);
  } catch {
    try {
      localStorage.removeItem(PLAY_STORAGE_KEY);
    } catch {
      // ignore storage errors
    }
    return clonePlay(defaultPlay);
  }
}

export function PlayProvider({ children }: { children: React.ReactNode }) {
  const [play, setPlayState] = useState<Play>(() => loadStoredPlay());

  useEffect(() => {
    try {
      const persisted: PersistedPlayState = {
        version: PLAY_STORAGE_VERSION,
        play,
      };
      localStorage.setItem(PLAY_STORAGE_KEY, JSON.stringify(persisted));
    } catch {
      // ignore storage errors
    }
  }, [play]);

  const value = useMemo<PlayContextValue>(() => ({
    play,
    setPlay(nextPlay) {
      setPlayState(clonePlay(parsePlay(nextPlay)));
    },
    resetPlay() {
      setPlayState(clonePlay(defaultPlay));
      try {
        localStorage.removeItem(PLAY_STORAGE_KEY);
      } catch {
        // ignore storage errors
      }
    },
    importPlayFromText(text) {
      const parsed = parsePlay(JSON.parse(text));
      const nextPlay = clonePlay(parsed);
      setPlayState(nextPlay);
      return nextPlay;
    },
    exportPlayToText() {
      return JSON.stringify(play, null, 2);
    },
    usingDefaultPlay: JSON.stringify(play) === JSON.stringify(defaultPlay),
  }), [play]);

  return (
    <PlayContext.Provider value={value}>
      {children}
    </PlayContext.Provider>
  );
}

export function usePlayData() {
  return useContext(PlayContext);
}
