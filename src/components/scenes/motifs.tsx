/** Reusable drawn details. The same chip and the same brooch appear in
 *  multiple photographs, at different sizes — as they would in a real file. */

export function MothBrooch({
  x,
  y,
  scale = 1,
  rotate = 0,
}: {
  x: number;
  y: number;
  scale?: number;
  rotate?: number;
}) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rotate}) scale(${scale})`}>
      {/* pin bar behind */}
      <path d="M-18 5 L12 5" stroke="#6f6b60" strokeWidth="2" strokeLinecap="round" />
      <circle cx="13" cy="5" r="2" fill="#8c877b" />
      {/* wings — silver, with a dark edge so they read at thumbnail size */}
      <path
        d="M0 -2 C-6 -17 -22 -20 -24 -8 C-25 0 -13 5 0 3 Z"
        fill="#bdb7a8"
        stroke="#565145"
        strokeWidth="1.1"
      />
      <path
        d="M0 -2 C6 -17 22 -20 24 -8 C25 0 13 5 0 3 Z"
        fill="#cdc7b8"
        stroke="#565145"
        strokeWidth="1.1"
      />
      <path
        d="M0 2 C-5 11 -17 13 -18 6 C-18 1 -9 0 0 0 Z"
        fill="#a9a395"
        stroke="#565145"
        strokeWidth="1"
      />
      <path
        d="M0 2 C5 11 17 13 18 6 C18 1 9 0 0 0 Z"
        fill="#b7b1a2"
        stroke="#565145"
        strokeWidth="1"
      />
      {/* veins */}
      <path d="M-3 -2 C-8 -10 -15 -13 -20 -10M3 -2 C8 -10 15 -13 20 -10" stroke="#6f6a5d" strokeWidth="0.7" fill="none" />
      <path d="M-2 2 C-7 7 -12 8 -15 8M2 2 C7 7 12 8 15 8" stroke="#7d786b" strokeWidth="0.6" fill="none" />
      {/* body */}
      <ellipse cx="0" cy="2" rx="2.6" ry="7.5" fill="#6e695d" stroke="#3f3b33" strokeWidth="0.8" />
      <ellipse cx="0" cy="-1" rx="1.3" ry="2.4" fill="#d8d2c2" opacity="0.55" />
      <path d="M-1 -5 C-4 -12 -8 -15 -11 -17M1 -5 C4 -12 8 -15 11 -17" stroke="#4b473e" strokeWidth="0.9" fill="none" />
      {/* glint + shadowed clasp */}
      <path d="M-20 -12 L-14 -15" stroke="#fffdf4" strokeWidth="1" opacity="0.55" />
      <circle cx="14" cy="5" r="1.2" fill="#fffdf4" opacity="0.7" />
    </g>
  );
}

export function FrameCornerNick({
  x,
  y,
  scale = 1,
  rotate = 0,
  pale = true,
}: {
  x: number;
  y: number;
  scale?: number;
  rotate?: number;
  pale?: boolean;
}) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rotate}) scale(${scale})`}>
      {/* darkened, worn gilding around the loss */}
      <path d="M-16 -11 L2 -16 L9 -4 L2 5 L-14 3 Z" fill="#8a6a38" opacity="0.55" />
      {/* the loss itself — a shallow bite out of the moulding */}
      <path d="M-13 -9 L0 -13 L5 -4 L-1 3 L-12 1 Z" fill="#3a2b18" />
      {/* raw gesso under the gold */}
      <path d="M-11 -7 L-1 -10 L2 -4 L-4 0 L-10 -1 Z" fill={pale ? '#e3d6b4' : '#cbbb95'} />
      <path d="M-13 -9 L0 -13 L-1 -10 L-11 -7 Z" fill="#f3e8c8" opacity="0.7" />
      {/* frayed edge */}
      <path d="M5 -4 L9 -4 L4 3 L-1 3 Z" fill="#5c4526" />
    </g>
  );
}

export function GlassCoupe({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <path d="M-14 -30 L14 -30 C14 -18 8 -10 1 -8 L1 12 L9 14 L9 17 L-9 17 L-9 14 L-1 12 L-1 -8 C-8 -10 -14 -18 -14 -30 Z" fill="#e6dcc4" opacity="0.22" stroke="#d9cdb2" strokeWidth="1.2" opacity-fill="0.5" />
      <path d="M-12 -27 L12 -27 C11 -20 7 -15 1 -13 L1 12" fill="none" stroke="#f2e7cf" strokeWidth="1" opacity="0.7" />
      <path d="M-13 -22 C-2 -18 6 -18 13 -22" stroke="#f0c983" strokeWidth="1.4" fill="none" opacity="0.5" />
    </g>
  );
}

export function Puddle({ x, y, w, h, opacity = 0.3, id }: { x: number; y: number; w: number; h: number; opacity?: number; id: string }) {
  return (
    <ellipse cx={x} cy={y} rx={w} ry={h} fill={`url(#${id})`} opacity={opacity} />
  );
}
