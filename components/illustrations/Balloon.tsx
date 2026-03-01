'use client';

import { motion } from 'motion/react';

interface BalloonProps {
  x?: number;
  y?: number;
  color?: string;
  delay?: number;
  scale?: number;
}

export default function Balloon({ x = 0, y = 0, color = '#e8788a', delay = 0, scale = 1 }: BalloonProps) {
  return (
    <motion.g
      transform={`translate(${x}, ${y}) scale(${scale})`}
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: [100, 0, -20, 0], opacity: 1 }}
      transition={{ duration: 2, delay, ease: 'easeOut' }}
    >
      <motion.g
        animate={{ y: [0, -6, 0], rotate: [-3, 3, -3] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay }}
      >
        {/* String */}
        <path
          d={`M0,22 Q2,40 -1,60 Q-3,70 0,80`}
          stroke="#aaa"
          strokeWidth="0.8"
          fill="none"
        />
        {/* Balloon body */}
        <ellipse cx="0" cy="0" rx="14" ry="18" fill={color} opacity="0.85" />
        {/* Highlight */}
        <ellipse cx="-4" cy="-6" rx="4" ry="6" fill="white" opacity="0.25" />
        {/* Knot */}
        <polygon points="-2,18 2,18 0,22" fill={color} />
      </motion.g>
    </motion.g>
  );
}
