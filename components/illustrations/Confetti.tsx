'use client';

import { motion } from 'motion/react';

interface ConfettiProps {
  count?: number;
  areaWidth?: number;
  areaHeight?: number;
}

const COLORS = ['#e8788a', '#f0c040', '#5b8cb8', '#7cba5f', '#d94f5c', '#87ceeb', '#f5a0b0'];

export default function Confetti({ count = 30, areaWidth = 380, areaHeight = 500 }: ConfettiProps) {
  const pieces = Array.from({ length: count }, (_, i) => ({
    x: ((i * 43 + 10) % areaWidth),
    delay: (i * 0.12) % 2,
    color: COLORS[i % COLORS.length],
    size: 4 + ((i * 3) % 5),
    shape: i % 3, // 0=rect, 1=circle, 2=triangle
    rotateEnd: ((i * 137) % 720) - 360,
    duration: 2.5 + ((i * 7) % 2),
  }));

  return (
    <g>
      {pieces.map((p, i) => (
        <motion.g
          key={i}
          initial={{ y: -20, x: p.x, opacity: 0, rotate: 0 }}
          animate={{
            y: [-(20 + (i % 40)), areaHeight * 0.4 + ((i * 17) % 200)],
            opacity: [0, 1, 1, 0.6],
            rotate: [0, p.rotateEnd],
            x: [p.x, p.x + ((i % 2 === 0 ? 1 : -1) * (15 + (i % 20)))],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeOut',
          }}
        >
          {p.shape === 0 && (
            <rect width={p.size} height={p.size * 0.6} fill={p.color} rx="1" />
          )}
          {p.shape === 1 && (
            <circle r={p.size * 0.4} fill={p.color} />
          )}
          {p.shape === 2 && (
            <polygon
              points={`0,${-p.size * 0.5} ${p.size * 0.5},${p.size * 0.3} ${-p.size * 0.5},${p.size * 0.3}`}
              fill={p.color}
            />
          )}
        </motion.g>
      ))}
    </g>
  );
}
