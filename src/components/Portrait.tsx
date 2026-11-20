import type { Person } from '../game/types';
import { MothBrooch } from './scenes/motifs';

/**
 * Stylised ink portraits, drawn locally.
 *
 * All three share the same head geometry — ears, eyes, nose, mouth — so the
 * faces read as people rather than as masks. Hair, clothing and the small
 * accessories (a brooch, a hi-vis vest, a lanyard) are what tell them apart.
 */
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
          <stop offset="0" stopColor="#e3c4a3" />
          <stop offset="0.58" stopColor="#d0a982" />
          <stop offset="1" stopColor="#b18765" />
        </linearGradient>
        <linearGradient id={`${id}-cloth`} x1="0" y1="0" x2="0.4" y2="1">
          <stop offset="0" stopColor="#3c3831" />
          <stop offset="1" stopColor="#1c1a16" />
        </linearGradient>
        <linearGradient id={`${id}-hair`} x1="0" y1="0" x2="0.4" y2="1">
          <stop offset="0" stopColor="#e2ddd4" />
          <stop offset="0.55" stopColor="#c3bdb3" />
          <stop offset="1" stopColor="#918b82" />
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
        <filter id={`${id}-soft`}><feGaussianBlur stdDeviation="6" /></filter>
      </defs>

      <rect width="400" height="480" fill={`url(#${id}-bg)`} />
      <rect width="400" height="480" fill={`url(#${id}-dots)`} />
      <g stroke="#5c4a33" strokeWidth="1" opacity="0.12">
        <path d="M0 96h400M0 214h400M0 332h400M0 430h400" />
      </g>
      <ellipse cx="200" cy="150" rx="150" ry="140" fill="#f3e6cd" opacity="0.18" filter={`url(#${id}-soft)`} />

      {portrait === 'voss' && <Voss id={id} />}
      {portrait === 'renn' && <Renn id={id} />}
      {portrait === 'nadia' && <Nadia id={id} />}

      <rect width="400" height="480" fill={`url(#${id}-vig)`} />
      <rect width="400" height="480" filter={`url(#${id}-grain)`} opacity="0.8" />
      <rect x="10" y="10" width="380" height="460" fill="none" stroke="#4a3a25" strokeWidth="1" opacity="0.25" />
    </svg>
  );
}

/* ── shared head ─────────────────────────────────────────────────────── */

function Mouth({ lips, lipDark }: { lips: string; lipDark: string }) {
  return (
    <g>
      <path d="M181 231c8-6 13-4 19-2 6-2 11-4 19 2-8 10-30 10-38 0Z" fill={lips} />
      <path d="M181 231c8 3 30 3 38 0" stroke={lipDark} strokeWidth="1.4" fill="none" />
      <path d="M187 237c8 3 18 3 26 0" stroke="#7d3a34" strokeWidth="1" fill="none" opacity="0.5" />
      <path d="M200 229v-4" stroke="#8a5f42" strokeWidth="1.2" opacity="0.5" />
    </g>
  );
}

function Face({
  id,
  brows = '#5c4632',
  browWidth = 2.8,
  lips = '#9c4c46',
  lipDark = '#79352f',
  eyeShadow = false,
  wrinkles = false,
  freckles = false,
  withMouth = true,
}: {
  id: string;
  brows?: string;
  browWidth?: number;
  lips?: string;
  lipDark?: string;
  eyeShadow?: boolean;
  wrinkles?: boolean;
  freckles?: boolean;
  withMouth?: boolean;
}) {
  return (
    <g>
      {/* ears, behind the face */}
      <path d="M132 178c-14-4-22 8-19 22 3 13 12 21 22 19" fill={`url(#${id}-skin)`} stroke="#9a7556" strokeWidth="1" />
      <path d="M268 178c14-4 22 8 19 22-3 13-12 21-22 19" fill={`url(#${id}-skin)`} stroke="#9a7556" strokeWidth="1" />
      <path d="M126 188c-6 3-8 10-6 16" stroke="#a97d5b" strokeWidth="1.4" fill="none" opacity="0.7" />
      <path d="M274 188c6 3 8 10 6 16" stroke="#a97d5b" strokeWidth="1.4" fill="none" opacity="0.7" />

      {/* face */}
      <path
        d="M132 152c0-58 30-86 68-86s68 28 68 86c0 42-12 76-32 96-14 14-26 20-36 20s-22-6-36-20c-20-20-32-54-32-96Z"
        fill={`url(#${id}-skin)`}
      />
      {/* temple / cheek shading */}
      <path d="M136 168c-2 34 6 64 22 84 8 10 18 16 26 18-24-6-46-36-48-102Z" fill="#9c7253" opacity="0.18" />
      <path d="M264 168c2 34-6 64-22 84-8 10-18 16-26 18 24-6 46-36 48-102Z" fill="#9c7253" opacity="0.14" />

      {/* eyes */}
      {[0, 60].map((dx) => (
        <g key={dx} transform={`translate(${dx} 0)`}>
          {eyeShadow && <ellipse cx="170" cy="173" rx="16" ry="8" fill="#a97d5b" opacity="0.16" />}
          <ellipse cx="170" cy="172" rx="16" ry="8" fill="#b98f6d" opacity="0.22" />
          <path d="M156 176c7-8 21-8 28 0-7 8-21 8-28 0Z" fill="#f6ecdd" />
          <circle cx="170" cy="176" r="5.1" fill="#4d3a28" />
          <circle cx="170" cy="176" r="2.4" fill="#17120d" />
          <circle cx="171.6" cy="174.3" r="1.2" fill="#fffdf6" opacity="0.85" />
          <path d="M155 171c7-6 21-6 28 0" stroke="#8a6247" strokeWidth="1.6" fill="none" opacity="0.5" />
          <path d="M153 173c9-10 26-10 34-1" stroke={brows} strokeWidth={browWidth} fill="none" strokeLinecap="round" />
          <path d="M158 183c7 3 17 3 23-1" stroke="#b98f6d" strokeWidth="1.1" fill="none" opacity="0.65" />
          {wrinkles && (
            <path d="M150 184c-4 2-7 5-8 9M189 184c4 2 7 5 8 9" stroke="#a97d5b" strokeWidth="1" fill="none" opacity="0.6" />
          )}
        </g>
      ))}

      {/* nose */}
      <path
        d="M200 174c1 15 3 27 5 34 2 6-1 9-5 9s-7-3-5-9c2-7 4-19 5-34"
        fill="none"
        stroke="#a97d5b"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path d="M191 214c4 3 14 3 18 0" stroke="#8a5f42" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <path d="M194 209c1 2 3 3 5 3M206 209c-1 2-3 3-5 3" stroke="#8a5f42" strokeWidth="1.4" fill="none" opacity="0.75" />

      {withMouth && <Mouth lips={lips} lipDark={lipDark} />}

      {/* chin */}
      <path d="M186 252c5 4 23 4 28 0" stroke="#a97d5b" strokeWidth="1.6" fill="none" opacity="0.45" />
      {freckles && (
        <g fill="#8a5f44" opacity="0.5">
          <circle cx="160" cy="213" r="1.6" />
          <circle cx="170" cy="218" r="1.2" />
          <circle cx="152" cy="220" r="1.2" />
          <circle cx="232" cy="213" r="1.5" />
          <circle cx="242" cy="219" r="1.1" />
        </g>
      )}
      {wrinkles && (
        <g stroke="#a97d5b" strokeWidth="1" fill="none" opacity="0.3">
          <path d="M178 204c-4 2-7 6-8 10M222 204c4 2 7 6 8 10" />
          <path d="M170 132c9-3 19-4 28-3" />
        </g>
      )}
    </g>
  );
}

/* ── Margit Voss ─────────────────────────────────────────────────────── */

function Voss({ id }: { id: string }) {
  return (
    <g>
      {/* hair volume behind the head */}
      <ellipse cx="200" cy="168" rx="91" ry="104" fill={`url(#${id}-hair)`} />
      <path d="M112 196c-8 36-4 66 8 88 6 10 20 10 24-2 3-9 0-18-4-26-8-20-10-42-6-64Z" fill={`url(#${id}-hair)`} />
      <path d="M288 196c8 36 4 66-8 88-6 10-20 10-24-2-3-9 0-18 4-26 8-20 10-42 6-64Z" fill={`url(#${id}-hair)`} />

      {/* neck, shoulders, black dress */}
      <path d="M174 236h52v52c0 16-12 26-26 26s-26-10-26-26Z" fill={`url(#${id}-skin)`} />
      <path d="M174 248c14 12 38 12 52 0" stroke="#8a5f42" strokeWidth="5" fill="none" opacity="0.22" />
      <path
        d="M18 480c8-86 44-148 112-172 22-8 46-12 70-12s48 4 70 12c68 24 104 86 112 172Z"
        fill={`url(#${id}-cloth)`}
      />
      {/* neckline + lapels */}
      <path d="M170 302c10 30 20 46 30 56 10-10 20-26 30-56-8 12-18 18-30 18s-22-6-30-18Z" fill={`url(#${id}-skin)`} />
      <path d="M170 302c4 34 14 66 30 88l-16 12c-18-28-26-68-26-94Z" fill="#221f1b" />
      <path d="M230 302c-4 34-14 66-30 88l16 12c18-28 26-68 26-94Z" fill="#2a2621" />
      <path d="M200 372c-4 24-3 48 0 72 3-24 4-48 0-72Z" fill="#14120f" opacity="0.8" />

      <Face id={id} brows="#6a5a49" browWidth={2.8} lips="#9c5148" eyeShadow wrinkles />

      {/* silver hair, swept across the brow */}
      <path
        d="M128 160c0-64 30-96 72-96s72 32 72 96c-10-20-22-34-38-42 8 16 10 30 8 42-16-28-42-42-70-36-18 4-32 16-44 36Z"
        fill={`url(#${id}-hair)`}
      />
      <path d="M136 150c8-30 28-48 56-52" stroke="#f4f0e8" strokeWidth="2.4" fill="none" opacity="0.55" />
      <path d="M250 104c12 12 18 28 20 48" stroke="#a8a299" strokeWidth="1.6" fill="none" opacity="0.55" />
      <path d="M132 156c10-18 22-30 38-36" stroke="#b7b1a8" strokeWidth="1.2" fill="none" opacity="0.6" />
      {/* fine strands down the sides */}
      <path d="M120 210c-2 26 0 48 6 66M282 210c2 26 0 48-6 66" stroke="#b7b1a8" strokeWidth="1.4" fill="none" opacity="0.55" />

      {/* earrings */}
      <circle cx="126" cy="212" r="4" fill="#c9a45c" stroke="#7a5a2b" strokeWidth="1" />
      <path d="M126 216v14" stroke="#c9a45c" strokeWidth="1.8" />
      <circle cx="126" cy="234" r="3.4" fill="#e5cd93" />
      <circle cx="274" cy="212" r="4" fill="#c9a45c" stroke="#7a5a2b" strokeWidth="1" />
      <path d="M274 216v14" stroke="#c9a45c" strokeWidth="1.8" />
      <circle cx="274" cy="234" r="3.4" fill="#e5cd93" />

      {/* moth brooch on the lapel */}
      <MothBrooch x={162} y={352} scale={1.05} rotate={-12} />
    </g>
  );
}

/* ── Dawid Renn ──────────────────────────────────────────────────────── */

function Renn({ id }: { id: string }) {
  return (
    <g>
      {/* short hair behind the cap */}
      <path d="M124 168c-2-56 28-90 76-90s78 34 76 90c-8-32-34-52-76-52s-68 20-76 52Z" fill="#2b241d" />

      {/* neck + shoulders */}
      <path d="M172 232h56v56c0 16-13 26-28 26s-28-10-28-26Z" fill={`url(#${id}-skin)`} />
      <path d="M172 246c15 12 41 12 56 0" stroke="#8a5f42" strokeWidth="5" fill="none" opacity="0.25" />
      <path
        d="M14 480c10-84 46-146 116-170 24-8 48-12 70-12s46 4 70 12c70 24 106 86 116 170Z"
        fill={`url(#${id}-cloth)`}
      />
      {/* hi-vis waistcoat */}
      <path d="M126 336c20-20 48-30 74-30s54 10 74 30l-10 144H136Z" fill="#a3a058" />
      <path d="M120 392c52-16 108-16 160 0l-2 20c-50-14-104-14-156 0Z" fill="#dad9c5" opacity="0.9" />
      <path d="M124 438c50-14 102-14 152 0l-2 20c-48-12-98-12-148 0Z" fill="#c6c7b0" opacity="0.7" />
      <path d="M200 336v150" stroke="#6d6a3b" strokeWidth="4" opacity="0.75" />
      <path d="M158 332c8 32 8 60 2 86M242 332c-8 32-8 60-2 86" stroke="#7d7a45" strokeWidth="2" fill="none" opacity="0.55" />

      <Face id={id} brows="#3a2c20" browWidth={3.4} lips="#8a4a41" lipDark="#6b322c" withMouth={false} />

      {/* beard, with the mouth left clear */}
      <path
        d="M142 202c2 30 8 54 20 68 10 12 24 18 38 18s28-6 38-18c12-14 18-38 20-68-4 26-12 44-24 54-8 6-16 6-22-2-4 12-8 18-12 18s-8-6-12-18c-6 8-14 8-22 2-12-10-20-28-24-54Z"
        fill="#3f3125"
        opacity="0.95"
      />
      <path d="M160 206c8 22 18 34 30 38-14 2-26-4-34-16-4-6-6-14-8-22Z" fill="#352a20" opacity="0.6" />
      <path d="M240 206c-8 22-18 34-30 38 14 2 26-4 34-16 4-6 6-14 8-22Z" fill="#352a20" opacity="0.6" />
      <path d="M166 214c10 6 22 8 34 8s24-2 34-8c-2 6-8 10-14 12-12 4-28 4-40 0-6-2-12-6-14-12Z" fill="#2f251c" />
      <Mouth lips="#8f4b42" lipDark="#6b322c" />
      <path d="M186 250c10 4 20 4 28 0" stroke="#2a1f16" strokeWidth="2" fill="none" opacity="0.45" />

      {/* cap: crown, then the brim sitting just above the brows */}
      <path d="M126 136c-2-46 30-76 74-76s78 30 76 76Z" fill="#3c443c" />
      <path d="M126 136c14-10 30-14 50-14" stroke="#5c655a" strokeWidth="2.4" fill="none" opacity="0.6" />
      <path d="M120 134c22-10 54-14 80-14s58 4 80 14c-6 14-38 22-80 22s-74-8-80-22Z" fill="#2c342d" />
      <path d="M112 138c-2 8 6 14 16 14h18v-12h-34Z" fill="#232a24" />
      <path d="M128 142c30-6 114-6 144 0" stroke="#454e45" strokeWidth="1.6" fill="none" opacity="0.7" />
      <circle cx="200" cy="62" r="3" fill="#2a312b" />
    </g>
  );
}

/* ── Nadia Pell ──────────────────────────────────────────────────────── */

function Nadia({ id }: { id: string }) {
  return (
    <g>
      {/* hair: volume behind, pulled back */}
      <ellipse cx="200" cy="162" rx="84" ry="98" fill="#241f1a" />
      <path d="M118 186c-4 34 0 62 10 80l20-8c-10-24-12-52-8-74Z" fill="#241f1a" />
      <path d="M282 186c4 34 0 62-10 80l-20-8c10-24 12-52 8-74Z" fill="#241f1a" />

      {/* neck, shoulders, jacket + shirt */}
      <path d="M176 234h48v52c0 16-11 26-24 26s-24-10-24-26Z" fill={`url(#${id}-skin)`} />
      <path d="M176 246c12 12 36 12 48 0" stroke="#8a5f42" strokeWidth="5" fill="none" opacity="0.22" />
      <path
        d="M26 480c8-82 42-142 108-166 22-8 44-12 66-12s44 4 66 12c66 24 100 84 108 166Z"
        fill="#4d4738"
      />
      <path d="M166 336c10-12 22-18 34-18s24 6 34 18l58 26-16 118H124l-16-118Z" fill="#c6b79e" />
      <path d="M200 344v136" stroke="#8d7f66" strokeWidth="2" opacity="0.6" />
      <path d="M124 344l-22 12M276 344l22 12" stroke="#8d7f66" strokeWidth="2" opacity="0.5" />
      {/* lanyard + badge */}
      <path d="M164 320c6 34 12 62 34 92M236 320c-6 34-12 62-34 92" stroke="#8f3b31" strokeWidth="6" fill="none" />
      <rect x="184" y="404" width="32" height="44" rx="2" fill="#e4dbc7" stroke="#7a6a51" />
      <path d="M190 416h20M190 424h20M190 432h12" stroke="#9a8d77" strokeWidth="2" />
      <rect x="192" y="398" width="16" height="7" rx="1" fill="#7d6c52" />

      <Face id={id} brows="#3d2c20" browWidth={2.8} lips="#a34f46" lipDark="#7f3b35" freckles />

      {/* hair, centre-parted and drawn over the crown */}
      <path
        d="M130 158c0-62 30-94 70-94s70 32 70 94c-10-22-22-36-38-44-8 10-18 16-32 16s-24-6-32-16c-16 8-28 22-38 44Z"
        fill="#241f1a"
      />
      <path d="M200 76v44" stroke="#3b342c" strokeWidth="2.4" fill="none" opacity="0.9" />
      <path d="M158 124c-8 8-12 20-14 34M242 124c8 8 12 20 14 34" stroke="#2c2721" strokeWidth="3" fill="none" opacity="0.65" />
      <path d="M140 148c-4 10-6 22-6 34M260 148c4 10 6 22 6 34" stroke="#332d26" strokeWidth="2" fill="none" opacity="0.5" />
      <path d="M144 132c12-22 34-34 56-36" stroke="#4a4138" strokeWidth="2" fill="none" opacity="0.7" />
      <path d="M256 132c-12-22-34-34-56-36" stroke="#4a4138" strokeWidth="2" fill="none" opacity="0.7" />
      {/* face-framing strands */}
      <path d="M136 176c-6 26-4 52 4 70M264 176c6 26 4 52-4 70" stroke="#2f2922" strokeWidth="5" fill="none" opacity="0.55" />

      {/* hoop earrings */}
      <circle cx="128" cy="222" r="11" fill="none" stroke="#c4a05c" strokeWidth="2.6" />
      <circle cx="272" cy="222" r="11" fill="none" stroke="#c4a05c" strokeWidth="2.6" />
    </g>
  );
}
