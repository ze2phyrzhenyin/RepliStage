"use client";

import { useState } from "react";
import { motion } from "motion/react";
import type { ActorPose, AnimationState, Expression } from "@/types/script";
import type { CostumeVariant } from "@/types/script";
import { SKIN_PALETTES, getHairColor, DESIGNED_ACTORS } from "@/lib/costumes";
import { BelleMereSvg, SoeurGrandeSvg, SoeurPetiteSvg, RoiSvg, TresJeuneFilleSvg, FeeSvg, PereSvg, TresJeunePrinceSvg, GardeSvg, MereSvg, YangChengyueSvg, XueErSvg, WangChaojeSvg } from "./costumes/CharacterSvgs";
import { TigerSvg, RabbitSvg, PandaSvg } from "./costumes/AnimalSvgs";

// Module-level cache: once a URL 404s, remember it across component remounts.
const imageFailureCache = new Set<string>();

export type SpriteProps = {
  actorId: string;
  actorColor: string;
  animationState: AnimationState;
  expression: Expression;
  pose: ActorPose;
  isSpeaking: boolean;
  isSelected: boolean;
  scale: number;
  costume?: CostumeVariant | null;
};

const BASE_W = 56;
const BASE_H = 84;

// ── Silhouette — exported so CostumeSelector can reuse it ───
export function SilhouetteSvg({
  color,
  isSpeaking,
  pose,
}: {
  color: string;
  isSpeaking: boolean;
  pose: ActorPose;
}) {
  if (pose === "sit") {
    return (
      <svg viewBox="0 0 40 60" width="100%" height="100%" style={{ overflow: "visible" }}>
        {isSpeaking && <ellipse cx="20" cy="55" rx="14" ry="4" fill={color} opacity="0.18" />}
        <ellipse cx="20" cy="9" rx="7.5" ry="8" fill={color} opacity="0.92" />
        <rect x="17" y="16" width="6" height="4" rx="2" fill={color} opacity="0.85" />
        <polygon points="11,21 29,21 27,42 13,42" fill={color} opacity="0.78" />
        <rect x="7" y="21" width="5" height="17" rx="2.5" fill={color} opacity="0.68" />
        <rect x="28" y="21" width="5" height="17" rx="2.5" fill={color} opacity="0.68" />
        <rect x="10" y="42" width="9" height="10" rx="2.5" fill={color} opacity="0.72" transform="rotate(-18 14 48)" />
        <rect x="21" y="42" width="9" height="10" rx="2.5" fill={color} opacity="0.72" transform="rotate(18 26 48)" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 40 60" width="100%" height="100%" style={{ overflow: "visible" }}>
      {isSpeaking && <ellipse cx="20" cy="55" rx="14" ry="4" fill={color} opacity="0.18" />}
      <ellipse cx="20" cy="9" rx="7.5" ry="8" fill={color} opacity="0.92" />
      <rect x="17" y="16" width="6" height="4" rx="2" fill={color} opacity="0.85" />
      <polygon points="11,21 29,21 26.5,46 13.5,46" fill={color} opacity="0.78" />
      <rect x="7" y="21" width="5" height="19" rx="2.5" fill={color} opacity="0.68" />
      <rect x="28" y="21" width="5" height="19" rx="2.5" fill={color} opacity="0.68" />
      <rect x="14" y="46" width="5.5" height="14" rx="2.5" fill={color} opacity="0.78" />
      <rect x="20.5" y="46" width="5.5" height="14" rx="2.5" fill={color} opacity="0.78" />
    </svg>
  );
}

// ── Character costume renderer ───────────────────────────────
function CostumeRenderer({
  actorId,
  costume,
  actorColor,
  isSpeaking,
  pose,
}: {
  actorId: string;
  costume: CostumeVariant;
  actorColor: string;
  isSpeaking: boolean;
  pose: ActorPose;
}) {
  if (costume.kind === "silhouette") {
    return <SilhouetteSvg color={actorColor} isSpeaking={isSpeaking} pose={pose} />;
  }

  if (costume.kind === "animal") {
    const AnimalComp = { tiger: TigerSvg, rabbit: RabbitSvg, panda: PandaSvg }[costume.animal];
    return (
      <div className="relative w-full h-full">
        <AnimalComp />
        {isSpeaking && (
          <div className="pointer-events-none absolute inset-0 rounded-full"
            style={{ boxShadow: `0 0 28px 6px ${actorColor}28` }} />
        )}
      </div>
    );
  }

  // kind === "character" — inline SVG with skin tone
  const { skin } = SKIN_PALETTES[costume.skinTone];
  const hair = getHairColor(actorId, costume.skinTone);
  const svgProps = { skin, hair };

  let svgNode: React.ReactNode;
  switch (actorId) {
    case "belle_mere":        svgNode = <BelleMereSvg {...svgProps} pose={pose} />; break;
    case "soeur_grande":      svgNode = <SoeurGrandeSvg {...svgProps} pose={pose} />; break;
    case "soeur_petite":      svgNode = <SoeurPetiteSvg {...svgProps} pose={pose} />; break;
    case "roi":               svgNode = <RoiSvg {...svgProps} pose={pose} />; break;
    case "tres_jeune_fille":  svgNode = <TresJeuneFilleSvg {...svgProps} pose={pose} />; break;
    case "fee":               svgNode = <FeeSvg {...svgProps} pose={pose} />; break;
    case "pere":              svgNode = <PereSvg {...svgProps} pose={pose} />; break;
    case "tres_jeune_prince": svgNode = <TresJeunePrinceSvg {...svgProps} pose={pose} />; break;
    case "garde_1":
    case "garde_2":           svgNode = <GardeSvg {...svgProps} pose={pose} />; break;
    case "mere":              svgNode = <MereSvg {...svgProps} pose={pose} />; break;
    case "yang_chengyue":     svgNode = <YangChengyueSvg {...svgProps} pose={pose} />; break;
    case "xue_er":            svgNode = <XueErSvg {...svgProps} pose={pose} />; break;
    case "wang_chaojie":      svgNode = <WangChaojeSvg {...svgProps} pose={pose} />; break;
    default:
      // Fallback: generic silhouette in actor color
      svgNode = <SilhouetteSvg color={actorColor} isSpeaking={isSpeaking} pose={pose} />;
  }

  return (
    <div className="relative w-full h-full">
      {svgNode}
      {isSpeaking && (
        <div className="pointer-events-none absolute inset-0 rounded-full"
          style={{ boxShadow: `0 0 28px 6px ${actorColor}28` }} />
      )}
    </div>
  );
}

// ── File-based image with PNG→SVG→silhouette fallback ────────
function ActorImage({
  actorId,
  actorColor,
  isSpeaking,
  pose,
}: {
  actorId: string;
  actorColor: string;
  isSpeaking: boolean;
  pose: ActorPose;
}) {
  const baseName = pose === "sit" ? "sitting" : "default";
  const pngSrc = `/actors/${actorId}/${baseName}.png`;
  const svgSrc = `/actors/${actorId}/${baseName}.svg`;

  const [failedUrls, setFailedUrls] = useState<Set<string>>(() => new Set(imageFailureCache));

  const pngFailed = failedUrls.has(pngSrc);
  const svgFailed = failedUrls.has(svgSrc);
  const src = !pngFailed ? pngSrc : svgSrc;

  if (pngFailed && svgFailed) {
    return <SilhouetteSvg color={actorColor} isSpeaking={isSpeaking} pose={pose} />;
  }

  return (
    <div className="relative w-full h-full">
      <img
        key={src}
        src={src}
        alt={actorId}
        className="w-full h-full object-contain object-bottom"
        onError={() => {
          imageFailureCache.add(src);
          setFailedUrls(new Set(imageFailureCache));
        }}
        draggable={false}
      />
      {isSpeaking && (
        <div
          className="pointer-events-none absolute inset-0 rounded-full"
          style={{ boxShadow: `0 0 28px 6px ${actorColor}28` }}
        />
      )}
    </div>
  );
}

function getBodyAnimation(animState: AnimationState, isSpeaking: boolean) {
  if (isSpeaking || animState === "talk") {
    return { y: [0, -3, -1, -4, 0, -2, 0], transition: { duration: 1.2, repeat: Infinity, ease: "easeInOut" as const } };
  }
  if (animState === "action") {
    return { y: [0, -5, 0, -3, 0], rotate: [0, -1.5, 0, 1.5, 0], transition: { duration: 0.9, repeat: Infinity, ease: "easeInOut" as const } };
  }
  if (animState === "move") {
    return { y: [0, -4, 0, -4, 0], transition: { duration: 0.55, repeat: Infinity, ease: "easeInOut" as const } };
  }
  return { y: [0, -1.5, 0], transition: { duration: 3.5, repeat: Infinity, ease: "easeInOut" as const } };
}

export function HumanActorSprite({
  actorId,
  actorColor,
  animationState,
  pose,
  isSpeaking,
  isSelected,
  scale,
  costume,
}: SpriteProps) {
  const w = BASE_W * scale;
  const h = BASE_H * scale;
  const bodyAnim = getBodyAnimation(animationState, isSpeaking);

  return (
    <div style={{ width: w, height: h, position: "relative" }}>
      {isSelected && (
        <div
          className="absolute -bottom-1 left-1/2 -translate-x-1/2 rounded-full"
          style={{
            width: w * 0.55,
            height: 3 * scale,
            backgroundColor: actorColor,
            opacity: 0.7,
            filter: `blur(${2 * scale}px)`,
          }}
        />
      )}
      <motion.div
        animate={bodyAnim}
        style={{ width: "100%", height: "100%", transformOrigin: "bottom center" }}
      >
        {(costume ?? (DESIGNED_ACTORS.has(actorId) ? { kind: "character" as const, skinTone: "fair" as const } : null)) ? (
          <CostumeRenderer
            actorId={actorId}
            costume={costume ?? { kind: "character" as const, skinTone: "fair" as const }}
            actorColor={actorColor}
            isSpeaking={isSpeaking}
            pose={pose}
          />
        ) : (
          <ActorImage
            actorId={actorId}
            actorColor={actorColor}
            isSpeaking={isSpeaking}
            pose={pose}
          />
        )}
      </motion.div>
    </div>
  );
}
