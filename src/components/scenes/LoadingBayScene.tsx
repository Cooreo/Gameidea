/** Door camera, 18:20. Sodium light, wet asphalt, one crate. */
export default function LoadingBayScene() {
  return (
    <g>
      <defs>
        <linearGradient id="lb-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0d1418" />
          <stop offset="0.7" stopColor="#162026" />
          <stop offset="1" stopColor="#1c2629" />
        </linearGradient>
        <linearGradient id="lb-wall" x1="0" y1="0" x2="0.2" y2="1">
          <stop offset="0" stopColor="#302a23" />
          <stop offset="0.6" stopColor="#241f1a" />
          <stop offset="1" stopColor="#171310" />
        </linearGradient>
        <linearGradient id="lb-doorway" x1="0" y1="0" x2="0.3" y2="1">
          <stop offset="0" stopColor="#ffdca4" />
          <stop offset="0.35" stopColor="#c99a5e" />
          <stop offset="1" stopColor="#4a3420" />
        </linearGradient>
        <linearGradient id="lb-floor" x1="0.2" y1="0" x2="0.6" y2="1">
          <stop offset="0" stopColor="#2b3234" />
          <stop offset="0.5" stopColor="#1b2123" />
          <stop offset="1" stopColor="#0f1315" />
        </linearGradient>
        <linearGradient id="lb-crate" x1="0" y1="0" x2="0.3" y2="1">
          <stop offset="0" stopColor="#8d6f47" />
          <stop offset="0.5" stopColor="#6b5335" />
          <stop offset="1" stopColor="#483620" />
        </linearGradient>
        <linearGradient id="lb-van" x1="0" y1="0" x2="0.2" y2="1">
          <stop offset="0" stopColor="#b8bcb8" />
          <stop offset="0.45" stopColor="#8d948f" />
          <stop offset="1" stopColor="#5d6561" />
        </linearGradient>
        <radialGradient id="lb-lamp" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#ffe3a8" stopOpacity="0.95" />
          <stop offset="1" stopColor="#ffcf80" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="lb-vig" cx="0.5" cy="0.5" r="0.72">
          <stop offset="0.4" stopColor="#000" stopOpacity="0" />
          <stop offset="1" stopColor="#030506" stopOpacity="0.82" />
        </radialGradient>
        <linearGradient id="lb-puddle" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#9a8a63" stopOpacity="0.5" />
          <stop offset="1" stopColor="#2a3134" stopOpacity="0" />
        </linearGradient>
        <pattern id="lb-brick" width="70" height="34" patternUnits="userSpaceOnUse">
          <rect width="70" height="34" fill="none" />
          <path d="M0 0h70M0 17h70M35 0v17M17 17v17M52 17v17" stroke="#0e0b08" strokeWidth="2" opacity="0.4" />
          <path d="M0 2h70" stroke="#5a4a38" strokeWidth="1" opacity="0.1" />
        </pattern>
        <filter id="lb-noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0.2" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.13" />
          </feComponentTransfer>
        </filter>
        <filter id="lb-bloom" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="16" />
        </filter>
        <filter id="lb-soft"><feGaussianBlur stdDeviation="6" /></filter>
      </defs>

      <rect width="1200" height="800" fill="url(#lb-sky)" />
      {/* building */}
      <rect x="0" y="0" width="410" height="660" fill="url(#lb-wall)" />
      <rect x="0" y="0" width="410" height="660" fill="url(#lb-brick)" />
      <rect x="0" y="0" width="760" height="46" fill="#15110d" />
      <path d="M0 46h760" stroke="#3a3128" strokeWidth="2" />

      {/* roller door, warm interior */}
      <g>
        <rect x="66" y="196" width="268" height="430" fill="#0d0b08" />
        <rect x="82" y="212" width="236" height="414" fill="url(#lb-doorway)" opacity="0.72" />
        <rect x="82" y="212" width="236" height="414" fill="url(#lb-doorway)" opacity="0.25" />
        <g opacity="0.5">
          <path d="M100 240h200M100 300h200M100 360h200M100 420h200M100 480h200M100 540h200" stroke="#6d4e2c" strokeWidth="2" />
        </g>
        <rect x="66" y="196" width="268" height="430" fill="none" stroke="#4c4438" strokeWidth="8" />
        <rect x="56" y="176" width="288" height="26" rx="3" fill="#2c2720" stroke="#57503f" strokeWidth="2" />
        <text x="200" y="194" textAnchor="middle" fill="#8d8067" fontSize="12" fontFamily="'Courier New', monospace" letterSpacing="3">SERVICE BAY</text>
        {/* light spill */}
        <path d="M90 600 L300 600 L420 760 L-20 760 Z" fill="#d8a66a" opacity="0.14" filter="url(#lb-soft)" />
        <path d="M82 212h236v414H82z" fill="#ffd9a0" opacity="0.06" />
        {/* interior depth */}
        <path d="M82 212h236v108H82z" fill="#2a1c0e" opacity="0.55" />
        <path d="M82 600h236v26H82z" fill="#d8a86a" opacity="0.4" />
        <path d="M82 212v414" stroke="#6b4f2c" strokeWidth="5" opacity="0.8" />
        <rect x="236" y="524" width="72" height="80" fill="#3b2a18" />
        <rect x="236" y="524" width="72" height="6" fill="#7a5a32" opacity="0.6" />
        <rect x="246" y="484" width="54" height="40" fill="#332414" />
        <rect x="92" y="420" width="56" height="5" fill="#6b4f2c" opacity="0.7" />
        <rect x="100" y="380" width="38" height="40" fill="#3f2d1a" opacity="0.8" />
        {/* door leaf, swung inward */}
        <path d="M300 212 L336 230 L336 620 L300 606 Z" fill="#3f2f1e" />
        <path d="M300 218 L332 234" stroke="#b08a56" strokeWidth="2" opacity="0.5" />
        <circle cx="326" cy="430" r="4" fill="#a8875a" opacity="0.7" />
      </g>

      {/* Margit Voss by the door, clipboard to her chest */}
      <g>
        <ellipse cx="344" cy="664" rx="58" ry="11" fill="#050505" opacity="0.55" />
        {/* legs */}
        <path d="M322 578 L316 650 L340 656 L346 580 Z" fill="#1b1713" />
        <path d="M352 580 L356 654 L380 650 L368 576 Z" fill="#151210" />
        <path d="M306 650 L342 656 L342 668 L302 664 Z" fill="#0a0907" />
        <path d="M354 654 L382 650 L388 662 L356 666 Z" fill="#080706" />
        {/* long coat */}
        <path d="M308 452 C300 502 298 550 302 590 L386 590 C388 550 382 502 374 452 C366 432 352 424 340 424 C326 424 316 434 308 452 Z" fill="#332a20" />
        <path d="M308 452 C318 438 330 432 342 432" stroke="#a08b68" strokeWidth="2.2" fill="none" opacity="0.45" />
        <path d="M300 540 C322 548 364 548 384 540" stroke="#14100c" strokeWidth="4" fill="none" opacity="0.85" />
        <path d="M340 470v120" stroke="#171310" strokeWidth="2" opacity="0.7" />
        {/* far arm */}
        <path d="M310 458 C300 486 296 516 300 542 L318 546 L322 510 Z" fill="#201b15" />
        {/* near arm, bent to hold the clipboard */}
        <path d="M368 458 C382 478 386 506 380 530 L364 536 L352 500 Z" fill="#2c251d" />
        {/* clipboard at the chest */}
        <g transform="rotate(-12 350 512)">
          <rect x="332" y="494" width="52" height="66" rx="3" fill="#cdc3a8" />
          <rect x="332" y="494" width="52" height="66" rx="3" fill="none" stroke="#7d7156" strokeWidth="1.5" />
          <rect x="346" y="488" width="24" height="9" rx="2" fill="#8a7d60" />
          <path d="M338 510h40M338 520h34M338 530h38M338 540h26" stroke="#7a6f58" strokeWidth="1.2" opacity="0.6" />
        </g>
        <path d="M356 524 C364 522 372 528 372 536 C372 542 364 546 358 542 Z" fill="#c8ab88" />
        {/* head, silver bob */}
        <circle cx="342" cy="408" r="19" fill="#d9b593" />
        <path d="M342 424 L342 436" stroke="#c39d7c" strokeWidth="9" strokeLinecap="round" opacity="0.85" />
        <path d="M322 406 C322 384 332 372 346 372 C362 372 372 386 370 408 C364 394 354 388 342 390 C332 392 326 396 322 406 Z" fill="#b9b4a9" />
        <path d="M322 400 C316 414 316 428 320 438 L311 441 C305 424 307 408 313 396 Z" fill="#b9b4a9" />
        <path d="M370 402 C377 416 376 430 372 440 L381 443 C387 426 385 410 379 398 Z" fill="#a8a399" />
        <path d="M330 412 C333 415 336 415 339 412" stroke="#7c5b42" strokeWidth="1.3" fill="none" />
        <path d="M336 422 C338 424 341 424 343 422" stroke="#9a5f52" strokeWidth="1.4" fill="none" />
        {/* bangle catch-light at the wrist */}
        <ellipse cx="366" cy="528" rx="6" ry="3.4" fill="none" stroke="#d4ac58" strokeWidth="2.4" transform="rotate(-24 366 528)" />
      </g>

      {/* security lamp */}
      <g>
        <rect x="512" y="112" width="86" height="16" rx="3" fill="#2c2720" />
        <path d="M520 128h70l16 24h-102z" fill="#5a5040" />
        <circle cx="555" cy="158" r="92" fill="url(#lb-lamp)" opacity="0.55" />
        <circle cx="555" cy="152" r="9" fill="#ffe9bd" />
        <path d="M470 168 L660 168 L760 800 L300 800 Z" fill="#f7c581" opacity="0.06" />
      </g>

      {/* asphalt */}
      <rect x="0" y="624" width="1200" height="176" fill="url(#lb-floor)" />
      <path d="M0 624h1200" stroke="#434b4a" strokeWidth="3" />
      <g fill="url(#lb-puddle)">
        <ellipse cx="300" cy="712" rx="180" ry="24" />
        <ellipse cx="690" cy="742" rx="220" ry="26" />
        <ellipse cx="980" cy="700" rx="150" ry="20" />
      </g>
      <g stroke="#c8a265" opacity="0.16">
        <path d="M124 700v46M180 690v54M240 706v44M560 730v40M640 720v50M760 704v46M900 690v40" strokeWidth="2" />
      </g>
      {/* lane markings */}
      <path d="M0 770h300M360 770h240M660 770h300" stroke="#c9c39e" strokeWidth="4" opacity="0.16" strokeDasharray="40 26" />

      {/* travel crate on a pallet */}
      <g>
        <ellipse cx="586" cy="652" rx="170" ry="22" fill="#050607" opacity="0.55" filter="url(#lb-soft)" />
        <rect x="430" y="616" width="300" height="34" fill="#3d3223" />
        <path d="M442 616v34M470 616v34M530 616v34M590 616v34M650 616v34M710 616v34" stroke="#211a12" strokeWidth="4" />
        <rect x="444" y="400" width="276" height="222" fill="url(#lb-crate)" />
        <rect x="444" y="400" width="276" height="222" fill="none" stroke="#3a2a19" strokeWidth="6" />
        <g stroke="#3d2d1c" strokeWidth="2" opacity="0.5">
          <path d="M444 454h276M444 508h276M444 562h276" />
        </g>
        <rect x="444" y="400" width="276" height="10" fill="#a08d6a" opacity="0.4" />
        <rect x="444" y="400" width="10" height="222" fill="#a08d6a" opacity="0.22" />
        {/* straps */}
        <rect x="498" y="396" width="18" height="228" fill="#b8ad8f" opacity="0.8" />
        <rect x="648" y="396" width="18" height="228" fill="#b8ad8f" opacity="0.8" />
        <rect x="498" y="500" width="18" height="12" fill="#8c8267" />
        <rect x="648" y="500" width="18" height="12" fill="#8c8267" />
        {/* stencil */}
        <g fill="#2e2417" opacity="0.68" fontFamily="'Courier New', monospace">
          <text x="466" y="438" fontSize="20" letterSpacing="3">HALLOW</text>
          <text x="466" y="458" fontSize="9" letterSpacing="2">FINE ART LOGISTICS</text>
          <text x="530" y="594" fontSize="20" letterSpacing="4">11-2214</text>
        </g>
        <rect x="462" y="574" width="72" height="52" fill="#d3ccb8" opacity="0.8" />
        <g stroke="#37301f" strokeWidth="3" opacity="0.8">
          <path d="M472 582v38M486 582v38M500 582v38M514 582v38M526 582v38" />
        </g>
      </g>

      {/* Renn van */}
      <g>
        <ellipse cx="930" cy="660" rx="210" ry="26" fill="#040607" opacity="0.6" filter="url(#lb-soft)" />
        {/* body */}
        <path d="M770 366c0-14 10-24 24-24h276c14 0 24 10 24 24v250H770V366Z" fill="url(#lb-van)" />
        <path d="M770 366c0-14 10-24 24-24h276c14 0 24 10 24 24v34H770v-34Z" fill="#c6cac6" opacity="0.25" />
        <path d="M770 554h324v62H770z" fill="#6c7470" />
        <path d="M784 372h96v96h-96z" fill="#1c2427" stroke="#4a524f" strokeWidth="3" />
        <path d="M894 372h82v96h-82z" fill="#1b2326" stroke="#4a524f" strokeWidth="3" />
        <path d="M992 372h88v96h-88z" fill="#1a2124" stroke="#4a524f" strokeWidth="3" />
        <path d="M794 380l70 80M906 380l-50 80M1002 380l62 80" stroke="#5a6768" strokeWidth="2" opacity="0.35" />
        <path d="M1094 372h40v200h-40z" fill="#59615d" />
        <path d="M1104 500h18v28h-18z" fill="#1b2224" />
        {/* lettering */}
        <g fill="#a23a2e" opacity="0.85" fontFamily="Arial, Helvetica, sans-serif" fontWeight="700">
          <text x="794" y="530" fontSize="38" letterSpacing="2">RENN</text>
          <text x="796" y="554" fontSize="15" letterSpacing="4">AUDIO-VISUAL</text>
        </g>
        <path d="M790 566h150" stroke="#a23a2e" strokeWidth="2" opacity="0.5" />
        {/* ladder */}
        <g stroke="#9aa19c" strokeWidth="5" opacity="0.9">
          <path d="M816 330h280" />
          <path d="M830 330v-26M900 330v-26M970 330v-26M1040 330v-26M1100 330v-26" />
          <path d="M830 304h270" />
        </g>
        <g stroke="#7d8580" strokeWidth="3" opacity="0.7">
          <path d="M816 330l-16 14M1096 330l14 12" />
        </g>
        {/* wheels */}
        <g fill="#0e1212" stroke="#404845" strokeWidth="3">
          <circle cx="842" cy="624" r="42" />
          <circle cx="1048" cy="624" r="42" />
        </g>
        <g fill="#6d7572">
          <circle cx="842" cy="624" r="17" />
          <circle cx="1048" cy="624" r="17" />
        </g>
        <path d="M770 604h324" stroke="#3a423f" strokeWidth="3" opacity="0.6" />
        {/* reflection */}
        <path d="M790 650h300l-40 60H820z" fill="#b8bcb8" opacity="0.05" />
      </g>

      {/* rain */}
      <g stroke="#cfd9d8" strokeWidth="1" opacity="0.12">
        <path d="M80 620l-10 30M240 600l-10 30M380 640l-10 30M520 600l-10 30M700 620l-10 30M860 600l-10 30M1000 640l-10 30M1140 610l-10 30" />
      </g>

      <rect width="1200" height="800" fill="url(#lb-vig)" />
      <rect width="1200" height="800" filter="url(#lb-noise)" opacity="0.85" />
      <g fontFamily="'Courier New', monospace" fill="#d9dccb" opacity="0.55">
        <text x="44" y="748" fontSize="18" letterSpacing="2">BAY/W  18:20:04</text>
        <text x="44" y="770" fontSize="13" letterSpacing="2" opacity="0.7">14-11</text>
      </g>
    </g>
  );
}
