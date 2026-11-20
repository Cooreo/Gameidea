import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement>;

const base = (props: IconProps) => ({
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
  ...props,
});

export const FolderIcon = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="M3 7.5V18a1.5 1.5 0 0 0 1.5 1.5h15A1.5 1.5 0 0 0 21 18V8.5A1.5 1.5 0 0 0 19.5 7H12l-2-2.5H4.5A1.5 1.5 0 0 0 3 6v1.5Z" />
    <path d="M3 10.5h18" opacity=".45" />
  </svg>
);

export const PhotoIcon = (props: IconProps) => (
  <svg {...base(props)}>
    <rect x="3" y="5" width="18" height="14" rx="1.5" />
    <circle cx="8.5" cy="10" r="1.6" />
    <path d="m4.5 17 4.2-4.3 3.1 2.8 2.7-3 4.9 4.5" />
  </svg>
);

export const DocumentIcon = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="M6 3.5h8L19 8v12.5H6z" />
    <path d="M13.5 3.7V8H19" opacity=".6" />
    <path d="M9 12h6M9 15.5h6M9 19h3.5" />
  </svg>
);

export const PersonIcon = (props: IconProps) => (
  <svg {...base(props)}>
    <circle cx="12" cy="8.5" r="3.2" />
    <path d="M5.5 20c.6-4 3.2-6 6.5-6s5.9 2 6.5 6" />
  </svg>
);

export const SpeechIcon = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="M4 5.5h16v10H12l-4 3.5v-3.5H4z" />
    <path d="M8 9h8M8 12h5" opacity=".7" />
  </svg>
);

export const BoardIcon = (props: IconProps) => (
  <svg {...base(props)}>
    <rect x="3" y="4.5" width="18" height="12" rx="1" />
    <path d="M8 20.5 12 16.5 16 20.5" />
    <circle cx="8" cy="9" r="1.3" />
    <circle cx="16" cy="11.5" r="1.3" />
    <path d="M9 9.8 15 11" strokeDasharray="2 2" />
  </svg>
);

export const ScalesIcon = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="M12 4v16M7 20h10M4 8h16M12 4.5 4 8l2.6 4.5a2.9 2.9 0 0 0 5 0L12 4.5Z" />
    <path d="M12 4.5 20 8l-2.6 4.5a2.9 2.9 0 0 1-5 0L12 4.5Z" opacity=".55" />
  </svg>
);

export const CloseIcon = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);

export const SearchIcon = (props: IconProps) => (
  <svg {...base(props)}>
    <circle cx="10.5" cy="10.5" r="6" />
    <path d="m15 15 4.5 4.5M8 10.5h5M10.5 8v5" opacity=".8" />
  </svg>
);

export const PinIcon = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="M9 3.5h6l-1 5 3 3.5H7l3-3.5-1-5Z" />
    <path d="M12 12v8" />
  </svg>
);

export const ArrowLeftIcon = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="M19 12H5M11 6l-6 6 6 6" />
  </svg>
);

export const PlusIcon = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);

export const MinusIcon = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="M5 12h14" />
  </svg>
);

export const CheckIcon = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="m4.5 12.5 5 5 10-11" />
  </svg>
);

export const QuestionIcon = (props: IconProps) => (
  <svg {...base(props)}>
    <circle cx="12" cy="12" r="9" />
    <path d="M9.3 9.2c.2-1.5 1.3-2.4 2.8-2.4 1.6 0 2.7 1 2.7 2.4 0 1.3-.8 1.9-1.9 2.6-.8.5-1.1 1-1.1 2" />
    <circle cx="11.8" cy="17" r=".7" fill="currentColor" stroke="none" />
  </svg>
);

export const LinkIcon = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="M10 14a4 4 0 0 0 5.7 0l2.6-2.6a4 4 0 1 0-5.7-5.7L11 7.3" />
    <path d="M14 10a4 4 0 0 0-5.7 0l-2.6 2.6a4 4 0 1 0 5.7 5.7l1.6-1.6" />
  </svg>
);

export const TrashIcon = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="M4 7h16M9 7V4.5h6V7M6.5 7l1 13h9l1-13M10 11v5M14 11v5" />
  </svg>
);

export const SoundOffIcon = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="M4 10v4h3l4 3V7L7 10H4Z" />
    <path d="m16 10 4 4M20 10l-4 4" />
  </svg>
);
