import type { CostumeVariant, SkinTone, AnimalType } from "@/types/script";

// ── Skin tone color palettes ─────────────────────────────────
export const SKIN_PALETTES: Record<SkinTone, { skin: string; lip: string }> = {
  fair: { skin: "#f5c9a0", lip: "#d98c7e" },
  tan:  { skin: "#c8845a", lip: "#a0543a" },
  dark: { skin: "#6b3b27", lip: "#8a4532" },
};

// Per-character hair colors per skin tone
export const HAIR_COLORS: Record<string, Record<SkinTone, string>> = {
  belle_mere:       { fair: "#b09060", tan: "#3a2010", dark: "#1a0c06" },
  soeur_grande:     { fair: "#d4a840", tan: "#6b3820", dark: "#1e1008" },
  soeur_petite:     { fair: "#e8c060", tan: "#5a3018", dark: "#1a0c06" },
  roi:              { fair: "#c0a870", tan: "#2e1808", dark: "#140a04" },
  tres_jeune_fille: { fair: "#c09860", tan: "#4a2c10", dark: "#180e06" },
  // generics for custom actors
  default:          { fair: "#a08050", tan: "#3a2010", dark: "#180e06" },
};

export function getHairColor(actorId: string, skinTone: SkinTone): string {
  return (HAIR_COLORS[actorId] ?? HAIR_COLORS.default)[skinTone];
}

// ── Costume display metadata ─────────────────────────────────
export const SKIN_TONE_LABELS: Record<SkinTone, string> = {
  fair: "Fair",
  tan:  "Tan",
  dark: "Dark",
};

export const ANIMAL_LABELS: Record<AnimalType, string> = {
  tiger:  "Tiger",
  rabbit: "Rabbit",
  panda:  "Panda",
};

export function costumeLabel(c: CostumeVariant): string {
  if (c.kind === "silhouette") return "Silhouette";
  if (c.kind === "character") return SKIN_TONE_LABELS[c.skinTone];
  return ANIMAL_LABELS[c.animal];
}

// ── Character IDs that have custom SVG designs ───────────────
export const DESIGNED_ACTORS = new Set([
  "belle_mere",
  "soeur_grande",
  "soeur_petite",
  "roi",
  "tres_jeune_fille",
]);
