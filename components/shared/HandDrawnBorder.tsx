'use client';

export default function HandDrawnBorder() {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none z-10"
      viewBox="0 0 400 560"
      fill="none"
      preserveAspectRatio="none"
    >
      <path
        d="M12 8 C 130 6, 270 10, 388 8
           C 390 140, 392 420, 388 552
           C 270 554, 130 550, 12 552
           C 10 420, 8 140, 12 8Z"
        stroke="var(--flipbook-brown)"
        strokeWidth="1.5"
        opacity="0.15"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter="url(#sketch)"
      />
    </svg>
  );
}
