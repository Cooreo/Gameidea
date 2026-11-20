import { MothBrooch } from './motifs';

/** Gallery photograph, 19:40. Warm, close, posted four minutes later. */
export default function CloakroomScene() {
  return (
    <g>
      <defs>
        <linearGradient id="cl-wall" x1="0" y1="0" x2="0.2" y2="1">
          <stop offset="0" stopColor="#5c452e" />
          <stop offset="0.5" stopColor="#403020" />
          <stop offset="1" stopColor="#241a12" />
        </linearGradient>
        <linearGradient id="cl-dress" x1="0" y1="0" x2="0.5" y2="1">
          <stop offset="0" stopColor="#2f2c2c" />
          <stop offset="0.5" stopColor="#1b1919" />
          <stop offset="1" stopColor="#0f0e0e" />
        </linearGradient>
        <linearGradient id="cl-skin" x1="0" y1="0" x2="0.3" y2="1">
          <stop offset="0" stopColor="#d9b493" />
          <stop offset="0.6" stopColor="#c29b7a" />
          <stop offset="1" stopColor="#9c7659" />
        </linearGradient>
        <linearGradient id="cl-hair" x1="0" y1="0" x2="0.4" y2="1">
          <stop offset="0" stopColor="#d8d3cb" />
          <stop offset="0.55" stopColor="#b3aea6" />
          <stop offset="1" stopColor="#807b74" />
        </linearGradient>
        <linearGradient id="cl-coat" x1="0" y1="0" x2="0.3" y2="1">
          <stop offset="0" stopColor="#3c3a35" />
          <stop offset="1" stopColor="#1f1f1c" />
        </linearGradient>
        <linearGradient id="cl-rail" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#8d7247" />
          <stop offset="1" stopColor="#4c3b25" />
        </linearGradient>
        <radialGradient id="cl-bokeh" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#ffd9a0" stopOpacity="0.55" />
          <stop offset="1" stopColor="#ffc078" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="cl-warm" cx="0.35" cy="0.25" r="0.75">
          <stop offset="0" stopColor="#f7cd8f" stopOpacity="0.22" />
          <stop offset="0.55" stopColor="#8d5c2c" stopOpacity="0.08" />
          <stop offset="1" stopColor="#000" stopOpacity="0.55" />
        </radialGradient>
        <radialGradient id="cl-vig" cx="0.5" cy="0.45" r="0.72">
          <stop offset="0.4" stopColor="#000" stopOpacity="0" />
          <stop offset="1" stopColor="#0a0704" stopOpacity="0.7" />
        </radialGradient>
        <filter id="cl-blur"><feGaussianBlur stdDeviation="9" /></filter>
        <filter id="cl-blur-lg"><feGaussianBlur stdDeviation="22" /></filter>
        <filter id="cl-noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0.4" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.11" />
          </feComponentTransfer>
        </filter>
        <filter id="cl-soft"><feGaussianBlur stdDeviation="2" /></filter>
      </defs>

      <rect width="1200" height="800" fill="url(#cl-wall)" />
      <rect x="0" y="0" width="1200" height="800" fill="url(#cl-warm)" />

      {/* panelling */}
      <g stroke="#6c5335" opacity="0.25" fill="none">
        <path d="M0 250h1200M0 620h1200" strokeWidth="3" />
        <rect x="60" y="286" width="220" height="300" strokeWidth="2" />
        <rect x="310" y="286" width="180" height="300" strokeWidth="2" />
      </g>

      {/* bokeh + chandelier */}
      <g filter="url(#cl-blur-lg)">
        <circle cx="132" cy="120" r="64" fill="url(#cl-bokeh)" />
        <circle cx="216" cy="172" r="34" fill="url(#cl-bokeh)" opacity="0.8" />
        <circle cx="66" cy="210" r="26" fill="url(#cl-bokeh)" opacity="0.7" />
        <circle cx="404" cy="86" r="46" fill="url(#cl-bokeh)" opacity="0.5" />
        <circle cx="1130" cy="128" r="40" fill="url(#cl-bokeh)" opacity="0.45" />
      </g>
      <g opacity="0.8">
        <path d="M170 0v96M96 44l74 52 74-52M120 20l50 30 50-30" stroke="#c9a466" strokeWidth="2" fill="none" />
        <g fill="#fdf0c9">
          <circle cx="96" cy="44" r="5" />
          <circle cx="170" cy="96" r="7" />
          <circle cx="244" cy="44" r="5" />
          <circle cx="120" cy="20" r="4" />
          <circle cx="220" cy="20" r="4" />
        </g>
        <g stroke="#e8c98f" strokeWidth="1" opacity="0.5">
          <path d="M170 0v-10M96 44V34M244 44V34" />
        </g>
      </g>

      {/* blurred guests, background left */}
      <g filter="url(#cl-blur)" opacity="0.55">
        <path d="M70 624c-8-96 10-170 52-190 44-20 80 24 92 96 8 52 2 94 2 94Z" fill="#2b241d" />
        <circle cx="120" cy="404" r="34" fill="#57432f" />
        <path d="M250 640c-4-84 16-150 54-166 40-16 72 30 78 96 4 44 0 70 0 70Z" fill="#33291f" />
        <circle cx="300" cy="440" r="30" fill="#6a5138" />
        <path d="M382 650c-2-70 12-124 42-138 32-14 58 26 62 82 2 36 0 56 0 56Z" fill="#2a231b" />
        <circle cx="420" cy="482" r="24" fill="#5b4630" />
        <path d="M470 660c0-54 10-96 30-108 24-12 44 20 46 62v46Z" fill="#241e17" />
      </g>

      {/* tall mirror and sconce on the back wall */}
      <g>
        <path d="M36 244 L196 236 L196 626 L36 640 Z" fill="#2a2119" />
        <path d="M46 254 L186 247 L186 616 L46 628 Z" fill="#4b3c2c" opacity="0.75" />
        <path d="M52 260 L180 254 L180 588 L52 600 Z" fill="#6a5741" opacity="0.35" />
        <path d="M54 262 L84 260 L80 586 L54 596 Z" fill="#d8b985" opacity="0.12" />
        <path d="M58 300 L176 292" stroke="#c9a978" strokeWidth="1" opacity="0.25" />
        <path d="M120 252 L118 604" stroke="#2a2119" strokeWidth="3" opacity="0.4" />
        <circle cx="118" cy="236" r="5" fill="#c8a978" opacity="0.6" />
        <circle cx="288" cy="168" r="46" fill="#ffd9a0" opacity="0.16" filter="url(#cl-blur)" />
        <path d="M282 176 L294 176 L290 196 L286 196 Z" fill="#c0a273" />
        <circle cx="288" cy="170" r="6" fill="#ffe3b0" opacity="0.9" />
      </g>

      {/* coat rail */}
      <g>
        <rect x="856" y="314" width="330" height="10" rx="4" fill="url(#cl-rail)" />
        <rect x="876" y="324" width="10" height="330" fill="#4f3d27" />
        <rect x="1150" y="324" width="10" height="330" fill="#4f3d27" />
        <path d="M864 324h306" stroke="#c1a06b" strokeWidth="1" opacity="0.4" />
        {/* coats */}
        <path d="M884 326c-16 30-22 90-18 150l24 8c2-54 4-104 20-132 10-18-8-34-26-26Z" fill="#2e2a25" />
        <path d="M920 326c-12 34-16 96-12 158l22 4c4-58 8-114 18-144 6-20-12-28-28-18Z" fill="#3b342b" />
        <path d="M1082 326c-18 32-24 100-20 164l30 6c0-60 6-118 22-148 10-20-12-32-32-22Z" fill="#262320" />
        <path d="M1132 326c-14 36-18 104-14 166l26 4c2-62 6-120 18-152 8-22-14-28-30-18Z" fill="#35302a" />
        {/* hi-vis waistcoat on the rail */}
        <g>
          <path d="M984 336c14-6 34-6 48 0l-4 44-14 126-16 4-18-128Z" fill="#a8a35a" opacity="0.9" />
          <path d="M986 348c12-4 30-4 42 0" stroke="#d8d7bf" strokeWidth="7" fill="none" opacity="0.8" />
          <path d="M990 376c12-3 26-3 36 0" stroke="#c8c8ae" strokeWidth="5" fill="none" opacity="0.65" />
          <path d="M990 402c10-2 22-2 30 0" stroke="#c8c8ae" strokeWidth="4" fill="none" opacity="0.5" />
          <path d="M998 336v166M1022 336v166" stroke="#7d7a44" strokeWidth="2" opacity="0.6" />
          <path d="M996 338l-6-12M1024 338l8-12" stroke="#c9c6b0" strokeWidth="3" />
        </g>
      </g>

      {/* Margit Voss, three-quarter */}
      <g>
        <ellipse cx="650" cy="772" rx="200" ry="34" fill="#000" opacity="0.35" filter="url(#cl-blur)" />

        {/* dress / shoulders */}
        <path
          d="M538 800c-4-160 12-296 44-388 20-58 52-86 92-88 42-2 76 26 96 84 32 92 46 232 42 392Z"
          fill="url(#cl-dress)"
        />
        <path d="M566 484c28 42 64 62 96 60 34-2 62-24 84-62" stroke="#4a4440" strokeWidth="3" fill="none" opacity="0.6" />
        <path d="M552 600c18 60 34 132 40 200M756 588c-16 64-30 138-34 212" stroke="#3a3532" strokeWidth="3" fill="none" opacity="0.5" />

        {/* neck + face */}
        <path d="M614 320h58v50c0 18-14 30-30 30s-28-12-28-30Z" fill="url(#cl-skin)" />
        <path d="M618 356c14 10 32 10 46 0" stroke="#8d6a4e" strokeWidth="2" fill="none" opacity="0.5" />
        <path d="M612 346c16 14 36 16 54 2" stroke="#8a5f42" strokeWidth="5" fill="none" opacity="0.35" />
        <path d="M606 392 C620 410 638 420 658 418 L678 390 L698 408 L660 442 C634 444 612 424 598 402 Z" fill="#1b1919" />
        <path
          d="M584 214c0-52 32-88 76-88 48 0 78 34 78 86 0 42-18 82-42 106-16 16-36 24-56 18-34-10-56-56-56-122Z"
          fill="url(#cl-skin)"
        />
        {/* profile features, turned to her right (our left) */}
        <path d="M586 256c-10 2-14 14-8 22 6 8 14 8 20 4" fill="#c9a181" stroke="#9a765a" strokeWidth="1" />
        <path d="M596 284c6 4 14 4 20 0" stroke="#8d4c44" strokeWidth="3" fill="none" strokeLinecap="round" />

        {/* silver bob */}
        {/* hair volume behind and around the head */}
        <path
          d="M560 330 C546 224 580 132 654 124 C730 116 762 178 756 286 L750 342 L732 338 C740 268 736 214 726 188 C704 210 672 218 644 214 C612 210 588 196 576 180 C568 216 566 286 568 330 Z"
          fill="url(#cl-hair)"
        />
        {/* crown thickness above the hairline */}
        <path
          d="M570 206 C572 142 612 108 660 112 C712 116 744 152 746 212 C724 182 700 168 668 166 C630 164 598 180 580 204 Z"
          fill="url(#cl-hair)"
        />
        {/* side panels, jaw length, with a soft inward flip */}
        <path d="M568 214 C556 258 556 300 564 330 C570 344 584 346 590 334 C578 302 576 264 582 236 Z" fill="url(#cl-hair)" />
        <path d="M746 212 C758 258 756 300 748 330 C744 344 730 346 724 334 C736 302 738 264 732 236 Z" fill="url(#cl-hair)" />
        <path d="M600 218 C606 244 606 274 602 300" stroke="#a8a29a" strokeWidth="1.4" fill="none" opacity="0.45" />
        <g stroke="#9a958d" strokeWidth="1.4" fill="none" opacity="0.45">
          <path d="M612 172 C638 152 676 150 702 168M594 196 C616 178 648 168 678 172M734 240 C740 272 738 304 730 330M574 246 C568 278 568 306 574 326" />
        </g>
        {/* eye, brow and cheek, turned to our left */}
        <path d="M606 233 C616 226 630 227 640 235" stroke="#6f5440" strokeWidth="2.6" fill="none" strokeLinecap="round" />
        <path d="M609 237 C617 232 629 232 636 237" stroke="#3a2b20" strokeWidth="1.8" fill="none" />
        <circle cx="621" cy="237" r="2.4" fill="#4a3c2e" opacity="0.9" />
        <path d="M612 241 C619 244 628 244 634 241" stroke="#c39a76" strokeWidth="1.2" fill="none" opacity="0.85" />
        <path d="M600 256 C606 262 614 264 620 262" stroke="#a8805f" strokeWidth="1.4" fill="none" opacity="0.6" />
        <path d="M598 268 C604 272 611 272 616 269" stroke="#bb8f6b" strokeWidth="1.6" fill="none" opacity="0.35" />
        {/* ear, jaw and neck shadow */}
        <path d="M718 266 c11-4 17 3 16 13 -1 10-9 15-17 12Z" fill="#c49a77" opacity="0.75" />
        <path d="M716 274 c5-1 8 2 8 6 0 4-4 6-7 5" stroke="#a97f5e" strokeWidth="1.2" fill="none" opacity="0.7" />
        <path d="M592 262 C596 300 610 324 632 334" stroke="#ad8060" strokeWidth="3" fill="none" opacity="0.25" />
        <path d="M616 336 C630 344 648 344 662 336" stroke="#c09472" strokeWidth="4" fill="none" opacity="0.4" />
        {/* warm rim light */}
        <path d="M746 214 C756 250 754 302 746 336" stroke="#f0c48a" strokeWidth="3" fill="none" opacity="0.45" />
        <path d="M596 344 C606 366 618 380 632 388" stroke="#e5b87c" strokeWidth="2.4" fill="none" opacity="0.22" />

        {/* lapel + brooch */}
        <path d="M604 384c18-16 38-24 60-24l-8 118-44-14z" fill="#262323" />
        <path d="M604 384l-18 22 26 66 22-14" fill="#1c1a1a" />
        <path d="M620 392c14-8 28-12 42-12" stroke="#4d4744" strokeWidth="2" fill="none" opacity="0.7" />
        <path d="M596 380 C602 394 600 412 592 426" stroke="#4d4744" strokeWidth="2" fill="none" opacity="0.8" />
        <MothBrooch x={600} y={398} scale={1.2} rotate={-12} />

        {/* right arm holding the coupe */}
        <path d="M744 386c34 42 56 96 62 150l-26 14c-14-44-38-86-66-116Z" fill="#232020" />
        <path d="M806 536c10 6 18 16 20 28" stroke="#232020" strokeWidth="22" strokeLinecap="round" fill="none" />
        <ellipse cx="818" cy="562" rx="12" ry="8" fill="#141212" transform="rotate(30 818 562)" />
        <path d="M818 556c12 2 20 10 22 22" stroke="url(#cl-skin)" strokeWidth="16" strokeLinecap="round" fill="none" />
        {/* gold bangle */}
        <ellipse cx="822" cy="562" rx="9.5" ry="5.6" fill="none" stroke="#d9b25d" strokeWidth="4" transform="rotate(30 822 562)" />
        <ellipse cx="822" cy="562" rx="9.5" ry="5.6" fill="none" stroke="#ffe5a8" strokeWidth="1.2" transform="rotate(30 822 562)" opacity="0.9" />
        {/* hand */}
        <path d="M834 576c10 2 18 10 18 20 0 10-8 16-18 16-8 0-14-6-16-14" fill="url(#cl-skin)" stroke="#9a7659" strokeWidth="1" />
        {/* fingers curled round the glass */}
        <g fill="#cba887" stroke="#9a7659" strokeWidth="0.8">
          <path d="M836 584 c8-4 14 0 15 7 1 7-6 11-13 9Z" />
          <path d="M838 598 c8-3 14 1 14 8 0 6-7 9-13 7Z" />
          <path d="M842 612 c7-2 12 2 12 8 0 5-6 8-11 6Z" />
        </g>
        {/* coupe glass */}
        <g transform="translate(848 596)">
          <path d="M-26 -26 L26 -26 C26 -8 14 4 2 8 L2 46 L16 50 L16 54 L-16 54 L-16 50 L-2 46 L-2 8 C-14 4 -26 -8 -26 -26 Z" fill="#f2e4c4" opacity="0.22" stroke="#e8dcc0" strokeWidth="2" />
          <path d="M-24 -22 C-12 -18 12 -18 24 -22" stroke="#f0c983" strokeWidth="2" fill="none" opacity="0.65" />
          <path d="M-16 -14 C-8 -8 -2 -6 2 -10" stroke="#fff4da" strokeWidth="2" fill="none" opacity="0.5" />
          <circle cx="-10" cy="-28" r="2" fill="#ffe9b8" opacity="0.8" />
          <circle cx="8" cy="-30" r="1.5" fill="#ffe9b8" opacity="0.7" />
        </g>
      </g>

      {/* foreground table corner with glass */}
      <g>
        <path d="M0 690 L268 650 L340 800 L0 800 Z" fill="#241b13" opacity="0.9" />
        <path d="M0 690 L268 650" stroke="#6d5638" strokeWidth="3" opacity="0.5" />
        <g transform="translate(150 682)">
          <path d="M-18 -34 L18 -34 C18 -18 10 -8 2 -4 L2 30 L14 34 L14 38 L-14 38 L-14 34 L-2 30 L-2 -4 C-10 -8 -18 -18 -18 -34Z" fill="#f1e5cc" opacity="0.16" stroke="#e8dcc0" strokeWidth="1.6" />
          <path d="M-16 -30 C-8 -26 8 -26 16 -30" stroke="#f0c983" strokeWidth="1.6" opacity="0.55" fill="none" />
        </g>
      </g>

      <rect width="1200" height="800" fill="url(#cl-vig)" />
      <rect width="1200" height="800" filter="url(#cl-noise)" opacity="0.9" />
      <g filter="url(#cl-soft)" opacity="0.5">
        <circle cx="470" cy="690" r="3" fill="#ffe1a8" />
        <circle cx="520" cy="120" r="2.4" fill="#ffe1a8" />
        <circle cx="960" cy="220" r="2" fill="#ffe1a8" />
      </g>
    </g>
  );
}
