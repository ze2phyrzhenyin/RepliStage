/**
 * Inline SVG character illustrations — parameterised by skin / hair colour.
 * viewBox="0 0 160 300" — same aspect ratio as the file-based SVGs.
 * All components render at width="100%" height="100%".
 */

// ── Belle Mère ───────────────────────────────────────────────
export function BelleMereSvg({
  skin, hair, pose = "stand",
}: { skin: string; hair: string; pose?: "stand" | "sit" }) {
  if (pose === "sit") {
    return (
      <svg viewBox="0 0 160 300" width="100%" height="100%" style={{ overflow: "visible" }}>
        {/* Hair bun */}
        <ellipse cx="80" cy="34" rx="24" ry="10" fill={hair} />
        <ellipse cx="80" cy="28" rx="14" ry="9" fill={hair} />
        {/* Head */}
        <ellipse cx="80" cy="62" rx="26" ry="30" fill={skin} />
        {/* Eyes */}
        <ellipse cx="70" cy="58" rx="4" ry="3.5" fill="#fff" />
        <ellipse cx="90" cy="58" rx="4" ry="3.5" fill="#fff" />
        <circle cx="70" cy="58" r="2.2" fill="#2a1608" />
        <circle cx="90" cy="58" r="2.2" fill="#2a1608" />
        {/* Eyebrow — arched */}
        <path d="M64 52 Q70 48 76 52" stroke={hair} strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <path d="M84 52 Q90 48 96 52" stroke={hair} strokeWidth="2.5" fill="none" strokeLinecap="round" />
        {/* Nose */}
        <ellipse cx="80" cy="70" rx="4" ry="3" fill={skin} stroke="rgba(0,0,0,0.12)" strokeWidth="1" />
        {/* Mouth — terse */}
        <path d="M73 80 Q80 84 87 80" stroke="#b05050" strokeWidth="2" fill="none" strokeLinecap="round" />
        {/* Neck */}
        <rect x="72" y="90" width="16" height="14" rx="6" fill={skin} />
        {/* Pearl necklace */}
        <path d="M60 100 Q80 112 100 100" stroke="none" fill="none" />
        {[...Array(8)].map((_, i) => (
          <circle key={i} cx={62 + i * 5.5} cy={102 + Math.sin(i * 0.7) * 6} r="3" fill="#f0ece0" stroke="#d4c89a" strokeWidth="0.8" />
        ))}
        {/* Bodice — wine red */}
        <path d="M50 104 L110 104 L108 148 L52 148 Z" fill="#7a2030" />
        <rect x="74" y="104" width="12" height="44" fill="#8a2838" />
        {/* Seated skirt — spread wide */}
        <path d="M30 148 Q80 162 130 148 L128 240 Q80 252 32 240 Z" fill="#922840" />
        {/* Skirt highlight */}
        <path d="M45 148 Q80 158 115 148" stroke="#b03c50" strokeWidth="2" fill="none" opacity="0.5" />
        {/* Arms */}
        <path d="M50 108 Q30 130 28 158" stroke={skin} strokeWidth="14" fill="none" strokeLinecap="round" />
        <path d="M110 108 Q130 130 132 158" stroke={skin} strokeWidth="14" fill="none" strokeLinecap="round" />
        {/* Hands */}
        <ellipse cx="28" cy="162" rx="9" ry="7" fill={skin} />
        <ellipse cx="132" cy="162" rx="9" ry="7" fill={skin} />
        {/* Fan in right hand */}
        <path d="M132 162 Q148 140 152 128" stroke="#c8a040" strokeWidth="2" fill="none" />
        <path d="M132 162 Q150 148 158 138" stroke="#c8a040" strokeWidth="1.5" fill="none" />
        <path d="M138 142 Q150 138 158 134" stroke="#c8a040" strokeWidth="1" fill="none" />
        {/* Floor shadow */}
        <ellipse cx="80" cy="295" rx="48" ry="6" fill="rgba(0,0,0,0.18)" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 160 300" width="100%" height="100%" style={{ overflow: "visible" }}>
      {/* Hair upswept bun */}
      <ellipse cx="80" cy="30" rx="26" ry="11" fill={hair} />
      <ellipse cx="80" cy="24" rx="16" ry="10" fill={hair} />
      <ellipse cx="80" cy="18" rx="10" ry="7" fill={hair} />
      {/* Hair sides */}
      <ellipse cx="58" cy="52" rx="10" ry="18" fill={hair} />
      <ellipse cx="102" cy="52" rx="10" ry="18" fill={hair} />
      {/* Head */}
      <ellipse cx="80" cy="64" rx="26" ry="30" fill={skin} />
      {/* Eyes */}
      <ellipse cx="70" cy="60" rx="4" ry="3.5" fill="#fff" />
      <ellipse cx="90" cy="60" rx="4" ry="3.5" fill="#fff" />
      <circle cx="70" cy="60" r="2.2" fill="#2a1608" />
      <circle cx="90" cy="60" r="2.2" fill="#2a1608" />
      <path d="M64 54 Q70 50 76 54" stroke={hair} strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M84 54 Q90 50 96 54" stroke={hair} strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <ellipse cx="80" cy="72" rx="4" ry="3" fill={skin} stroke="rgba(0,0,0,0.12)" strokeWidth="1" />
      <path d="M73 82 Q80 86 87 82" stroke="#b05050" strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* Neck */}
      <rect x="72" y="92" width="16" height="14" rx="6" fill={skin} />
      {/* Pearl necklace */}
      {[...Array(8)].map((_, i) => (
        <circle key={i} cx={62 + i * 5.5} cy={104 + Math.sin(i * 0.7) * 6} r="3" fill="#f0ece0" stroke="#d4c89a" strokeWidth="0.8" />
      ))}
      {/* Bodice */}
      <path d="M50 106 L110 106 L108 168 L52 168 Z" fill="#7a2030" />
      <rect x="74" y="106" width="12" height="62" fill="#8a2838" />
      {/* Skirt — A-line */}
      <path d="M50 168 Q30 200 26 290 L134 290 Q130 200 110 168 Z" fill="#922840" />
      {/* Skirt shading */}
      <path d="M68 168 Q60 220 58 290" stroke="rgba(0,0,0,0.12)" strokeWidth="2" fill="none" />
      <path d="M92 168 Q100 220 102 290" stroke="rgba(0,0,0,0.12)" strokeWidth="2" fill="none" />
      {/* Arms */}
      <path d="M50 116 Q28 148 26 180" stroke={skin} strokeWidth="14" fill="none" strokeLinecap="round" />
      <path d="M110 116 Q132 148 134 180" stroke={skin} strokeWidth="14" fill="none" strokeLinecap="round" />
      <ellipse cx="26" cy="184" rx="9" ry="7" fill={skin} />
      <ellipse cx="134" cy="184" rx="9" ry="7" fill={skin} />
      <ellipse cx="80" cy="295" rx="40" ry="5" fill="rgba(0,0,0,0.18)" />
    </svg>
  );
}

// ── Soeur Grande ─────────────────────────────────────────────
export function SoeurGrandeSvg({ skin, hair, pose = "stand" }: { skin: string; hair: string; pose?: "stand" | "sit" }) {
  if (pose === "sit") {
    return (
      <svg viewBox="0 0 160 300" width="100%" height="100%" style={{ overflow: "visible" }}>
        {/* Towering updo */}
        <ellipse cx="80" cy="12" rx="18" ry="14" fill={hair} />
        <ellipse cx="80" cy="24" rx="22" ry="16" fill={hair} />
        {/* Ostrich feather */}
        <path d="M88 8 Q100 -8 112 -14 Q106 0 100 12 Q94 8 88 8" fill="#e8d4b0" opacity="0.85" />
        <path d="M92 6 Q108 -4 118 -8 Q110 6 102 14" fill="#f0e4c4" opacity="0.6" />
        {/* Hair sides */}
        <ellipse cx="56" cy="50" rx="8" ry="18" fill={hair} />
        <ellipse cx="104" cy="50" rx="8" ry="18" fill={hair} />
        {/* Head */}
        <ellipse cx="80" cy="62" rx="24" ry="30" fill={skin} />
        {/* Heavy kohl eye makeup */}
        <ellipse cx="69" cy="57" rx="6" ry="4" fill="#1a0808" />
        <ellipse cx="91" cy="57" rx="6" ry="4" fill="#1a0808" />
        <ellipse cx="69" cy="56" rx="4" ry="3" fill="#fff" />
        <ellipse cx="91" cy="56" rx="4" ry="3" fill="#fff" />
        <circle cx="69" cy="56" r="2" fill="#2a1008" />
        <circle cx="91" cy="56" r="2" fill="#2a1008" />
        <path d="M62 54 L58 51" stroke="#1a0808" strokeWidth="2" strokeLinecap="round" />
        <path d="M98 54 L102 51" stroke="#1a0808" strokeWidth="2" strokeLinecap="round" />
        <ellipse cx="80" cy="70" rx="3.5" ry="3" fill={skin} stroke="rgba(0,0,0,0.1)" strokeWidth="1" />
        <path d="M73 80 Q80 85 87 80" stroke="#c04060" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        {/* Neck */}
        <rect x="73" y="90" width="14" height="12" rx="6" fill={skin} />
        {/* Heavy necklace */}
        <path d="M58 100 Q80 114 102 100" stroke="#c8a428" strokeWidth="3" fill="none" />
        {[...Array(5)].map((_, i) => (
          <circle key={i} cx={66 + i * 8} cy={106 + Math.sin(i * 0.9) * 5} r="5" fill="#d4b030" stroke="#a88020" strokeWidth="1" />
        ))}
        {/* Bodice — amber/gold */}
        <path d="M48 102 L112 102 L110 148 L50 148 Z" fill="#b87820" />
        <rect x="74" y="102" width="12" height="46" fill="#c88828" />
        {/* Seated skirt — spread wide, 3 tiers */}
        <path d="M28 148 Q80 162 132 148 L130 238 Q80 252 30 238 Z" fill="#c88828" />
        <path d="M34 182 Q80 198 126 182 Q118 206 80 214 Q42 206 34 182" fill="#b87820" />
        <path d="M30 218 Q80 234 130 218 Q122 244 80 250 Q38 244 30 218" fill="#a06818" />
        {/* Arms — resting on lap */}
        <path d="M48 108 Q30 130 28 155" stroke={skin} strokeWidth="13" fill="none" strokeLinecap="round" />
        <path d="M112 108 Q130 130 132 155" stroke={skin} strokeWidth="13" fill="none" strokeLinecap="round" />
        <ellipse cx="28" cy="159" rx="9" ry="7" fill={skin} />
        <ellipse cx="132" cy="159" rx="9" ry="7" fill={skin} />
        {/* Floor shadow */}
        <ellipse cx="80" cy="295" rx="48" ry="6" fill="rgba(0,0,0,0.18)" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 160 300" width="100%" height="100%" style={{ overflow: "visible" }}>
      {/* Towering updo */}
      <ellipse cx="80" cy="12" rx="18" ry="14" fill={hair} />
      <ellipse cx="80" cy="24" rx="22" ry="16" fill={hair} />
      {/* Ostrich feather */}
      <path d="M88 8 Q100 -8 112 -14 Q106 0 100 12 Q94 8 88 8" fill="#e8d4b0" opacity="0.85" />
      <path d="M92 6 Q108 -4 118 -8 Q110 6 102 14" fill="#f0e4c4" opacity="0.6" />
      {/* Hair sides */}
      <ellipse cx="56" cy="52" rx="8" ry="20" fill={hair} />
      <ellipse cx="104" cy="52" rx="8" ry="20" fill={hair} />
      {/* Head — slightly longer face */}
      <ellipse cx="80" cy="68" rx="24" ry="32" fill={skin} />
      {/* Heavy kohl eye makeup */}
      <ellipse cx="69" cy="62" rx="6" ry="4" fill="#1a0808" />
      <ellipse cx="91" cy="62" rx="6" ry="4" fill="#1a0808" />
      <ellipse cx="69" cy="61" rx="4" ry="3" fill="#fff" />
      <ellipse cx="91" cy="61" rx="4" ry="3" fill="#fff" />
      <circle cx="69" cy="61" r="2" fill="#2a1008" />
      <circle cx="91" cy="61" r="2" fill="#2a1008" />
      {/* Eyeliner flick */}
      <path d="M62 59 L58 56" stroke="#1a0808" strokeWidth="2" strokeLinecap="round" />
      <path d="M98 59 L102 56" stroke="#1a0808" strokeWidth="2" strokeLinecap="round" />
      <ellipse cx="80" cy="75" rx="3.5" ry="3" fill={skin} stroke="rgba(0,0,0,0.1)" strokeWidth="1" />
      <path d="M73 85 Q80 90 87 85" stroke="#c04060" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <rect x="73" y="98" width="14" height="14" rx="6" fill={skin} />
      {/* Heavy necklace */}
      <path d="M58 108 Q80 122 102 108" stroke="#c8a428" strokeWidth="3" fill="none" />
      {[...Array(5)].map((_, i) => (
        <circle key={i} cx={66 + i * 8} cy={114 + Math.sin(i * 0.9) * 5} r="5" fill="#d4b030" stroke="#a88020" strokeWidth="1" />
      ))}
      {/* Bodice — amber/gold */}
      <path d="M48 110 L112 110 L110 170 L50 170 Z" fill="#b87820" />
      <rect x="74" y="110" width="12" height="60" fill="#c88828" />
      {/* Flounce skirt — 3 tiers */}
      <path d="M48 170 Q28 186 22 240 L138 240 Q132 186 112 170 Z" fill="#c88828" />
      <path d="M38 198 Q80 214 122 198 Q114 220 80 230 Q46 220 38 198" fill="#b87820" />
      <path d="M30 230 Q80 248 130 230 Q122 260 80 268 Q38 260 30 230" fill="#a06818" />
      {/* Arms */}
      <path d="M48 124 Q26 156 24 190" stroke={skin} strokeWidth="13" fill="none" strokeLinecap="round" />
      <path d="M112 124 Q134 156 136 190" stroke={skin} strokeWidth="13" fill="none" strokeLinecap="round" />
      {/* Hand on hip gesture */}
      <ellipse cx="24" cy="193" rx="9" ry="7" fill={skin} />
      <ellipse cx="136" cy="193" rx="9" ry="7" fill={skin} />
      <ellipse cx="80" cy="295" rx="40" ry="5" fill="rgba(0,0,0,0.18)" />
    </svg>
  );
}

// ── Soeur Petite ─────────────────────────────────────────────
export function SoeurPetiteSvg({ skin, hair, pose = "stand" }: { skin: string; hair: string; pose?: "stand" | "sit" }) {
  if (pose === "sit") {
    return (
      <svg viewBox="0 0 160 300" width="100%" height="100%" style={{ overflow: "visible" }}>
        {/* Large bow */}
        <path d="M58 20 Q64 12 72 18 Q80 24 72 28 Q64 32 58 24 Z" fill="#4aaa8a" />
        <path d="M102 20 Q96 12 88 18 Q80 24 88 28 Q96 32 102 24 Z" fill="#4aaa8a" />
        <circle cx="80" cy="22" r="7" fill="#5abba0" />
        {/* Hair */}
        <ellipse cx="80" cy="40" rx="26" ry="16" fill={hair} />
        <ellipse cx="58" cy="54" rx="10" ry="16" fill={hair} />
        <ellipse cx="102" cy="54" rx="10" ry="16" fill={hair} />
        {/* Head */}
        <ellipse cx="80" cy="64" rx="28" ry="28" fill={skin} />
        {/* Big eyes */}
        <ellipse cx="69" cy="58" rx="7" ry="6" fill="#fff" />
        <ellipse cx="91" cy="58" rx="7" ry="6" fill="#fff" />
        <circle cx="69" cy="59" r="4" fill="#3a2010" />
        <circle cx="91" cy="59" r="4" fill="#3a2010" />
        <circle cx="70" cy="57" r="1.5" fill="#fff" />
        <circle cx="92" cy="57" r="1.5" fill="#fff" />
        {[-3,-1,1,3,5].map((x, i) => (
          <line key={i} x1={66+x} y1="52" x2={65+x} y2="49" stroke={hair} strokeWidth="1.2" strokeLinecap="round" />
        ))}
        {[-3,-1,1,3,5].map((x, i) => (
          <line key={i} x1={88+x} y1="52" x2={87+x} y2="49" stroke={hair} strokeWidth="1.2" strokeLinecap="round" />
        ))}
        <circle cx="80" cy="70" r="3.5" fill={skin} stroke="rgba(0,0,0,0.15)" strokeWidth="1" />
        <path d="M72 80 Q80 86 88 80" stroke="#d06070" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <circle cx="52" cy="66" r="4" fill="#f0ece0" stroke="#d4c89a" strokeWidth="1" />
        <circle cx="108" cy="66" r="4" fill="#f0ece0" stroke="#d4c89a" strokeWidth="1" />
        {/* Neck */}
        <rect x="72" y="90" width="16" height="12" rx="7" fill={skin} />
        {/* Bodice — teal */}
        <path d="M50 102 L110 102 L108 148 L52 148 Z" fill="#3a9878" />
        {/* Seated skirt — spread, 3 tiers */}
        <path d="M28 148 Q80 162 132 148 L130 232 Q80 246 30 232 Z" fill="#3a9878" />
        <path d="M34 178 Q80 194 126 178 Q118 202 80 210 Q42 202 34 178" fill="#2e7860" opacity="0.9" />
        <path d="M30 212 Q80 228 130 212 Q122 238 80 244 Q38 238 30 212" fill="#3a9878" opacity="0.85" />
        {/* Arms — bent, resting */}
        <path d="M50 112 Q30 132 28 154" stroke={skin} strokeWidth="13" fill="none" strokeLinecap="round" />
        <path d="M110 112 Q130 132 132 154" stroke={skin} strokeWidth="13" fill="none" strokeLinecap="round" />
        <ellipse cx="28" cy="158" rx="8" ry="7" fill={skin} />
        <ellipse cx="132" cy="158" rx="8" ry="7" fill={skin} />
        <ellipse cx="80" cy="295" rx="46" ry="6" fill="rgba(0,0,0,0.18)" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 160 300" width="100%" height="100%" style={{ overflow: "visible" }}>
      {/* Large bow */}
      <path d="M58 22 Q64 14 72 20 Q80 26 72 30 Q64 34 58 26 Z" fill="#4aaa8a" />
      <path d="M102 22 Q96 14 88 20 Q80 26 88 30 Q96 34 102 26 Z" fill="#4aaa8a" />
      <circle cx="80" cy="24" r="7" fill="#5abba0" />
      {/* Hair */}
      <ellipse cx="80" cy="44" rx="26" ry="16" fill={hair} />
      <ellipse cx="58" cy="58" rx="10" ry="18" fill={hair} />
      <ellipse cx="102" cy="58" rx="10" ry="18" fill={hair} />
      {/* Head — rounder, younger */}
      <ellipse cx="80" cy="70" rx="28" ry="30" fill={skin} />
      {/* Big eyes with lashes */}
      <ellipse cx="69" cy="64" rx="7" ry="6" fill="#fff" />
      <ellipse cx="91" cy="64" rx="7" ry="6" fill="#fff" />
      <circle cx="69" cy="65" r="4" fill="#3a2010" />
      <circle cx="91" cy="65" r="4" fill="#3a2010" />
      <circle cx="70" cy="63" r="1.5" fill="#fff" />
      <circle cx="92" cy="63" r="1.5" fill="#fff" />
      {/* Lashes */}
      {[-3,-1,1,3,5].map((x, i) => (
        <line key={i} x1={66+x} y1="58" x2={65+x} y2="55" stroke={hair} strokeWidth="1.2" strokeLinecap="round" />
      ))}
      {[-3,-1,1,3,5].map((x, i) => (
        <line key={i} x1={88+x} y1="58" x2={87+x} y2="55" stroke={hair} strokeWidth="1.2" strokeLinecap="round" />
      ))}
      {/* Button nose */}
      <circle cx="80" cy="76" r="3.5" fill={skin} stroke="rgba(0,0,0,0.15)" strokeWidth="1" />
      {/* Smile */}
      <path d="M72 86 Q80 92 88 86" stroke="#d06070" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      {/* Pearl earrings */}
      <circle cx="52" cy="72" r="4" fill="#f0ece0" stroke="#d4c89a" strokeWidth="1" />
      <circle cx="108" cy="72" r="4" fill="#f0ece0" stroke="#d4c89a" strokeWidth="1" />
      {/* Neck */}
      <rect x="72" y="98" width="16" height="14" rx="7" fill={skin} />
      {/* Bodice — teal */}
      <path d="M50 112 L110 112 L108 165 L52 165 Z" fill="#3a9878" />
      {/* Ruffled skirt — 4 tiers */}
      <path d="M46 165 Q26 178 22 220 L138 220 Q134 178 114 165 Z" fill="#3a9878" />
      <path d="M32 185 Q80 202 128 185 Q120 208 80 216 Q40 208 32 185" fill="#2e7860" opacity="0.9" />
      <path d="M28 210 Q80 228 132 210 Q124 236 80 244 Q36 236 28 210" fill="#3a9878" opacity="0.85" />
      <path d="M26 238 Q80 256 134 238 Q126 268 80 276 Q34 268 26 238" fill="#2e7860" opacity="0.8" />
      {/* Arms */}
      <path d="M50 122 Q28 152 26 184" stroke={skin} strokeWidth="13" fill="none" strokeLinecap="round" />
      <path d="M110 122 Q132 152 134 184" stroke={skin} strokeWidth="13" fill="none" strokeLinecap="round" />
      <ellipse cx="26" cy="187" rx="8" ry="7" fill={skin} />
      <ellipse cx="134" cy="187" rx="8" ry="7" fill={skin} />
      <ellipse cx="80" cy="295" rx="38" ry="5" fill="rgba(0,0,0,0.18)" />
    </svg>
  );
}

// ── Roi (King) ───────────────────────────────────────────────
export function RoiSvg({ skin, hair, pose = "stand" }: { skin: string; hair: string; pose?: "stand" | "sit" }) {
  if (pose === "sit") {
    return (
      <svg viewBox="0 0 160 300" width="100%" height="100%" style={{ overflow: "visible" }}>
        {/* Crown */}
        <path d="M54 30 L54 10 L70 22 L80 4 L90 22 L106 10 L106 30 Z" fill="#d4a020" stroke="#a07810" strokeWidth="1.5" />
        <circle cx="80" cy="8" r="5" fill="#e03040" />
        <circle cx="62" cy="16" r="3" fill="#2060d0" />
        <circle cx="98" cy="16" r="3" fill="#2060d0" />
        <rect x="52" y="28" width="56" height="6" rx="2" fill="#c89018" />
        {/* Hair */}
        <ellipse cx="80" cy="46" rx="28" ry="16" fill={hair} />
        <ellipse cx="56" cy="56" rx="10" ry="16" fill={hair} />
        <ellipse cx="104" cy="56" rx="10" ry="16" fill={hair} />
        {/* Head */}
        <ellipse cx="80" cy="62" rx="26" ry="26" fill={skin} />
        {/* Beard */}
        <path d="M58 76 Q80 90 102 76 Q100 98 80 104 Q60 98 58 76" fill={hair} opacity="0.85" />
        {/* Mustache */}
        <path d="M68 76 Q74 80 80 77 Q86 80 92 76" fill={hair} />
        {/* Eyes */}
        <ellipse cx="70" cy="58" rx="4.5" ry="4" fill="#fff" />
        <ellipse cx="90" cy="58" rx="4.5" ry="4" fill="#fff" />
        <circle cx="70" cy="58" r="2.5" fill="#1a2040" />
        <circle cx="90" cy="58" r="2.5" fill="#1a2040" />
        <path d="M65 53 Q70 50 75 53" stroke={hair} strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M85 53 Q90 50 95 53" stroke={hair} strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M77 66 Q80 72 83 66" stroke={skin} strokeWidth="2" fill="none" />
        {/* Ermine collar */}
        <path d="M44 106 Q80 118 116 106 Q112 124 80 130 Q48 124 44 106" fill="#f8f4ee" />
        {[...Array(6)].map((_, i) => (
          <circle key={i} cx={56 + i * 9} cy={120 + (i % 2) * 4} r="3.5" fill="#2a1808" opacity="0.7" />
        ))}
        {/* Royal coat — seated */}
        <path d="M44 122 L116 122 L114 200 L46 200 Z" fill="#2040a0" />
        {/* Gold epaulettes */}
        <path d="M36 122 Q44 112 52 122 Q52 138 44 142 Q36 138 36 122" fill="#c89020" />
        <path d="M124 122 Q116 112 108 122 Q108 138 116 142 Q124 138 124 122" fill="#c89020" />
        {/* Coat buttons */}
        {[0,1,2].map(i => (
          <circle key={i} cx="80" cy={130 + i * 22} r="4" fill="#d4a820" stroke="#a07810" strokeWidth="1" />
        ))}
        {/* Scepter held upright */}
        <line x1="118" y1="105" x2="128" y2="200" stroke="#b89020" strokeWidth="5" strokeLinecap="round" />
        <circle cx="116" cy="101" r="10" fill="#c89020" stroke="#a07010" strokeWidth="1.5" />
        <circle cx="116" cy="101" r="5" fill="#e03040" />
        <path d="M110 90 L116 82 L122 90" fill="#d4a820" />
        {/* Seated legs — trousers visible */}
        <rect x="50" y="198" width="26" height="44" rx="8" fill="#182880" />
        <rect x="84" y="198" width="26" height="44" rx="8" fill="#182880" />
        {/* Boots */}
        <rect x="48" y="232" width="30" height="18" rx="7" fill="#1a1008" />
        <rect x="82" y="232" width="30" height="18" rx="7" fill="#1a1008" />
        <ellipse cx="80" cy="295" rx="44" ry="6" fill="rgba(0,0,0,0.18)" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 160 300" width="100%" height="100%" style={{ overflow: "visible" }}>
      {/* Crown — 3 points */}
      <path d="M54 42 L54 20 L70 34 L80 14 L90 34 L106 20 L106 42 Z" fill="#d4a020" stroke="#a07810" strokeWidth="1.5" />
      {/* Crown gems */}
      <circle cx="80" cy="18" r="5" fill="#e03040" />
      <circle cx="62" cy="26" r="3" fill="#2060d0" />
      <circle cx="98" cy="26" r="3" fill="#2060d0" />
      {/* Crown band */}
      <rect x="52" y="40" width="56" height="6" rx="2" fill="#c89018" />
      {/* Hair */}
      <ellipse cx="80" cy="58" rx="28" ry="18" fill={hair} />
      <ellipse cx="56" cy="68" rx="10" ry="18" fill={hair} />
      <ellipse cx="104" cy="68" rx="10" ry="18" fill={hair} />
      {/* Head */}
      <ellipse cx="80" cy="76" rx="26" ry="28" fill={skin} />
      {/* Beard */}
      <path d="M58 92 Q80 108 102 92 Q100 116 80 122 Q60 116 58 92" fill={hair} opacity="0.85" />
      {/* Mustache */}
      <path d="M68 90 Q74 94 80 91 Q86 94 92 90" fill={hair} />
      {/* Eyes — focused/dignified */}
      <ellipse cx="70" cy="72" rx="4.5" ry="4" fill="#fff" />
      <ellipse cx="90" cy="72" rx="4.5" ry="4" fill="#fff" />
      <circle cx="70" cy="72" r="2.5" fill="#1a2040" />
      <circle cx="90" cy="72" r="2.5" fill="#1a2040" />
      <path d="M65 67 Q70 64 75 67" stroke={hair} strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M85 67 Q90 64 95 67" stroke={hair} strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* Nose */}
      <path d="M77 80 Q80 86 83 80" stroke={skin} strokeWidth="2" fill="none" />
      {/* Ermine collar */}
      <path d="M44 122 Q80 134 116 122 Q112 142 80 148 Q48 142 44 122" fill="#f8f4ee" />
      {[...Array(6)].map((_, i) => (
        <circle key={i} cx={56 + i * 9} cy={138 + (i % 2) * 4} r="3.5" fill="#2a1808" opacity="0.7" />
      ))}
      {/* Royal blue coat */}
      <path d="M44 140 L116 140 L114 260 L46 260 Z" fill="#2040a0" />
      {/* Gold epaulettes */}
      <path d="M36 140 Q44 130 52 140 Q52 156 44 160 Q36 156 36 140" fill="#c89020" />
      <path d="M124 140 Q116 130 108 140 Q108 156 116 160 Q124 156 124 140" fill="#c89020" />
      {/* Gold coat buttons */}
      {[0,1,2,3].map(i => (
        <circle key={i} cx="80" cy={148 + i * 24} r="4" fill="#d4a820" stroke="#a07810" strokeWidth="1" />
      ))}
      {/* Scepter */}
      <line x1="118" y1="120" x2="140" y2="260" stroke="#b89020" strokeWidth="5" strokeLinecap="round" />
      <circle cx="116" cy="116" r="10" fill="#c89020" stroke="#a07010" strokeWidth="1.5" />
      <circle cx="116" cy="116" r="5" fill="#e03040" />
      <path d="M110 104 L116 96 L122 104" fill="#d4a820" />
      {/* Trousers */}
      <rect x="52" y="258" width="24" height="36" rx="8" fill="#182880" />
      <rect x="84" y="258" width="24" height="36" rx="8" fill="#182880" />
      {/* Boots */}
      <rect x="50" y="284" width="28" height="14" rx="6" fill="#1a1008" />
      <rect x="82" y="284" width="28" height="14" rx="6" fill="#1a1008" />
      <ellipse cx="80" cy="295" rx="44" ry="5" fill="rgba(0,0,0,0.18)" />
    </svg>
  );
}

// ── Très Jeune Fille (Cinderella) ────────────────────────────
export function TresJeuneFilleSvg({ skin, hair, pose = "stand" }: { skin: string; hair: string; pose?: "stand" | "sit" }) {
  if (pose === "sit") {
    return (
      <svg viewBox="0 0 160 300" width="100%" height="100%" style={{ overflow: "visible" }}>
        {/* Hair tied back */}
        <ellipse cx="80" cy="36" rx="26" ry="18" fill={hair} />
        <ellipse cx="58" cy="48" rx="9" ry="14" fill={hair} />
        <ellipse cx="102" cy="48" rx="9" ry="14" fill={hair} />
        <ellipse cx="106" cy="32" rx="9" ry="8" fill={hair} />
        <ellipse cx="112" cy="28" rx="5" ry="4" fill={hair} />
        {/* Head */}
        <ellipse cx="80" cy="60" rx="24" ry="26" fill={skin} />
        {/* Tired eyes */}
        <ellipse cx="70" cy="55" rx="5" ry="4" fill="#fff" />
        <ellipse cx="90" cy="55" rx="5" ry="4" fill="#fff" />
        <ellipse cx="70" cy="61" rx="6" ry="3" fill={skin} opacity="0.7" />
        <ellipse cx="90" cy="61" rx="6" ry="3" fill={skin} opacity="0.7" />
        <circle cx="70" cy="55" r="2.5" fill="#2a1a10" />
        <circle cx="90" cy="55" r="2.5" fill="#2a1a10" />
        <path d="M65 50 Q70 47 75 50" stroke={hair} strokeWidth="1.8" fill="none" strokeLinecap="round" />
        <path d="M85 50 Q90 47 95 50" stroke={hair} strokeWidth="1.8" fill="none" strokeLinecap="round" />
        <ellipse cx="80" cy="66" rx="3.5" ry="3" fill={skin} stroke="rgba(0,0,0,0.1)" strokeWidth="1" />
        <path d="M74 75 Q80 79 86 75" stroke="#c08070" strokeWidth="2" fill="none" strokeLinecap="round" />
        {/* Neck */}
        <rect x="73" y="84" width="14" height="11" rx="6" fill={skin} />
        {/* Bodice */}
        <path d="M50 95 L110 95 L108 146 L52 146 Z" fill="#7090a8" />
        {/* White apron on bodice */}
        <path d="M62 95 L98 95 L96 146 L64 146 Z" fill="#e8e4dc" />
        <rect x="58" y="118" width="44" height="8" rx="3" fill="#d8d4cc" />
        <path d="M72 120 Q80 114 88 120 Q80 126 72 120" fill="#d0ccc4" />
        {/* Seated skirt — spread */}
        <path d="M30 146 Q80 160 130 146 L128 238 Q80 252 32 238 Z" fill="#7090a8" />
        {/* Apron skirt */}
        <path d="M58 146 Q80 154 102 146 L100 238 Q80 244 60 238 Z" fill="#e8e4dc" opacity="0.9" />
        {/* Arms — bent, resting on lap */}
        <path d="M50 104 Q30 126 28 148" stroke={skin} strokeWidth="13" fill="none" strokeLinecap="round" />
        <path d="M110 104 Q130 126 132 148" stroke={skin} strokeWidth="13" fill="none" strokeLinecap="round" />
        <ellipse cx="28" cy="152" rx="8" ry="7" fill={skin} />
        <ellipse cx="132" cy="152" rx="8" ry="7" fill={skin} />
        {/* Mop leaning, shorter reach */}
        <line x1="132" y1="148" x2="144" y2="70" stroke="#8b6040" strokeWidth="5" strokeLinecap="round" />
        <ellipse cx="146" cy="65" rx="9" ry="6" fill="#c8b090" />
        {[...Array(5)].map((_, i) => (
          <line key={i} x1={140 + i*2} y1="62" x2={138 + i*2} y2="52" stroke="#a89070" strokeWidth="1.5" strokeLinecap="round" />
        ))}
        <ellipse cx="80" cy="295" rx="46" ry="6" fill="rgba(0,0,0,0.18)" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 160 300" width="100%" height="100%" style={{ overflow: "visible" }}>
      {/* Hair tied back */}
      <ellipse cx="80" cy="46" rx="26" ry="20" fill={hair} />
      <ellipse cx="58" cy="58" rx="9" ry="16" fill={hair} />
      <ellipse cx="102" cy="58" rx="9" ry="16" fill={hair} />
      {/* Hair tie bun */}
      <ellipse cx="106" cy="42" rx="9" ry="8" fill={hair} />
      <ellipse cx="112" cy="38" rx="5" ry="4" fill={hair} />
      {/* Head */}
      <ellipse cx="80" cy="70" rx="24" ry="27" fill={skin} />
      {/* Tired eyes — slight under-eye shadow */}
      <ellipse cx="70" cy="65" rx="5" ry="4" fill="#fff" />
      <ellipse cx="90" cy="65" rx="5" ry="4" fill="#fff" />
      <ellipse cx="70" cy="71" rx="6" ry="3" fill={skin} opacity="0.7" />
      <ellipse cx="90" cy="71" rx="6" ry="3" fill={skin} opacity="0.7" />
      <path d="M65 70 Q70 67 75 70" stroke="rgba(120,80,60,0.25)" strokeWidth="1.5" fill="none" />
      <path d="M85 70 Q90 67 95 70" stroke="rgba(120,80,60,0.25)" strokeWidth="1.5" fill="none" />
      <circle cx="70" cy="65" r="2.5" fill="#2a1a10" />
      <circle cx="90" cy="65" r="2.5" fill="#2a1a10" />
      <path d="M65 60 Q70 57 75 60" stroke={hair} strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <path d="M85 60 Q90 57 95 60" stroke={hair} strokeWidth="1.8" fill="none" strokeLinecap="round" />
      {/* Simple nose */}
      <ellipse cx="80" cy="76" rx="3.5" ry="3" fill={skin} stroke="rgba(0,0,0,0.1)" strokeWidth="1" />
      {/* Slight smile — weary */}
      <path d="M74 85 Q80 89 86 85" stroke="#c08070" strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* Neck */}
      <rect x="73" y="95" width="14" height="12" rx="6" fill={skin} />
      {/* Dusty blue dress bodice */}
      <path d="M50 106 L110 106 L108 162 L52 162 Z" fill="#7090a8" />
      {/* White apron */}
      <path d="M62 106 L98 106 L96 162 L64 162 Z" fill="#e8e4dc" />
      {/* Apron waistband */}
      <rect x="58" y="130" width="44" height="8" rx="3" fill="#d8d4cc" />
      {/* Apron bow */}
      <path d="M72 132 Q80 126 88 132 Q80 138 72 132" fill="#d0ccc4" />
      {/* Skirt */}
      <path d="M48 162 Q28 180 26 280 L134 280 Q132 180 112 162 Z" fill="#7090a8" />
      {/* Apron skirt overlay */}
      <path d="M60 162 Q80 170 100 162 L102 280 Q80 286 58 280 Z" fill="#e8e4dc" opacity="0.9" />
      {/* Arms */}
      <path d="M50 120 Q30 150 28 182" stroke={skin} strokeWidth="13" fill="none" strokeLinecap="round" />
      <path d="M110 120 Q130 150 132 182" stroke={skin} strokeWidth="13" fill="none" strokeLinecap="round" />
      <ellipse cx="28" cy="185" rx="8" ry="7" fill={skin} />
      <ellipse cx="132" cy="185" rx="8" ry="7" fill={skin} />
      {/* Mop held diagonally in right hand */}
      <line x1="132" y1="182" x2="148" y2="80" stroke="#8b6040" strokeWidth="5" strokeLinecap="round" />
      {/* Mop head */}
      <ellipse cx="150" cy="74" rx="10" ry="7" fill="#c8b090" />
      {[...Array(5)].map((_, i) => (
        <line key={i} x1={143 + i*2} y1="70" x2={141 + i*2} y2="60" stroke="#a89070" strokeWidth="1.5" strokeLinecap="round" />
      ))}
      <ellipse cx="80" cy="295" rx="40" ry="5" fill="rgba(0,0,0,0.18)" />
    </svg>
  );
}
