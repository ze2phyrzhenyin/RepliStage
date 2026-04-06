"use client";

import { useState } from "react";
import { useLocale } from "@/components/locale/LocaleContext";
import { getAnimalLabel, getSkinToneLabel } from "@/lib/i18n";
import type { Actor, CostumeVariant, SkinTone, AnimalType } from "@/types/script";
import { SKIN_PALETTES, getHairColor } from "@/lib/costumes";
import { useCostumes } from "./CostumeContext";
import { BelleMereSvg, SoeurGrandeSvg, SoeurPetiteSvg, RoiSvg, TresJeuneFilleSvg } from "./CharacterSvgs";
import { TigerSvg, RabbitSvg, PandaSvg } from "./AnimalSvgs";
import { SilhouetteSvg } from "@/components/HumanActorSprite";

const SKIN_TONES: SkinTone[] = ["fair", "tan", "dark"];
const ANIMALS: AnimalType[] = ["tiger", "rabbit", "panda"];

function CharacterPreview({ actorId, skinTone }: { actorId: string; skinTone: SkinTone }) {
  const { skin } = SKIN_PALETTES[skinTone];
  const hair = getHairColor(actorId, skinTone);
  const props = { skin, hair };

  switch (actorId) {
    case "belle_mere":     return <BelleMereSvg {...props} />;
    case "soeur_grande":   return <SoeurGrandeSvg {...props} />;
    case "soeur_petite":   return <SoeurPetiteSvg {...props} />;
    case "roi":            return <RoiSvg {...props} />;
    case "tres_jeune_fille": return <TresJeuneFilleSvg {...props} />;
    default: {
      // Generic silhouette in actor color
      return null;
    }
  }
}

function AnimalPreview({ animal }: { animal: AnimalType }) {
  switch (animal) {
    case "tiger":  return <TigerSvg />;
    case "rabbit": return <RabbitSvg />;
    case "panda":  return <PandaSvg />;
  }
}

function CostumeThumb({
  label,
  active,
  onClick,
  children,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-1 group"
    >
      <div
        className="relative rounded-lg overflow-hidden transition-all"
        style={{
          width: 56,
          height: 84,
          background: active ? "rgba(241,194,125,0.15)" : "rgba(255,255,255,0.04)",
          border: active ? "2px solid #f1c27d" : "2px solid rgba(255,255,255,0.1)",
          boxShadow: active ? "0 0 10px rgba(241,194,125,0.3)" : "none",
        }}
      >
        {children}
      </div>
      <span
        className="text-[10px] leading-none"
        style={{ color: active ? "#f1c27d" : "rgba(255,255,255,0.45)" }}
      >
        {label}
      </span>
    </button>
  );
}

type CostumeSelectorProps = {
  actor: Actor;
  onClose: () => void;
};

export function CostumeSelector({ actor, onClose }: CostumeSelectorProps) {
  const { locale, t } = useLocale();
  const { getCostume, setCostume } = useCostumes();
  const current = getCostume(actor.id);

  function isActive(v: CostumeVariant) {
    if (!current && v.kind === "silhouette") return true; // default = silhouette
    if (!current) return false;
    if (current.kind !== v.kind) return false;
    if (v.kind === "character" && current.kind === "character") return current.skinTone === v.skinTone;
    if (v.kind === "animal" && current.kind === "animal") return current.animal === v.animal;
    return true;
  }

  function select(v: CostumeVariant | null) {
    setCostume(actor.id, v);
    onClose();
  }

  const hasDesign = ["belle_mere","soeur_grande","soeur_petite","roi","tres_jeune_fille"].includes(actor.id);

  return (
    <div
      className="rounded-xl p-4 space-y-4"
      style={{
        background: "#120d1a",
        border: "1px solid rgba(255,255,255,0.1)",
        width: 320,
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full" style={{ background: actor.color }} />
          <span className="text-sm font-medium text-white/80">{actor.name}</span>
          <span className="text-xs text-white/30">- {t("costume.choose")}</span>
        </div>
        <button onClick={onClose} className="text-white/30 hover:text-white/70 text-lg leading-none">×</button>
      </div>

      {/* Silhouette (default) */}
      <div>
        <p className="text-[10px] uppercase tracking-widest text-white/30 mb-2">{t("costume.default")}</p>
        <div className="flex gap-2 flex-wrap">
          <CostumeThumb label={t("costume.original")} active={!current} onClick={() => select(null)}>
            <SilhouettePreview color={actor.color} />
          </CostumeThumb>
        </div>
      </div>

      {/* Skin tones (only for designed actors) */}
      {hasDesign && (
        <div>
          <p className="text-[10px] uppercase tracking-widest text-white/30 mb-2">{t("costume.characterSkin")}</p>
          <div className="flex gap-2 flex-wrap">
            {SKIN_TONES.map((tone) => {
              const v: CostumeVariant = { kind: "character", skinTone: tone };
              return (
                <CostumeThumb key={tone} label={getSkinToneLabel(locale, tone)} active={isActive(v)} onClick={() => select(v)}>
                  <CharacterPreview actorId={actor.id} skinTone={tone} />
                </CostumeThumb>
              );
            })}
          </div>
        </div>
      )}

      {/* Animals */}
      <div>
        <p className="text-[10px] uppercase tracking-widest text-white/30 mb-2">{t("costume.animals")}</p>
        <div className="flex gap-2 flex-wrap">
          {ANIMALS.map((animal) => {
            const v: CostumeVariant = { kind: "animal", animal };
            return (
              <CostumeThumb key={animal} label={getAnimalLabel(locale, animal)} active={isActive(v)} onClick={() => select(v)}>
                <AnimalPreview animal={animal} />
              </CostumeThumb>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function SilhouettePreview({ color }: { color: string }) {
  return <SilhouetteSvg color={color} isSpeaking={false} pose="stand" />;
}

// ── Trigger button + popover wrapper ────────────────────────
export function CostumeTrigger({ actor }: { actor: Actor }) {
  const { locale } = useLocale();
  const [open, setOpen] = useState(false);
  const { getCostume } = useCostumes();
  const costume = getCostume(actor.id);

  const badge = costume
    ? costume.kind === "character"
      ? getSkinToneLabel(locale, costume.skinTone)
      : costume.kind === "animal"
        ? getAnimalLabel(locale, costume.animal)
        : null
    : null;

  return (
    <div className={`relative ${open ? "z-[90]" : "z-0"}`}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs transition hover:bg-white/10"
        style={{
          border: "1px solid rgba(255,255,255,0.12)",
          color: "rgba(255,255,255,0.55)",
        }}
      >
        <span className="w-2 h-2 rounded-full" style={{ background: actor.color }} />
        {actor.name}
        {badge && (
          <span className="rounded-sm px-1 text-[9px]" style={{ background: "rgba(241,194,125,0.25)", color: "#f1c27d" }}>
            {badge}
          </span>
        )}
        <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
          <path d="M2 3l2 2 2-2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute top-full mt-2 z-[95]" style={{ left: 0 }}>
            <CostumeSelector actor={actor} onClose={() => setOpen(false)} />
          </div>
        </>
      )}
    </div>
  );
}
