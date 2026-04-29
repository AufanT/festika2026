export default function AboutIllustration() {
  return (
    <svg
      viewBox="0 0 380 460"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      role="img"
      aria-label="Ilustrasi komunitas dan kolaborasi tim teknologi Festika"
    >
      {/* ── Background blobs ── */}
      <ellipse cx="190" cy="230" rx="178" ry="210" fill="#FFF8F0" opacity="0.7" />
      <circle cx="190" cy="210" r="155" fill="#FDE8CF" opacity="0.35" />

      {/* ── Monitor / Screen (center-back) ── */}
      <rect x="95" y="130" width="190" height="125" rx="8" fill="#1B3A4B" />
      <rect x="101" y="136" width="178" height="113" rx="5" fill="#0F2A36" />
      {/* Monitor stand */}
      <rect x="177" y="255" width="26" height="22" rx="2" fill="#2A5668" />
      <rect x="155" y="277" width="70" height="8" rx="3" fill="#1B3A4B" />

      {/* Screen content — bar chart */}
      <rect x="115" y="210" width="14" height="30" rx="2" fill="#F5A623" opacity="0.7" />
      <rect x="134" y="195" width="14" height="45" rx="2" fill="#F5A623" opacity="0.85" />
      <rect x="153" y="180" width="14" height="60" rx="2" fill="#F5A623" />
      <rect x="172" y="200" width="14" height="40" rx="2" fill="#2A5668" opacity="0.6" />
      <rect x="191" y="185" width="14" height="55" rx="2" fill="#F5A623" opacity="0.9" />
      <rect x="210" y="170" width="14" height="70" rx="2" fill="#F5A623" />
      <rect x="229" y="190" width="14" height="50" rx="2" fill="#2A5668" opacity="0.5" />
      {/* Chart axis */}
      <line x1="113" y1="240" x2="248" y2="240" stroke="white" strokeWidth="1.2" opacity="0.2" />

      {/* Screen title bar */}
      <rect x="101" y="136" width="178" height="22" rx="5" fill="#2A5668" opacity="0.5" />
      <circle cx="114" cy="147" r="4" fill="#EF4444" opacity="0.7" />
      <circle cx="126" cy="147" r="4" fill="#F5A623" opacity="0.7" />
      <circle cx="138" cy="147" r="4" fill="#22C55E" opacity="0.7" />

      {/* ── Person 1 (left) — holding document ── */}
      {/* Head */}
      <circle cx="100" cy="230" r="26" fill="#FFCBA4" />
      {/* Hair */}
      <path d="M75 225 Q78 202 100 199 Q122 202 125 225 Q120 214 100 212 Q80 214 75 225Z" fill="#1B3A4B" />
      {/* Eyes */}
      <circle cx="93" cy="228" r="2.5" fill="#1B3A4B" />
      <circle cx="107" cy="228" r="2.5" fill="#1B3A4B" />
      {/* Smile */}
      <path d="M94 239 Q100 245 106 239" stroke="#1B3A4B" strokeWidth="1.8" strokeLinecap="round" fill="none" />
      {/* Neck */}
      <rect x="94" y="253" width="12" height="12" rx="3" fill="#FFCBA4" />
      {/* Body / shirt — teal */}
      <path d="M74 264 Q82 261 90 265 L100 261 L110 265 Q118 261 126 264 L132 310 Q115 320 100 320 Q85 320 68 310 Z" fill="#2A5668" />
      {/* Left arm holding document */}
      <path d="M74 272 Q58 292 53 318 Q57 322 61 318 Q66 295 80 280Z" fill="#2A5668" />
      <circle cx="52" cy="320" r="8" fill="#FFCBA4" />
      {/* Document in hand */}
      <rect x="30" y="300" width="30" height="38" rx="3" fill="white" />
      <rect x="35" y="308" width="20" height="3" rx="1" fill="#1B3A4B" opacity="0.3" />
      <rect x="35" y="315" width="16" height="3" rx="1" fill="#1B3A4B" opacity="0.3" />
      <rect x="35" y="322" width="18" height="3" rx="1" fill="#F5A623" opacity="0.5" />
      <rect x="35" y="329" width="14" height="3" rx="1" fill="#1B3A4B" opacity="0.3" />
      {/* Right arm */}
      <path d="M126 272 Q140 290 143 314 Q139 318 136 314 Q133 292 120 280Z" fill="#2A5668" />
      <circle cx="144" cy="316" r="8" fill="#FFCBA4" />
      {/* Legs */}
      <rect x="84" y="314" width="16" height="55" rx="3" fill="#1B3A4B" />
      <rect x="102" y="314" width="16" height="55" rx="3" fill="#1B3A4B" />
      {/* Shoes */}
      <ellipse cx="92" cy="370" rx="13" ry="6" fill="#0F2A36" />
      <ellipse cx="110" cy="370" rx="13" ry="6" fill="#0F2A36" />

      {/* ── Person 2 (right) — pointing at screen ── */}
      {/* Head */}
      <circle cx="282" cy="230" r="26" fill="#FFCBA4" />
      {/* Hair (different style — shorter) */}
      <path d="M258 224 Q260 205 282 202 Q304 205 306 224 Q302 215 282 213 Q262 215 258 224Z" fill="#F5A623" />
      {/* Sideburns/extra hair */}
      <rect x="258" y="218" width="6" height="14" rx="3" fill="#F5A623" />
      <rect x="318" y="218" width="6" height="14" rx="3" fill="#F5A623" />
      {/* Eyes */}
      <circle cx="275" cy="228" r="2.5" fill="#1B3A4B" />
      <circle cx="289" cy="228" r="2.5" fill="#1B3A4B" />
      {/* Smile */}
      <path d="M276 239 Q282 246 288 239" stroke="#1B3A4B" strokeWidth="1.8" strokeLinecap="round" fill="none" />
      {/* Neck */}
      <rect x="276" y="253" width="12" height="12" rx="3" fill="#FFCBA4" />
      {/* Body / shirt — orange */}
      <path d="M256 264 Q264 261 272 265 L282 261 L292 265 Q300 261 308 264 L314 310 Q297 320 282 320 Q267 320 250 310 Z" fill="#F5A623" />
      {/* Left arm (pointing to screen) */}
      <path d="M256 272 Q238 258 220 252 Q218 258 222 260 Q238 266 254 282Z" fill="#F5A623" />
      <circle cx="217" cy="256" r="8" fill="#FFCBA4" />
      {/* Right arm */}
      <path d="M308 272 Q324 292 328 316 Q324 320 321 316 Q317 294 304 282Z" fill="#F5A623" />
      <circle cx="329" cy="318" r="8" fill="#FFCBA4" />
      {/* Legs */}
      <rect x="266" y="314" width="16" height="55" rx="3" fill="#1B3A4B" />
      <rect x="284" y="314" width="16" height="55" rx="3" fill="#1B3A4B" />
      {/* Shoes */}
      <ellipse cx="274" cy="370" rx="13" ry="6" fill="#0F2A36" />
      <ellipse cx="292" cy="370" rx="13" ry="6" fill="#0F2A36" />

      {/* ── Connection / network nodes ── */}
      {/* Node dots */}
      <circle cx="190" cy="390" r="7" fill="#F5A623" />
      <circle cx="148" cy="408" r="5" fill="#2A5668" />
      <circle cx="232" cy="408" r="5" fill="#2A5668" />
      <circle cx="120" cy="425" r="4" fill="#F5A623" opacity="0.5" />
      <circle cx="260" cy="425" r="4" fill="#F5A623" opacity="0.5" />
      {/* Lines between nodes */}
      <line x1="190" y1="390" x2="148" y2="408" stroke="#F5A623" strokeWidth="1.5" opacity="0.4" />
      <line x1="190" y1="390" x2="232" y2="408" stroke="#F5A623" strokeWidth="1.5" opacity="0.4" />
      <line x1="148" y1="408" x2="120" y2="425" stroke="#2A5668" strokeWidth="1.2" opacity="0.35" />
      <line x1="232" y1="408" x2="260" y2="425" stroke="#2A5668" strokeWidth="1.2" opacity="0.35" />

      {/* ── Floating tech icons / badges ── */}
      {/* Gear icon — top right */}
      <circle cx="338" cy="88" r="14" fill="none" stroke="#F5A623" strokeWidth="2.5" opacity="0.5" />
      <circle cx="338" cy="88" r="7" fill="#F5A623" opacity="0.4" />
      {/* Gear teeth */}
      <rect x="335" y="72" width="6" height="6" rx="1" fill="#F5A623" opacity="0.45" />
      <rect x="335" y="98" width="6" height="6" rx="1" fill="#F5A623" opacity="0.45" />
      <rect x="322" y="85" width="6" height="6" rx="1" fill="#F5A623" opacity="0.45" />
      <rect x="348" y="85" width="6" height="6" rx="1" fill="#F5A623" opacity="0.45" />

      {/* WiFi-like arcs — top left */}
      <path d="M42 100 Q60 82 78 100" stroke="#1B3A4B" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.2" />
      <path d="M50 110 Q60 100 70 110" stroke="#1B3A4B" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.3" />
      <circle cx="60" cy="118" r="4" fill="#1B3A4B" opacity="0.3" />

      {/* Laptop icon small — bottom left */}
      <rect x="30" y="378" width="36" height="24" rx="3" fill="#2A5668" opacity="0.35" />
      <rect x="33" y="381" width="30" height="18" rx="1" fill="#1B3A4B" opacity="0.25" />
      <rect x="24" y="402" width="48" height="5" rx="2" fill="#2A5668" opacity="0.3" />

      {/* Stars / sparkles */}
      <path d="M354 188 L356.5 196 L365 196 L358 201 L361 209 L354 204 L347 209 L350 201 L343 196 L351.5 196Z" fill="#F5A623" opacity="0.6" />
      <path d="M30 168 L32 174 L38 174 L33 178 L35 184 L30 180 L25 184 L27 178 L22 174 L28 174Z" fill="#1B3A4B" opacity="0.2" />

      {/* Sparkle dots */}
      <circle cx="345" cy="310" r="5" fill="#F5A623" opacity="0.3" />
      <circle cx="38" cy="340" r="4" fill="#F5A623" opacity="0.2" />
      <circle cx="360" cy="370" r="3" fill="#1B3A4B" opacity="0.15" />
      <circle cx="20" cy="260" r="4" fill="#FDE8CF" opacity="0.5" />

      {/* ── Decorative ring ── */}
      <circle cx="350" cy="400" r="20" fill="none" stroke="#F5A623" strokeWidth="2" opacity="0.2" />
      <circle cx="32" cy="102" r="12" fill="none" stroke="#1B3A4B" strokeWidth="1.5" opacity="0.12" />
    </svg>
  );
}
