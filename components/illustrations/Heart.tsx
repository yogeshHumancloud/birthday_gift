'use client';

import { motion } from 'motion/react';

interface HeartProps {
  x?: number;
  y?: number;
  size?: number;
  color?: string;
  delay?: number;
  duration?: number;
  opacity?: number;
}

export default function Heart({
  x = 0,
  y = 0,
  size = 16,
  color = '#e8788a',
  delay = 0,
  duration = 4,
  opacity = 0.7,
}: HeartProps) {
  return (
    <motion.g transform={`translate(${x}, ${y})`}>
      <motion.path
        d={`M0,${size * 0.35}
            C0,${size * 0.15} ${-size * 0.5},${-size * 0.1} ${-size * 0.5},${size * 0.15}
            C${-size * 0.5},${size * 0.45} 0,${size * 0.65} 0,${size}
            C0,${size * 0.65} ${size * 0.5},${size * 0.45} ${size * 0.5},${size * 0.15}
            C${size * 0.5},${-size * 0.1} 0,${size * 0.15} 0,${size * 0.35}Z`}
        fill={color}
        initial={{ opacity: 0, y: 0, scale: 0.5 }}
        animate={{
          opacity: [0, opacity, opacity, 0],
          y: [0, -60, -120, -180],
          scale: [0.5, 1, 0.9, 0.4],
          x: [0, 10, -5, 8],
        }}
        transition={{
          duration,
          delay,
          repeat: Infinity,
          ease: 'easeOut',
        }}
      />
    </motion.g>
  );
}
