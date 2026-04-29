export default function HeroIllustration() {
  return (
    <svg
      viewBox="0 0 520 460"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      role="img"
      aria-label="Ilustrasi developer di depan laptop dengan trophy dan elemen teknologi"
    >
      {/* ── Background blobs ── */}
      <circle cx="295" cy="240" r="195" fill="#FDE8CF" opacity="0.5" />
      <circle cx="295" cy="240" r="148" fill="#F8C88C" opacity="0.22" />

      {/* ── Desk ── */}
      <rect x="95" y="312" width="345" height="13" rx="3" fill="#1B3A4B" />
      <rect x="130" y="325" width="11" height="52" rx="2" fill="#0F2A36" />
      <rect x="394" y="325" width="11" height="52" rx="2" fill="#0F2A36" />

      {/* ── Chair ── */}
      <rect x="215" y="238" width="105" height="8" rx="3" fill="#2A5668" />
      <rect x="215" y="238" width="8" height="56" rx="3" fill="#2A5668" />
      <rect x="312" y="238" width="8" height="56" rx="3" fill="#2A5668" />
      <rect x="210" y="292" width="115" height="13" rx="5" fill="#2A5668" />

      {/* ── Laptop base ── */}
      <rect x="190" y="277" width="195" height="20" rx="3" fill="#2A5668" />
      <rect x="186" y="272" width="203" height="9" rx="2" fill="#1B3A4B" />

      {/* ── Laptop screen ── */}
      <rect x="192" y="145" width="185" height="128" rx="6" fill="#1B3A4B" />
      <rect x="198" y="151" width="173" height="116" rx="4" fill="#0F2A36" />

      {/* Code lines on screen */}
      <rect x="210" y="165" width="52" height="5" rx="2" fill="#F5A623" />
      <rect x="218" y="177" width="78" height="5" rx="2" fill="white" opacity="0.35" />
      <rect x="218" y="189" width="48" height="5" rx="2" fill="#F5A623" opacity="0.65" />
      <rect x="226" y="201" width="70" height="5" rx="2" fill="white" opacity="0.28" />
      <rect x="210" y="213" width="92" height="5" rx="2" fill="#F5A623" opacity="0.5" />
      <rect x="218" y="225" width="38" height="5" rx="2" fill="white" opacity="0.35" />
      <rect x="210" y="237" width="105" height="5" rx="2" fill="#F5A623" opacity="0.75" />
      <rect x="218" y="249" width="58" height="5" rx="2" fill="white" opacity="0.25" />

      {/* Cursor blinking dot */}
      <rect x="330" y="237" width="6" height="11" rx="1" fill="#F5A623" opacity="0.9" />

      {/* ── Person character ── */}
      {/* Head */}
      <circle cx="285" cy="112" r="30" fill="#FFCBA4" />
      {/* Hair */}
      <path
        d="M256 107 Q260 78 285 76 Q310 78 314 107 Q309 96 285 94 Q261 96 256 107Z"
        fill="#1B3A4B"
      />
      {/* Eyes */}
      <circle cx="277" cy="110" r="3" fill="#1B3A4B" />
      <circle cx="293" cy="110" r="3" fill="#1B3A4B" />
      {/* Smile */}
      <path
        d="M279 122 Q285 128 291 122"
        stroke="#1B3A4B"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
      {/* Neck */}
      <rect x="279" y="139" width="12" height="13" rx="3" fill="#FFCBA4" />
      {/* Body / shirt */}
      <path
        d="M252 152 Q260 149 270 153 L285 149 L300 153 Q310 149 318 152 L326 202 Q305 213 285 213 Q265 213 244 202 Z"
        fill="#F5A623"
      />
      {/* Collar detail */}
      <path d="M270 153 L285 164 L300 153" stroke="#D48E1A" strokeWidth="1.8" fill="none" />
      {/* Left arm */}
      <path
        d="M252 162 Q234 186 229 212 Q233 217 237 212 Q243 188 262 173Z"
        fill="#F5A623"
      />
      <circle cx="228" cy="214" r="9" fill="#FFCBA4" />
      {/* Right arm */}
      <path
        d="M318 162 Q336 186 341 212 Q337 217 333 212 Q327 188 308 173Z"
        fill="#F5A623"
      />
      <circle cx="342" cy="214" r="9" fill="#FFCBA4" />
      {/* Pants */}
      <rect x="269" y="207" width="20" height="62" rx="4" fill="#1B3A4B" />
      <rect x="293" y="207" width="20" height="62" rx="4" fill="#1B3A4B" />
      {/* Shoes */}
      <ellipse cx="279" cy="270" rx="15" ry="7" fill="#0F2A36" />
      <ellipse cx="303" cy="270" rx="15" ry="7" fill="#0F2A36" />

      {/* ── Trophy (floating, top-left) ── */}
      <g transform="translate(52, 42)">
        <path d="M18 56 Q16 24 38 17 Q60 24 58 56Z" fill="#F5A623" />
        <path d="M22 30 Q26 22 36 20" stroke="white" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.45" />
        <path d="M18 28 Q4 28 4 43 Q4 53 18 51" stroke="#F5A623" strokeWidth="4.5" strokeLinecap="round" fill="none" />
        <path d="M58 28 Q72 28 72 43 Q72 53 58 51" stroke="#F5A623" strokeWidth="4.5" strokeLinecap="round" fill="none" />
        <rect x="33" y="56" width="10" height="17" rx="1" fill="#D48E1A" />
        <rect x="22" y="73" width="32" height="7" rx="2" fill="#D48E1A" />
        <path d="M38 26 L40.5 33 L48 33 L42 37.5 L44.5 44.5 L38 40 L31.5 44.5 L34 37.5 L28 33 L35.5 33Z" fill="white" opacity="0.88" />
      </g>

      {/* ── Trending chart (bottom-right) ── */}
      <g transform="translate(388, 200)">
        <line x1="0" y1="100" x2="105" y2="100" stroke="#1B3A4B" strokeWidth="1.5" opacity="0.25" />
        <line x1="0" y1="0" x2="0" y2="100" stroke="#1B3A4B" strokeWidth="1.5" opacity="0.25" />
        <polygon points="4,90 22,72 38,77 55,52 72,36 90,14 90,100 4,100" fill="#F5A623" opacity="0.1" />
        <polyline points="4,90 22,72 38,77 55,52 72,36 90,14" stroke="#F5A623" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="4" cy="90" r="4" fill="#F5A623" />
        <circle cx="22" cy="72" r="4" fill="#F5A623" />
        <circle cx="38" cy="77" r="4" fill="#F5A623" />
        <circle cx="55" cy="52" r="4" fill="#F5A623" />
        <circle cx="72" cy="36" r="4" fill="#F5A623" />
        <circle cx="90" cy="14" r="5.5" fill="#F5A623" />
      </g>

      {/* ── Floating code symbols ── */}
      <text x="56" y="212" fontSize="30" fill="#1B3A4B" opacity="0.17" fontFamily="monospace" fontWeight="bold">{"</>"}</text>
      <text x="430" y="112" fontSize="26" fill="#F5A623" opacity="0.38" fontFamily="monospace" fontWeight="bold">{"{ }"}</text>
      <text x="462" y="358" fontSize="24" fill="#1B3A4B" opacity="0.18" fontFamily="monospace" fontWeight="bold">{"#"}</text>

      {/* ── Stars & sparkles ── */}
      {/* Big star top-right */}
      <path d="M442 72 L445 82 L456 82 L447 88 L450 98 L442 92 L434 98 L437 88 L428 82 L439 82Z" fill="#F5A623" />
      {/* Small star left */}
      <path d="M88 282 L90 289 L98 289 L92 294 L94 301 L88 296 L82 301 L84 294 L78 289 L86 289Z" fill="#F5A623" opacity="0.5" />
      {/* Tiny sparkle dots */}
      <circle cx="463" cy="290" r="5" fill="#FDE8CF" />
      <circle cx="78" cy="163" r="4" fill="#F5A623" opacity="0.38" />
      <circle cx="168" cy="93" r="3" fill="#1B3A4B" opacity="0.22" />
      <circle cx="432" cy="168" r="3" fill="#F5A623" opacity="0.42" />
      <circle cx="105" cy="345" r="6" fill="#F5A623" opacity="0.15" />
      <circle cx="470" cy="180" r="4" fill="#1B3A4B" opacity="0.1" />

      {/* ── Notification badge ── */}
      <rect x="348" y="158" width="42" height="22" rx="5" fill="#F5A623" />
      <text x="356" y="174" fontSize="10" fill="white" fontWeight="bold" fontFamily="sans-serif">{"100%"}</text>

      {/* ── Decorative rings ── */}
      <circle cx="68" cy="378" r="18" fill="none" stroke="#F5A623" strokeWidth="2.5" opacity="0.25" />
      <circle cx="477" cy="118" r="14" fill="none" stroke="#1B3A4B" strokeWidth="2" opacity="0.15" />
    </svg>
  );
}
