'use client';

import Heart from './Heart';

interface FloatingHeartsProps {
  count?: number;
  intensity?: 'light' | 'medium' | 'heavy';
  areaWidth?: number;
  areaHeight?: number;
}

export default function FloatingHearts({
  count = 6,
  intensity = 'light',
  areaWidth = 380,
  areaHeight = 500,
}: FloatingHeartsProps) {
  const sizes = {
    light: { min: 6, max: 12 },
    medium: { min: 8, max: 18 },
    heavy: { min: 10, max: 24 },
  }[intensity];

  const opacities = {
    light: 0.3,
    medium: 0.5,
    heavy: 0.7,
  }[intensity];

  const colors = ['#e8788a', '#f5a0b0', '#d94f5c', '#f0c0c8', '#e06070'];

  // Generate deterministic positions based on index
  const hearts = Array.from({ length: count }, (_, i) => ({
    x: (((i * 67) + 30) % areaWidth),
    y: areaHeight - 40 + ((i * 23) % 60),
    size: sizes.min + ((i * 7) % (sizes.max - sizes.min)),
    color: colors[i % colors.length],
    delay: (i * 0.8) % 5,
    duration: 3.5 + ((i * 3) % 3),
  }));

  return (
    <g>
      {hearts.map((heart, i) => (
        <Heart
          key={i}
          x={heart.x}
          y={heart.y}
          size={heart.size}
          color={heart.color}
          delay={heart.delay}
          duration={heart.duration}
          opacity={opacities}
        />
      ))}
    </g>
  );
}
