import type { Play, ScriptDefinition } from "@/types/script";
import rawPlay from "./default-script.json";

export const defaultPlay: Play = rawPlay as Play;

/** First scene — backwards-compat alias used throughout the app */
export const demoScript: ScriptDefinition = defaultPlay.scenes[0];
