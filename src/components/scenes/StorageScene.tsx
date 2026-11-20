import { MothBrooch } from './motifs';

/** Phone photograph, 20:58. Flash-lit, cold, pulled from the gallery feed. */
export default function StorageScene() {
  return (
    <g>
      <defs>
        <linearGradient id="st-wall" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#4c4c46" />
          <stop offset="0.6" stopColor="#3b3b36" />
          <stop offset="1" stopColor="#2a2a26" />
        </linearGradient>
        <linearGradient id="st-floor" x1="0" y1="0" x2="0.4" y2="1">
          <stop offset="0" stopColor="#444440" />
          <stop offset="1" stopColor="#2a2a26" />
        </linearGradient>
        <linearGradient id="st-crate" x1="0" y1="0" x2="0.3" y2="1">
          <stop offset="0" stopColor="#8b6c45" />
          <stop offset="0.45" stopColor="#705536" />
          <stop offset="1" stopColor="#4f3b25" />
        </linearGradient>
        <linearGradient id="st-crate-top" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#96764c" />
          <stop offset="1" stopColor="#6c5235" />
        </linearGradient>
        <linearGradient id="st-lid" x1="0" y1="0" x2="0.6" y2="1">
          <stop offset="0" stopColor="#9c7c51" />
          <stop offset="0.6" stopColor="#7c5f3c" />
          <stop offset="1" stopColor="#5c4529" />
        </linearGradient>
        <linearGradient id="st-foam" x1="0" y1="0" x2="0.3" y2="1">
          <stop offset="0" stopColor="#92928a" />
          <stop offset="0.55" stopColor="#77776f" />
          <stop offset="1" stopColor="#55554f" />
        </linearGradient>
        <linearGradient id="st-shutter" x1="0" y1="0" x2="0.2" y2="1">
          <stop offset="0" stopColor="#5e615b" />
          <stop offset="1" stopColor="#3a3d38" />
        </linearGradient>
        <radialGradient id="st-flash" cx="0.22" cy="0.12" r="0.7">
          <stop offset="0" stopColor="#fff8e6" stopOpacity="0.22" />
          <stop offset="0.45" stopColor="#e9e3ce" stopOpacity="0.045" />
          <stop offset="1" stopColor="#000000" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="st-vig" cx="0.5" cy="0.45" r="0.7">
          <stop offset="0.42" stopColor="#000" stopOpacity="0" />
          <stop offset="1" stopColor="#070907" stopOpacity="0.92" />
        </radialGradient>
        <pattern id="st-planks" width="240" height="60" patternUnits="userSpaceOnUse">
          <path d="M0 0H240M0 30H240M120 30V60" stroke="#3f2f1d" strokeWidth="3" opacity="0.55" />
          <path d="M0 2H240M0 32H240" stroke="#b08a58" strokeWidth="1" opacity="0.18" />
        </pattern>
        <pattern id="st-slats" width="10" height="18" patternUnits="userSpaceOnUse">
          <rect width="10" height="18" fill="none" />
          <path d="M0 4h10M0 15h10" stroke="#262924" strokeWidth="2" opacity="0.7" />
          <path d="M0 5h10" stroke="#8a8d85" strokeWidth="0.8" opacity="0.25" />
        </pattern>
        <filter id="st-noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.16" />
          </feComponentTransfer>
        </filter>
        <filter id="st-soft"><feGaussianBlur stdDeviation="7" /></filter>
      </defs>

      <rect width="1200" height="800" fill="url(#st-wall)" />
      <rect x="0" y="640" width="1200" height="160" fill="url(#st-floor)" />
      <path d="M0 640h1200" stroke="#26261f" strokeWidth="4" />
      <g stroke="#5a5a52" strokeWidth="1" opacity="0.25">
        <path d="M0 700h1200M0 760h1200M240 640v160M640 640v160M980 640v160" />
      </g>

      {/* roller shutter, back right */}
      <g>
        <rect x="830" y="120" width="340" height="300" fill="url(#st-shutter)" />
        <rect x="830" y="120" width="340" height="300" fill="url(#st-slats)" />
        <rect x="818" y="108" width="364" height="24" rx="4" fill="#2e312c" stroke="#71756b" strokeWidth="2" />
        <rect x="830" y="398" width="340" height="14" fill="#2a2c28" />
        <path d="M846 402h308" stroke="#8b8e84" strokeWidth="2" opacity="0.4" />
        <rect x="1058" y="250" width="46" height="30" rx="2" fill="#d8cfae" opacity="0.5" transform="rotate(-4 1081 265)" />
      </g>

      {/* shelving, left */}
      <g>
        <rect x="28" y="150" width="16" height="500" fill="#3d3f39" />
        <rect x="268" y="150" width="16" height="500" fill="#3d3f39" />
        <g fill="#2f312c">
          <rect x="28" y="150" width="256" height="14" />
          <rect x="28" y="296" width="256" height="14" />
          <rect x="28" y="442" width="256" height="14" />
          <rect x="28" y="588" width="256" height="14" />
        </g>
        <g>
          <rect x="58" y="176" width="96" height="112" fill="#4a3a27" stroke="#241d14" strokeWidth="3" />
          <rect x="68" y="186" width="76" height="92" fill="#5a584d" />
          <rect x="72" y="190" width="68" height="84" fill="#6b6a5c" opacity="0.55" />
          <rect x="176" y="196" width="82" height="92" fill="#3b3a33" stroke="#23241f" strokeWidth="2" />
          <path d="M184 208h66M184 222h52M184 236h60" stroke="#6d6a5b" strokeWidth="2" opacity="0.5" />
          <ellipse cx="120" cy="330" rx="68" ry="12" fill="#2b2c27" />
          <rect x="76" y="314" width="90" height="16" rx="8" fill="#7b755f" />
          <rect x="60" y="332" width="120" height="8" rx="4" fill="#5c5747" />
          <path d="M198 460c40 0 60 20 60 40v70h-120v-70c0-20 20-40 60-40Z" fill="#4c4636" opacity="0.9" />
          <ellipse cx="198" cy="458" rx="58" ry="12" fill="#6d6450" />
          <path d="M144 492h108M146 520h104" stroke="#2b2820" strokeWidth="3" opacity="0.6" />
          <rect x="48" y="612" width="100" height="62" fill="#6d5a3d" stroke="#3a2e1e" strokeWidth="2" />
          <rect x="164" y="620" width="104" height="54" fill="#5c4c34" stroke="#33291b" strokeWidth="2" />
        </g>
      </g>

      {/* crate lid, propped on the floor against the crate */}
      <g transform="translate(6 214) rotate(-8 460 470)">
        <rect x="352" y="252" width="222" height="236" fill="#33271a" opacity="0.55" transform="translate(9 10)" />
        <rect x="352" y="252" width="222" height="236" fill="#4c3b26" />
        <rect x="358" y="258" width="210" height="224" fill="url(#st-lid)" />
        <rect x="358" y="258" width="210" height="224" fill="url(#st-planks)" opacity="0.65" />
        <rect x="358" y="258" width="210" height="224" fill="none" stroke="#4a3620" strokeWidth="5" />
        <path d="M376 470h174" stroke="#c2a06d" strokeWidth="2" opacity="0.25" />
        {/* batten + handle notch */}
        <rect x="358" y="336" width="210" height="18" fill="#5a4529" opacity="0.8" />
        <rect x="432" y="330" width="62" height="12" rx="6" fill="#2a2014" />
        <path d="M378 344h40M508 344h40" stroke="#8d7247" strokeWidth="2" opacity="0.5" />
        {/* stencilled destination on the lid */}
        <g opacity="0.5" fontFamily="'Courier New', monospace" fill="#2f2415">
          <text x="378" y="448" fontSize="13" letterSpacing="2">KARDEL · ANTWERP</text>
          <text x="378" y="466" fontSize="10" letterSpacing="1.6">RETURN</text>
        </g>
        {/* brooch resting on the lid */}
        <ellipse cx="470" cy="309" rx="24" ry="8" fill="#2b2419" opacity="0.3" />
        <MothBrooch x={470} y={300} scale={1.45} rotate={8} />
      </g>

      {/* crate */}
      <g>
        <ellipse cx="790" cy="734" rx="270" ry="34" fill="#1a1b17" opacity="0.55" filter="url(#st-soft)" />
        {/* front face */}
        <rect x="560" y="480" width="440" height="240" fill="url(#st-crate)" />
        <rect x="560" y="480" width="440" height="240" fill="url(#st-planks)" opacity="0.85" />
        <rect x="560" y="480" width="440" height="240" fill="none" stroke="#42311e" strokeWidth="6" />
        <g fill="#3b3a33">
          <rect x="560" y="480" width="16" height="240" />
          <rect x="984" y="480" width="16" height="240" />
          <rect x="560" y="700" width="440" height="20" />
        </g>
        {/* metal edges */}
        <rect x="560" y="480" width="440" height="10" fill="#8e9187" opacity="0.55" />
        <rect x="560" y="480" width="10" height="240" fill="#8e9187" opacity="0.35" />
        <g fill="#2f2f29" stroke="#777a6f" strokeWidth="1">
          <rect x="574" y="500" width="26" height="16" rx="2" />
          <rect x="574" y="690" width="26" height="16" rx="2" />
          <rect x="956" y="500" width="26" height="16" rx="2" />
          <rect x="956" y="690" width="26" height="16" rx="2" />
        </g>

        {/* top opening + foam */}
        <path d="M590 420 L970 420 L1000 480 L560 480 Z" fill="url(#st-crate-top)" stroke="#4a3620" strokeWidth="3" />
        <path d="M606 426 L954 426 L978 470 L582 470 Z" fill="url(#st-foam)" />
        {/* foam cut face at the front edge */}
        <path d="M582 470 L978 470 L972 458 L590 458 Z" fill="#b6b3a6" opacity="0.75" />
        <path d="M590 458 L972 458" stroke="#d0ccbd" strokeWidth="1.5" opacity="0.55" />
        {/* the empty recess */}
        <path d="M648 436 L902 436 L920 460 L632 460 Z" fill="#2a2a25" />
        <path d="M648 436 L902 436 L903 432 L646 432 Z" fill="#454540" />
        <path d="M632 460 L920 460 L916 454 L636 454 Z" fill="#6f6d63" opacity="0.8" />
        <path d="M648 436 L632 460M902 436 L920 460" stroke="#8b887c" strokeWidth="2" opacity="0.55" />
        {/* faint impression where the frame sat */}
        <rect x="678" y="438" width="150" height="16" rx="3" fill="#22221e" opacity="0.55" />
        <path d="M678 438h150" stroke="#5d5b52" strokeWidth="1.5" opacity="0.5" />
        {/* loose felt sleeve, rolled at one end */}
        <g>
          <path d="M880 436 c30 0 44 6 44 12 s-16 12-46 10 -34-8-33-14 10-8 35-8Z" fill="#c6bda9" />
          <path d="M884 438 c26 2 36 6 37 10 -8 5-24 7-40 5Z" fill="#ded6c4" opacity="0.8" />
          <path d="M886 452 c20 2 32 0 38-4" stroke="#968d7c" strokeWidth="2" fill="none" />
        </g>

        {/* loose straps */}
        <path d="M900 424c30 30 36 60 20 100" stroke="#c8bd9d" strokeWidth="6" fill="none" opacity="0.7" />
        <path d="M930 460l18 8-10 18-16-8z" fill="#8f8a78" />
        <path d="M946 424c-4 20-2 36 6 52" stroke="#bdb294" strokeWidth="4" fill="none" opacity="0.5" />

        {/* stencil */}
        <g fill="#2c2418" opacity="0.62" fontFamily="'Courier New', monospace">
          <text x="594" y="546" fontSize="30" letterSpacing="5">HALLOW</text>
          <text x="594" y="578" fontSize="20" letterSpacing="4">FINE ART LOGISTICS</text>
          <text x="596" y="626" fontSize="34" letterSpacing="8">EMPTY</text>
          <text x="598" y="652" fontSize="16" letterSpacing="3">RETURN · NO VALUE</text>
        </g>
        <path d="M594 660h204" stroke="#2c2418" strokeWidth="3" opacity="0.5" />
        <g fill="#d8d2bf" opacity="0.7">
          <rect x="900" y="590" width="64" height="42" fill="#c9c3b0" />
          <path d="M908 596v30M920 596v30M932 596v30M944 596v30M956 596v30" stroke="#3a3426" strokeWidth="3" />
        </g>
      </g>

      {/* travel case, bottom left */}
      <g>
        <rect x="86" y="600" width="216" height="118" rx="6" fill="#26261f" stroke="#4a4b41" strokeWidth="3" />
        <rect x="86" y="600" width="216" height="118" rx="6" fill="#3a3a32" opacity="0.5" />
        <path d="M126 600v118M262 600v118" stroke="#171713" strokeWidth="6" />
        <rect x="112" y="640" width="40" height="22" rx="3" fill="#8d8d80" />
        <rect x="238" y="640" width="40" height="22" rx="3" fill="#8d8d80" />
        <rect x="174" y="584" width="44" height="18" rx="8" fill="#16160f" />
        <text x="194" y="700" textAnchor="middle" fill="#6c6c5f" fontSize="12" fontFamily="'Courier New', monospace" letterSpacing="3">KARDEL</text>
        <path d="M86 690h216" stroke="#5d5e52" strokeWidth="1" opacity="0.4" />
      </g>

      {/* mop + bucket right */}
      <g>
        <ellipse cx="1088" cy="702" rx="38" ry="10" fill="#1f211c" />
        <path d="M1070 694 L1110 694 L1102 748 L1078 748 Z" fill="#6b6f5f" />
        <path d="M1088 694 L1092 560" stroke="#8d7f5d" strokeWidth="5" />
        <path d="M1060 520c18-8 40-6 52 8l-16 24c-12-10-26-12-40-6Z" fill="#b0a88c" />
        <path d="M1058 528c20-6 38-2 48 8" stroke="#7d765e" strokeWidth="2" fill="none" />
      </g>
      {/* cable on the floor */}
      <path d="M340 736c60-16 120 8 180-4s120-18 170 4" stroke="#1f211c" strokeWidth="6" fill="none" opacity="0.8" />

      <rect width="1200" height="800" fill="url(#st-flash)" />
      <rect width="1200" height="800" fill="url(#st-vig)" />
      <rect width="1200" height="800" filter="url(#st-noise)" opacity="0.9" />
      <g fontFamily="'Courier New', monospace" fill="#e8e2cc" opacity="0.5">
        <text x="46" y="764" fontSize="14" letterSpacing="2">20:58 · MERIDIAN / BACKSTAGE</text>
      </g>
    </g>
  );
}
