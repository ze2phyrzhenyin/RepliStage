import type { Play, ScriptDefinition } from "@/types/script";
import { defaultPlayFromSamples } from "@/lib/sample-plays";

export const defaultPlay: Play = defaultPlayFromSamples();

/** First scene — backwards-compat alias used throughout the app */
export const demoScript: ScriptDefinition = defaultPlay.scenes[0];
