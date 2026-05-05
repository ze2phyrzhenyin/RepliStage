/**
 * Stage prop SVG components — one per StagePropKind (excluding door/chair which
 * live in StageCanvas.tsx for historical reasons).
 *
 * Each component renders at width="100%" height="100%" inside a sized container.
 * PROP_DIMS exports the stage-unit footprint (w × h) for each kind so StageCanvas
 * can calculate layout without importing anything else.
 */

import type { StagePropKind } from "@/types/script";

export type PropRenderLayer = "back" | "front" | "hanging";
export type PropAnchor = "floor" | "top";

export const PROP_DIMS: Partial<Record<StagePropKind, { w: number; h: number }>> = {
  magic_box:            { w: 130, h: 130 },
  carriage:             { w: 160, h:  96 },
  parade_umbrella:      { w:  64, h: 100 },
  microphone_stand:     { w:  38, h: 110 },
  shoe:                 { w:  44, h:  24 },
  bed:                  { w: 180, h:  88 },
  dance_light:          { w: 100, h: 100 },
  counter_table:        { w: 200, h:  80 },
  display_shelf:        { w: 100, h: 160 },
  plate_stand:          { w:  56, h:  64 },
  suitcase:             { w:  56, h:  38 },
  porcelain_plate:      { w:  54, h:  54 },
  broken_plate:         { w:  66, h:  46 },
  tea_set:              { w:  84, h:  46 },
  signboard_yiyuanzhai: { w: 130, h:  44 },
  // Supplementary props
  ashtray:              { w:  44, h:  28 },
  cigarette:            { w:  36, h:  12 },
  wristwatch:           { w:  40, h:  40 },
  invitation_card:      { w:  56, h:  40 },
  smoke_effect:         { w: 100, h: 100 },
  food_set:             { w: 110, h:  50 },
  silver_note:          { w:  52, h:  28 },
};

export const PROP_LAYERS: Partial<Record<StagePropKind, PropRenderLayer>> = {
  magic_box: "back",
  carriage: "back",
  parade_umbrella: "front",
  microphone_stand: "front",
  shoe: "front",
  bed: "front",
  dance_light: "hanging",
  counter_table: "front",
  display_shelf: "back",
  plate_stand: "front",
  suitcase: "front",
  porcelain_plate: "front",
  broken_plate: "front",
  tea_set: "front",
  signboard_yiyuanzhai: "hanging",
  ashtray: "front",
  cigarette: "front",
  wristwatch: "front",
  invitation_card: "front",
  smoke_effect: "front",
  food_set: "front",
  silver_note: "front",
};

export const PROP_ANCHORS: Partial<Record<StagePropKind, PropAnchor>> = {
  dance_light: "top",
  signboard_yiyuanzhai: "top",
};

// ── Magic Box ─────────────────────────────────────────────────
export function MagicBoxSvg({ variant = "closed" }: { variant?: "closed" | "open" }) {
  return (
    <svg viewBox="0 0 130 130" width="100%" height="100%" style={{ display: "block" }}>
      <defs>
        <radialGradient id="mb-glow" cx="50%" cy="60%" r="50%">
          <stop offset="0%" stopColor="rgba(180,100,255,0.22)" />
          <stop offset="100%" stopColor="rgba(180,100,255,0)" />
        </radialGradient>
        <linearGradient id="mb-lid" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3a2060" />
          <stop offset="100%" stopColor="#1e1038" />
        </linearGradient>
        <linearGradient id="mb-body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2a1848" />
          <stop offset="100%" stopColor="#140c28" />
        </linearGradient>
      </defs>

      {/* Ambient glow */}
      <rect x="0" y="0" width="130" height="130" fill="url(#mb-glow)" />

      {/* Floor shadow */}
      <ellipse cx="65" cy="126" rx="46" ry="5" fill="rgba(0,0,0,0.45)" />

      {/* Body */}
      <rect x="14" y={variant === "open" ? 64 : 54} width="102" height="66" rx="4" fill="url(#mb-body)" stroke="#4a2880" strokeWidth="1.5" />

      {/* Body gold trim bands */}
      <rect x="14" y={variant === "open" ? 76 : 66} width="102" height="4" fill="#c89828" opacity="0.7" />
      <rect x="14" y={variant === "open" ? 118 : 108} width="102" height="4" fill="#c89828" opacity="0.7" />
      <rect x="14" y={variant === "open" ? 64 : 54} width="4" height="66" fill="#c89828" opacity="0.55" />
      <rect x="112" y={variant === "open" ? 64 : 54} width="4" height="66" fill="#c89828" opacity="0.55" />

      {/* Star patterns on body */}
      {[[35, 92], [65, 88], [95, 92]].map(([cx, cy], i) => (
        <path key={i}
          d={`M${cx} ${cy - 8} L${cx + 2} ${cy - 2} L${cx + 8} ${cy} L${cx + 2} ${cy + 2} L${cx} ${cy + 8} L${cx - 2} ${cy + 2} L${cx - 8} ${cy} L${cx - 2} ${cy - 2} Z`}
          fill="#c89828" opacity="0.55"
        />
      ))}

      {/* Lock plate */}
      <rect x="57" y={variant === "open" ? 88 : 78} width="16" height="12" rx="3" fill="#c89828" />
      <circle cx="65" cy={variant === "open" ? 95 : 85} r="3.5" fill="#2a1848" />

      {/* Lid */}
      {variant === "closed" ? (
        <>
          <rect x="12" y="34" width="106" height="24" rx="4" fill="url(#mb-lid)" stroke="#5a30a0" strokeWidth="1.5" />
          <rect x="12" y="34" width="106" height="5" rx="4" fill="rgba(255,255,255,0.07)" />
          {/* Lid gold trim */}
          <rect x="12" y="54" width="106" height="3" fill="#c89828" opacity="0.7" />
          <rect x="12" y="34" width="106" height="3" fill="#c89828" opacity="0.55" />
          {/* Lid clasp */}
          <rect x="59" y="42" width="12" height="8" rx="2" fill="#c89828" />
        </>
      ) : (
        <>
          {/* Open lid — tilted back */}
          <rect x="12" y="20" width="106" height="24" rx="4" fill="url(#mb-lid)" stroke="#5a30a0" strokeWidth="1.5"
            transform="rotate(-25 65 20)" />
          {/* Light beam from open box */}
          <path d="M30 64 L20 0 L110 0 L100 64 Z" fill="rgba(220,160,255,0.15)" />
          <path d="M40 64 L35 10 L95 10 L90 64 Z" fill="rgba(255,200,255,0.1)" />
          {/* Sparkles emanating */}
          {[[50, 30], [65, 20], [80, 35], [60, 10], [75, 15]].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r={i % 2 === 0 ? 2 : 1.5} fill="#e0b0ff" opacity={0.7 - i * 0.1} />
          ))}
        </>
      )}

      {/* Sparkles floating around box */}
      <circle cx="20" cy="44" r="2" fill="#c89828" opacity="0.6" />
      <circle cx="110" cy="38" r="1.5" fill="#c89828" opacity="0.5" />
      <circle cx="18" cy="70" r="1.5" fill="#a060e0" opacity="0.55" />
      <circle cx="112" cy="72" r="2" fill="#a060e0" opacity="0.6" />
    </svg>
  );
}

// ── Carriage ─────────────────────────────────────────────────
export function CarriageSvg() {
  return (
    <svg viewBox="0 0 160 96" width="100%" height="100%" style={{ display: "block" }}>
      <defs>
        <radialGradient id="carr-body" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#c87820" />
          <stop offset="100%" stopColor="#7a4010" />
        </radialGradient>
      </defs>

      {/* Floor shadow */}
      <ellipse cx="80" cy="93" rx="66" ry="4" fill="rgba(0,0,0,0.4)" />

      {/* Axle */}
      <line x1="28" y1="74" x2="132" y2="74" stroke="#2a1808" strokeWidth="4" strokeLinecap="round" />

      {/* Rear wheel */}
      <circle cx="30" cy="74" r="20" fill="none" stroke="#2a1808" strokeWidth="5" />
      <circle cx="30" cy="74" r="14" fill="none" stroke="#3a2010" strokeWidth="2" />
      {[0,45,90,135].map((a, i) => (
        <line key={i} x1={30} y1={74}
          x2={30 + 18 * Math.cos(a * Math.PI / 180)}
          y2={74 + 18 * Math.sin(a * Math.PI / 180)}
          stroke="#3a2010" strokeWidth="2.5" />
      ))}
      <circle cx="30" cy="74" r="4" fill="#c89020" />

      {/* Front wheel */}
      <circle cx="130" cy="74" r="20" fill="none" stroke="#2a1808" strokeWidth="5" />
      <circle cx="130" cy="74" r="14" fill="none" stroke="#3a2010" strokeWidth="2" />
      {[0,45,90,135].map((a, i) => (
        <line key={i} x1={130} y1={74}
          x2={130 + 18 * Math.cos(a * Math.PI / 180)}
          y2={74 + 18 * Math.sin(a * Math.PI / 180)}
          stroke="#3a2010" strokeWidth="2.5" />
      ))}
      <circle cx="130" cy="74" r="4" fill="#c89020" />

      {/* Carriage body — pumpkin shape */}
      <ellipse cx="80" cy="50" rx="50" ry="36" fill="url(#carr-body)" />
      {/* Pumpkin ribs */}
      <path d="M80 14 Q72 30 72 50 Q72 70 80 86" stroke="#6a3808" strokeWidth="2.5" fill="none" />
      <path d="M80 14 Q60 28 58 50 Q58 72 80 86" stroke="#6a3808" strokeWidth="2" fill="none" opacity="0.7" />
      <path d="M80 14 Q100 28 102 50 Q102 72 80 86" stroke="#6a3808" strokeWidth="2" fill="none" opacity="0.7" />

      {/* Coach window */}
      <rect x="64" y="34" width="32" height="26" rx="8" fill="#0e1820" stroke="#c89020" strokeWidth="1.5" />
      <rect x="65" y="35" width="30" height="12" rx="6" fill="rgba(150,180,210,0.12)" />

      {/* Gold trim */}
      <ellipse cx="80" cy="50" rx="50" ry="36" fill="none" stroke="#c89020" strokeWidth="1.5" opacity="0.6" />

      {/* Roof ornament */}
      <path d="M72 14 Q80 4 88 14" stroke="#c89020" strokeWidth="2" fill="none" />
      <circle cx="80" cy="4" r="4" fill="#c89020" />

      {/* Footman step */}
      <rect x="66" y="78" width="28" height="6" rx="2" fill="#3a2010" stroke="#c89020" strokeWidth="1" />
    </svg>
  );
}

// ── Parade Umbrella ───────────────────────────────────────────
export function ParadeUmbrellaSvg() {
  return (
    <svg viewBox="0 0 64 100" width="100%" height="100%" style={{ display: "block" }}>
      {/* Handle */}
      <line x1="32" y1="44" x2="32" y2="96" stroke="#5a3818" strokeWidth="5" strokeLinecap="round" />
      {/* Handle crook */}
      <path d="M32 96 Q32 100 28 100 Q24 100 24 96" stroke="#5a3818" strokeWidth="4" fill="none" strokeLinecap="round" />
      {/* Handle tip decoration */}
      <circle cx="32" cy="44" r="3" fill="#c89020" />

      {/* Canopy dome */}
      <path d="M4 44 Q32 2 60 44 Z" fill="#8a1c30" />
      {/* Canopy ribs */}
      {[10, 18, 32, 46, 54].map((x, i) => (
        <line key={i} x1={32} y1={14} x2={x} y2={44} stroke="#6a1428" strokeWidth="1.2" />
      ))}
      {/* Canopy trim */}
      <path d="M4 44 Q32 2 60 44" stroke="#c89020" strokeWidth="1.5" fill="none" />

      {/* Fringe */}
      {Array.from({ length: 11 }, (_, i) => {
        const t = i / 10;
        // parametric point along arc
        const angle = Math.PI * t;
        const cx = 4 + t * 56;
        return (
          <line key={i}
            x1={cx} y1={44}
            x2={cx + (i % 2 === 0 ? -1 : 1) * 2} y2={54}
            stroke="#d4a040" strokeWidth="1.5" strokeLinecap="round"
          />
        );
      })}

      {/* Canopy top tip */}
      <circle cx="32" cy="10" r="4" fill="#c89020" />
      <path d="M29 10 L32 2 L35 10" fill="#c89020" />

      {/* Floor shadow */}
      <ellipse cx="32" cy="99" rx="10" ry="2.5" fill="rgba(0,0,0,0.35)" />
    </svg>
  );
}

// ── Microphone Stand ──────────────────────────────────────────
export function MicrophoneStandSvg() {
  return (
    <svg viewBox="0 0 38 110" width="100%" height="100%" style={{ display: "block" }}>
      {/* Floor shadow */}
      <ellipse cx="19" cy="108" rx="16" ry="3" fill="rgba(0,0,0,0.4)" />

      {/* Tripod base */}
      <line x1="19" y1="90" x2="4"  y2="106" stroke="#2a2830" strokeWidth="4" strokeLinecap="round" />
      <line x1="19" y1="90" x2="34" y2="106" stroke="#2a2830" strokeWidth="4" strokeLinecap="round" />
      <line x1="19" y1="90" x2="19" y2="106" stroke="#2a2830" strokeWidth="3.5" strokeLinecap="round" />
      {/* Base foot pads */}
      <ellipse cx="4"  cy="106" rx="4" ry="2.5" fill="#1a1820" />
      <ellipse cx="34" cy="106" rx="4" ry="2.5" fill="#1a1820" />
      <ellipse cx="19" cy="106" rx="4" ry="2.5" fill="#1a1820" />

      {/* Pole */}
      <rect x="17" y="16" width="4" height="76" rx="2" fill="#2a2830" />
      <rect x="17.5" y="16" width="1.5" height="76" rx="1" fill="rgba(255,255,255,0.08)" />

      {/* Mic boom arm */}
      <line x1="19" y1="30" x2="30" y2="20" stroke="#2a2830" strokeWidth="3" strokeLinecap="round" />

      {/* Microphone head — vintage round */}
      <ellipse cx="19" cy="10" rx="9" ry="10" fill="#1a1820" stroke="#3a3848" strokeWidth="1.5" />
      <ellipse cx="19" cy="10" rx="6" ry="7" fill="#222230" />
      {/* Mic grille dots */}
      {[[-2,0],[0,-3],[2,0],[0,3],[-3,-2],[-3,2],[3,-2],[3,2]].map(([dx,dy], i) => (
        <circle key={i} cx={19 + dx} cy={10 + dy} r="0.8" fill="#3a3848" />
      ))}
      <ellipse cx="19" cy="10" rx="9" ry="10" fill="none" stroke="#c89020" strokeWidth="1" opacity="0.5" />
      {/* On/off indicator light */}
      <circle cx="19" cy="22" r="2" fill="#c83020" opacity="0.8" />
    </svg>
  );
}

// ── Glass Shoe ────────────────────────────────────────────────
export function ShoeSvg() {
  return (
    <svg viewBox="0 0 44 24" width="100%" height="100%" style={{ display: "block" }}>
      <defs>
        <linearGradient id="shoe-glass" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="rgba(180,220,255,0.55)" />
          <stop offset="100%" stopColor="rgba(100,160,230,0.25)" />
        </linearGradient>
      </defs>
      {/* Floor shadow */}
      <ellipse cx="22" cy="23" rx="18" ry="2" fill="rgba(0,0,0,0.3)" />
      {/* Sole */}
      <path d="M4 18 Q6 22 22 22 Q36 22 40 18 Q38 20 22 20 Q8 20 4 18 Z" fill="rgba(180,220,255,0.3)" stroke="rgba(160,200,240,0.5)" strokeWidth="0.8" />
      {/* Heel */}
      <path d="M2 10 Q2 18 6 20 L8 18 Q5 16 5 10 Z" fill="url(#shoe-glass)" stroke="rgba(160,200,240,0.6)" strokeWidth="0.8" />
      {/* Main upper */}
      <path d="M5 10 Q8 4 22 2 Q36 0 40 8 Q40 16 38 18 Q22 20 6 18 Z" fill="url(#shoe-glass)" stroke="rgba(180,220,255,0.7)" strokeWidth="0.8" />
      {/* Highlight */}
      <path d="M8 6 Q18 2 30 4" stroke="rgba(255,255,255,0.5)" strokeWidth="1" fill="none" />
      <path d="M10 10 Q20 6 34 8" stroke="rgba(255,255,255,0.3)" strokeWidth="0.8" fill="none" />
      {/* Shimmer dot */}
      <circle cx="28" cy="6" r="1.5" fill="rgba(255,255,255,0.7)" />
    </svg>
  );
}

// ── Bed ───────────────────────────────────────────────────────
export function BedSvg() {
  return (
    <svg viewBox="0 0 180 88" width="100%" height="100%" style={{ display: "block" }}>
      <defs>
        <linearGradient id="bed-sheet" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#e8e4e0" />
          <stop offset="100%" stopColor="#d0ccc8" />
        </linearGradient>
      </defs>

      {/* Floor shadow */}
      <ellipse cx="90" cy="86" rx="80" ry="4" fill="rgba(0,0,0,0.38)" />

      {/* Bed legs */}
      <rect x="8"   y="68" width="8"  height="16" rx="3" fill="#1e0e06" />
      <rect x="164" y="68" width="8"  height="16" rx="3" fill="#1e0e06" />

      {/* Bed frame base */}
      <rect x="6" y="52" width="168" height="22" rx="4" fill="#2e1808" stroke="#3e2010" strokeWidth="1" />

      {/* Mattress */}
      <rect x="10" y="36" width="160" height="20" rx="3" fill="#c8c0b4" />
      <rect x="10" y="36" width="160" height="5" rx="3" fill="rgba(255,255,255,0.12)" />
      {/* Button tufts */}
      {[40, 90, 140].map((x, i) => (
        <circle key={i} cx={x} cy={46} r="2.5" fill="#a8a098" />
      ))}

      {/* Sheet / duvet */}
      <path d="M10 36 Q90 28 170 36 L170 56 Q90 60 10 56 Z" fill="url(#bed-sheet)" />
      <path d="M10 36 Q90 28 170 36" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" fill="none" />
      {/* Sheet fold/crease lines */}
      <path d="M20 38 Q90 32 160 38" stroke="rgba(0,0,0,0.06)" strokeWidth="1" fill="none" />

      {/* Pillows */}
      <rect x="14" y="20" width="40" height="20" rx="6" fill="#f0ece8" stroke="#e0dcd8" strokeWidth="1" />
      <rect x="62" y="20" width="40" height="20" rx="6" fill="#f0ece8" stroke="#e0dcd8" strokeWidth="1" />
      <rect x="14" y="20" width="40" height="7" rx="4" fill="rgba(255,255,255,0.2)" />
      <rect x="62" y="20" width="40" height="7" rx="4" fill="rgba(255,255,255,0.2)" />

      {/* Headboard */}
      <rect x="4" y="4" width="20" height="54" rx="4" fill="#2e1808" stroke="#3e2010" strokeWidth="1" />
      <rect x="6" y="6" width="16" height="48" rx="3" fill="#3a2010" />
      {/* Headboard decorative panel */}
      <rect x="8" y="10" width="12" height="36" rx="2" fill="none" stroke="#5a3018" strokeWidth="1.2" />
      <ellipse cx="14" cy="28" rx="4" ry="8" fill="none" stroke="#5a3018" strokeWidth="1" />
    </svg>
  );
}

// ── Dance Light (Chandelier) ───────────────────────────────────
export function DanceLightSvg() {
  return (
    <svg viewBox="0 0 100 100" width="100%" height="100%" style={{ display: "block" }}>
      <defs>
        <radialGradient id="dl-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(255,210,120,0.35)" />
          <stop offset="100%" stopColor="rgba(255,180,60,0)" />
        </radialGradient>
      </defs>

      {/* Glow halo */}
      <circle cx="50" cy="56" r="44" fill="url(#dl-glow)" />

      {/* Hanging chain / rod */}
      <rect x="48" y="0" width="4" height="18" rx="2" fill="#b89020" />
      <rect x="46" y="16" width="8" height="4" rx="2" fill="#c8a030" />

      {/* Top canopy / crown */}
      <path d="M32 20 Q50 14 68 20 L64 32 Q50 28 36 32 Z" fill="#b89020" stroke="#a07818" strokeWidth="1" />

      {/* Tier 1 arms */}
      {[0, 60, 120, 180, 240, 300].map((deg, i) => {
        const rad = (deg * Math.PI) / 180;
        const x2 = 50 + 22 * Math.cos(rad);
        const y2 = 40 + 8 * Math.sin(rad);
        return (
          <line key={i} x1={50} y1={36} x2={x2} y2={y2}
            stroke="#b89020" strokeWidth="2" strokeLinecap="round" />
        );
      })}

      {/* Tier 1 crystal drops */}
      {[0, 60, 120, 180, 240, 300].map((deg, i) => {
        const rad = (deg * Math.PI) / 180;
        const cx = 50 + 22 * Math.cos(rad);
        const cy = 40 + 8 * Math.sin(rad);
        return (
          <g key={i}>
            <ellipse cx={cx} cy={cy + 4} rx="3" ry="5" fill="rgba(200,230,255,0.65)" stroke="rgba(200,220,255,0.4)" strokeWidth="0.8" />
            <ellipse cx={cx + 0.5} cy={cy + 2} rx="1" ry="1.5" fill="rgba(255,255,255,0.7)" />
          </g>
        );
      })}

      {/* Center body */}
      <ellipse cx="50" cy="48" rx="10" ry="12" fill="#b89020" stroke="#a07818" strokeWidth="1" />
      <ellipse cx="50" cy="48" rx="7" ry="8" fill="#c8a030" />

      {/* Tier 2 arms — lower, wider */}
      {[30, 90, 150, 210, 270, 330].map((deg, i) => {
        const rad = (deg * Math.PI) / 180;
        const x2 = 50 + 30 * Math.cos(rad);
        const y2 = 60 + 12 * Math.sin(rad);
        return (
          <line key={i} x1={50} y1={56} x2={x2} y2={y2}
            stroke="#b89020" strokeWidth="1.5" strokeLinecap="round" />
        );
      })}

      {/* Tier 2 crystal drops */}
      {[30, 90, 150, 210, 270, 330].map((deg, i) => {
        const rad = (deg * Math.PI) / 180;
        const cx = 50 + 30 * Math.cos(rad);
        const cy = 60 + 12 * Math.sin(rad);
        return (
          <g key={i}>
            <ellipse cx={cx} cy={cy + 5} rx="2.5" ry="6" fill="rgba(210,240,255,0.6)" stroke="rgba(200,230,255,0.35)" strokeWidth="0.7" />
            <ellipse cx={cx + 0.5} cy={cy + 2} rx="0.8" ry="1.5" fill="rgba(255,255,255,0.7)" />
          </g>
        );
      })}

      {/* Center bottom candle */}
      <ellipse cx="50" cy="62" rx="5" ry="3" fill="#b89020" />
      <circle cx="50" cy="58" r="4" fill="rgba(255,220,80,0.5)" />
      <ellipse cx="50" cy="58" rx="2" ry="3" fill="rgba(255,200,60,0.8)" />

      {/* Light rays */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => {
        const rad = (deg * Math.PI) / 180;
        return (
          <line key={i}
            x1={50 + 8 * Math.cos(rad)} y1={58 + 8 * Math.sin(rad)}
            x2={50 + 16 * Math.cos(rad)} y2={58 + 16 * Math.sin(rad)}
            stroke="rgba(255,210,100,0.3)" strokeWidth="1.5" strokeLinecap="round"
          />
        );
      })}
    </svg>
  );
}

// ── Counter Table 古玩柜台 ────────────────────────────────────
export function CounterTableSvg() {
  return (
    <svg viewBox="0 0 200 80" width="100%" height="100%" style={{ display: "block" }}>
      <defs>
        <linearGradient id="ct-top" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3a2410" />
          <stop offset="100%" stopColor="#2a1808" />
        </linearGradient>
        <linearGradient id="ct-front" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2a1808" />
          <stop offset="100%" stopColor="#1a0e06" />
        </linearGradient>
      </defs>

      {/* Floor shadow */}
      <ellipse cx="100" cy="78" rx="90" ry="4" fill="rgba(0,0,0,0.4)" />

      {/* Legs */}
      <rect x="8"   y="56" width="10" height="20" rx="3" fill="#180c04" />
      <rect x="182" y="56" width="10" height="20" rx="3" fill="#180c04" />
      <rect x="54"  y="56" width="8"  height="20" rx="3" fill="#180c04" />
      <rect x="138" y="56" width="8"  height="20" rx="3" fill="#180c04" />

      {/* Main body front */}
      <rect x="6" y="28" width="188" height="34" rx="3" fill="url(#ct-front)" stroke="#3a2010" strokeWidth="1" />

      {/* Front panel decorative lattice */}
      {[30, 70, 100, 130, 170].map((x, i) => (
        <rect key={i} x={x - 16} y="32" width="32" height="26" rx="2" fill="none" stroke="#4a2810" strokeWidth="1" />
      ))}
      {/* Diamond motifs */}
      {[30, 100, 170].map((x, i) => (
        <path key={i} d={`M${x} 35 L${x + 8} 42 L${x} 55 L${x - 8} 42 Z`} fill="none" stroke="#5a3018" strokeWidth="0.8" />
      ))}

      {/* Counter top surface */}
      <rect x="4" y="20" width="192" height="12" rx="3" fill="url(#ct-top)" stroke="#5a3018" strokeWidth="1" />
      <rect x="4" y="20" width="192" height="3" rx="2" fill="rgba(255,255,255,0.06)" />

      {/* Gold trim strip */}
      <rect x="4" y="28" width="192" height="2.5" fill="#c89020" opacity="0.55" />
      <rect x="4" y="20" width="192" height="1.5" fill="#c89020" opacity="0.4" />

      {/* Items on counter */}
      {/* Small vase left */}
      <rect x="18" y="10" width="10" height="12" rx="3" fill="#4a3028" />
      <ellipse cx="23" cy="10" rx="6" ry="3" fill="#5a3828" />
      <ellipse cx="23" cy="22" rx="5" ry="2" fill="#3a2018" />
      {/* Ink brush holder */}
      <rect x="92" y="8" width="16" height="14" rx="2" fill="#2a1808" stroke="#4a2810" strokeWidth="1" />
      {[95,100,105].map((x,i) => (
        <line key={i} x1={x} y1={8} x2={x} y2={3} stroke="#3a2810" strokeWidth="1.5" strokeLinecap="round" />
      ))}
      {/* Small dish right */}
      <ellipse cx="168" cy="19" rx="10" ry="5" fill="#3a4868" stroke="#4a5878" strokeWidth="0.8" />
      <path d="M158 19 Q168 16 178 19" stroke="rgba(200,220,255,0.4)" strokeWidth="0.8" fill="none" />
    </svg>
  );
}

// ── Display Shelf 陈列架 ──────────────────────────────────────
export function DisplayShelfSvg() {
  return (
    <svg viewBox="0 0 100 160" width="100%" height="100%" style={{ display: "block" }}>
      <defs>
        <linearGradient id="ds-wood" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#2a1808" />
          <stop offset="100%" stopColor="#3a2010" />
        </linearGradient>
      </defs>

      {/* Floor shadow */}
      <ellipse cx="50" cy="158" rx="42" ry="4" fill="rgba(0,0,0,0.4)" />

      {/* Back panel */}
      <rect x="8" y="4" width="84" height="152" rx="3" fill="#160c04" />

      {/* Side frames */}
      <rect x="6"  y="4" width="10" height="152" rx="3" fill="url(#ds-wood)" stroke="#4a2810" strokeWidth="0.8" />
      <rect x="84" y="4" width="10" height="152" rx="3" fill="url(#ds-wood)" stroke="#4a2810" strokeWidth="0.8" />

      {/* Top cap */}
      <rect x="4" y="2" width="92" height="8" rx="3" fill="#3a2010" stroke="#5a3018" strokeWidth="0.8" />

      {/* Shelves */}
      {[40, 80, 120].map((y, i) => (
        <rect key={i} x="14" y={y} width="72" height="7" rx="2" fill="#2e1808" stroke="#4a2810" strokeWidth="0.8" />
      ))}

      {/* Shelf items — top shelf */}
      {/* Tall vase */}
      <path d="M24 22 Q22 28 22 36 Q22 42 26 44 Q28 46 30 44 Q34 42 34 36 Q34 28 32 22 Z"
        fill="#4a3060" stroke="#6a4880" strokeWidth="0.8" />
      <ellipse cx="29" cy="22" rx="4" ry="2.5" fill="#5a3870" />
      {/* Decorative blue vase */}
      <rect x="52" y="18" width="16" height="22" rx="4" fill="#2a3868" stroke="#3a4878" strokeWidth="0.8" />
      <ellipse cx="60" cy="18" rx="7" ry="3.5" fill="#3a4878" />
      <path d="M52 30 Q60 26 68 30" stroke="rgba(200,220,255,0.5)" strokeWidth="1" fill="none" />
      {/* Small jar */}
      <ellipse cx="82" cy="38" rx="7" ry="4" fill="#3a2010" />
      <rect x="75" y="26" width="14" height="12" rx="4" fill="#3a2010" stroke="#5a3018" strokeWidth="0.8" />

      {/* Middle shelf items */}
      {/* Incense burner */}
      <ellipse cx="30" cy="80" rx="12" ry="5" fill="#2a1808" stroke="#4a2810" strokeWidth="0.8" />
      <rect x="24" y="66" width="12" height="14" rx="3" fill="#2a1808" stroke="#4a2810" strokeWidth="0.8" />
      <rect x="26" y="62" width="8" height="6" rx="2" fill="#2a2808" />
      {/* Scroll */}
      <rect x="56" y="64" width="24" height="16" rx="3" fill="#d4c890" stroke="#a08040" strokeWidth="0.8" />
      <rect x="58" y="66" width="20" height="3" rx="1" fill="#a08040" opacity="0.5" />
      <rect x="58" y="71" width="20" height="2" rx="1" fill="#a08040" opacity="0.4" />

      {/* Bottom shelf items */}
      {/* Stack of books */}
      <rect x="18" y="110" width="18" height="10" rx="1" fill="#3a1820" stroke="#5a2830" strokeWidth="0.8" />
      <rect x="19" y="108" width="16" height="4"  rx="1" fill="#4a1828" />
      <rect x="20" y="104" width="14" height="6"  rx="1" fill="#2a2840" stroke="#3a3850" strokeWidth="0.8" />
      {/* Bronze figurine */}
      <ellipse cx="65" cy="120" rx="8" ry="3" fill="#4a5010" />
      <rect x="60" y="108" width="10" height="12" rx="2" fill="#4a5010" stroke="#6a7020" strokeWidth="0.8" />
      <ellipse cx="65" cy="108" rx="5" ry="6" fill="#5a6018" />
      <ellipse cx="65" cy="104" rx="3" ry="4" fill="#6a7020" />
    </svg>
  );
}

// ── Plate Stand 盘托架 ────────────────────────────────────────
export function PlateStandSvg() {
  return (
    <svg viewBox="0 0 56 64" width="100%" height="100%" style={{ display: "block" }}>
      {/* Floor shadow */}
      <ellipse cx="28" cy="62" rx="20" ry="3" fill="rgba(0,0,0,0.38)" />

      {/* Tripod legs */}
      <line x1="28" y1="42" x2="8"  y2="60" stroke="#7a6030" strokeWidth="3" strokeLinecap="round" />
      <line x1="28" y1="42" x2="48" y2="60" stroke="#7a6030" strokeWidth="3" strokeLinecap="round" />
      <line x1="28" y1="42" x2="28" y2="60" stroke="#7a6030" strokeWidth="2.5" strokeLinecap="round" />
      {/* Foot caps */}
      <ellipse cx="8"  cy="60" rx="4" ry="2.5" fill="#5a4020" />
      <ellipse cx="48" cy="60" rx="4" ry="2.5" fill="#5a4020" />
      <ellipse cx="28" cy="60" rx="4" ry="2.5" fill="#5a4020" />

      {/* Vertical stem */}
      <rect x="26" y="14" width="4" height="30" rx="2" fill="#8a7040" />

      {/* Ring holder */}
      <ellipse cx="28" cy="20" rx="16" ry="8" fill="none" stroke="#b89030" strokeWidth="3" />
      <ellipse cx="28" cy="20" rx="16" ry="8" fill="none" stroke="#d4a840" strokeWidth="1" opacity="0.6" />

      {/* Decorative ring cap joints */}
      <circle cx="12" cy="20" r="3" fill="#b89030" />
      <circle cx="44" cy="20" r="3" fill="#b89030" />

      {/* Small ornament at top of stem */}
      <circle cx="28" cy="12" r="5" fill="#b89030" stroke="#d4a840" strokeWidth="1" />
      <circle cx="28" cy="12" r="2.5" fill="#d4a840" />
    </svg>
  );
}

// ── Suitcase 手提箱 ───────────────────────────────────────────
export function SuitcaseSvg() {
  return (
    <svg viewBox="0 0 56 38" width="100%" height="100%" style={{ display: "block" }}>
      <defs>
        <linearGradient id="sc-body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#5a3818" />
          <stop offset="100%" stopColor="#3a2010" />
        </linearGradient>
      </defs>
      {/* Floor shadow */}
      <ellipse cx="28" cy="37" rx="24" ry="2.5" fill="rgba(0,0,0,0.38)" />

      {/* Main body */}
      <rect x="4" y="8" width="48" height="28" rx="5" fill="url(#sc-body)" stroke="#6a4828" strokeWidth="1.5" />

      {/* Leather texture lines */}
      <line x1="4"  y1="16" x2="52" y2="16" stroke="rgba(0,0,0,0.15)" strokeWidth="0.8" />
      <line x1="4"  y1="28" x2="52" y2="28" stroke="rgba(0,0,0,0.15)" strokeWidth="0.8" />
      <line x1="14" y1="8"  x2="14" y2="36" stroke="rgba(0,0,0,0.1)"  strokeWidth="0.8" />
      <line x1="42" y1="8"  x2="42" y2="36" stroke="rgba(0,0,0,0.1)"  strokeWidth="0.8" />

      {/* Trim strip / belt strap */}
      <rect x="4" y="19" width="48" height="5" rx="2" fill="#3a2010" stroke="#5a3018" strokeWidth="0.8" />

      {/* Metal clasps */}
      <rect x="20" y="17" width="8" height="9" rx="2" fill="#b89020" stroke="#907010" strokeWidth="1" />
      <rect x="21" y="19" width="6" height="5" rx="1" fill="#907010" />
      <rect x="28" y="17" width="8" height="9" rx="2" fill="#b89020" stroke="#907010" strokeWidth="1" />
      <rect x="29" y="19" width="6" height="5" rx="1" fill="#907010" />

      {/* Corner reinforcements */}
      {[[4,8],[48,8],[4,32],[48,32]].map(([x,y],i) => (
        <circle key={i} cx={x + (i < 2 ? 3 : 3) * (i % 2 === 0 ? 1 : -1)} cy={y + (i < 2 ? 3 : -3)} r="3" fill="#b89020" />
      ))}

      {/* Handle */}
      <path d="M18 8 Q28 2 38 8" stroke="#6a4828" strokeWidth="3" fill="none" strokeLinecap="round" />
      <rect x="16" y="6" width="6" height="4" rx="2" fill="#b89020" />
      <rect x="34" y="6" width="6" height="4" rx="2" fill="#b89020" />
    </svg>
  );
}

// ── Porcelain Plate 粉彩大盘 ──────────────────────────────────
export function PorcelainPlateSvg() {
  return (
    <svg viewBox="0 0 54 54" width="100%" height="100%" style={{ display: "block" }}>
      <defs>
        <radialGradient id="pp-bg" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#f4f0ec" />
          <stop offset="80%" stopColor="#e8e4e0" />
          <stop offset="100%" stopColor="#d0ccc8" />
        </radialGradient>
      </defs>

      {/* Plate base (slightly elevated rim shadow) */}
      <ellipse cx="27" cy="29" rx="24" ry="4" fill="rgba(0,0,0,0.18)" />

      {/* Plate body */}
      <ellipse cx="27" cy="27" rx="24" ry="9" fill="url(#pp-bg)" />
      <ellipse cx="27" cy="27" rx="24" ry="9" fill="none" stroke="#c8c0bc" strokeWidth="1" />

      {/* Rim decorative border */}
      <ellipse cx="27" cy="27" rx="21" ry="7.5" fill="none" stroke="#2840a8" strokeWidth="2" opacity="0.7" />
      {/* Rim pattern dots */}
      {Array.from({ length: 16 }, (_, i) => {
        const angle = (i / 16) * Math.PI * 2;
        return (
          <ellipse key={i}
            cx={27 + 19 * Math.cos(angle)}
            cy={27 + 7 * Math.sin(angle)}
            rx="1.5" ry="0.8"
            fill="#2840a8" opacity="0.65"
            transform={`rotate(${angle * 180 / Math.PI} ${27 + 19 * Math.cos(angle)} ${27 + 7 * Math.sin(angle)})`}
          />
        );
      })}

      {/* Center motif — simplified peach branch */}
      <ellipse cx="27" cy="27" rx="10" ry="4" fill="none" stroke="#2840a8" strokeWidth="1.2" opacity="0.5" />
      <path d="M22 27 Q25 23 27 24 Q30 22 32 27" stroke="#2840a8" strokeWidth="1.2" fill="none" opacity="0.8" />
      <path d="M22 27 Q25 31 27 30 Q30 32 32 27" stroke="#2840a8" strokeWidth="1.2" fill="none" opacity="0.8" />
      {/* Blossoms */}
      {[[24, 24], [30, 24], [27, 22]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="2" fill="#4060c8" opacity="0.65" />
      ))}
      {/* Leaves */}
      <ellipse cx="25" cy="28" rx="2.5" ry="1.2" fill="#2840a8" opacity="0.5" transform="rotate(-20 25 28)" />
      <ellipse cx="29" cy="29" rx="2.5" ry="1.2" fill="#2840a8" opacity="0.5" transform="rotate(20 29 29)" />

      {/* Highlight shimmer */}
      <ellipse cx="22" cy="24" rx="5" ry="2" fill="rgba(255,255,255,0.35)" transform="rotate(-15 22 24)" />
    </svg>
  );
}

// ── Broken Plate 碎盘 ────────────────────────────────────────
export function BrokenPlateSvg() {
  return (
    <svg viewBox="0 0 66 46" width="100%" height="100%" style={{ display: "block" }}>
      <defs>
        <radialGradient id="bp-shard" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#f0ece8" />
          <stop offset="100%" stopColor="#d8d4d0" />
        </radialGradient>
      </defs>

      {/* Shard 1 — large center-left */}
      <path d="M8 28 L20 6 L38 16 L30 34 Z"
        fill="url(#bp-shard)" stroke="#c0bcb8" strokeWidth="0.8" />
      <path d="M10 26 Q20 8 36 14" stroke="#2840a8" strokeWidth="1.2" fill="none" opacity="0.55" />
      <circle cx="22" cy="14" r="2.5" fill="#4060c8" opacity="0.6" />

      {/* Shard 2 — right piece */}
      <path d="M36 14 L56 8 L58 28 L38 34 Z"
        fill="url(#bp-shard)" stroke="#c0bcb8" strokeWidth="0.8" />
      {/* Blue pattern on shard 2 */}
      <path d="M40 18 Q50 14 54 22" stroke="#2840a8" strokeWidth="1.2" fill="none" opacity="0.55" />
      <ellipse cx="48" cy="18" rx="3" ry="1.5" fill="#2840a8" opacity="0.5" transform="rotate(20 48 18)" />

      {/* Shard 3 — bottom */}
      <path d="M20 34 L38 34 L34 44 L16 44 Z"
        fill="url(#bp-shard)" stroke="#c0bcb8" strokeWidth="0.8" />
      <path d="M22 38 Q30 36 34 40" stroke="#2840a8" strokeWidth="1" fill="none" opacity="0.45" />

      {/* Shard 4 — small fragment */}
      <path d="M50 30 L62 26 L62 38 L52 40 Z"
        fill="url(#bp-shard)" stroke="#c0bcb8" strokeWidth="0.8" />

      {/* Shard 5 — tiny top-left chip */}
      <path d="M4 12 L12 8 L14 18 L6 20 Z"
        fill="url(#bp-shard)" stroke="#c0bcb8" strokeWidth="0.8" />

      {/* Crack lines between shards */}
      <line x1="20" y1="6"  x2="38" y2="34" stroke="#a8a4a0" strokeWidth="0.8" opacity="0.6" />
      <line x1="38" y1="16" x2="58" y2="28" stroke="#a8a4a0" strokeWidth="0.8" opacity="0.6" />
      <line x1="30" y1="34" x2="16" y2="44" stroke="#a8a4a0" strokeWidth="0.8" opacity="0.6" />

      {/* Dust/powder at impact point */}
      {[[28,30],[32,26],[24,32]].map(([x,y],i) => (
        <circle key={i} cx={x} cy={y} r={1.5 - i * 0.2} fill="rgba(200,196,192,0.55)" />
      ))}
    </svg>
  );
}

// ── Tea Set 茶具 ─────────────────────────────────────────────
export function TeaSetSvg() {
  return (
    <svg viewBox="0 0 84 46" width="100%" height="100%" style={{ display: "block" }}>
      {/* Tray */}
      <rect x="4" y="34" width="76" height="8" rx="3" fill="#2a1808" stroke="#3a2010" strokeWidth="0.8" />
      <rect x="4" y="34" width="76" height="2" rx="2" fill="rgba(255,255,255,0.06)" />

      {/* Teapot body */}
      <ellipse cx="22" cy="30" rx="14" ry="9" fill="#4a2818" stroke="#5a3820" strokeWidth="1" />
      <ellipse cx="22" cy="30" rx="11" ry="7" fill="#3a1e10" />
      {/* Teapot lid */}
      <ellipse cx="22" cy="22" rx="8" ry="3.5" fill="#4a2818" stroke="#5a3820" strokeWidth="0.8" />
      <ellipse cx="22" cy="20" rx="4" ry="2" fill="#5a3020" />
      <circle cx="22" cy="18" r="2.5" fill="#6a3828" />
      {/* Teapot spout */}
      <path d="M34 28 Q42 24 44 20" stroke="#4a2818" strokeWidth="5" fill="none" strokeLinecap="round" />
      <path d="M34 28 Q42 24 44 20" stroke="#3a1e10" strokeWidth="3" fill="none" strokeLinecap="round" />
      {/* Teapot handle */}
      <path d="M8 24 Q2 30 8 36" stroke="#4a2818" strokeWidth="4" fill="none" strokeLinecap="round" />

      {/* Tea cup 1 */}
      <path d="M52 28 Q50 34 56 36 Q62 38 64 34 Q66 28 64 26 Q58 24 52 28 Z"
        fill="#3a1e10" stroke="#4a2818" strokeWidth="0.8" />
      <path d="M52 28 Q58 26 64 26" stroke="rgba(255,255,255,0.08)" strokeWidth="0.8" fill="none" />
      {/* Cup 1 saucer */}
      <ellipse cx="58" cy="36" rx="8" ry="3" fill="#2e1608" stroke="#3a2010" strokeWidth="0.8" />
      {/* Tea surface in cup 1 */}
      <ellipse cx="58" cy="28" rx="5" ry="2" fill="#6a3010" opacity="0.7" />

      {/* Tea cup 2 */}
      <path d="M68 28 Q66 34 72 36 Q78 38 80 34 Q82 28 80 26 Q74 24 68 28 Z"
        fill="#3a1e10" stroke="#4a2818" strokeWidth="0.8" />
      <path d="M68 28 Q74 26 80 26" stroke="rgba(255,255,255,0.08)" strokeWidth="0.8" fill="none" />
      {/* Cup 2 saucer */}
      <ellipse cx="74" cy="36" rx="8" ry="3" fill="#2e1608" stroke="#3a2010" strokeWidth="0.8" />
      {/* Tea surface in cup 2 */}
      <ellipse cx="74" cy="28" rx="5" ry="2" fill="#6a3010" opacity="0.7" />

      {/* Steam wisps */}
      <path d="M20 18 Q22 12 20 8"  stroke="rgba(255,255,255,0.2)" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      <path d="M24 16 Q26 10 24 6"  stroke="rgba(255,255,255,0.15)" strokeWidth="1" fill="none" strokeLinecap="round" />
      <path d="M57 24 Q58 20 57 16" stroke="rgba(255,255,255,0.15)" strokeWidth="1" fill="none" strokeLinecap="round" />
      <path d="M73 24 Q74 20 73 16" stroke="rgba(255,255,255,0.15)" strokeWidth="1" fill="none" strokeLinecap="round" />
    </svg>
  );
}

// ── Signboard 艺园斋 ──────────────────────────────────────────
export function SignboardYiyuanzhaiSvg() {
  return (
    <svg viewBox="0 0 130 44" width="100%" height="100%" style={{ display: "block" }}>
      <defs>
        <linearGradient id="sb-wood" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4a2c10" />
          <stop offset="100%" stopColor="#2e1808" />
        </linearGradient>
      </defs>

      {/* Hanging cords */}
      <line x1="30" y1="0" x2="30" y2="6"  stroke="#5a4020" strokeWidth="2" />
      <line x1="100" y1="0" x2="100" y2="6" stroke="#5a4020" strokeWidth="2" />

      {/* Board body */}
      <rect x="4" y="6" width="122" height="34" rx="3" fill="url(#sb-wood)" stroke="#5a3818" strokeWidth="1.5" />

      {/* Board highlight */}
      <rect x="4" y="6" width="122" height="5" rx="3" fill="rgba(255,255,255,0.05)" />

      {/* Gold border frame */}
      <rect x="7" y="9" width="116" height="28" rx="2" fill="none" stroke="#c89020" strokeWidth="1.2" />
      <rect x="9" y="11" width="112" height="24" rx="1" fill="none" stroke="#c89020" strokeWidth="0.5" opacity="0.5" />

      {/* Corner ornaments */}
      {[[7,9],[119,9],[7,33],[119,33]].map(([x,y],i) => (
        <circle key={i} cx={x + (i%2===0?3:-3)} cy={y + (i<2?3:-3)} r="3.5" fill="#c89020" opacity="0.7" />
      ))}

      {/* Characters "艺园斋" in gold */}
      <text x="65" y="30" textAnchor="middle" fontFamily="serif" fontSize="18" fontWeight="bold"
        fill="#d4a828" letterSpacing="6">艺园斋</text>

      {/* Red stamp-like mark */}
      <rect x="106" y="12" width="14" height="14" rx="2" fill="none" stroke="#c82828" strokeWidth="1" opacity="0.6" />
      <text x="113" y="23" textAnchor="middle" fontFamily="serif" fontSize="9" fill="#c82828" opacity="0.7">印</text>

      {/* Wood grain lines */}
      <line x1="4"  y1="24" x2="126" y2="24" stroke="rgba(0,0,0,0.1)" strokeWidth="0.5" />
      <line x1="4"  y1="30" x2="126" y2="30" stroke="rgba(0,0,0,0.08)" strokeWidth="0.5" />
    </svg>
  );
}

// ── Ashtray (烟灰缸) ──────────────────────────────────────────
export function AshtraySvg() {
  return (
    <svg viewBox="0 0 44 28" width="100%" height="100%" style={{ display: "block" }}>
      {/* Shadow */}
      <ellipse cx="22" cy="26" rx="18" ry="3" fill="rgba(0,0,0,0.25)" />
      {/* Bowl */}
      <path d="M4 14 Q6 26 22 26 Q38 26 40 14 L36 10 Q22 8 8 10 Z" fill="#c8c0b0" />
      {/* Rim */}
      <ellipse cx="22" cy="14" rx="18" ry="5" fill="#ddd8c8" />
      <ellipse cx="22" cy="14" rx="13" ry="3.5" fill="#b8b0a0" />
      {/* Ash residue */}
      <ellipse cx="22" cy="14" rx="8" ry="2" fill="rgba(80,80,80,0.35)" />
      {/* Cigarette rest notch left */}
      <rect x="3" y="12" width="5" height="4" rx="1" fill="#b8b0a0" />
      {/* Cigarette rest notch right */}
      <rect x="36" y="12" width="5" height="4" rx="1" fill="#b8b0a0" />
    </svg>
  );
}

// ── Cigarette (香烟) ──────────────────────────────────────────
export function CigaretteSvg() {
  return (
    <svg viewBox="0 0 36 12" width="100%" height="100%" style={{ display: "block" }}>
      {/* Smoke wisps */}
      <path d="M4 4 Q3 0 5 -3" stroke="rgba(200,200,200,0.55)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M6 3 Q8 -1 6 -4" stroke="rgba(200,200,200,0.4)" strokeWidth="1" fill="none" strokeLinecap="round" />
      {/* Filter end */}
      <rect x="24" y="4" width="10" height="4" rx="2" fill="#d4a040" />
      {/* Paper body */}
      <rect x="5" y="4" width="19" height="4" rx="2" fill="#f0ede8" />
      {/* Lit tip */}
      <ellipse cx="4" cy="6" rx="3" ry="2.5" fill="#e05020" />
      <ellipse cx="4" cy="6" rx="1.5" ry="1.2" fill="#ffcc44" opacity="0.8" />
    </svg>
  );
}

// ── Wristwatch (手表) ─────────────────────────────────────────
export function WristwatchSvg() {
  return (
    <svg viewBox="0 0 40 40" width="100%" height="100%" style={{ display: "block" }}>
      {/* Strap top */}
      <rect x="14" y="0" width="12" height="10" rx="3" fill="#4a3020" />
      {/* Strap bottom */}
      <rect x="14" y="30" width="12" height="10" rx="3" fill="#4a3020" />
      {/* Case */}
      <circle cx="20" cy="20" r="12" fill="#c0c0c8" stroke="#888898" strokeWidth="1.5" />
      <circle cx="20" cy="20" r="10" fill="#f0f4f8" />
      {/* 12/6 markers */}
      <rect x="19" y="11" width="2" height="3" rx="1" fill="#333" />
      <rect x="19" y="26" width="2" height="3" rx="1" fill="#333" />
      {/* 3/9 markers */}
      <rect x="27" y="19" width="3" height="2" rx="1" fill="#333" />
      <rect x="10" y="19" width="3" height="2" rx="1" fill="#333" />
      {/* Hour hand */}
      <line x1="20" y1="20" x2="20" y2="13" stroke="#222" strokeWidth="2" strokeLinecap="round" />
      {/* Minute hand */}
      <line x1="20" y1="20" x2="26" y2="18" stroke="#222" strokeWidth="1.5" strokeLinecap="round" />
      {/* Center dot */}
      <circle cx="20" cy="20" r="1.5" fill="#555" />
    </svg>
  );
}

// ── Invitation Card (请柬) ────────────────────────────────────
export function InvitationCardSvg() {
  return (
    <svg viewBox="0 0 56 40" width="100%" height="100%" style={{ display: "block" }}>
      {/* Shadow */}
      <ellipse cx="28" cy="38" rx="22" ry="3" fill="rgba(0,0,0,0.2)" />
      {/* Card body */}
      <rect x="4" y="4" width="48" height="32" rx="3" fill="#fdf6e8" stroke="#d4b860" strokeWidth="1.5" />
      {/* Gold border inner */}
      <rect x="7" y="7" width="42" height="26" rx="2" fill="none" stroke="#d4b860" strokeWidth="0.8" opacity="0.6" />
      {/* Red seal circle */}
      <circle cx="28" cy="20" r="8" fill="none" stroke="#c82828" strokeWidth="1.2" />
      <text x="28" y="24" textAnchor="middle" fontFamily="serif" fontSize="9" fill="#c82828" fontWeight="bold">请</text>
      {/* Decorative corner flourishes */}
      <path d="M10 10 Q14 10 14 14" stroke="#d4b860" strokeWidth="1" fill="none" />
      <path d="M46 10 Q42 10 42 14" stroke="#d4b860" strokeWidth="1" fill="none" />
      <path d="M10 30 Q14 30 14 26" stroke="#d4b860" strokeWidth="1" fill="none" />
      <path d="M46 30 Q42 30 42 26" stroke="#d4b860" strokeWidth="1" fill="none" />
    </svg>
  );
}

// ── Smoke Effect (烟雾/爆炸特效) ──────────────────────────────
export function SmokeEffectSvg() {
  return (
    <svg viewBox="0 0 100 100" width="100%" height="100%" style={{ display: "block" }}>
      <defs>
        <radialGradient id="smoke-g" cx="50%" cy="60%" r="50%">
          <stop offset="0%" stopColor="rgba(240,240,240,0.9)" />
          <stop offset="70%" stopColor="rgba(200,200,200,0.5)" />
          <stop offset="100%" stopColor="rgba(180,180,180,0)" />
        </radialGradient>
      </defs>
      {/* Main smoke cloud */}
      <ellipse cx="50" cy="58" rx="38" ry="30" fill="url(#smoke-g)" />
      <ellipse cx="34" cy="50" rx="22" ry="18" fill="rgba(220,220,220,0.6)" />
      <ellipse cx="66" cy="48" rx="20" ry="17" fill="rgba(220,220,220,0.55)" />
      <ellipse cx="50" cy="38" rx="18" ry="16" fill="rgba(235,235,235,0.65)" />
      <ellipse cx="50" cy="26" rx="12" ry="10" fill="rgba(245,245,245,0.5)" />
      {/* Flash center */}
      <ellipse cx="50" cy="60" rx="14" ry="10" fill="rgba(255,220,100,0.45)" />
      <ellipse cx="50" cy="62" rx="7" ry="5" fill="rgba(255,150,40,0.35)" />
      {/* Debris sparks */}
      {([[20,72],[36,82],[50,86],[64,82],[80,72]] as [number,number][]).map(([x,y],i) => (
        <circle key={i} cx={x} cy={y} r={2} fill="rgba(200,180,100,0.55)" />
      ))}
    </svg>
  );
}

// ── Food Set (酒菜陈设) ───────────────────────────────────────
export function FoodSetSvg() {
  return (
    <svg viewBox="0 0 110 50" width="100%" height="100%" style={{ display: "block" }}>
      {/* Shadow */}
      <ellipse cx="55" cy="48" rx="48" ry="3.5" fill="rgba(0,0,0,0.2)" />
      {/* Wine jug left */}
      <ellipse cx="18" cy="34" rx="10" ry="12" fill="#8b3a20" />
      <rect x="12" y="22" width="12" height="14" rx="5" fill="#a04020" />
      <ellipse cx="18" cy="22" rx="6" ry="3" fill="#c05030" />
      <rect x="24" y="27" width="6" height="3" rx="1.5" fill="#8b3a20" />
      {/* Small cup */}
      <path d="M30 36 Q34 44 38 44 Q42 44 46 36 Z" fill="#d4c080" />
      <line x1="30" y1="36" x2="46" y2="36" stroke="#b8a060" strokeWidth="1.5" />
      {/* Bowl of food center */}
      <ellipse cx="62" cy="40" rx="18" ry="6" fill="#e8d8b0" />
      <ellipse cx="62" cy="38" rx="16" ry="5" fill="#f0e4c0" />
      <ellipse cx="62" cy="36" rx="12" ry="4" fill="#d4a858" />
      {/* Chopsticks */}
      <line x1="76" y1="28" x2="88" y2="46" stroke="#7a4010" strokeWidth="2" strokeLinecap="round" />
      <line x1="79" y1="28" x2="91" y2="46" stroke="#7a4010" strokeWidth="2" strokeLinecap="round" />
      {/* Small plate right */}
      <ellipse cx="98" cy="42" rx="10" ry="4" fill="#e8e0d0" />
      <ellipse cx="98" cy="40" rx="8" ry="3" fill="#d4c8b0" />
    </svg>
  );
}

// ── Silver Note (银票) ────────────────────────────────────────
export function SilverNoteSvg() {
  return (
    <svg viewBox="0 0 52 28" width="100%" height="100%" style={{ display: "block" }}>
      {/* Shadow */}
      <ellipse cx="26" cy="26.5" rx="22" ry="2.5" fill="rgba(0,0,0,0.18)" />
      {/* Note body */}
      <rect x="2" y="4" width="48" height="20" rx="2" fill="#f4f0e4" stroke="#a09060" strokeWidth="1.2" />
      {/* Decorative border lines */}
      <rect x="5" y="7" width="42" height="14" rx="1" fill="none" stroke="#a09060" strokeWidth="0.6" opacity="0.5" />
      {/* 银 character center */}
      <text x="26" y="18" textAnchor="middle" fontFamily="serif" fontSize="11" fill="#6a5820" fontWeight="bold">銀</text>
      {/* Value marks */}
      <rect x="7" y="9" width="8" height="10" rx="1" fill="rgba(160,144,96,0.15)" />
      <text x="11" y="17" textAnchor="middle" fontFamily="serif" fontSize="7" fill="#8a7030">票</text>
      <rect x="37" y="9" width="8" height="10" rx="1" fill="rgba(160,144,96,0.15)" />
      <text x="41" y="17" textAnchor="middle" fontFamily="serif" fontSize="7" fill="#8a7030">票</text>
      {/* Fold crease */}
      <line x1="2" y1="14" x2="50" y2="14" stroke="rgba(160,144,96,0.25)" strokeWidth="0.8" />
    </svg>
  );
}

// ── Dispatcher ───────────────────────────────────────────────
export function PropSvgForKind({ kind }: { kind: StagePropKind }) {
  switch (kind) {
    case "magic_box":            return <MagicBoxSvg />;
    case "carriage":             return <CarriageSvg />;
    case "parade_umbrella":      return <ParadeUmbrellaSvg />;
    case "microphone_stand":     return <MicrophoneStandSvg />;
    case "shoe":                 return <ShoeSvg />;
    case "bed":                  return <BedSvg />;
    case "dance_light":          return <DanceLightSvg />;
    case "counter_table":        return <CounterTableSvg />;
    case "display_shelf":        return <DisplayShelfSvg />;
    case "plate_stand":          return <PlateStandSvg />;
    case "suitcase":             return <SuitcaseSvg />;
    case "porcelain_plate":      return <PorcelainPlateSvg />;
    case "broken_plate":         return <BrokenPlateSvg />;
    case "tea_set":              return <TeaSetSvg />;
    case "signboard_yiyuanzhai": return <SignboardYiyuanzhaiSvg />;
    case "ashtray":              return <AshtraySvg />;
    case "cigarette":            return <CigaretteSvg />;
    case "wristwatch":           return <WristwatchSvg />;
    case "invitation_card":      return <InvitationCardSvg />;
    case "smoke_effect":         return <SmokeEffectSvg />;
    case "food_set":             return <FoodSetSvg />;
    case "silver_note":          return <SilverNoteSvg />;
    default:                     return null;
  }
}
