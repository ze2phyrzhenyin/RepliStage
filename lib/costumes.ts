import type { CostumeVariant, SkinTone, AnimalType } from "@/types/script";

// ── Skin tone color palettes ─────────────────────────────────
export const SKIN_PALETTES: Record<SkinTone, { skin: string; lip: string }> = {
  fair: { skin: "#f5c9a0", lip: "#d98c7e" },
  tan:  { skin: "#c8845a", lip: "#a0543a" },
  dark: { skin: "#6b3b27", lip: "#8a4532" },
};

// Per-character hair colors per skin tone
export const HAIR_COLORS: Record<string, Record<SkinTone, string>> = {
  belle_mere:          { fair: "#b09060", tan: "#3a2010", dark: "#1a0c06" },
  soeur_grande:        { fair: "#d4a840", tan: "#6b3820", dark: "#1e1008" },
  soeur_petite:        { fair: "#e8c060", tan: "#5a3018", dark: "#1a0c06" },
  roi:                 { fair: "#c0a870", tan: "#2e1808", dark: "#140a04" },
  tres_jeune_fille:    { fair: "#c09860", tan: "#4a2c10", dark: "#180e06" },
  // Cinderella — new characters (all 3 skin tones)
  fee:                 { fair: "#c8b080", tan: "#5a3018", dark: "#1a0c06" },
  pere:                { fair: "#6a5040", tan: "#3a2010", dark: "#180e06" },
  tres_jeune_prince:   { fair: "#b09060", tan: "#4a2810", dark: "#180e06" },
  garde_1:             { fair: "#4a3828", tan: "#2a1808", dark: "#100806" },
  garde_2:             { fair: "#4a3828", tan: "#2a1808", dark: "#100806" },
  mere:                { fair: "#8a7060", tan: "#4a2c10", dark: "#1a0c06" },
  // 秦琼卖马 — fair skin only; hair kept neutral
  yang_chengyue:       { fair: "#1a1a1a", tan: "#0e0e0e", dark: "#080808" },
  xue_er:              { fair: "#1a1a1a", tan: "#0e0e0e", dark: "#080808" },
  wang_chaojie:        { fair: "#d0ccc8", tan: "#c0bcb8", dark: "#b0acaa" },
  // generics for custom actors
  default:             { fair: "#a08050", tan: "#3a2010", dark: "#180e06" },
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
  sheep:  "Sheep",
};

export function costumeLabel(c: CostumeVariant): string {
  if (c.kind === "silhouette") return "Silhouette";
  if (c.kind === "character") return SKIN_TONE_LABELS[c.skinTone];
  return ANIMAL_LABELS[c.animal];
}

// ── Character IDs that have custom SVG designs ───────────────
export const DESIGNED_ACTORS = new Set([
  // Cinderella
  "belle_mere",
  "soeur_grande",
  "soeur_petite",
  "roi",
  "tres_jeune_fille",
  "fee",
  "pere",
  "tres_jeune_prince",
  "garde_1",
  "garde_2",
  "mere",
  // 秦琼卖马
  "yang_chengyue",
  "xue_er",
  "wang_chaojie",
]);
