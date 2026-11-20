const base = {
  viewBox: '0 0 24 24',
  'aria-hidden': true,
  focusable: false,
} as const;

export const ShareIcon = () => (
  <svg {...base}>
    <path d="M18 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
    <path d="M6 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
    <path d="M18 22a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
    <path d="M8.59 13.51l6.83 3.98" />
    <path d="M15.41 6.51l-6.82 3.98" />
  </svg>
);

export const ChevronLeftIcon = () => (
  <svg {...base}>
    <path d="M15 18l-6-6 6-6" />
  </svg>
);

export const ChevronRightIcon = () => (
  <svg {...base}>
    <path d="M9 18l6-6-6-6" />
  </svg>
);
