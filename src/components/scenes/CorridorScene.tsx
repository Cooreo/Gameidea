/** CCTV still, 21:04. Low-light, compressed, green. */
export default function CorridorScene() {
  return (
    <g>
      <defs>
        <linearGradient id="cr-wall" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3d4741" />
          <stop offset="0.55" stopColor="#2c3531" />
          <stop offset="1" stopColor="#1d2421" />
        </linearGradient>
        <linearGradient id="cr-floor" x1="0.2" y1="0" x2="0.7" y2="1">
          <stop offset="0" stopColor="#47524b" />
          <stop offset="1" stopColor="#242b27" />
        </linearGradient>
        <linearGradient id="cr-door" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#cfe0c6" />
          <stop offset="0.55" stopColor="#93a98c" />
          <stop offset="1" stopColor="#4b5b4c" />
        </linearGradient>
        <linearGradient id="cr-coat" x1="0" y1="0" x2="0.7" y2="1">
          <stop offset="0" stopColor="#777f74" />
          <stop offset="0.45" stopColor="#5b635b" />
          <stop offset="1" stopColor="#343b36" />
        </linearGradient>
        <linearGradient id="cr-gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#b79a57" />
          <stop offset="0.5" stopColor="#8a6f39" />
          <stop offset="1" stopColor="#5c4823" />
        </linearGradient>
        <radialGradient id="cr-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#e0efd2" stopOpacity="0.55" />
          <stop offset="1" stopColor="#a9c39c" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="cr-vig" cx="0.5" cy="0.5" r="0.72">
          <stop offset="0.35" stopColor="#000" stopOpacity="0" />
          <stop offset="1" stopColor="#040604" stopOpacity="0.9" />
        </radialGradient>
        <pattern id="cr-scan" width="4" height="4" patternUnits="userSpaceOnUse">
          <rect width="4" height="4" fill="none" />
          <rect width="4" height="1.6" fill="#0a0f0b" opacity="0.28" />
        </pattern>
        <filter id="cr-noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" stitchTiles="stitch" result="n" />
          <feColorMatrix type="saturate" values="0" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.22" />
          </feComponentTransfer>
        </filter>
        <filter id="cr-soft"><feGaussianBlur stdDeviation="2.2" /></filter>
        <filter id="cr-bloom" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="18" />
        </filter>
      </defs>

      {/* corridor shell */}
      <rect width="1200" height="800" fill="#141a16" />
      <rect x="0" y="0" width="1200" height="800" fill="url(#cr-wall)" />
      <path d="M0 0h1200v260L0 420Z" fill="#39423c" opacity="0.5" />
      <path d="M0 430L1200 280v520H0Z" fill="url(#cr-floor)" />

      {/* perspective lines */}
      <g stroke="#1b221e" strokeWidth="3" opacity="0.45" fill="none">
        <path d="M0 430 L980 392" />
        <path d="M0 512 L980 430" />
        <path d="M0 610 L980 485" />
        <path d="M0 720 L980 560" />
        <path d="M120 800 L980 620" />
        <path d="M300 0 L980 300" />
        <path d="M0 96 L980 300" />
      </g>
      <g stroke="#5a675f" strokeWidth="1" opacity="0.12" fill="none">
        <path d="M0 468 L980 408" />
        <path d="M0 556 L980 458" />
        <path d="M180 800 L980 596" />
      </g>

      {/* floor sheen */}
      <path d="M300 800 L980 560 L980 680 L560 800Z" fill="#77897a" opacity="0.05" />

      {/* wall furniture on the left, in perspective */}
      <g>
        <path d="M64 306 L268 344 L268 468 L64 500 Z" fill="#2a332d" stroke="#1a211c" strokeWidth="3" />
        <path d="M76 318 L256 352 L256 458 L76 484 Z" fill="#3c453c" />
        <path d="M96 338 L150 348 L150 402 L96 396 Z" fill="#8d8a78" opacity="0.5" />
        <path d="M164 350 L232 362 L232 420 L164 412 Z" fill="#8d8a78" opacity="0.38" />
        <path d="M110 412 L152 418 L152 442 L110 438 Z" fill="#a19c84" opacity="0.32" />
        <path d="M196 424 L240 430 L240 452 L196 448 Z" fill="#a19c84" opacity="0.26" />
        <circle cx="206" cy="334" r="3" fill="#c8c2ac" opacity="0.6" />
        <circle cx="132" cy="470" r="3" fill="#c8c2ac" opacity="0.5" />
        <path d="M40 596 L286 574 L286 606 L40 634 Z" fill="#2c342e" stroke="#171d18" strokeWidth="2.5" />
        <path d="M40 634 L286 606 L286 618 L40 646 Z" fill="#1d241f" />
        <path d="M62 638 L66 692M262 612 L266 668" stroke="#151b17" strokeWidth="6" />
        <path d="M40 596 L286 574 L286 580 L40 602 Z" fill="#4a554b" opacity="0.6" />
      </g>

      {/* ceiling lights receding */}
      <g>
        <rect x="690" y="108" width="100" height="14" rx="4" fill="#d6e4ca" opacity="0.55" filter="url(#cr-bloom)" />
        <rect x="694" y="110" width="92" height="10" rx="4" fill="#e4edd9" opacity="0.7" />
        <rect x="452" y="52" width="120" height="16" rx="4" fill="#c9d9bd" opacity="0.28" filter="url(#cr-bloom)" />
        <rect x="458" y="55" width="108" height="10" rx="3" fill="#dbe6d0" opacity="0.4" />
      </g>

      {/* service door, open, at right */}
      <g>
        <rect x="980" y="196" width="220" height="470" fill="#0c100d" />
        <rect x="996" y="212" width="204" height="454" fill="url(#cr-door)" opacity="0.55" />
        <rect x="982" y="198" width="10" height="468" fill="#aebba6" opacity="0.5" />
        <rect x="996" y="212" width="204" height="454" fill="url(#cr-glow)" opacity="0.7" />
        <rect x="980" y="196" width="220" height="470" fill="none" stroke="#59665a" strokeWidth="6" />
        <path d="M980 666h220" stroke="#7d8b7a" strokeWidth="5" opacity="0.5" />
        <rect x="1010" y="596" width="176" height="54" fill="#0e1410" opacity="0.55" />
        <text x="1098" y="632" textAnchor="middle" fill="#b9c9ac" fontSize="20" fontFamily="'Courier New', monospace" letterSpacing="4" opacity="0.8">SERVICE</text>
        <circle cx="1150" cy="280" r="70" fill="#d9e8c9" opacity="0.16" filter="url(#cr-bloom)" />
      </g>

      {/* exit sign */}
      <g>
        <rect x="1028" y="120" width="122" height="42" rx="3" fill="#122015" stroke="#3f5140" strokeWidth="2" />
        <text x="1089" y="148" textAnchor="middle" fill="#9be08e" fontSize="21" fontFamily="'Courier New', monospace" letterSpacing="3" opacity="0.9">EXIT</text>
        <circle cx="1089" cy="120" r="56" fill="#9be08e" opacity="0.12" filter="url(#cr-bloom)" />
      </g>

      {/* the figure */}
      <g>
        <ellipse cx="644" cy="686" rx="126" ry="20" fill="#070b08" opacity="0.7" filter="url(#cr-soft)" />

        {/* legs */}
        <path d="M590 548 L574 668 L610 676 L626 556 Z" fill="#1a201c" />
        <path d="M650 554 L664 672 L700 666 L684 550 Z" fill="#161c18" />
        <path d="M570 664 L614 672 L618 684 C620 696 612 702 600 700 L564 692 C556 690 556 678 564 672 Z" fill="#111613" />
        <path d="M666 666 L700 660 L710 678 C714 690 706 696 694 694 L660 692 C652 690 654 676 662 670 Z" fill="#0d1210" />

        {/* long coat — much darker than the wall so the silhouette reads */}
        <path
          d="M596 352 C582 368 572 396 566 432 C554 482 552 532 556 576 L724 576 C730 532 728 482 720 436 C712 394 704 366 690 350 C676 336 658 330 642 330 C626 330 608 340 596 352 Z"
          fill="#252d28"
          stroke="#141a16"
          strokeWidth="2.4"
        />
        <ellipse cx="642" cy="330" rx="26" ry="9" fill="#0e1411" opacity="0.85" />
        <path d="M598 350 C610 340 626 334 640 334" stroke="#aab7a8" strokeWidth="2.4" fill="none" opacity="0.4" />
        <path d="M594 354 C578 390 566 452 562 520" stroke="#b3c0b0" strokeWidth="3" fill="none" opacity="0.45" />
        <path d="M700 352 C714 402 722 470 722 560" stroke="#9fb0a0" strokeWidth="2.2" fill="none" opacity="0.3" />
        <path d="M566 518 C608 532 682 532 720 518" stroke="#242b26" strokeWidth="5" fill="none" opacity="0.8" />
        <path d="M643 506 L643 574" stroke="#222923" strokeWidth="2" opacity="0.8" />

        {/* raised coat collar behind the hood */}
        <path d="M604 342 L612 302 L644 294 L676 308 L692 342 Z" fill="#1c231e" />
        <path d="M614 318 C638 306 670 308 690 322" stroke="#4b544b" strokeWidth="2" fill="none" opacity="0.6" />

        {/* hi-vis waistcoat worn over the coat */}
        <path
          d="M598 342 C590 402 588 470 594 544 L640 554 L692 540 C698 470 696 402 688 342 Z"
          fill="#6d7240"
        />
        <path d="M598 342 C606 350 616 356 624 358" stroke="#4f5230" strokeWidth="3" fill="none" opacity="0.7" />
        <path d="M688 342 C680 350 670 356 662 358" stroke="#4f5230" strokeWidth="3" fill="none" opacity="0.7" />
        <path d="M590 406 C616 416 668 416 694 404" stroke="#d7dbc4" strokeWidth="7" fill="none" opacity="0.85" />
        <path d="M590 470 C616 480 668 480 694 468" stroke="#c2c8b1" strokeWidth="5" fill="none" opacity="0.6" />
        <path d="M641 350 L641 550" stroke="#53562f" strokeWidth="2.5" opacity="0.75" />
        <path d="M608 358 C598 420 596 476 600 534M678 358 C688 420 690 476 686 534" stroke="#5e6136" strokeWidth="2" fill="none" opacity="0.5" />
        <path d="M602 540 C612 536 628 538 638 542M660 540 C674 534 684 530 690 526" stroke="#90937a" strokeWidth="1.5" fill="none" opacity="0.5" />

        {/* hood, seen from behind — merged into the coat collar */}
        <path
          d="M610 352 C594 322 596 280 612 256 C628 230 654 222 672 236 C692 252 698 290 692 326 C690 342 684 350 678 356 Z"
          fill="#333d36"
          stroke="#141a16"
          strokeWidth="2"
        />
        <path d="M648 228 C652 266 658 310 664 350" stroke="#26302a" strokeWidth="3" fill="none" />
        <path d="M616 330 C640 322 674 324 690 334" stroke="#1d251f" strokeWidth="3.5" fill="none" opacity="0.7" />
        <path d="M614 264 C628 244 650 232 668 236" stroke="#8d9984" strokeWidth="1.8" fill="none" opacity="0.28" />
        <path d="M618 336 L614 346M684 338 L688 348" stroke="#c9c3ae" strokeWidth="2.2" opacity="0.5" strokeLinecap="round" />
        {/* collar folds over the base of the hood */}
        <path d="M598 342 C620 326 666 326 692 342 L696 362 L594 362 Z" fill="#252d28" />
        <path d="M604 352 C624 340 664 340 686 352" stroke="#49544a" strokeWidth="2" fill="none" opacity="0.6" />

        {/* far arm, hand pushed into the pocket */}
        <path d="M582 352 C568 390 560 432 562 472 L586 478 C588 440 594 402 608 374 Z" fill="#242c26" />
        <path d="M562 472 L586 478 L584 496 L560 490 Z" fill="#8f7f6a" opacity="0.55" />

        {/* the wrapped painting, carried low at the hip */}
        <g>
          {/* cloth wrap */}
          <path d="M706 516 L864 560 L844 640 L684 596 Z" fill="#b0a68f" />
          <path d="M706 516 L864 560 L860 578 L702 534 Z" fill="#cdc3ad" />
          <path d="M684 596 L844 640 L842 650 L682 606 Z" fill="#7f7663" />
          <path d="M722 526 L750 592M768 534 L794 598M706 556 C712 570 718 580 726 586" stroke="#958b75" strokeWidth="2" fill="none" opacity="0.55" />
          <path d="M708 520 L742 530" stroke="#e0d6c1" strokeWidth="2.4" opacity="0.7" />
          <path d="M700 574 L716 578 L710 600 L694 596 Z" fill="#a2987f" opacity="0.9" />
          {/* raised gilt moulding, mitred at the corner */}
          <path d="M678 598 L842 646 L839 662 L675 614 Z" fill="#7d6230" />
          <path d="M678 598 L842 646 L841 652 L677 604 Z" fill="#c9a967" />
          <path d="M679 604 L841 649" stroke="#f2dc9f" strokeWidth="1.8" opacity="0.85" />
          <path d="M675 614 L839 662" stroke="#4a3718" strokeWidth="2" />
          <path d="M842 646 L864 558 L880 564 L857 664 Z" fill="#7d6230" />
          <path d="M842 646 L864 558 L870 560 L848 648 Z" fill="#caa968" />
          <path d="M868 562 L878 565 L857 662" stroke="#c19c55" strokeWidth="2" fill="none" opacity="0.6" />
          {/* the corner: one clean L, sharp highlight, no chip */}
          <path d="M839 662 L857 664 L856 671 L838 669 Z" fill="#a5843f" />
          <path d="M842 656 L856 660" stroke="#fff0c2" strokeWidth="2.6" />
          <path d="M840 668 L858 670" stroke="#3d2e15" strokeWidth="1.8" opacity="0.9" />
        </g>

        {/* near arm, over the painting, hand gripping the top edge */}
        <path d="M688 352 C698 392 704 446 710 498 L716 518 L742 516 L738 468 C732 424 722 384 708 360 Z" fill="#2f3831" />
        <path d="M712 508 L744 506 L746 520 L714 522 Z" fill="#1a211c" />
        <ellipse cx="719" cy="520" rx="8.6" ry="4.8" fill="none" stroke="#d6ad55" strokeWidth="3.6" transform="rotate(-8 719 520)" />
        <ellipse cx="719" cy="520" rx="8.6" ry="4.8" fill="none" stroke="#ffe7a6" strokeWidth="1.1" transform="rotate(-8 719 520)" opacity="0.9" />
        <g fill="#c2ab8f" stroke="#7c6952" strokeWidth="0.9">
          <path d="M716 518 C726 512 740 514 746 522 C750 530 742 538 732 536 C722 534 714 528 716 518 Z" />
          <path d="M722 534 C730 533 737 538 738 545 C739 552 730 554 723 549 Z" />
          <path d="M733 544 C740 544 745 549 744 555 C743 561 734 561 730 556 Z" />
          <path d="M742 521 C749 521 753 526 752 531 C751 536 743 535 740 530 Z" />
        </g>
        <path d="M722 530 C730 534 736 539 739 545" stroke="#8c7962" strokeWidth="1.1" fill="none" opacity="0.7" />
        <path d="M712 528 C706 538 704 548 706 558" stroke="#1a211c" strokeWidth="3" fill="none" opacity="0.5" />
        <path d="M714 516 C708 524 706 536 708 546" stroke="#1b221d" strokeWidth="3" fill="none" opacity="0.6" />
      </g>

      {/* camera artefacts */}
      <rect width="1200" height="800" fill="url(#cr-scan)" opacity="0.45" />
      
      <rect width="1200" height="800" filter="url(#cr-noise)" opacity="0.32" />
      <rect width="1200" height="800" fill="url(#cr-vig)" />

      {/* timestamp */}
      <g fontFamily="'Courier New', monospace" fill="#d7e4cf" opacity="0.85">
        <text x="44" y="738" fontSize="22" letterSpacing="2">SVC-02</text>
        <text x="182" y="738" fontSize="22" letterSpacing="2">21:04:17</text>
        <text x="332" y="738" fontSize="18" letterSpacing="2" opacity="0.7">14-11</text>
        <circle cx="1136" cy="50" r="7" fill="#c65a48" />
        <text x="1054" y="55" fontSize="14" letterSpacing="3" fill="#c8d8c0">REC</text>
      </g>
      <g stroke="#e8f2e0" strokeWidth="1" opacity="0.25">
        <path d="M0 748h1200M0 756h1200" />
      </g>
    </g>
  );
}
