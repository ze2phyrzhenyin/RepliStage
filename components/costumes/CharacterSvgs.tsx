/**
 * Inline SVG character illustrations — parameterised by skin / hair colour.
 * viewBox="0 0 160 300" — same aspect ratio as the file-based SVGs.
 * All components render at width="100%" height="100%".
 */

// ── Generic lie / floor pose helpers ─────────────────────────

function LiePose({ skin, hair, clothing, clothing2 }: {
  skin: string; hair: string; clothing: string; clothing2?: string;
}) {
  return (
    <svg viewBox="0 0 160 300" width="100%" height="100%" style={{ overflow: "visible" }}>
      {/* Floor shadow */}
      <ellipse cx="82" cy="284" rx="68" ry="7" fill="rgba(0,0,0,0.16)" />
      {/* Hair — spread behind head */}
      <ellipse cx="22" cy="234" rx="20" ry="13" fill={hair} />
      <path d="M8 224 Q10 238 14 250" stroke={hair} strokeWidth="10" fill="none" strokeLinecap="round" opacity="0.75" />
      {/* Head — lying on side, face toward viewer */}
      <ellipse cx="28" cy="238" rx="20" ry="18" fill={skin} />
      {/* Eyes — closed / resting */}
      <path d="M18 230 Q22 227 26 230" stroke="#2a1a10" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <path d="M30 230 Q34 227 38 230" stroke="#2a1a10" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <ellipse cx="22" cy="231" rx="4" ry="1.5" fill="rgba(100,70,50,0.14)" />
      <ellipse cx="36" cy="231" rx="4" ry="1.5" fill="rgba(100,70,50,0.14)" />
      {/* Nose */}
      <ellipse cx="34" cy="241" rx="3" ry="2.5" fill={skin} stroke="rgba(0,0,0,0.09)" strokeWidth="0.8" />
      {/* Mouth — relaxed */}
      <path d="M26 250 Q32 253 38 250" stroke="#c08070" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {/* Neck */}
      <ellipse cx="48" cy="248" rx="9" ry="6" fill={skin} />
      {/* Body — horizontal */}
      <path d="M42 241 Q90 236 150 246 L150 270 Q90 278 42 267 Z" fill={clothing} />
      {clothing2 && <path d="M58 239 L100 238 L100 265 L58 266 Z" fill={clothing2} opacity="0.85" />}
      {/* Near arm along body */}
      <path d="M52 253 Q68 268 78 274" stroke={skin} strokeWidth="12" fill="none" strokeLinecap="round" />
      <ellipse cx="80" cy="277" rx="7" ry="6" fill={skin} />
      {/* Far arm, partially visible */}
      <path d="M70 246 Q88 255 98 263" stroke={skin} strokeWidth="10" fill="none" strokeLinecap="round" opacity="0.5" />
      {/* Feet at far right */}
      <ellipse cx="152" cy="258" rx="10" ry="7" fill={skin} opacity="0.8" />
    </svg>
  );
}

function FloorPose({ skin, hair, clothing, clothing2 }: {
  skin: string; hair: string; clothing: string; clothing2?: string;
}) {
  return (
    <svg viewBox="0 0 160 300" width="100%" height="100%" style={{ overflow: "visible" }}>
      {/* Shadow */}
      <ellipse cx="80" cy="288" rx="60" ry="6" fill="rgba(0,0,0,0.2)" />
      {/* Legs — splayed on ground */}
      <path d="M58 222 Q44 252 40 272" stroke={clothing} strokeWidth="20" fill="none" strokeLinecap="round" />
      <path d="M102 222 Q118 248 122 266" stroke={clothing} strokeWidth="20" fill="none" strokeLinecap="round" />
      {/* Feet */}
      <ellipse cx="38" cy="274" rx="14" ry="7" fill={skin} />
      <ellipse cx="124" cy="268" rx="14" ry="7" fill={skin} />
      {/* Body — slumped forward */}
      <path d="M48 154 L112 154 L112 226 L48 226 Z" fill={clothing} />
      {clothing2 && <path d="M62 154 Q80 150 98 154 L98 200 Q80 204 62 200 Z" fill={clothing2} />}
      {/* Left arm — bracing on floor */}
      <path d="M48 170 Q26 210 22 250" stroke={skin} strokeWidth="13" fill="none" strokeLinecap="round" />
      <ellipse cx="22" cy="253" rx="8" ry="6" fill={skin} />
      {/* Right arm — catching fall */}
      <path d="M112 170 Q134 208 136 246" stroke={skin} strokeWidth="13" fill="none" strokeLinecap="round" />
      <ellipse cx="136" cy="249" rx="8" ry="6" fill={skin} />
      {/* Head — tilted, drooping forward */}
      <ellipse cx="80" cy="130" rx="22" ry="24" fill={skin} />
      {/* Hair — disheveled */}
      <ellipse cx="80" cy="110" rx="24" ry="14" fill={hair} />
      <path d="M58 116 Q50 122 54 132" stroke={hair} strokeWidth="8" fill="none" strokeLinecap="round" opacity="0.7" />
      <path d="M102 116 Q110 122 106 132" stroke={hair} strokeWidth="7" fill="none" strokeLinecap="round" opacity="0.55" />
      {/* Eyes — closed / wincing */}
      <path d="M66 124 Q70 120 74 124" stroke="#2a1a10" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M86 124 Q90 120 94 124" stroke="#2a1a10" strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* Nose */}
      <ellipse cx="80" cy="134" rx="3" ry="2.5" fill={skin} stroke="rgba(0,0,0,0.09)" strokeWidth="0.8" />
      {/* Pained expression */}
      <path d="M74 143 Q80 140 86 143" stroke="#906060" strokeWidth="1.8" fill="none" strokeLinecap="round" />
    </svg>
  );
}

// ── Belle Mère ───────────────────────────────────────────────
export function BelleMereSvg({
  skin, hair, pose = "stand",
}: { skin: string; hair: string; pose?: "stand" | "sit" | "lie" | "floor" }) {
  if (pose === "lie")   return <LiePose   skin={skin} hair={hair} clothing="#7a2030" />;
  if (pose === "floor") return <FloorPose skin={skin} hair={hair} clothing="#7a2030" />;
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
export function SoeurGrandeSvg({ skin, hair, pose = "stand" }: { skin: string; hair: string; pose?: "stand" | "sit" | "lie" | "floor" }) {
  if (pose === "lie")   return <LiePose   skin={skin} hair={hair} clothing="#b87820" />;
  if (pose === "floor") return <FloorPose skin={skin} hair={hair} clothing="#b87820" />;
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
export function SoeurPetiteSvg({ skin, hair, pose = "stand" }: { skin: string; hair: string; pose?: "stand" | "sit" | "lie" | "floor" }) {
  if (pose === "lie")   return <LiePose   skin={skin} hair={hair} clothing="#3a9878" />;
  if (pose === "floor") return <FloorPose skin={skin} hair={hair} clothing="#3a9878" />;
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
export function RoiSvg({ skin, hair, pose = "stand" }: { skin: string; hair: string; pose?: "stand" | "sit" | "lie" | "floor" }) {
  if (pose === "lie")   return <LiePose   skin={skin} hair={hair} clothing="#2040a0" clothing2="#182880" />;
  if (pose === "floor") return <FloorPose skin={skin} hair={hair} clothing="#2040a0" clothing2="#182880" />;
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

// ── Fée (Fairy Godmother) ────────────────────────────────────
export function FeeSvg({ skin, hair, pose = "stand" }: { skin: string; hair: string; pose?: "stand" | "sit" | "lie" | "floor" }) {
  if (pose === "lie")   return <LiePose   skin={skin} hair={hair} clothing="#b0a8d0" />;
  if (pose === "floor") return <FloorPose skin={skin} hair={hair} clothing="#b0a8d0" />;
  return (
    <svg viewBox="0 0 160 300" width="100%" height="100%" style={{ overflow: "visible" }}>
      {/* Wings — drawn first so body appears on top */}
      <path d="M60 118 Q18 88 8 132 Q16 162 52 158 Q58 148 60 118" fill="#c8e8f8" opacity="0.52" stroke="#a0c8e8" strokeWidth="1" />
      <path d="M100 118 Q142 88 152 132 Q144 162 108 158 Q102 148 100 118" fill="#c8e8f8" opacity="0.52" stroke="#a0c8e8" strokeWidth="1" />
      {/* Wing shimmer */}
      <path d="M56 126 Q36 110 22 128" stroke="#e0f0ff" strokeWidth="1.5" fill="none" opacity="0.6" />
      <path d="M104 126 Q124 110 138 128" stroke="#e0f0ff" strokeWidth="1.5" fill="none" opacity="0.6" />
      {/* Star tiara */}
      <path d="M72 28 L75 18 L80 24 L85 18 L88 28 L82 26 L80 34 L78 26 Z" fill="#e8d040" stroke="#c0a020" strokeWidth="0.8" />
      <circle cx="80" cy="19" r="2.5" fill="#fff8c0" />
      <path d="M63 34 L65 28 L69 32 L65 36 Z" fill="#e8d040" opacity="0.8" />
      <path d="M97 34 L95 28 L91 32 L95 36 Z" fill="#e8d040" opacity="0.8" />
      {/* Hair — flowing waves */}
      <ellipse cx="80" cy="50" rx="26" ry="18" fill={hair} />
      <path d="M54 54 Q38 84 42 132" stroke={hair} strokeWidth="18" fill="none" strokeLinecap="round" />
      <path d="M106 54 Q122 84 118 132" stroke={hair} strokeWidth="18" fill="none" strokeLinecap="round" />
      <path d="M46 84 Q34 108 42 126" stroke={hair} strokeWidth="8" fill="none" strokeLinecap="round" opacity="0.65" />
      {/* Head */}
      <ellipse cx="80" cy="72" rx="24" ry="26" fill={skin} />
      {/* Eyes — gentle, luminous */}
      <ellipse cx="70" cy="67" rx="4.5" ry="4" fill="#fff" />
      <ellipse cx="90" cy="67" rx="4.5" ry="4" fill="#fff" />
      <circle cx="70" cy="67" r="2.5" fill="#2a1a10" />
      <circle cx="90" cy="67" r="2.5" fill="#2a1a10" />
      <circle cx="71" cy="66" r="1" fill="#fff" />
      <circle cx="91" cy="66" r="1" fill="#fff" />
      <path d="M65 61 Q70 58 75 61" stroke={hair} strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <path d="M85 61 Q90 58 95 61" stroke={hair} strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <ellipse cx="80" cy="78" rx="3" ry="2.5" fill={skin} stroke="rgba(0,0,0,0.1)" strokeWidth="0.8" />
      <path d="M74 86 Q80 91 86 86" stroke="#c07880" strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* Neck */}
      <rect x="73" y="97" width="14" height="13" rx="6" fill={skin} />
      {/* Star sparkle necklace */}
      <path d="M67 107 L70 101 L73 107 L67 107" fill="#e8d040" opacity="0.85" />
      <path d="M78 105 L80 99 L82 105 L78 105" fill="#e8d040" opacity="0.75" />
      <path d="M87 107 L90 101 L93 107 L87 107" fill="#e8d040" opacity="0.85" />
      {/* Bodice — silver-lavender */}
      <path d="M50 110 L110 110 L108 168 L52 168 Z" fill="#b0a8d0" />
      <rect x="74" y="110" width="12" height="58" fill="#c0b8e0" />
      <path d="M78 132 L80 126 L82 132 L78 132" fill="#e8d040" opacity="0.8" />
      {/* Flowing skirt — wide, layered */}
      <path d="M48 168 Q20 194 14 286 L146 286 Q140 194 112 168 Z" fill="#b0a8d0" />
      <path d="M42 190 Q80 206 118 190 Q110 216 80 224 Q50 216 42 190" fill="#c0b8e0" opacity="0.65" />
      <path d="M28 234 Q80 250 132 234 Q124 262 80 270 Q36 262 28 234" fill="#a898c8" opacity="0.6" />
      {/* Sparkles on skirt */}
      <circle cx="38" cy="216" r="2" fill="#e8d040" opacity="0.65" />
      <circle cx="122" cy="206" r="2" fill="#e8d040" opacity="0.65" />
      <circle cx="58" cy="256" r="1.5" fill="#e8d040" opacity="0.55" />
      <circle cx="112" cy="250" r="1.5" fill="#e8d040" opacity="0.55" />
      <circle cx="80" cy="240" r="1.5" fill="#e8d040" opacity="0.5" />
      {/* Left arm — down at side */}
      <path d="M50 124 Q30 156 28 186" stroke={skin} strokeWidth="13" fill="none" strokeLinecap="round" />
      <ellipse cx="28" cy="190" rx="8" ry="7" fill={skin} />
      {/* Right arm — raised, holding wand */}
      <path d="M110 124 Q132 102 134 78" stroke={skin} strokeWidth="13" fill="none" strokeLinecap="round" />
      <ellipse cx="134" cy="74" rx="7" ry="8" fill={skin} />
      {/* Wand */}
      <line x1="132" y1="72" x2="152" y2="26" stroke="#c0a828" strokeWidth="3" strokeLinecap="round" />
      <path d="M149 14 L152 6 L155 14 L149 14" fill="#ffe840" />
      <path d="M146 10 L158 10" stroke="#ffe840" strokeWidth="1.8" />
      <path d="M150 8 L152 2 L154 8" fill="#ffe840" opacity="0.7" />
      <circle cx="146" cy="36" r="2" fill="#ffe840" opacity="0.75" />
      <circle cx="154" cy="44" r="1.5" fill="#ffe840" opacity="0.6" />
      <circle cx="142" cy="26" r="1.5" fill="#ffe840" opacity="0.6" />
      <ellipse cx="80" cy="295" rx="42" ry="5" fill="rgba(0,0,0,0.14)" />
    </svg>
  );
}

// ── Père (Father) ─────────────────────────────────────────────
export function PereSvg({ skin, hair, pose = "stand" }: { skin: string; hair: string; pose?: "stand" | "sit" | "lie" | "floor" }) {
  if (pose === "lie")   return <LiePose   skin={skin} hair={hair} clothing="#2a3040" clothing2="#202832" />;
  if (pose === "floor") return <FloorPose skin={skin} hair={hair} clothing="#2a3040" clothing2="#202832" />;
  return (
    <svg viewBox="0 0 160 300" width="100%" height="100%" style={{ overflow: "visible" }}>
      {/* Hair — short, thinning on top */}
      <ellipse cx="80" cy="38" rx="26" ry="16" fill={hair} />
      <ellipse cx="56" cy="52" rx="9" ry="15" fill={hair} />
      <ellipse cx="104" cy="52" rx="9" ry="15" fill={hair} />
      {/* Head — middle-aged */}
      <ellipse cx="80" cy="68" rx="24" ry="28" fill={skin} />
      {/* Eyes — sad, a little tired */}
      <ellipse cx="70" cy="62" rx="4.5" ry="4" fill="#fff" />
      <ellipse cx="90" cy="62" rx="4.5" ry="4" fill="#fff" />
      <circle cx="70" cy="63" r="2.5" fill="#2a1a10" />
      <circle cx="90" cy="63" r="2.5" fill="#2a1a10" />
      {/* Slightly downturned brows */}
      <path d="M64 56 Q70 54 76 57" stroke={hair} strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M84 57 Q90 54 96 56" stroke={hair} strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* Under-eye lines */}
      <path d="M66 66 Q70 68 74 66" stroke="rgba(0,0,0,0.08)" strokeWidth="1.2" fill="none" />
      <path d="M86 66 Q90 68 94 66" stroke="rgba(0,0,0,0.08)" strokeWidth="1.2" fill="none" />
      <path d="M77 72 Q80 78 83 72" stroke={skin} strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* Mouth — slight frown */}
      <path d="M73 84 Q80 82 87 84" stroke="#906060" strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* Stubble shadow */}
      <ellipse cx="80" cy="89" rx="17" ry="7" fill={hair} opacity="0.18" />
      {/* Neck */}
      <rect x="73" y="95" width="14" height="13" rx="6" fill={skin} />
      {/* White shirt collar */}
      <path d="M66 106 L80 116 L94 106 L94 110 L80 120 L66 110 Z" fill="#f0ece8" />
      {/* Dark overcoat */}
      <path d="M46 108 L114 108 L112 262 L48 262 Z" fill="#2a3040" />
      <path d="M66 108 L80 134" stroke="#3a4050" strokeWidth="2" fill="none" />
      <path d="M94 108 L80 134" stroke="#3a4050" strokeWidth="2" fill="none" />
      {/* Center seam */}
      <line x1="80" y1="134" x2="80" y2="262" stroke="#202832" strokeWidth="10" />
      {/* Buttons */}
      {[0,1,2].map(i => (
        <circle key={i} cx="80" cy={148 + i * 28} r="3.5" fill="#3a4858" stroke="#1a2030" strokeWidth="1" />
      ))}
      {/* Arms */}
      <path d="M46 122 Q26 158 24 194" stroke={skin} strokeWidth="13" fill="none" strokeLinecap="round" />
      <path d="M114 122 Q134 158 136 194" stroke={skin} strokeWidth="13" fill="none" strokeLinecap="round" />
      <ellipse cx="24" cy="197" rx="8" ry="7" fill={skin} />
      <ellipse cx="136" cy="197" rx="8" ry="7" fill={skin} />
      {/* Trousers */}
      <rect x="52" y="260" width="22" height="36" rx="8" fill="#202832" />
      <rect x="86" y="260" width="22" height="36" rx="8" fill="#202832" />
      {/* Shoes */}
      <rect x="50" y="286" width="26" height="12" rx="5" fill="#181410" />
      <rect x="84" y="286" width="26" height="12" rx="5" fill="#181410" />
      <ellipse cx="80" cy="295" rx="40" ry="5" fill="rgba(0,0,0,0.18)" />
    </svg>
  );
}

// ── Très Jeune Prince (Young Prince) ─────────────────────────
export function TresJeunePrinceSvg({ skin, hair, pose = "stand" }: { skin: string; hair: string; pose?: "stand" | "sit" | "lie" | "floor" }) {
  if (pose === "lie") return <LiePose skin={skin} hair={hair} clothing="#2044a0" clothing2="#f0ece8" />;
  if (pose === "floor") {
    return (
      <svg viewBox="0 0 160 300" width="100%" height="100%" style={{ overflow: "visible" }}>
        {/* Shadow */}
        <ellipse cx="80" cy="288" rx="60" ry="6" fill="rgba(0,0,0,0.2)" />
        {/* Crown knocked to the side — lying on ground near head */}
        <path d="M20 148 L20 136 L26 141 L30 130 L34 141 L40 136 L40 148 Z" fill="#d4a020" stroke="#a07810" strokeWidth="1" opacity="0.85" />
        <circle cx="30" cy="133" r="3" fill="#e03040" opacity="0.8" />
        <rect x="19" y="146" width="22" height="3" rx="1" fill="#c89018" opacity="0.75" />
        {/* Legs — sprawled */}
        <path d="M58 222 Q44 252 40 272" stroke="#2044a0" strokeWidth="20" fill="none" strokeLinecap="round" />
        <path d="M102 222 Q118 248 122 266" stroke="#2044a0" strokeWidth="20" fill="none" strokeLinecap="round" />
        {/* White trouser feet */}
        <ellipse cx="38" cy="274" rx="14" ry="7" fill="#f0ece8" />
        <ellipse cx="124" cy="268" rx="14" ry="7" fill="#f0ece8" />
        {/* Black boots */}
        <ellipse cx="38" cy="276" rx="12" ry="5" fill="#1a1008" />
        <ellipse cx="124" cy="270" rx="12" ry="5" fill="#1a1008" />
        {/* Jacket body */}
        <path d="M48 154 L112 154 L112 226 L48 226 Z" fill="#2044a0" />
        <line x1="80" y1="154" x2="80" y2="226" stroke="#1a3488" strokeWidth="8" />
        {/* Gold epaulette — one visible */}
        <path d="M112 156 Q120 148 126 156 Q126 166 120 170 Q114 166 112 156" fill="#c89020" />
        {/* Red sash still visible */}
        <path d="M112 156 Q90 190 80 210" stroke="#c83040" strokeWidth="6" strokeLinecap="round" opacity="0.7" />
        {/* Left arm — hitting floor */}
        <path d="M48 170 Q26 210 22 250" stroke={skin} strokeWidth="13" fill="none" strokeLinecap="round" />
        <ellipse cx="22" cy="253" rx="8" ry="6" fill={skin} />
        {/* Right arm — catching */}
        <path d="M112 170 Q134 208 136 246" stroke={skin} strokeWidth="13" fill="none" strokeLinecap="round" />
        <ellipse cx="136" cy="249" rx="8" ry="6" fill={skin} />
        {/* Head — dazed, tilted */}
        <ellipse cx="80" cy="130" rx="22" ry="24" fill={skin} />
        {/* Hair — disheveled */}
        <ellipse cx="80" cy="110" rx="24" ry="13" fill={hair} />
        <path d="M64 112 Q60 118 60 126" stroke={hair} strokeWidth="6" fill="none" strokeLinecap="round" opacity="0.75" />
        <path d="M72 108 Q68 112 72 120" stroke={hair} strokeWidth="4" fill="none" strokeLinecap="round" opacity="0.55" />
        {/* Eyes — closed from impact */}
        <path d="M66 124 Q70 120 74 124" stroke="#2a1a10" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M86 124 Q90 120 94 124" stroke="#2a1a10" strokeWidth="2" fill="none" strokeLinecap="round" />
        {/* Stars from impact */}
        <path d="M96 112 L98 106 L100 112" stroke="#f1c27d" strokeWidth="1.5" fill="none" opacity="0.7" />
        <path d="M100 108 L104 108" stroke="#f1c27d" strokeWidth="1.5" opacity="0.7" />
        <path d="M97 114 L103 108" stroke="#f1c27d" strokeWidth="1.2" opacity="0.55" />
        {/* Nose */}
        <ellipse cx="80" cy="134" rx="3" ry="2.5" fill={skin} stroke="rgba(0,0,0,0.09)" strokeWidth="0.8" />
        {/* Dazed expression */}
        <path d="M74 143 Q80 140 86 143" stroke="#906060" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 160 300" width="100%" height="100%" style={{ overflow: "visible" }}>
      {/* Small crown */}
      <path d="M62 36 L62 22 L72 30 L80 14 L88 30 L98 22 L98 36 Z" fill="#d4a020" stroke="#a07810" strokeWidth="1.2" />
      <circle cx="80" cy="17" r="4" fill="#e03040" />
      <circle cx="66" cy="24" r="2.5" fill="#2060d0" />
      <circle cx="94" cy="24" r="2.5" fill="#2060d0" />
      <rect x="60" y="34" width="40" height="5" rx="2" fill="#c89018" />
      {/* Hair — young, wavy */}
      <ellipse cx="80" cy="52" rx="24" ry="14" fill={hair} />
      <ellipse cx="58" cy="62" rx="8" ry="14" fill={hair} />
      <ellipse cx="102" cy="62" rx="8" ry="14" fill={hair} />
      {/* Loose strands on forehead */}
      <path d="M68 46 Q72 40 76 46" stroke={hair} strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M74 44 Q78 38 82 44" stroke={hair} strokeWidth="3" fill="none" strokeLinecap="round" />
      {/* Head — young, smooth */}
      <ellipse cx="80" cy="74" rx="24" ry="26" fill={skin} />
      {/* Eyes — confident, bright */}
      <ellipse cx="70" cy="69" rx="4.5" ry="4" fill="#fff" />
      <ellipse cx="90" cy="69" rx="4.5" ry="4" fill="#fff" />
      <circle cx="70" cy="69" r="2.5" fill="#1a2040" />
      <circle cx="90" cy="69" r="2.5" fill="#1a2040" />
      <circle cx="71" cy="68" r="1" fill="#fff" />
      <circle cx="91" cy="68" r="1" fill="#fff" />
      <path d="M65 63 Q70 60 75 63" stroke={hair} strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M85 63 Q90 60 95 63" stroke={hair} strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M77 78 Q80 84 83 78" stroke={skin} strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* Charming smile */}
      <path d="M73 88 Q80 93 87 88" stroke="#b06870" strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* Neck */}
      <rect x="73" y="99" width="14" height="12" rx="6" fill={skin} />
      {/* White cravat */}
      <path d="M67 110 L80 120 L93 110 L93 114 L80 124 L67 114 Z" fill="#f8f4ee" />
      {/* Royal blue military jacket */}
      <path d="M46 112 L114 112 L112 262 L48 262 Z" fill="#2044a0" />
      <path d="M57 112 L80 134" stroke="#c89028" strokeWidth="1.8" fill="none" />
      <path d="M103 112 L80 134" stroke="#c89028" strokeWidth="1.8" fill="none" />
      <line x1="80" y1="134" x2="80" y2="262" stroke="#1a3488" strokeWidth="9" />
      {/* Gold epaulettes */}
      <path d="M38 114 Q46 104 54 114 Q54 128 46 132 Q38 128 38 114" fill="#c89020" />
      <path d="M122 114 Q114 104 106 114 Q106 128 114 132 Q122 128 122 114" fill="#c89020" />
      {/* Buttons */}
      {[0,1,2,3].map(i => (
        <circle key={i} cx="80" cy={138 + i * 26} r="4" fill="#d4a820" stroke="#a07810" strokeWidth="1" />
      ))}
      {/* Red sash with gold edge */}
      <path d="M114 112 L66 202" stroke="#c83040" strokeWidth="8" strokeLinecap="round" opacity="0.85" />
      <path d="M114 112 L66 202" stroke="#f0d040" strokeWidth="2.5" strokeLinecap="round" opacity="0.45" />
      {/* Medal */}
      <circle cx="67" cy="200" r="9" fill="#d4a820" stroke="#a07810" strokeWidth="1.5" />
      <circle cx="67" cy="200" r="4.5" fill="#e03040" />
      {/* Arms */}
      <path d="M46 126 Q24 162 22 196" stroke={skin} strokeWidth="13" fill="none" strokeLinecap="round" />
      <path d="M114 126 Q136 162 138 196" stroke={skin} strokeWidth="13" fill="none" strokeLinecap="round" />
      <ellipse cx="22" cy="199" rx="8" ry="7" fill={skin} />
      <ellipse cx="138" cy="199" rx="8" ry="7" fill={skin} />
      {/* White trousers */}
      <rect x="52" y="260" width="22" height="36" rx="8" fill="#f0ece8" />
      <rect x="86" y="260" width="22" height="36" rx="8" fill="#f0ece8" />
      {/* Black boots */}
      <rect x="50" y="286" width="26" height="12" rx="5" fill="#1a1008" />
      <rect x="84" y="286" width="26" height="12" rx="5" fill="#1a1008" />
      <ellipse cx="80" cy="295" rx="42" ry="5" fill="rgba(0,0,0,0.18)" />
    </svg>
  );
}

// ── Garde (Royal Guard) — shared by garde_1 and garde_2 ──────
export function GardeSvg({ skin, hair, pose = "stand" }: { skin: string; hair: string; pose?: "stand" | "sit" | "lie" | "floor" }) {
  if (pose === "lie")   return <LiePose   skin={skin} hair={hair} clothing="#2a3448" />;
  if (pose === "floor") return <FloorPose skin={skin} hair={hair} clothing="#2a3448" />;
  return (
    <svg viewBox="0 0 160 300" width="100%" height="100%" style={{ overflow: "visible" }}>
      {/* Shako hat body */}
      <rect x="52" y="18" width="56" height="34" rx="3" fill="#1a2030" />
      <rect x="50" y="50" width="60" height="7" rx="2" fill="#2a3040" />
      {/* Hat brim */}
      <rect x="46" y="54" width="68" height="6" rx="2" fill="#1a2030" />
      {/* Hat badge */}
      <path d="M76 30 L80 22 L84 30 L80 34 Z" fill="#c89020" />
      <circle cx="80" cy="28" r="3" fill="#d4a020" />
      <rect x="56" y="50" width="48" height="2.5" fill="#c89020" opacity="0.55" />
      {/* Plume */}
      <path d="M80 18 Q86 4 82 -4 Q77 4 80 18" fill="#e03040" opacity="0.88" />
      <path d="M80 18 Q92 6 96 -2 Q88 6 80 18" fill="#c02030" opacity="0.7" />
      {/* Hair below hat */}
      <ellipse cx="56" cy="66" rx="6" ry="10" fill={hair} />
      <ellipse cx="104" cy="66" rx="6" ry="10" fill={hair} />
      {/* Head */}
      <ellipse cx="80" cy="74" rx="22" ry="24" fill={skin} />
      {/* Eyes — straight ahead, focused */}
      <ellipse cx="70" cy="69" rx="4" ry="3.5" fill="#fff" />
      <ellipse cx="90" cy="69" rx="4" ry="3.5" fill="#fff" />
      <circle cx="70" cy="69" r="2.2" fill="#1a2040" />
      <circle cx="90" cy="69" r="2.2" fill="#1a2040" />
      <path d="M65 64 Q70 61 75 64" stroke={hair} strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M85 64 Q90 61 95 64" stroke={hair} strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M77 78 Q80 83 83 78" stroke={skin} strokeWidth="1.8" fill="none" />
      {/* Neutral mouth */}
      <path d="M74 88 Q80 89 86 88" stroke="#906060" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      {/* Neck */}
      <rect x="73" y="97" width="14" height="10" rx="5" fill={skin} />
      {/* Stiff high collar */}
      <rect x="68" y="106" width="24" height="8" rx="2" fill="#1a2030" />
      {/* Uniform — dark navy */}
      <path d="M46 110 L114 110 L112 258 L48 258 Z" fill="#2a3448" />
      {/* Diagonal sash */}
      <path d="M56 110 L78 186" stroke="#c89020" strokeWidth="6" strokeLinecap="round" opacity="0.88" />
      {/* Center buttons */}
      {[0,1,2,3].map(i => (
        <circle key={i} cx="80" cy={120 + i * 26} r="3.5" fill="#c89020" stroke="#a07010" strokeWidth="0.8" />
      ))}
      {/* Waist belt */}
      <rect x="44" y="196" width="72" height="10" rx="3" fill="#c89020" />
      <rect x="76" y="196" width="8" height="10" rx="2" fill="#a07010" />
      {/* Epaulettes */}
      <path d="M34 112 Q42 104 50 112 Q50 124 42 128 Q34 124 34 112" fill="#c89020" />
      <path d="M126 112 Q118 104 110 112 Q110 124 118 128 Q126 124 126 112" fill="#c89020" />
      {/* Arms at sides — rigid, at attention */}
      <path d="M46 124 Q38 172 38 222" stroke={skin} strokeWidth="13" fill="none" strokeLinecap="round" />
      <path d="M114 124 Q122 172 122 222" stroke={skin} strokeWidth="13" fill="none" strokeLinecap="round" />
      <ellipse cx="38" cy="225" rx="8" ry="7" fill={skin} />
      <ellipse cx="122" cy="225" rx="8" ry="7" fill={skin} />
      {/* Trousers with gold stripe */}
      <rect x="50" y="256" width="22" height="40" rx="6" fill="#1a2030" />
      <rect x="84" y="256" width="22" height="40" rx="6" fill="#1a2030" />
      <line x1="61" y1="256" x2="61" y2="296" stroke="#c89020" strokeWidth="2" />
      <line x1="95" y1="256" x2="95" y2="296" stroke="#c89020" strokeWidth="2" />
      {/* Boots */}
      <rect x="48" y="284" width="26" height="13" rx="5" fill="#181410" />
      <rect x="82" y="284" width="26" height="13" rx="5" fill="#181410" />
      <ellipse cx="80" cy="295" rx="42" ry="5" fill="rgba(0,0,0,0.18)" />
    </svg>
  );
}

// ── Mère (Dying Mother) ───────────────────────────────────────
export function MereSvg({ skin, hair, pose = "sit" }: { skin: string; hair: string; pose?: "stand" | "sit" | "lie" | "floor" }) {
  if (pose === "floor") return <FloorPose skin={skin} hair={hair} clothing="#f0ece8" />;
  // lie and sit both use the deathbed reclining rendering
  if (pose === "stand") {
    return (
      <svg viewBox="0 0 160 300" width="100%" height="100%" style={{ overflow: "visible" }}>
        {/* Hair — loose, falling at sides */}
        <path d="M56 58 Q38 104 40 174" stroke={hair} strokeWidth="14" fill="none" strokeLinecap="round" />
        <path d="M104 58 Q122 104 120 174" stroke={hair} strokeWidth="14" fill="none" strokeLinecap="round" />
        <ellipse cx="80" cy="46" rx="26" ry="18" fill={hair} />
        {/* Head — pale, frail */}
        <ellipse cx="80" cy="68" rx="22" ry="26" fill={skin} />
        {/* Half-closed eyes */}
        <path d="M65 63 Q70 60 75 63" stroke="#2a1a10" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M85 63 Q90 60 95 63" stroke="#2a1a10" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M65 65 Q70 63 75 65" stroke="rgba(140,90,90,0.28)" strokeWidth="1.5" fill="none" />
        <path d="M85 65 Q90 63 95 65" stroke="rgba(140,90,90,0.28)" strokeWidth="1.5" fill="none" />
        <ellipse cx="70" cy="67" rx="5" ry="2" fill="rgba(100,60,80,0.14)" />
        <ellipse cx="90" cy="67" rx="5" ry="2" fill="rgba(100,60,80,0.14)" />
        <path d="M63 58 Q70 55 77 58" stroke={hair} strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.65" />
        <path d="M83 58 Q90 55 97 58" stroke={hair} strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.65" />
        <ellipse cx="80" cy="76" rx="3" ry="2.5" fill={skin} stroke="rgba(0,0,0,0.08)" strokeWidth="0.8" />
        <path d="M74 84 Q80 86 86 84" stroke="#a07878" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        {/* Neck */}
        <rect x="73" y="93" width="14" height="11" rx="6" fill={skin} />
        {/* White nightgown — loose, flowing */}
        <path d="M50 104 L110 104 L112 268 L48 268 Z" fill="#f0ece8" />
        <path d="M70 104 Q68 186 66 268" stroke="#e0dcd8" strokeWidth="1.8" fill="none" />
        <path d="M90 104 Q92 186 94 268" stroke="#e0dcd8" strokeWidth="1.8" fill="none" />
        <path d="M54 154 Q80 164 106 154" stroke="#e0dcd8" strokeWidth="1.5" fill="none" />
        {/* Arms — weakly at sides */}
        <path d="M50 116 Q46 150 50 174" stroke={skin} strokeWidth="12" fill="none" strokeLinecap="round" />
        <path d="M110 116 Q114 150 110 174" stroke={skin} strokeWidth="12" fill="none" strokeLinecap="round" />
        <ellipse cx="50" cy="177" rx="8" ry="6" fill={skin} />
        <ellipse cx="110" cy="177" rx="8" ry="6" fill={skin} />
        {/* Feet */}
        <ellipse cx="62" cy="271" rx="12" ry="6" fill="#e8e4e0" />
        <ellipse cx="98" cy="271" rx="12" ry="6" fill="#e8e4e0" />
        <ellipse cx="80" cy="295" rx="38" ry="5" fill="rgba(0,0,0,0.11)" />
      </svg>
    );
  }

  // Sit — reclining on deathbed (default)
  return (
    <svg viewBox="0 0 160 300" width="100%" height="100%" style={{ overflow: "visible" }}>
      {/* Bed/pillow */}
      <path d="M18 172 Q80 160 142 172 L146 248 Q80 256 14 248 Z" fill="#e8e4e0" />
      <ellipse cx="80" cy="172" rx="64" ry="14" fill="#f4f0ec" />
      {/* Hair spread on pillow */}
      <path d="M36 132 Q22 152 24 172" stroke={hair} strokeWidth="10" fill="none" strokeLinecap="round" />
      <path d="M44 126 Q28 146 26 168" stroke={hair} strokeWidth="8" fill="none" strokeLinecap="round" opacity="0.65" />
      <path d="M124 132 Q138 152 136 172" stroke={hair} strokeWidth="10" fill="none" strokeLinecap="round" />
      <ellipse cx="80" cy="122" rx="30" ry="14" fill={hair} />
      {/* Head — propped up, ethereal */}
      <ellipse cx="80" cy="120" rx="24" ry="24" fill={skin} />
      {/* Half-closed eyes */}
      <path d="M66 115 Q70 112 74 115" stroke="#2a1a10" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <path d="M86 115 Q90 112 94 115" stroke="#2a1a10" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <path d="M66 117 Q70 115 74 117" stroke="rgba(140,90,90,0.28)" strokeWidth="1.5" fill="none" />
      <path d="M86 117 Q90 115 94 117" stroke="rgba(140,90,90,0.28)" strokeWidth="1.5" fill="none" />
      <ellipse cx="70" cy="119" rx="5" ry="2.5" fill="rgba(100,60,80,0.16)" />
      <ellipse cx="90" cy="119" rx="5" ry="2.5" fill="rgba(100,60,80,0.16)" />
      <path d="M63 110 Q70 107 77 110" stroke={hair} strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.6" />
      <path d="M83 110 Q90 107 97 110" stroke={hair} strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.6" />
      <ellipse cx="80" cy="126" rx="3" ry="2.5" fill={skin} stroke="rgba(0,0,0,0.07)" strokeWidth="0.8" />
      <path d="M74 135 Q80 137 86 135" stroke="#a07878" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {/* Neck */}
      <rect x="73" y="143" width="14" height="10" rx="5" fill={skin} />
      {/* Sheet / nightgown */}
      <path d="M20 154 Q80 144 140 154 L146 256 Q80 264 14 256 Z" fill="#f0ece8" />
      <path d="M28 162 Q80 154 132 162" stroke="#e0dcd8" strokeWidth="1.5" fill="none" />
      <path d="M24 182 Q80 174 136 182" stroke="#e0dcd8" strokeWidth="1.5" fill="none" />
      <path d="M20 202 Q80 196 140 202" stroke="#e0dcd8" strokeWidth="1.5" fill="none" />
      {/* Arms resting at sides on the bed */}
      <path d="M36 157 Q30 184 32 224" stroke={skin} strokeWidth="11" fill="none" strokeLinecap="round" />
      <path d="M124 157 Q130 184 128 224" stroke={skin} strokeWidth="11" fill="none" strokeLinecap="round" />
      <ellipse cx="32" cy="227" rx="7" ry="6" fill={skin} />
      <ellipse cx="128" cy="227" rx="7" ry="6" fill={skin} />
      {/* Feet outline under sheet */}
      <ellipse cx="64" cy="258" rx="16" ry="8" fill="#e8e4e0" opacity="0.7" />
      <ellipse cx="96" cy="258" rx="16" ry="8" fill="#e8e4e0" opacity="0.7" />
    </svg>
  );
}

// ── Yang Chengyue 杨成岳 ───────────────────────────────────────
export function YangChengyueSvg({ skin, hair, pose = "stand" }: { skin: string; hair: string; pose?: "stand" | "sit" | "lie" | "floor" }) {
  if (pose === "lie")   return <LiePose   skin={skin} hair={hair} clothing="#1a2838" />;
  if (pose === "floor") return <FloorPose skin={skin} hair={hair} clothing="#1a2838" />;
  return (
    <svg viewBox="0 0 160 300" width="100%" height="100%" style={{ overflow: "visible" }}>
      {/* Hair — short, neat */}
      <ellipse cx="80" cy="36" rx="24" ry="14" fill={hair} />
      <ellipse cx="58" cy="48" rx="7" ry="12" fill={hair} />
      <ellipse cx="102" cy="48" rx="7" ry="12" fill={hair} />
      {/* Head — square-jawed, dignified */}
      <ellipse cx="80" cy="66" rx="24" ry="28" fill={skin} />
      {/* Eyes — intelligent, calm */}
      <ellipse cx="70" cy="60" rx="4.5" ry="4" fill="#fff" />
      <ellipse cx="90" cy="60" rx="4.5" ry="4" fill="#fff" />
      <circle cx="70" cy="60" r="2.5" fill="#1a1a1a" />
      <circle cx="90" cy="60" r="2.5" fill="#1a1a1a" />
      <path d="M65 55 Q70 52 75 55" stroke={hair} strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <path d="M85 55 Q90 52 95 55" stroke={hair} strokeWidth="1.8" fill="none" strokeLinecap="round" />
      {/* Nose */}
      <ellipse cx="80" cy="70" rx="4" ry="3" fill={skin} stroke="rgba(0,0,0,0.12)" strokeWidth="0.8" />
      {/* Composed mouth */}
      <path d="M73 80 Q80 84 87 80" stroke="#906060" strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* Light mustache */}
      <path d="M72 77 Q76 80 80 77 Q84 80 88 77" fill={hair} opacity="0.45" />
      {/* Neck */}
      <rect x="73" y="93" width="14" height="12" rx="6" fill={skin} />
      {/* Mandarin collar */}
      <rect x="72" y="104" width="16" height="8" rx="3" fill="#1a2838" />
      <path d="M64 110 L80 118 L96 110" stroke="#2a3848" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      {/* Dark navy changshan */}
      <path d="M44 110 L116 110 L116 270 L44 270 Z" fill="#1a2838" />
      <line x1="80" y1="110" x2="80" y2="270" stroke="#243244" strokeWidth="2" />
      {/* Right-side diagonal closure */}
      <path d="M80 110 L62 138" stroke="#243244" strokeWidth="1.5" fill="none" />
      {/* Frog buttons */}
      <circle cx="71" cy="122" r="3" fill="#2a3848" stroke="#3a4858" strokeWidth="1" />
      <circle cx="71" cy="138" r="3" fill="#2a3848" stroke="#3a4858" strokeWidth="1" />
      {/* Side slits */}
      <path d="M44 224 L44 270" stroke="#243244" strokeWidth="3" />
      <path d="M116 224 L116 270" stroke="#243244" strokeWidth="3" />
      {/* Cuffs */}
      <rect x="44" y="244" width="16" height="5" rx="2" fill="#243244" />
      <rect x="100" y="244" width="16" height="5" rx="2" fill="#243244" />
      {/* Arms — dignified posture */}
      <path d="M44 124 Q26 160 24 196" stroke={skin} strokeWidth="13" fill="none" strokeLinecap="round" />
      <path d="M116 124 Q134 160 136 196" stroke={skin} strokeWidth="13" fill="none" strokeLinecap="round" />
      <ellipse cx="24" cy="199" rx="8" ry="7" fill={skin} />
      <ellipse cx="136" cy="199" rx="8" ry="7" fill={skin} />
      {/* Shoes */}
      <ellipse cx="60" cy="274" rx="18" ry="7" fill="#181410" />
      <ellipse cx="100" cy="274" rx="18" ry="7" fill="#181410" />
      <ellipse cx="80" cy="295" rx="42" ry="5" fill="rgba(0,0,0,0.18)" />
    </svg>
  );
}

// ── Xue Er 雪儿 ───────────────────────────────────────────────
export function XueErSvg({ skin, hair, pose = "stand" }: { skin: string; hair: string; pose?: "stand" | "sit" | "lie" | "floor" }) {
  if (pose === "lie")   return <LiePose   skin={skin} hair={hair} clothing="#8ab8c8" />;
  if (pose === "floor") return <FloorPose skin={skin} hair={hair} clothing="#8ab8c8" />;
  return (
    <svg viewBox="0 0 160 300" width="100%" height="100%" style={{ overflow: "visible" }}>
      {/* Elegant hair bun */}
      <ellipse cx="80" cy="24" rx="16" ry="12" fill={hair} />
      <ellipse cx="80" cy="18" rx="10" ry="8" fill={hair} />
      {/* Jade hairpin */}
      <line x1="68" y1="20" x2="94" y2="15" stroke="#4a9870" strokeWidth="2" strokeLinecap="round" />
      <circle cx="94" cy="15" r="3.5" fill="#3a8860" stroke="#2a6840" strokeWidth="0.8" />
      {/* Side hair */}
      <ellipse cx="58" cy="54" rx="9" ry="18" fill={hair} />
      <ellipse cx="102" cy="54" rx="9" ry="18" fill={hair} />
      {/* Temple wisps */}
      <path d="M58 42 Q50 52 52 62" stroke={hair} strokeWidth="4" fill="none" strokeLinecap="round" opacity="0.8" />
      <path d="M102 42 Q110 52 108 62" stroke={hair} strokeWidth="4" fill="none" strokeLinecap="round" opacity="0.8" />
      {/* Head — youthful, oval */}
      <ellipse cx="80" cy="68" rx="22" ry="26" fill={skin} />
      {/* Eyes — gentle, bright */}
      <ellipse cx="70" cy="63" rx="5" ry="4" fill="#fff" />
      <ellipse cx="90" cy="63" rx="5" ry="4" fill="#fff" />
      <circle cx="70" cy="63" r="2.5" fill="#1a1010" />
      <circle cx="90" cy="63" r="2.5" fill="#1a1010" />
      <circle cx="71" cy="62" r="1" fill="#fff" />
      <circle cx="91" cy="62" r="1" fill="#fff" />
      <path d="M65 57 Q70 54 75 57" stroke={hair} strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M85 57 Q90 54 95 57" stroke={hair} strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <ellipse cx="80" cy="72" rx="3" ry="2.5" fill={skin} stroke="rgba(0,0,0,0.08)" strokeWidth="0.8" />
      {/* Gentle smile */}
      <path d="M74 81 Q80 86 86 81" stroke="#c08070" strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* Neck */}
      <rect x="73" y="93" width="14" height="12" rx="6" fill={skin} />
      {/* Qipao mandarin collar */}
      <rect x="72" y="104" width="16" height="9" rx="4" fill="#8ab8c8" />
      <path d="M64 112 L80 120 L96 112" stroke="#7aa8b8" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      {/* Qipao body — soft teal */}
      <path d="M50 112 L110 112 L110 222 L50 222 Z" fill="#8ab8c8" />
      {/* Diagonal closure */}
      <path d="M80 112 L60 140" stroke="#7aa8b8" strokeWidth="1.8" fill="none" />
      {/* Frog buttons */}
      <circle cx="70" cy="122" r="2.5" fill="#5a8898" />
      <circle cx="70" cy="136" r="2.5" fill="#5a8898" />
      {/* Floral embroidery */}
      <circle cx="96" cy="162" r="6" fill="#6aa8b8" opacity="0.45" />
      <path d="M96 156 Q100 160 96 164 Q92 160 96 156" fill="#a8d8e8" opacity="0.6" />
      <circle cx="96" cy="162" r="2" fill="#4a8898" opacity="0.65" />
      {/* Side slits */}
      <path d="M50 192 L50 222" stroke="#7aa8b8" strokeWidth="3" />
      <path d="M110 192 L110 222" stroke="#7aa8b8" strokeWidth="3" />
      {/* Skirt below — slight flare */}
      <path d="M48 222 Q28 234 24 284 L136 284 Q132 234 112 222 Z" fill="#8ab8c8" />
      <path d="M26 276 Q80 286 134 276" stroke="#7aa8b8" strokeWidth="1.8" fill="none" />
      {/* Arms */}
      <path d="M50 124 Q28 158 26 194" stroke={skin} strokeWidth="12" fill="none" strokeLinecap="round" />
      <path d="M110 124 Q132 158 134 194" stroke={skin} strokeWidth="12" fill="none" strokeLinecap="round" />
      <ellipse cx="26" cy="197" rx="7" ry="6" fill={skin} />
      <ellipse cx="134" cy="197" rx="7" ry="6" fill={skin} />
      {/* Shoes */}
      <ellipse cx="58" cy="287" rx="16" ry="6" fill="#2a1a10" />
      <ellipse cx="102" cy="287" rx="16" ry="6" fill="#2a1a10" />
      <ellipse cx="80" cy="295" rx="38" ry="5" fill="rgba(0,0,0,0.15)" />
    </svg>
  );
}

// ── Wang Chaojie 王超杰 ────────────────────────────────────────
export function WangChaojeSvg({ skin, hair, pose = "stand" }: { skin: string; hair: string; pose?: "stand" | "sit" | "lie" | "floor" }) {
  if (pose === "lie")   return <LiePose   skin={skin} hair={hair} clothing="#c8c0b0" clothing2="#b8b0a0" />;
  if (pose === "floor") return <FloorPose skin={skin} hair={hair} clothing="#c8c0b0" clothing2="#b8b0a0" />;
  return (
    <svg viewBox="0 0 160 300" width="100%" height="100%" style={{ overflow: "visible" }}>
      {/* White/silver hair — thinning, combed back */}
      <ellipse cx="80" cy="36" rx="24" ry="14" fill={hair} opacity="0.92" />
      <ellipse cx="58" cy="48" rx="7" ry="13" fill={hair} opacity="0.85" />
      <ellipse cx="102" cy="48" rx="7" ry="13" fill={hair} opacity="0.85" />
      <ellipse cx="80" cy="30" rx="18" ry="8" fill={hair} opacity="0.55" />
      {/* Head — older, fuller face */}
      <ellipse cx="80" cy="66" rx="24" ry="28" fill={skin} />
      {/* Age lines */}
      <path d="M64 74 Q66 72 68 74" stroke="rgba(0,0,0,0.09)" strokeWidth="1.2" fill="none" />
      <path d="M92 74 Q94 72 96 74" stroke="rgba(0,0,0,0.09)" strokeWidth="1.2" fill="none" />
      <path d="M75 86 Q80 88 85 86" stroke="rgba(0,0,0,0.07)" strokeWidth="1" fill="none" />
      {/* Eyes — aged, slightly drooping lids */}
      <ellipse cx="70" cy="60" rx="4.5" ry="3.5" fill="#fff" />
      <ellipse cx="90" cy="60" rx="4.5" ry="3.5" fill="#fff" />
      <circle cx="70" cy="60" r="2.2" fill="#1a1a1a" />
      <circle cx="90" cy="60" r="2.2" fill="#1a1a1a" />
      <path d="M65 58 Q70 56 75 58" stroke={hair} strokeWidth="2.2" fill="none" strokeLinecap="round" />
      <path d="M85 58 Q90 56 95 58" stroke={hair} strokeWidth="2.2" fill="none" strokeLinecap="round" />
      {/* Crow's feet */}
      <path d="M76 60 Q78 64 76 67" stroke="rgba(0,0,0,0.09)" strokeWidth="1" fill="none" />
      <path d="M84 60 Q82 64 84 67" stroke="rgba(0,0,0,0.09)" strokeWidth="1" fill="none" />
      {/* Nose — broader */}
      <ellipse cx="80" cy="72" rx="4.5" ry="3.5" fill={skin} stroke="rgba(0,0,0,0.12)" strokeWidth="0.8" />
      {/* Dignified slight smile */}
      <path d="M72 82 Q80 86 88 82" stroke="#806060" strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* Jowl shadow */}
      <ellipse cx="80" cy="92" rx="14" ry="5" fill="rgba(0,0,0,0.05)" />
      {/* Neck */}
      <rect x="73" y="93" width="14" height="11" rx="5" fill={skin} />
      {/* Light beige changshan collar */}
      <rect x="72" y="103" width="16" height="8" rx="3" fill="#c8b898" />
      <path d="M64 110 L80 118 L96 110" stroke="#b8a888" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      {/* Light grey-beige changshan — slightly worn */}
      <path d="M42 110 L118 110 L120 270 L40 270 Z" fill="#c8c0b0" />
      <line x1="80" y1="110" x2="80" y2="270" stroke="#b8b0a0" strokeWidth="2" />
      <path d="M80 110 L62 138" stroke="#b8b0a0" strokeWidth="1.5" fill="none" />
      <circle cx="71" cy="122" r="2.8" fill="#a8a090" stroke="#989080" strokeWidth="0.8" />
      <circle cx="71" cy="138" r="2.8" fill="#a8a090" stroke="#989080" strokeWidth="0.8" />
      <rect x="40" y="244" width="16" height="5" rx="2" fill="#b8b0a0" />
      <rect x="104" y="244" width="16" height="5" rx="2" fill="#b8b0a0" />
      {/* Left arm — down holding briefcase */}
      <path d="M42 124 Q24 158 22 192" stroke={skin} strokeWidth="13" fill="none" strokeLinecap="round" />
      <ellipse cx="22" cy="196" rx="8" ry="7" fill={skin} />
      {/* Right arm — down at side, slight lean */}
      <path d="M118 124 Q138 152 140 184" stroke={skin} strokeWidth="13" fill="none" strokeLinecap="round" />
      <ellipse cx="140" cy="188" rx="8" ry="7" fill={skin} />
      {/* Briefcase */}
      <rect x="10" y="196" width="26" height="18" rx="4" fill="#5a4030" stroke="#3a2818" strokeWidth="1.5" />
      <rect x="10" y="200" width="26" height="2.5" rx="1" fill="#3a2818" />
      <path d="M16 196 Q23 189 30 196" stroke="#3a2818" strokeWidth="2" fill="none" strokeLinecap="round" />
      <rect x="21" y="202" width="6" height="4" rx="1" fill="#8a6848" />
      {/* Feet — slightly asymmetric (stroke) */}
      <ellipse cx="60" cy="274" rx="18" ry="7" fill="#2a1a10" />
      <ellipse cx="102" cy="276" rx="18" ry="7" fill="#2a1a10" />
      <ellipse cx="80" cy="295" rx="42" ry="5" fill="rgba(0,0,0,0.18)" />
    </svg>
  );
}

// ── Très Jeune Fille (Cinderella) ────────────────────────────
export function TresJeuneFilleSvg({ skin, hair, pose = "stand" }: { skin: string; hair: string; pose?: "stand" | "sit" | "lie" | "floor" }) {
  if (pose === "lie") {
    return (
      <svg viewBox="0 0 160 300" width="100%" height="100%" style={{ overflow: "visible" }}>
        {/* Floor shadow */}
        <ellipse cx="82" cy="284" rx="68" ry="7" fill="rgba(0,0,0,0.14)" />
        {/* Hair — spread behind head, bun undone */}
        <ellipse cx="20" cy="232" rx="22" ry="14" fill={hair} />
        <path d="M6 222 Q8 236 12 248" stroke={hair} strokeWidth="10" fill="none" strokeLinecap="round" opacity="0.75" />
        <path d="M10 226 Q14 240 18 250" stroke={hair} strokeWidth="7" fill="none" strokeLinecap="round" opacity="0.5" />
        {/* Head — resting peacefully */}
        <ellipse cx="28" cy="238" rx="20" ry="18" fill={skin} />
        {/* Eyes — closed, serene */}
        <path d="M18 230 Q22 227 26 230" stroke="#2a1a10" strokeWidth="1.8" fill="none" strokeLinecap="round" />
        <path d="M30 230 Q34 227 38 230" stroke="#2a1a10" strokeWidth="1.8" fill="none" strokeLinecap="round" />
        {/* Soft lashes */}
        {[18,20,22,24,26].map((x,i) => (
          <line key={i} x1={x} y1="230" x2={x-1} y2="226" stroke="#2a1a10" strokeWidth="0.9" strokeLinecap="round" opacity="0.6" />
        ))}
        {/* Nose */}
        <ellipse cx="34" cy="241" rx="3" ry="2.5" fill={skin} stroke="rgba(0,0,0,0.09)" strokeWidth="0.8" />
        {/* Mouth — relaxed, slight smile */}
        <path d="M26 250 Q32 254 38 250" stroke="#c08070" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        {/* Neck */}
        <ellipse cx="48" cy="248" rx="9" ry="6" fill={skin} />
        {/* Dress body — horizontal, blue with white apron center */}
        <path d="M42 241 Q90 236 150 246 L150 270 Q90 278 42 267 Z" fill="#7090a8" />
        <path d="M58 239 L100 238 L100 265 L58 266 Z" fill="#e8e4dc" opacity="0.88" />
        {/* Apron bow detail */}
        <path d="M72 248 Q79 244 86 248 Q79 252 72 248" fill="#d8d4cc" opacity="0.7" />
        {/* Near arm along body */}
        <path d="M52 253 Q68 268 78 274" stroke={skin} strokeWidth="12" fill="none" strokeLinecap="round" />
        <ellipse cx="80" cy="277" rx="7" ry="6" fill={skin} />
        {/* Far arm, tucked */}
        <path d="M70 246 Q88 255 98 263" stroke={skin} strokeWidth="10" fill="none" strokeLinecap="round" opacity="0.5" />
        {/* Feet */}
        <ellipse cx="152" cy="258" rx="10" ry="7" fill={skin} opacity="0.8" />
      </svg>
    );
  }
  if (pose === "floor") return <FloorPose skin={skin} hair={hair} clothing="#7090a8" clothing2="#e8e4dc" />;
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
