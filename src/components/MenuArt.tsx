import lastLightArt from '../assets/the-last-light.jpg';
/**
 * Original SVG folder-and-photograph illustration for the main menu.
 * Everything is drawn locally, no image assets or remote fonts.
 */
export default function MenuArt() {
  return (
    <svg
      className="menu-art"
      viewBox="0 0 680 760"
      role="img"
      aria-label="A case folder with a photograph of the stolen painting, pinned with red thread."
    >
      <defs>
        <linearGradient id="ma-desk" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#241b14" />
          <stop offset="1" stopColor="#100c09" />
        </linearGradient>
        <linearGradient id="ma-folder" x1="0" y1="0" x2="0.4" y2="1">
          <stop offset="0" stopColor="#c8a970" />
          <stop offset="0.55" stopColor="#b1915b" />
          <stop offset="1" stopColor="#8e7042" />
        </linearGradient>
        <linearGradient id="ma-folder-front" x1="0" y1="0" x2="0.3" y2="1">
          <stop offset="0" stopColor="#d3b47a" />
          <stop offset="1" stopColor="#9d7d4a" />
        </linearGradient>
        <linearGradient id="ma-photo" x1="0" y1="0" x2="0.6" y2="1">
          <stop offset="0" stopColor="#efe6d4" />
          <stop offset="1" stopColor="#cfc1a7" />
        </linearGradient>
        <linearGradient id="ma-canvas" x1="0" y1="0" x2="0.2" y2="1">
          <stop offset="0" stopColor="#5f6a5a" />
          <stop offset="0.45" stopColor="#b08a4e" />
          <stop offset="0.72" stopColor="#d7b166" />
          <stop offset="1" stopColor="#4b4030" />
        </linearGradient>
        <filter id="ma-soft" x="-25%" y="-25%" width="150%" height="150%">
          <feGaussianBlur stdDeviation="14" />
        </filter>
        <filter id="ma-grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="2" result="noise" />
          <feColorMatrix type="saturate" values="0" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.12" />
          </feComponentTransfer>
        </filter>
        <pattern id="ma-hatch" width="7" height="7" patternTransform="rotate(38)" patternUnits="userSpaceOnUse">
          <line x1="0" y1="0" x2="0" y2="7" stroke="#5a4527" strokeWidth="1" opacity="0.12" />
        </pattern>
        <radialGradient id="ma-light" cx="0.35" cy="0.2" r="0.8">
          <stop offset="0" stopColor="#f0c981" stopOpacity="0.25" />
          <stop offset="0.55" stopColor="#7a5a32" stopOpacity="0.06" />
          <stop offset="1" stopColor="#000000" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="680" height="760" fill="url(#ma-desk)" />
      <ellipse cx="330" cy="700" rx="300" ry="46" fill="#000" opacity="0.5" filter="url(#ma-soft)" />

      <g transform="rotate(-6 330 400)">
        {/* folder back */}
        <path
          d="M96 176c0-10 8-18 18-18h152l26 26h176c11 0 20 9 20 20v374H96V176Z"
          fill="url(#ma-folder)"
          stroke="#6c5129"
          strokeWidth="2"
        />
        <path
          d="M96 204h440v374H96z"
          fill="url(#ma-hatch)"
          opacity="0.5"
        />
        {/* folder front */}
        <path
          d="M96 286h440v330c0 10-8 18-18 18H114c-10 0-18-8-18-18V286Z"
          fill="url(#ma-folder-front)"
          stroke="#6c5129"
          strokeWidth="2"
        />
        <path d="M96 286h440" stroke="#7a5d33" strokeWidth="2" opacity="0.7" />
        <path
          d="M120 320h392"
          stroke="#f4e6c8"
          strokeWidth="1"
          opacity="0.28"
          strokeDasharray="2 6"
        />

        {/* cardboard texture */}
        <rect x="100" y="290" width="432" height="340" fill="url(#ma-hatch)" opacity="0.7" />

        {/* photograph */}
        <g transform="rotate(3.5 330 400)">
          <rect x="159" y="178" width="348" height="286" fill="url(#ma-photo)" stroke="#9c8a6d" strokeWidth="1" />
          <rect x="181" y="201" width="304" height="224" fill="#2a241c" />
          {/* the painting itself */}
          <image
            href={lastLightArt}
            x="205"
            y="222"
            width="256"
            height="182"
            preserveAspectRatio="xMidYMid slice"
          />
          <rect x="205" y="222" width="256" height="182" fill="#8a5f2a" opacity="0.1" />
          <path d="M205 222h256v182H205z" fill="url(#ma-hatch)" opacity="0.22" />
          <rect
            x="199"
            y="216"
            width="268"
            height="194"
            fill="none"
            stroke="#c7a45e"
            strokeWidth="7"
          />
          <rect
            x="203"
            y="220"
            width="260"
            height="186"
            fill="none"
            stroke="#6e5427"
            strokeWidth="1"
          />
          {/* the chip in the corner */}
          <path d="M459 402l8-6 5 8-9 6z" fill="#3a2c18" />
          <path d="M457 404l4-3 2 4-4 2z" fill="#e7dcc4" opacity="0.7" />
          <text
            x="199"
            y="194"
            fill="#5d5343"
            fontFamily="'Courier New', monospace"
            fontSize="11"
            letterSpacing="2.4"
          >
            PRESS · 19:12 · EAST ROOM
          </text>
          <path d="M409 186v-14M430 186v-14" stroke="#8c7b5f" strokeWidth="2" />
        </g>

        {/* red thread + pins */}
        <path
          d="M470 330c46 4 74 32 72 72s-30 56-58 54"
          fill="none"
          stroke="#a8483a"
          strokeWidth="2"
          opacity="0.85"
        />
        <circle cx="470" cy="330" r="5.5" fill="#b75343" stroke="#6e2c23" strokeWidth="1" />
        <circle cx="484" cy="456" r="5.5" fill="#b75343" stroke="#6e2c23" strokeWidth="1" />

        {/* evidence tag */}
        <g transform="rotate(7 505 520)">
          <path d="M462 480h92v56h-92z" fill="#ded0b6" stroke="#8f7a57" />
          <path d="M462 480l-14 10 14 10" fill="#ded0b6" stroke="#8f7a57" />
          <text x="474" y="502" fill="#4b4030" fontSize="9" fontFamily="'Courier New', monospace" letterSpacing="1.6">
            MERIDIAN
          </text>
          <text x="474" y="518" fill="#4b4030" fontSize="9" fontFamily="'Courier New', monospace" letterSpacing="1.6">
            14 · 11
          </text>
          <text x="474" y="531" fill="#8a4a3c" fontSize="8" fontFamily="'Courier New', monospace" letterSpacing="1.2">
            EMPTY?
          </text>
        </g>

        {/* folder label */}
        <text x="120" y="340" fill="#5b4526" fontSize="11" fontFamily="'Courier New', monospace" letterSpacing="3">
          CASE FILE · 14/11-MG-07
        </text>
        <text x="120" y="624" fill="#5b4526" fontSize="10" fontFamily="'Courier New', monospace" letterSpacing="2.6">
          THE MERIDIAN GALLERY · RIVERSIDE QUARTER
        </text>
        <g transform="rotate(-3 520 620)">
          <rect x="426" y="590" width="134" height="42" fill="none" stroke="#8a4a3c" strokeWidth="2" opacity="0.75" />
          <text x="440" y="609" fill="#8a4a3c" fontSize="10" fontFamily="'Courier New', monospace" letterSpacing="2" opacity="0.9">
            EVIDENCE
          </text>
          <text x="440" y="623" fill="#8a4a3c" fontSize="10" fontFamily="'Courier New', monospace" letterSpacing="2" opacity="0.9">
            NOT TO LEAVE
          </text>
        </g>
      </g>

      <rect width="680" height="760" fill="url(#ma-light)" />
      <rect width="680" height="760" filter="url(#ma-grain)" opacity="0.5" />
    </svg>
  );
}
