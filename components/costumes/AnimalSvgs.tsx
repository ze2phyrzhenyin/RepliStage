/**
 * Animal character SVGs — generic, any actor can wear them.
 * viewBox="0 0 160 300"
 */

export function TigerSvg() {
  return (
    <svg viewBox="0 0 160 300" width="100%" height="100%" style={{ overflow: "visible" }}>
      {/* Ears */}
      <path d="M52 38 L44 14 L68 32 Z" fill="#e07828" />
      <path d="M108 38 L116 14 L92 32 Z" fill="#e07828" />
      <path d="M54 36 L48 20 L66 34 Z" fill="#f0a060" />
      <path d="M106 36 L112 20 L94 34 Z" fill="#f0a060" />
      {/* Head */}
      <ellipse cx="80" cy="68" rx="36" ry="34" fill="#e87830" />
      {/* White face markings */}
      <ellipse cx="80" cy="74" rx="22" ry="18" fill="#f0d8b0" />
      {/* Forehead stripes */}
      <path d="M72 38 Q80 42 88 38 Q80 50 72 38" fill="#2a1408" opacity="0.7" />
      <path d="M66 44 Q80 46 94 44" stroke="#2a1408" strokeWidth="2" fill="none" opacity="0.5" />
      {/* Eyes — fierce */}
      <ellipse cx="66" cy="62" rx="8" ry="7" fill="#e8c040" />
      <ellipse cx="94" cy="62" rx="8" ry="7" fill="#e8c040" />
      <ellipse cx="66" cy="62" rx="4" ry="6" fill="#1a0c04" />
      <ellipse cx="94" cy="62" rx="4" ry="6" fill="#1a0c04" />
      <circle cx="64" cy="60" r="2" fill="#fff" />
      <circle cx="92" cy="60" r="2" fill="#fff" />
      {/* Nose — flat feline */}
      <path d="M75 76 Q80 80 85 76 Q80 84 75 76" fill="#d05030" />
      <ellipse cx="80" cy="75" rx="5" ry="3.5" fill="#c04020" />
      {/* Whiskers */}
      {[-1,0,1].map((y, i) => (
        <line key={i} x1="58" y1={82 + y*5} x2="30" y2={80 + y*5} stroke="#f0d8b0" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
      ))}
      {[-1,0,1].map((y, i) => (
        <line key={i} x1="102" y1={82 + y*5} x2="130" y2={80 + y*5} stroke="#f0d8b0" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
      ))}
      {/* Mouth */}
      <path d="M80 84 Q72 90 68 88" stroke="#c04020" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M80 84 Q88 90 92 88" stroke="#c04020" strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* Neck */}
      <rect x="68" y="100" width="24" height="16" rx="8" fill="#e07828" />
      {/* Striped body */}
      <path d="M38 114 L122 114 L118 268 L42 268 Z" fill="#e07828" />
      {/* Body stripes */}
      <path d="M52 114 L48 268" stroke="#2a1408" strokeWidth="8" opacity="0.45" />
      <path d="M68 114 L66 268" stroke="#2a1408" strokeWidth="6" opacity="0.35" />
      <path d="M92 114 L94 268" stroke="#2a1408" strokeWidth="6" opacity="0.35" />
      <path d="M108 114 L112 268" stroke="#2a1408" strokeWidth="8" opacity="0.45" />
      {/* Belly */}
      <ellipse cx="80" cy="190" rx="26" ry="54" fill="#f0d8b0" opacity="0.7" />
      {/* Arms */}
      <path d="M38 128 Q16 162 14 202" stroke="#e07828" strokeWidth="18" fill="none" strokeLinecap="round" />
      <path d="M122 128 Q144 162 146 202" stroke="#e07828" strokeWidth="18" fill="none" strokeLinecap="round" />
      {/* Paws */}
      <ellipse cx="14" cy="206" rx="14" ry="10" fill="#e07828" />
      <ellipse cx="146" cy="206" rx="14" ry="10" fill="#e07828" />
      {/* Paw lines */}
      {[-4,0,4].map((x, i) => (
        <path key={i} d="M0 0 Q0 6 0 8" transform={`translate(${14+x},198)`} stroke="#2a1408" strokeWidth="1.5" fill="none" opacity="0.5" strokeLinecap="round" />
      ))}
      {/* Tail */}
      <path d="M118 268 Q148 256 150 230 Q152 210 138 208" stroke="#e07828" strokeWidth="10" fill="none" strokeLinecap="round" />
      {/* Tail stripes */}
      <path d="M144 244 Q148 238 148 232" stroke="#2a1408" strokeWidth="4" fill="none" opacity="0.5" strokeLinecap="round" />
      {/* Legs/feet */}
      <rect x="46" y="268" width="28" height="24" rx="10" fill="#e07828" />
      <rect x="86" y="268" width="28" height="24" rx="10" fill="#e07828" />
      <ellipse cx="80" cy="295" rx="44" ry="5" fill="rgba(0,0,0,0.18)" />
    </svg>
  );
}

export function RabbitSvg() {
  return (
    <svg viewBox="0 0 160 300" width="100%" height="100%" style={{ overflow: "visible" }}>
      {/* Long ears */}
      <ellipse cx="60" cy="22" rx="14" ry="32" fill="#f4eeec" />
      <ellipse cx="100" cy="22" rx="14" ry="32" fill="#f4eeec" />
      {/* Inner ear pink */}
      <ellipse cx="60" cy="22" rx="7" ry="24" fill="#f0b0b8" />
      <ellipse cx="100" cy="22" rx="7" ry="24" fill="#f0b0b8" />
      {/* Head */}
      <ellipse cx="80" cy="76" rx="34" ry="32" fill="#f4eeec" />
      {/* Cheek puffs */}
      <ellipse cx="56" cy="84" rx="14" ry="10" fill="#f8f2f0" />
      <ellipse cx="104" cy="84" rx="14" ry="10" fill="#f8f2f0" />
      {/* Eyes — big, soft */}
      <ellipse cx="67" cy="68" rx="9" ry="10" fill="#d4e8f4" />
      <ellipse cx="93" cy="68" rx="9" ry="10" fill="#d4e8f4" />
      <circle cx="67" cy="69" r="6" fill="#1a1a2a" />
      <circle cx="93" cy="69" r="6" fill="#1a1a2a" />
      <circle cx="65" cy="66" r="2.5" fill="#fff" />
      <circle cx="91" cy="66" r="2.5" fill="#fff" />
      {/* Twitchy nose */}
      <ellipse cx="80" cy="84" rx="5" ry="4" fill="#f0a0a8" />
      {/* Whiskers */}
      {[-1,0,1].map((y, i) => (
        <line key={i} x1="58" y1={84 + y*5} x2="34" y2={83 + y*5} stroke="#e0d8d4" strokeWidth="1.2" strokeLinecap="round" />
      ))}
      {[-1,0,1].map((y, i) => (
        <line key={i} x1="102" y1={84 + y*5} x2="126" y2={83 + y*5} stroke="#e0d8d4" strokeWidth="1.2" strokeLinecap="round" />
      ))}
      {/* Cute mouth */}
      <path d="M80 88 Q73 94 68 92" stroke="#c08090" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <path d="M80 88 Q87 94 92 92" stroke="#c08090" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      {/* Neck */}
      <rect x="70" y="106" width="20" height="14" rx="8" fill="#f4eeec" />
      {/* Round fluffy body */}
      <ellipse cx="80" cy="196" rx="46" ry="68" fill="#f4eeec" />
      {/* Belly fluff */}
      <ellipse cx="80" cy="200" rx="28" ry="44" fill="#fff8f6" />
      {/* Arms */}
      <path d="M36 148 Q18 174 16 208" stroke="#f4eeec" strokeWidth="18" fill="none" strokeLinecap="round" />
      <path d="M124 148 Q142 174 144 208" stroke="#f4eeec" strokeWidth="18" fill="none" strokeLinecap="round" />
      <ellipse cx="16" cy="212" rx="14" ry="10" fill="#f4eeec" />
      <ellipse cx="144" cy="212" rx="14" ry="10" fill="#f4eeec" />
      {/* Bowtie */}
      <path d="M68 114 Q80 108 92 114 Q80 120 68 114" fill="#f0a0a8" />
      <circle cx="80" cy="114" r="4" fill="#e88090" />
      {/* Feet */}
      <ellipse cx="58" cy="272" rx="20" ry="12" fill="#f4eeec" />
      <ellipse cx="102" cy="272" rx="20" ry="12" fill="#f4eeec" />
      {/* Fluffy tail */}
      <circle cx="80" cy="268" r="14" fill="#fff8f6" />
      <ellipse cx="80" cy="295" rx="44" ry="5" fill="rgba(0,0,0,0.18)" />
    </svg>
  );
}

export function PandaSvg() {
  return (
    <svg viewBox="0 0 160 300" width="100%" height="100%" style={{ overflow: "visible" }}>
      {/* Ears */}
      <circle cx="50" cy="38" r="18" fill="#1a1a1a" />
      <circle cx="110" cy="38" r="18" fill="#1a1a1a" />
      {/* Head */}
      <ellipse cx="80" cy="76" rx="38" ry="36" fill="#f4f2ee" />
      {/* Eye patches — classic panda */}
      <ellipse cx="64" cy="66" rx="16" ry="14" fill="#1a1a1a" transform="rotate(-12,64,66)" />
      <ellipse cx="96" cy="66" rx="16" ry="14" fill="#1a1a1a" transform="rotate(12,96,66)" />
      {/* Eyes */}
      <ellipse cx="64" cy="65" rx="8" ry="8" fill="#fff" />
      <ellipse cx="96" cy="65" rx="8" ry="8" fill="#fff" />
      <circle cx="64" cy="66" r="5" fill="#1a1a1a" />
      <circle cx="96" cy="66" r="5" fill="#1a1a1a" />
      <circle cx="62" cy="63" r="2" fill="#fff" />
      <circle cx="94" cy="63" r="2" fill="#fff" />
      {/* Nose */}
      <ellipse cx="80" cy="82" rx="7" ry="5" fill="#1a1a1a" />
      <ellipse cx="80" cy="81" rx="4" ry="2.5" fill="#2a2a2a" />
      {/* Cheeks — round panda cheeks */}
      <ellipse cx="55" cy="86" rx="12" ry="9" fill="#f4eeea" />
      <ellipse cx="105" cy="86" rx="12" ry="9" fill="#f4eeea" />
      {/* Mouth */}
      <path d="M73 90 Q80 96 87 90" stroke="#1a1a1a" strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* Neck */}
      <rect x="68" y="110" width="24" height="16" rx="8" fill="#f4f2ee" />
      {/* Body — black */}
      <path d="M30 122 L130 122 L126 272 L34 272 Z" fill="#1a1a1a" />
      {/* White belly */}
      <ellipse cx="80" cy="198" rx="34" ry="64" fill="#f4f2ee" />
      {/* Arms — black */}
      <path d="M30 138 Q8 172 6 216" stroke="#1a1a1a" strokeWidth="20" fill="none" strokeLinecap="round" />
      <path d="M130 138 Q152 172 154 216" stroke="#1a1a1a" strokeWidth="20" fill="none" strokeLinecap="round" />
      {/* Paws — white */}
      <ellipse cx="6" cy="220" rx="16" ry="11" fill="#f4f2ee" />
      <ellipse cx="154" cy="220" rx="16" ry="11" fill="#f4f2ee" />
      {/* Holding bamboo in left paw */}
      <line x1="6" y1="218" x2="0" y2="110" stroke="#4a8020" strokeWidth="6" strokeLinecap="round" />
      <ellipse cx="0" cy="106" rx="6" ry="4" fill="#5a9828" />
      {[0,1,2].map(i => (
        <path key={i} d="M-4 0 Q4 0 8 -6" transform={`translate(0,${112+i*16})`} stroke="#6ab030" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      ))}
      {/* Legs */}
      <rect x="38" y="270" width="34" height="24" rx="12" fill="#1a1a1a" />
      <rect x="88" y="270" width="34" height="24" rx="12" fill="#1a1a1a" />
      {/* White foot bottoms */}
      <ellipse cx="55" cy="292" rx="16" ry="7" fill="#f4f2ee" />
      <ellipse cx="105" cy="292" rx="16" ry="7" fill="#f4f2ee" />
      <ellipse cx="80" cy="295" rx="48" ry="5" fill="rgba(0,0,0,0.18)" />
    </svg>
  );
}

// ── Sheep ─────────────────────────────────────────────────────
export function SheepSvg() {
  return (
    <svg viewBox="0 0 160 300" width="100%" height="100%" style={{ overflow: "visible" }}>
      {/* Ears */}
      <ellipse cx="44" cy="60" rx="12" ry="8" fill="#e8e4e0" transform="rotate(-30 44 60)" />
      <ellipse cx="116" cy="60" rx="12" ry="8" fill="#e8e4e0" transform="rotate(30 116 60)" />
      <ellipse cx="44" cy="60" rx="8" ry="5" fill="#f0c0b0" transform="rotate(-30 44 60)" />
      <ellipse cx="116" cy="60" rx="8" ry="5" fill="#f0c0b0" transform="rotate(30 116 60)" />
      {/* Woolly head */}
      <ellipse cx="80" cy="58" rx="32" ry="28" fill="#f0ede8" />
      {/* Wool texture bumps on head */}
      {([[56,42],[68,36],[80,34],[92,36],[104,42],[60,52],[100,52]] as [number,number][]).map(([cx,cy],i) => (
        <ellipse key={i} cx={cx} cy={cy} rx="9" ry="7" fill="#e8e4e0" />
      ))}
      {/* Face */}
      <ellipse cx="80" cy="64" rx="20" ry="18" fill="#f8f4f0" />
      {/* Eyes */}
      <ellipse cx="70" cy="60" rx="5" ry="4" fill="#fff" />
      <ellipse cx="90" cy="60" rx="5" ry="4" fill="#fff" />
      <ellipse cx="70" cy="61" rx="3" ry="3" fill="#2a1a10" />
      <ellipse cx="90" cy="61" rx="3" ry="3" fill="#2a1a10" />
      <circle cx="69" cy="60" r="1" fill="#fff" />
      <circle cx="89" cy="60" r="1" fill="#fff" />
      {/* Nose */}
      <ellipse cx="80" cy="72" rx="6" ry="4" fill="#f0a0a0" />
      <ellipse cx="77" cy="71" rx="2" ry="1.5" fill="#d06060" />
      <ellipse cx="83" cy="71" rx="2" ry="1.5" fill="#d06060" />
      {/* Mouth */}
      <path d="M75 76 Q80 80 85 76" stroke="#c06060" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {/* Neck */}
      <rect x="68" y="84" width="24" height="14" rx="8" fill="#f0ede8" />
      {/* Woolly body */}
      <ellipse cx="80" cy="170" rx="52" ry="78" fill="#e8e4e0" />
      {/* Wool bumps on body */}
      {([[36,120],[56,108],[80,104],[104,108],[124,120],[30,148],[130,148],[34,176],[126,176]] as [number,number][]).map(([cx,cy],i) => (
        <ellipse key={i} cx={cx} cy={cy} rx="18" ry="14" fill="#f0ede8" />
      ))}
      {/* Legs */}
      <rect x="44" y="240" width="18" height="48" rx="8" fill="#d0c8c0" />
      <rect x="98" y="240" width="18" height="48" rx="8" fill="#d0c8c0" />
      <rect x="52" y="240" width="18" height="44" rx="8" fill="#d0c8c0" />
      <rect x="90" y="240" width="18" height="44" rx="8" fill="#d0c8c0" />
      {/* Hooves */}
      <ellipse cx="53" cy="287" rx="10" ry="6" fill="#6a5848" />
      <ellipse cx="107" cy="287" rx="10" ry="6" fill="#6a5848" />
      <ellipse cx="61" cy="283" rx="10" ry="6" fill="#6a5848" />
      <ellipse cx="99" cy="283" rx="10" ry="6" fill="#6a5848" />
      {/* Shadow */}
      <ellipse cx="80" cy="295" rx="48" ry="5" fill="rgba(0,0,0,0.15)" />
    </svg>
  );
}
