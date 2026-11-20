import lastLightArt from '../../assets/the-last-light.jpg';
import { FrameCornerNick } from './motifs';

/** Press photograph, 19:12. The painting is on the wall, chip intact. */
export default function EastRoomScene() {
  return (
    <g>
      <defs>
        <linearGradient id="er-wall" x1="0" y1="0" x2="0.2" y2="1">
          <stop offset="0" stopColor="#4a3d2e" />
          <stop offset="0.55" stopColor="#372d22" />
          <stop offset="1" stopColor="#241c15" />
        </linearGradient>
        <radialGradient id="er-spot" cx="0.52" cy="0.18" r="0.62">
          <stop offset="0" stopColor="#f4d9a0" stopOpacity="0.34" />
          <stop offset="0.5" stopColor="#d7a862" stopOpacity="0.1" />
          <stop offset="1" stopColor="#000000" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="er-floor" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3d2f21" />
          <stop offset="1" stopColor="#1a130d" />
        </linearGradient>
        <linearGradient id="er-gold" x1="0" y1="0" x2="0.6" y2="1">
          <stop offset="0" stopColor="#e0c183" />
          <stop offset="0.28" stopColor="#b58d4e" />
          <stop offset="0.55" stopColor="#8a6835" />
          <stop offset="0.78" stopColor="#c9a363" />
          <stop offset="1" stopColor="#7a5a2b" />
        </linearGradient>
        <linearGradient id="er-gold-inner" x1="0" y1="0" x2="0.4" y2="1">
          <stop offset="0" stopColor="#f0d8a2" />
          <stop offset="0.5" stopColor="#a98144" />
          <stop offset="1" stopColor="#6f5226" />
        </linearGradient>
        <linearGradient id="er-sky" x1="0" y1="0" x2="0.25" y2="1">
          <stop offset="0" stopColor="#7d8778" />
          <stop offset="0.38" stopColor="#b7a273" />
          <stop offset="0.62" stopColor="#d9b06a" />
          <stop offset="0.8" stopColor="#c88f51" />
          <stop offset="1" stopColor="#7c5c37" />
        </linearGradient>
        <linearGradient id="er-water" x1="0" y1="0" x2="0.2" y2="1">
          <stop offset="0" stopColor="#b48a4f" />
          <stop offset="0.5" stopColor="#7d5c33" />
          <stop offset="1" stopColor="#3f2f1d" />
        </linearGradient>
        <radialGradient id="er-vignette" cx="0.5" cy="0.45" r="0.75">
          <stop offset="0.45" stopColor="#000" stopOpacity="0" />
          <stop offset="1" stopColor="#050403" stopOpacity="0.72" />
        </radialGradient>
        <radialGradient id="er-lamp" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#ffe9b8" stopOpacity="0.9" />
          <stop offset="1" stopColor="#ffe9b8" stopOpacity="0" />
        </radialGradient>
        <pattern id="er-parquet" width="120" height="80" patternUnits="userSpaceOnUse" patternTransform="translate(0 0) skewX(-18)">
          <rect width="120" height="80" fill="none" />
          <path d="M0 0H120M0 40H120M0 80H120" stroke="#0f0b08" strokeWidth="2" opacity="0.5" />
          <path d="M30 0V40M90 40V80" stroke="#0f0b08" strokeWidth="1.4" opacity="0.4" />
          <path d="M0 2H120" stroke="#6b5133" strokeWidth="1" opacity="0.18" />
        </pattern>
        <filter id="er-grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.09" />
          </feComponentTransfer>
        </filter>
        <filter id="er-blur"><feGaussianBlur stdDeviation="9" /></filter>
        <linearGradient id="er-varnish" x1="0" y1="0" x2="0.3" y2="1">
          <stop offset="0" stopColor="#ffe8b8" stopOpacity="0.14" />
          <stop offset="0.55" stopColor="#8a5f2a" stopOpacity="0" />
          <stop offset="1" stopColor="#2a1a0a" stopOpacity="0.3" />
        </linearGradient>
        <radialGradient id="er-glass" cx="0.32" cy="0.18" r="0.9">
          <stop offset="0" stopColor="#fff6de" stopOpacity="0.16" />
          <stop offset="0.55" stopColor="#fff6de" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity="0.18" />
        </radialGradient>
        <clipPath id="er-canvas-clip">
          <rect x="352" y="182" width="376" height="262" />
        </clipPath>
      </defs>

      {/* wall + floor */}
      <rect width="1200" height="800" fill="url(#er-wall)" />
      <g opacity="0.5">
        <path d="M0 62h1200M0 128h1200" stroke="#5b4a37" strokeWidth="1" />
      </g>
      <rect x="0" y="640" width="1200" height="160" fill="url(#er-floor)" />
      <rect x="0" y="640" width="1200" height="160" fill="url(#er-parquet)" opacity="0.55" />
      <rect x="0" y="630" width="1200" height="18" fill="#2b2118" />
      <rect x="0" y="630" width="1200" height="3" fill="#6d5436" opacity="0.45" />

      {/* doorway, left */}
      <g>
        <rect x="58" y="70" width="186" height="576" fill="#17120d" />
        <rect x="58" y="70" width="186" height="576" fill="none" stroke="#4d3d2b" strokeWidth="8" />
        <rect x="72" y="84" width="158" height="562" fill="#0d0a07" />
        <rect x="72" y="84" width="158" height="562" fill="url(#er-spot)" opacity="0.12" />
        <path d="M240 70v576" stroke="#2a2016" strokeWidth="4" />
        <path d="M250 70v576" stroke="#6a563c" strokeWidth="2" opacity="0.3" />
      </g>

      {/* spotlight cone */}
      <path d="M548 0 L678 0 L742 640 L352 640 Z" fill="url(#er-spot)" opacity="0.55" />
      <rect x="540" y="0" width="126" height="16" fill="#241b13" />
      <rect x="548" y="12" width="110" height="9" rx="3" fill="#1a130d" stroke="#6b5437" strokeWidth="1" />
      <circle cx="600" cy="30" r="46" fill="url(#er-lamp)" opacity="0.6" />

      {/* painting on the wall */}
      <g>
        <rect x="320" y="150" width="440" height="326" fill="#5a4529" />
        <rect x="316" y="146" width="448" height="334" fill="none" stroke="url(#er-gold)" strokeWidth="14" />
        <rect x="330" y="160" width="420" height="306" fill="none" stroke="url(#er-gold-inner)" strokeWidth="5" />
        <rect x="342" y="172" width="396" height="282" fill="none" stroke="#5c431f" strokeWidth="3" />

        {/* canvas — a real nineteenth-century landscape, lit and varnished */}
        <g clipPath="url(#er-canvas-clip)">
          <image
            href={lastLightArt}
            x="352"
            y="182"
            width="376"
            height="262"
            preserveAspectRatio="xMidYMid slice"
          />
          {/* warm gallery light and the varnish's amber cast */}
          <rect x="352" y="182" width="376" height="262" fill="url(#er-varnish)" />
          <rect x="352" y="182" width="376" height="262" fill="#d9a45b" opacity="0.07" />
          {/* craquelure and dust, kept faint so the paint stays legible */}
          <g stroke="#f4e6c4" strokeWidth="0.6" opacity="0.08">
            <path d="M392 220l16 16-8 14 20 12" fill="none" />
            <path d="M600 210l-14 18 10 12-18 20" fill="none" />
            <path d="M470 330l12 10-6 12" fill="none" />
          </g>
          <rect x="352" y="182" width="376" height="262" fill="url(#er-glass)" />
        </g>

        {/* frame inner shadow */}
        <rect x="352" y="182" width="376" height="262" fill="none" stroke="#2a1d0e" strokeWidth="4" opacity="0.8" />
        <path d="M320 150l440 0M320 476l440 0" stroke="#f2dbaa" strokeWidth="2" opacity="0.35" />

        {/* the chip */}
        <FrameCornerNick x={760} y={476} scale={1.35} rotate={0} />

        {/* brass plaque */}
        <g opacity="0.9">
          <rect x="475" y="500" width="130" height="24" rx="1" fill="#8a6a38" stroke="#5d4522" />
          <text x="540" y="516" textAnchor="middle" fill="#f0e2c2" fontSize="9" fontFamily="'Times New Roman', serif" letterSpacing="1.4">
            THE LAST LIGHT
          </text>
        </g>
      </g>

      {/* wall label */}
      <g>
        <rect x="816" y="406" width="128" height="88" fill="#e6dbc4" opacity="0.94" />
        <rect x="816" y="406" width="128" height="88" fill="none" stroke="#b9a988" strokeWidth="1" />
        <text x="828" y="426" fill="#3b3125" fontSize="8.5" fontFamily="'Courier New', monospace" letterSpacing="1.2">ELIAS WREN</text>
        <text x="828" y="442" fill="#2f271d" fontSize="10.5" fontFamily="'Times New Roman', serif" fontStyle="italic">The Last Light</text>
        <text x="828" y="456" fill="#5a4e3d" fontSize="7.5" fontFamily="'Courier New', monospace">1903 · oil on canvas</text>
        <text x="828" y="470" fill="#5a4e3d" fontSize="7.5" fontFamily="'Courier New', monospace">71 × 52 cm</text>
        <text x="828" y="484" fill="#7d6f59" fontSize="6.6" fontFamily="'Courier New', monospace" letterSpacing="0.6">PRIVATE LOAN</text>
      </g>

      {/* stanchion + rope */}
      <g>
        <rect x="1030" y="470" width="7" height="178" fill="#8f7443" />
        <circle cx="1033" cy="462" r="12" fill="#b08a4e" stroke="#6f5226" strokeWidth="2" />
        <ellipse cx="1033" cy="648" rx="18" ry="6" fill="#6f5226" />
        <path d="M1045 486c50 26 88 8 128 34" stroke="#7c2f27" strokeWidth="4" fill="none" opacity="0.9" />
        <rect x="1146" y="470" width="7" height="178" fill="#8f7443" />
        <circle cx="1149" cy="462" r="12" fill="#b08a4e" stroke="#6f5226" strokeWidth="2" />
        <ellipse cx="1149" cy="648" rx="18" ry="6" fill="#6f5226" />
      </g>

      {/* bench + coupe, foreground left */}
      <g>
        <rect x="60" y="690" width="150" height="16" rx="4" fill="#2c2118" stroke="#4a3926" />
        <rect x="76" y="706" width="10" height="56" fill="#241a12" />
        <rect x="186" y="706" width="10" height="56" fill="#241a12" />
      </g>
      <g transform="translate(255 715)">
        <ellipse cx="0" cy="42" rx="34" ry="6" fill="#000" opacity="0.4" />
        <path d="M-14 -30 L14 -30 C14 -18 8 -10 1 -8 L1 14 L10 17 L10 20 L-10 20 L-10 17 L-1 14 L-1 -8 C-8 -10 -14 -18 -14 -30 Z" fill="#e9dfc9" opacity="0.3" stroke="#d9cdb2" strokeWidth="1.2" />
        <path d="M-13 -22 C-2 -18 6 -18 13 -22" stroke="#f0c983" strokeWidth="1.4" fill="none" opacity="0.6" />
      </g>

      {/* sensor + cable */}
      <rect x="1088" y="120" width="30" height="18" rx="2" fill="#d9cdb2" opacity="0.7" />
      <circle cx="1112" cy="129" r="3" fill="#a8483a" />
      <path d="M1088 130h-120" stroke="#1a130d" strokeWidth="2" opacity="0.4" />

      <rect width="1200" height="800" fill="url(#er-vignette)" />
      <rect width="1200" height="800" filter="url(#er-grain)" opacity="0.85" />
      <g opacity="0.2" filter="url(#er-blur)">
        <circle cx="340" cy="70" r="26" fill="#f0d9a5" />
        <circle cx="890" cy="640" r="40" fill="#d8a45b" />
      </g>
    </g>
  );
}
