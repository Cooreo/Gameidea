import type { Person } from '../game/types';
import { MothBrooch } from './scenes/motifs';

/** Stylised ink portraits, drawn locally. */
export default function Portrait({ portrait }: { portrait: Person['portrait'] }) {
  const id = `pt-${portrait}`;
  return (
    <svg
      viewBox="0 0 400 480"
      className="portrait"
      role="img"
      aria-label="Portrait illustration"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="0.4" y2="1">
          <stop offset="0" stopColor="#d9ccb4" />
          <stop offset="0.55" stopColor="#c4b498" />
          <stop offset="1" stopColor="#a4906f" />
        </linearGradient>
        <linearGradient id={`${id}-skin`} x1="0" y1="0" x2="0.6" y2="1">
          <stop offset="0" stopColor="#d8b696" />
          <stop offset="1" stopColor="#a9825f" />
        </linearGradient>
        <linearGradient id={`${id}-cloth`} x1="0" y1="0" x2="0.4" y2="1">
          <stop offset="0" stopColor="#3c3831" />
          <stop offset="1" stopColor="#1c1a16" />
        </linearGradient>
        <linearGradient id={`${id}-hair`} x1="0" y1="0" x2="0.4" y2="1">
          <stop offset="0" stopColor="#d9d4cb" />
          <stop offset="1" stopColor="#8c877f" />
        </linearGradient>
        <radialGradient id={`${id}-vig`} cx="0.5" cy="0.4" r="0.75">
          <stop offset="0.45" stopColor="#000" stopOpacity="0" />
          <stop offset="1" stopColor="#2a2115" stopOpacity="0.55" />
        </radialGradient>
        <pattern id={`${id}-dots`} width="4" height="4" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="0.8" fill="#4a3a25" opacity="0.22" />
        </pattern>
        <filter id={`${id}-grain`}>
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.1" />
          </feComponentTransfer>
        </filter>
      </defs>

      <rect width="400" height="480" fill={`url(#${id}-bg)`} />
      <rect width="400" height="480" fill={`url(#${id}-dots)`} />
      <g stroke="#5c4a33" strokeWidth="1" opacity="0.16">
        <path d="M0 90h400M0 210h400M0 330h400M0 430h400" />
      </g>

      {portrait === 'voss' && <Voss id={id} />}
      {portrait === 'renn' && <Renn id={id} />}
      {portrait === 'nadia' && <Nadia id={id} />}

      <rect width="400" height="480" fill={`url(#${id}-vig)`} />
      <rect width="400" height="480" filter={`url(#${id}-grain)`} opacity="0.8" />
      <rect x="10" y="10" width="380" height="460" fill="none" stroke="#4a3a25" strokeWidth="1" opacity="0.25" />
    </svg>
  );
}

function Voss({ id }: { id: string }) {
  return (
    <g>
      {/* body */}
      <path d="M18 480c8-108 44-178 116-206 22-8 48-12 66-12s44 4 66 12c72 28 108 98 116 206Z" fill={`url(#${id}-cloth)`} />
      <path d="M168 282c22 18 42 26 32 58l-6 22 38 22-40 22-40-84Z" fill="#2a2722" />
      <path d="M236 282c-22 18-42 26-34 58l8 22-40 22 40 22 40-84Z" fill="#312d26" opacity="0.9" />
      {/* neck + face */}
      <path d="M166 236h68v54c0 20-16 34-34 34s-34-14-34-34Z" fill={`url(#${id}-skin)`} />
      <path
        d="M118 154c0-58 36-96 82-96s82 38 82 96c0 46-16 88-42 110-18 16-44 20-64 8-36-20-58-66-58-118Z"
        fill={`url(#${id}-skin)`}
      />
      {/* hair: silver bob */}
      <path
        d="M108 168c-4-70 34-124 92-124 60 0 98 38 98 110 0 28-4 58-10 78l-20-8c6-24 6-48 0-66-10-34-36-52-68-52-40 0-66 28-70 70-2 24 2 44 8 58l-20 8c-6-18-10-46-10-74Z"
        fill={`url(#${id}-hair)`}
      />
      <path d="M112 166c-8 34-6 68 6 88l-26 8c-10-32-8-68 2-96Z" fill={`url(#${id}-hair)`} />
      <path d="M288 166c8 34 6 68-6 88l26 8c10-32 8-68-2-96Z" fill={`url(#${id}-hair)`} />
      <g stroke="#776f64" strokeWidth="2" fill="none" opacity="0.6">
        <path d="M136 138c28-30 72-42 112-26M146 172c22-18 48-26 76-22M176 108c28-12 58-10 82 4" />
      </g>
      {/* features */}
      <path d="M156 176c14-8 32-8 48 0" stroke="#6b4f38" strokeWidth="3.4" fill="none" strokeLinecap="round" />
      <path d="M162 180c10-4 22-4 32 0" stroke="#2f241a" strokeWidth="2" fill="none" />
      <path d="M208 174c12-4 22-2 30 4" stroke="#6b4f38" strokeWidth="3.4" fill="none" strokeLinecap="round" />
      <path d="M212 180c8-3 16-2 22 1" stroke="#2f241a" strokeWidth="2" fill="none" />
      <path d="M196 188c8 18 6 30-4 34" stroke="#a47d5b" strokeWidth="2" fill="none" opacity="0.7" />
      <path d="M170 244c16 8 36 8 52 0" stroke="#8e443c" strokeWidth="4" fill="none" strokeLinecap="round" />
      <path d="M176 268c12 5 24 5 36 1" stroke="#9a7658" strokeWidth="2" fill="none" opacity="0.6" />
      <path d="M148 218c-6 24 0 46 10 58" stroke="#a77f5e" strokeWidth="2" fill="none" opacity="0.5" />
      <path d="M134 224c4 10 12 16 20 18" stroke="#a77f5e" strokeWidth="2" fill="none" opacity="0.4" />
      <path d="M260 218c6 24 0 46-10 58" stroke="#a77f5e" strokeWidth="2" fill="none" opacity="0.35" />
      {/* earring */}
      <circle cx="292" cy="250" r="7" fill="#c9a45c" stroke="#7a5a2b" strokeWidth="1.5" />
      <path d="M292 257v18" stroke="#c9a45c" strokeWidth="2" />
      <circle cx="292" cy="280" r="4" fill="#e5cd93" />
      {/* brooch on lapel */}
      <path d="M248 330l30 20-26 46-26-40Z" fill="#2b2823" />
      <MothBrooch x={244} y={368} scale={0.95} rotate={-8} />
      {/* collar */}
      <path d="M170 292c18 14 42 14 60 0l-8 22c-14 8-30 8-44 0Z" fill="#d7cbb5" opacity="0.7" />
      <g stroke="#4b463d" strokeWidth="1" opacity="0.5">
        <path d="M70 420c26-40 52-58 82-64M330 420c-26-40-52-58-82-64" fill="none" />
      </g>
    </g>
  );
}

function Renn({ id }: { id: string }) {
  return (
    <g>
      <path d="M14 480c10-102 48-168 118-194 22-8 46-12 68-12s46 4 68 12c70 26 108 92 118 194Z" fill={`url(#${id}-cloth)`} />
      {/* hi-vis vest */}
      <path d="M118 344c18-18 50-30 82-30s64 12 82 30l-12 136H130Z" fill="#a8a35a" />
      <path d="M124 386c50-16 102-16 152 0l-4 22c-48-14-96-14-144 0Z" fill="#d7d7c3" opacity="0.85" />
      <path d="M126 430c48-14 100-14 148 0l-4 22c-46-12-94-12-140 0Z" fill="#c5c6b0" opacity="0.7" />
      <path d="M200 344v172" stroke="#6f6c3d" strokeWidth="4" opacity="0.7" />
      <path d="M160 340c8 30 8 58 2 84M240 340c-8 30-8 58-2 84" stroke="#7d7a45" strokeWidth="2" fill="none" opacity="0.6" />
      {/* neck + face */}
      <path d="M166 232h68v58c0 18-16 32-34 32s-34-14-34-32Z" fill={`url(#${id}-skin)`} />
      <path
        d="M122 150c0-58 34-94 78-94s78 36 78 94c0 44-14 84-38 106-18 16-44 18-62 6-32-18-56-64-56-112Z"
        fill={`url(#${id}-skin)`}
      />
      {/* beard */}
      <path d="M140 194c2 54 26 94 60 94 34 0 58-40 60-94 4 50-10 92-34 110-22 16-52 14-70-4-22-22-20-64-16-106Z" fill="#4a3a2a" opacity="0.9" />
      <path d="M166 252c22 12 46 12 68 0-2 26-18 44-34 44s-32-18-34-44Z" fill="#3c2e21" opacity="0.9" />
      <path d="M176 276c16 6 32 6 48 0" stroke="#2a1f16" strokeWidth="3" fill="none" />
      {/* cap */}
      <path d="M112 142c4-56 36-88 88-88s84 32 88 88l-14 10c-10-40-36-62-74-62s-64 22-74 62Z" fill="#3a4038" />
      <path d="M104 142h192c0 16-12 24-30 24H134c-18 0-30-8-30-24Z" fill="#2d332c" />
      <path d="M96 146c0 8 8 14 18 14h30v-12H96Z" fill="#232821" />
      <path d="M132 100c20-26 54-36 86-28" stroke="#5a6157" strokeWidth="2" fill="none" opacity="0.6" />
      {/* features */}
      <path d="M150 178c14-6 30-6 44 0" stroke="#4a382a" strokeWidth="4" fill="none" strokeLinecap="round" />
      <circle cx="170" cy="184" r="3.2" fill="#2b241b" />
      <path d="M216 178c12-4 24-2 34 4" stroke="#4a382a" strokeWidth="4" fill="none" strokeLinecap="round" />
      <circle cx="234" cy="184" r="3.2" fill="#2b241b" />
      <path d="M196 190c-2 20-8 32-14 36" stroke="#9c7455" strokeWidth="3.4" fill="none" strokeLinecap="round" />
      {/* ear + stubble */}
      <path d="M120 190c-8 4-10 16-4 24 6 6 14 6 20 2" fill={`url(#${id}-skin)`} stroke="#8f6a4c" strokeWidth="1" />
      <g stroke="#3a2c20" strokeWidth="1" opacity="0.5">
        <path d="M146 232c8 6 16 8 24 8M230 232c-8 6-16 8-24 8" fill="none" />
      </g>
      {/* collar */}
      <path d="M166 320c18 12 50 12 68 0l-6 26c-16 8-40 8-56 0Z" fill="#5c5b3f" />
      <path d="M74 402c30-38 52-52 74-58M326 402c-30-38-52-52-74-58" stroke="#292620" strokeWidth="2" fill="none" opacity="0.5" />
    </g>
  );
}

function Nadia({ id }: { id: string }) {
  return (
    <g>
      <path d="M26 480c8-100 44-166 112-192 20-8 42-12 62-12s42 4 62 12c68 26 104 92 112 192Z" fill="#4d4738" />
      {/* shirt */}
      <path d="M166 320c18 12 50 12 68 0l52 22-18 138H128l-16-138Z" fill="#c2b49b" opacity="0.75" />
      <path d="M200 344v156" stroke="#8d7f66" strokeWidth="2" opacity="0.6" />
      <path d="M128 344l-24 14M272 344l24 14" stroke="#8d7f66" strokeWidth="2" opacity="0.5" />
      {/* lanyard */}
      <path d="M160 318c8 34 14 62 40 92M240 318c-8 34-14 62-40 92" stroke="#8f3b31" strokeWidth="7" fill="none" />
      <rect x="184" y="396" width="34" height="48" rx="2" fill="#e4dbc7" stroke="#7a6a51" />
      <path d="M190 408h22M190 416h22M190 424h14" stroke="#9a8d77" strokeWidth="2" />
      <circle cx="201" cy="388" r="6" fill="#7d6c52" />
      {/* neck + face */}
      <path d="M168 238h64v54c0 18-14 30-32 30s-32-12-32-30Z" fill={`url(#${id}-skin)`} />
      <path
        d="M124 152c0-56 34-92 76-92s76 36 76 92c0 44-14 82-38 104-16 16-42 18-60 6-32-18-54-60-54-110Z"
        fill={`url(#${id}-skin)`}
      />
      {/* short dark hair */}
      <path d="M116 162c-4-62 28-110 84-110 54 0 86 40 86 100 0 20-2 38-6 52l-18-6c2-12 2-28 0-40-8-38-30-58-64-58-36 0-58 24-62 62-2 16 0 32 4 44l-18 8c-4-14-6-32-6-52Z" fill="#241f1a" />
      <path d="M118 158c-4 26-2 50 6 66l-22 8c-8-24-6-52 0-76Z" fill="#241f1a" />
      <path d="M284 156c6 26 4 50-4 66l22 8c8-24 6-52 0-76Z" fill="#241f1a" />
      <path d="M150 130c22-26 64-36 98-20" stroke="#4a4138" strokeWidth="2" fill="none" opacity="0.6" />
      {/* features */}
      <path d="M154 176c12-8 28-8 42 0" stroke="#4b382b" strokeWidth="3.6" fill="none" strokeLinecap="round" />
      <path d="M160 180c9-4 20-4 28 0" stroke="#2b211a" strokeWidth="2" fill="none" />
      <path d="M210 174c12-5 22-3 30 3" stroke="#4b382b" strokeWidth="3.6" fill="none" strokeLinecap="round" />
      <path d="M214 180c8-3 15-2 21 1" stroke="#2b211a" strokeWidth="2" fill="none" />
      <path d="M196 190c6 16 4 28-4 32" stroke="#a47d5b" strokeWidth="2" fill="none" opacity="0.7" />
      <path d="M174 240c14 8 32 8 46 0" stroke="#94443b" strokeWidth="4" fill="none" strokeLinecap="round" />
      <path d="M178 264c12 5 24 5 36 1" stroke="#9a7658" strokeWidth="2" fill="none" opacity="0.6" />
      {/* hoop earrings */}
      <circle cx="126" cy="238" r="10" fill="none" stroke="#c4a05c" strokeWidth="2.5" />
      <circle cx="274" cy="238" r="10" fill="none" stroke="#c4a05c" strokeWidth="2.5" />
      {/* freckles */}
      <g fill="#8a5f44" opacity="0.55">
        <circle cx="178" cy="212" r="1.5" />
        <circle cx="188" cy="216" r="1.2" />
        <circle cx="168" cy="218" r="1.2" />
        <circle cx="218" cy="212" r="1.4" />
        <circle cx="228" cy="218" r="1.1" />
      </g>
      <path d="M90 404c26-30 44-42 62-48M310 404c-26-30-44-42-62-48" stroke="#3a3327" strokeWidth="2" fill="none" opacity="0.5" />
    </g>
  );
}
